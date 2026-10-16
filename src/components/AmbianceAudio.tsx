import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

export const AmbianceAudio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const toggleAudio = async () => {
    if (!isPlaying) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        if (ctx.state === 'suspended') {
          await ctx.resume();
        }

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 1.5);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // 1. Procedural Mountain Wind (Brownian / Filtered noise)
        const bufferSize = 2 * ctx.sampleRate;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99 * b0 + white * 0.05;
          b1 = 0.95 * b1 + white * 0.05;
          b2 = 0.90 * b2 + white * 0.05;
          output[i] = (b0 + b1 + b2) * 0.3;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const windFilter = ctx.createBiquadFilter();
        windFilter.type = 'lowpass';
        windFilter.frequency.setValueAtTime(320, ctx.currentTime);

        // Wind swell LFO
        const windLfo = ctx.createOscillator();
        windLfo.frequency.setValueAtTime(0.12, ctx.currentTime);
        const windLfoGain = ctx.createGain();
        windLfoGain.gain.setValueAtTime(150, ctx.currentTime);
        windLfo.connect(windLfoGain);
        windLfoGain.connect(windFilter.frequency);
        windLfo.start();

        const windGain = ctx.createGain();
        windGain.gain.setValueAtTime(0.4, ctx.currentTime);

        whiteNoise.connect(windFilter);
        windFilter.connect(windGain);
        windGain.connect(masterGain);
        whiteNoise.start();

        // 2. Gentle Stream / Water ripples
        const streamFilter = ctx.createBiquadFilter();
        streamFilter.type = 'bandpass';
        streamFilter.frequency.setValueAtTime(800, ctx.currentTime);
        streamFilter.Q.setValueAtTime(3, ctx.currentTime);

        const streamLfo = ctx.createOscillator();
        streamLfo.frequency.setValueAtTime(0.25, ctx.currentTime);
        const streamLfoGain = ctx.createGain();
        streamLfoGain.gain.setValueAtTime(300, ctx.currentTime);
        streamLfo.connect(streamLfoGain);
        streamLfoGain.connect(streamFilter.frequency);
        streamLfo.start();

        const streamGain = ctx.createGain();
        streamGain.gain.setValueAtTime(0.18, ctx.currentTime);

        const streamSource = ctx.createBufferSource();
        streamSource.buffer = noiseBuffer;
        streamSource.loop = true;
        streamSource.connect(streamFilter);
        streamFilter.connect(streamGain);
        streamGain.connect(masterGain);
        streamSource.start();

        setIsPlaying(true);
      } catch (e) {
        console.error('Audio initialization failed', e);
      }
    } else {
      if (audioCtxRef.current && gainNodeRef.current) {
        try {
          const ctx = audioCtxRef.current;
          gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
          gainNodeRef.current.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
          setTimeout(() => {
            ctx.close().catch(() => {});
            audioCtxRef.current = null;
            setIsPlaying(false);
          }, 500);
        } catch {
          setIsPlaying(false);
        }
      } else {
        setIsPlaying(false);
      }
    }
  };

  return (
    <button
      onClick={toggleAudio}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer backdrop-blur-md ${
        isPlaying
          ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm shadow-amber-500/20'
          : 'bg-stone-900/60 text-stone-400 border-stone-800 hover:text-stone-200 hover:border-stone-700'
      }`}
      aria-label={isPlaying ? 'Mute mountain breeze and stream ambiance' : 'Play mountain breeze and river ambiance'}
      title={isPlaying ? 'Mute mountain soundscape' : 'Play procedural mountain breeze & river ambiance'}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 animate-pulse text-amber-400" />
          <span>Sabalan Breeze: On</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5" />
          <span>Ambiance: Muted</span>
        </>
      )}
    </button>
  );
};
