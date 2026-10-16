export interface Landmark {
  id: string;
  nameEn: string;
  nameFa: string;
  category: 'heritage' | 'nature' | 'architecture' | 'culture';
  image: string;
  aspectRatio: '16:9' | '4:3';
  elevationMeters: number;
  coordinates: { lat: number; lng: number };
  shortDescription: string;
  fullHistory: string;
  highlights: string[];
  bestTime: string;
}

export interface PhotoFilter {
  id: string;
  name: string;
  cssFilter: string;
  description: string;
}

export const PHOTO_FILTERS: PhotoFilter[] = [
  { id: 'original', name: 'Original Color', cssFilter: 'none', description: 'Natural sensor color balance' },
  { id: 'golden', name: 'Golden Hour', cssFilter: 'sepia(0.2) saturate(1.3) contrast(1.05) brightness(1.02)', description: 'Warm sunset glow across the Sabalan plateau' },
  { id: 'safavid', name: 'Safavid Cyan', cssFilter: 'saturate(1.2) hue-rotate(5deg) contrast(1.08)', description: 'Enriched turquoise and cobalt architectural tones' },
  { id: 'monochrome', name: 'Heritage B&W', cssFilter: 'grayscale(1) contrast(1.2) brightness(0.95)', description: 'Timeless architectural monochrome' },
  { id: 'alpine', name: 'Alpine Crisp', cssFilter: 'contrast(1.15) saturate(1.1) brightness(1.03)', description: 'High-altitude crisp mountain atmosphere' },
];

/**
 * Filter landmarks by search term and category
 */
export function filterLandmarks(
  landmarks: Landmark[],
  query: string,
  category: string
): Landmark[] {
  const cleanQuery = query.trim().toLowerCase();
  return landmarks.filter((lm) => {
    const matchesCat = category === 'all' || lm.category === category;
    if (!matchesCat) return false;
    if (!cleanQuery) return true;
    return (
      lm.nameEn.toLowerCase().includes(cleanQuery) ||
      lm.nameFa.includes(cleanQuery) ||
      lm.shortDescription.toLowerCase().includes(cleanQuery) ||
      lm.highlights.some((h) => h.toLowerCase().includes(cleanQuery))
    );
  });
}

/**
 * Calculate distance in kilometers between two coordinates using Haversine formula
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/**
 * Format altitude reading with meters and feet
 */
export function formatElevation(meters: number): string {
  const feet = Math.round(meters * 3.28084);
  return `${meters.toLocaleString()} m (${feet.toLocaleString()} ft)`;
}
