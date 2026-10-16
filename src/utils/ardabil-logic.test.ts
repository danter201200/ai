import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterLandmarks,
  calculateDistanceKm,
  formatElevation,
  PHOTO_FILTERS,
} from './ardabil-logic.ts';
import type { Landmark } from './ardabil-logic.ts';

const mockLandmarks: Landmark[] = [
  {
    id: 'sheikh-safi',
    nameEn: 'Sheikh Safi al-Din Khānegāh and Shrine',
    nameFa: 'مجموعه آرامگاه شیخ صفی‌الدین اردبیلی',
    category: 'heritage',
    image: '/test1.jpg',
    aspectRatio: '16:9',
    elevationMeters: 1350,
    coordinates: { lat: 38.2498, lng: 48.2933 },
    shortDescription: 'UNESCO World Heritage complex and spiritual center of Safavid dynasty',
    fullHistory: 'Built during the Safavid era...',
    highlights: ['UNESCO World Heritage', 'Chini Khaneh', 'Turquoise Domes'],
    bestTime: 'Spring to Autumn',
  },
  {
    id: 'mount-sabalan',
    nameEn: 'Mount Sabalan',
    nameFa: 'کوه سبلان (ساوالان)',
    category: 'nature',
    image: '/test2.jpg',
    aspectRatio: '16:9',
    elevationMeters: 4811,
    coordinates: { lat: 38.2667, lng: 47.8333 },
    shortDescription: 'Third highest volcanic peak in Iran with a dormant crater lake',
    fullHistory: 'Mount Sabalan rises prominently west of Ardabil...',
    highlights: ['Summit Crater Lake', 'Alpine Meadows', 'Volcanic Peaks'],
    bestTime: 'July to September',
  },
  {
    id: 'haft-cheshmeh',
    nameEn: 'Haft Cheshmeh Bridge',
    nameFa: 'پل هفت چشمه',
    category: 'architecture',
    image: '/test3.jpg',
    aspectRatio: '4:3',
    elevationMeters: 1345,
    coordinates: { lat: 38.245, lng: 48.29 },
    shortDescription: 'Historic Safavid red-brick bridge over the Balikhlou River',
    fullHistory: 'Constructed during the Safavid period...',
    highlights: ['Seven Brick Arches', 'Safavid Masonry', 'Balikhlou River'],
    bestTime: 'All year round',
  },
];

test('filterLandmarks returns all landmarks when category is all and query is empty', () => {
  const result = filterLandmarks(mockLandmarks, '', 'all');
  assert.equal(result.length, 3);
});

test('filterLandmarks filters by category correctly', () => {
  const heritageResults = filterLandmarks(mockLandmarks, '', 'heritage');
  assert.equal(heritageResults.length, 1);
  assert.equal(heritageResults[0].id, 'sheikh-safi');

  const natureResults = filterLandmarks(mockLandmarks, '', 'nature');
  assert.equal(natureResults.length, 1);
  assert.equal(natureResults[0].id, 'mount-sabalan');
});

test('filterLandmarks searches by English and Persian name and highlights', () => {
  const searchSabalan = filterLandmarks(mockLandmarks, 'sabalan', 'all');
  assert.equal(searchSabalan.length, 1);
  assert.equal(searchSabalan[0].id, 'mount-sabalan');

  const searchPersian = filterLandmarks(mockLandmarks, 'صفی‌الدین', 'all');
  assert.equal(searchPersian.length, 1);
  assert.equal(searchPersian[0].id, 'sheikh-safi');

  const searchHighlight = filterLandmarks(mockLandmarks, 'seven brick arches', 'all');
  assert.equal(searchHighlight.length, 1);
  assert.equal(searchHighlight[0].id, 'haft-cheshmeh');
});

test('calculateDistanceKm calculates approximate distance between Ardabil and Sabalan peak', () => {
  // Ardabil center (38.25, 48.30) to Sabalan peak (38.27, 47.83) is approx 41-43 km
  const dist = calculateDistanceKm(38.25, 48.3, 38.27, 47.83);
  assert.ok(dist >= 40 && dist <= 45, `Expected distance ~41-43km, got ${dist}`);
});

test('formatElevation formats meters and feet correctly', () => {
  const formatted = formatElevation(4811);
  assert.ok(formatted.includes('4,811 m'));
  assert.ok(formatted.includes('15,784 ft'));
});

test('PHOTO_FILTERS contains standard presets', () => {
  assert.ok(PHOTO_FILTERS.length >= 4);
  const original = PHOTO_FILTERS.find((f) => f.id === 'original');
  assert.ok(original);
  assert.equal(original.cssFilter, 'none');
});
