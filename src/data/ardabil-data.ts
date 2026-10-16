import type { Landmark } from '../utils/ardabil-logic.ts';

export interface PhotoDetails extends Landmark {
  cameraExif: {
    lens: string;
    focalLength: string;
    aperture: string;
    shutterSpeed: string;
    iso: string;
    timeOfDay: string;
    lighting: string;
  };
  persianSubtitle: string;
  tags: string[];
}

export const ARDABIL_PHOTOS: PhotoDetails[] = [
  {
    id: 'sabalan-skyline',
    nameEn: 'Ardabil Skyline & Mount Sabalan',
    nameFa: 'نمای سراسر شهر اردبیل و قله سبلان',
    persianSubtitle: 'بام آذربایجان و نگین طبیعت اردبیل',
    category: 'nature',
    image: '/src/assets/images/ardabil_sabalan_skyline_1792134136079.jpg',
    aspectRatio: '16:9',
    elevationMeters: 1351,
    coordinates: { lat: 38.2514, lng: 48.2973 },
    shortDescription: 'Golden hour panorama of Ardabil city with the snow-crowned peak of Mount Sabalan (4,811m) dominating the horizon.',
    fullHistory: 'Ardabil rests on an ancient plateau at an altitude of 1,351 meters. Mount Sabalan (Savalan in Azerbaijani Turkish), Iran’s third-highest peak and a dormant stratovolcano, watches over the city. Its majestic snowfields supply the natural mineral waters of Sarein and the fertile plains of the province. Legend holds that Zoroaster meditated on Sabalan’s snowy heights.',
    highlights: [
      'Towering 4,811m volcanic peak',
      'Panoramic golden hour sunset light',
      'Highland mountain plateau climate',
      'Sacred summit crater lake at the crest'
    ],
    bestTime: 'May to October (Late afternoon for golden sunset)',
    cameraExif: {
      lens: '24-70mm f/2.8 Pro Telephoto',
      focalLength: '35mm',
      aperture: 'f/8.0',
      shutterSpeed: '1/320s',
      iso: '100',
      timeOfDay: 'Golden Hour (18:15)',
      lighting: 'Warm side-lit low alpine sun'
    },
    tags: ['Panorama', 'Mount Sabalan', 'Skyline', 'Sunset', 'Highland']
  },
  {
    id: 'sheikh-safi',
    nameEn: 'Sheikh Safi al-Din Khānegāh and Shrine',
    nameFa: 'مجموعه آرامگاه شیخ صفی‌الدین اردبیلی',
    persianSubtitle: 'شاهکار جهانی معماری و تصوف صفوی (ثبت یونسکو)',
    category: 'heritage',
    image: '/src/assets/images/ardabil_sheikh_safi_1792134134993.jpg',
    aspectRatio: '16:9',
    elevationMeters: 1350,
    coordinates: { lat: 38.2498, lng: 48.2933 },
    shortDescription: 'The UNESCO World Heritage spiritual center of the Safavid dynasty, showcasing turquoise mosaic domes and intricate muqarnas.',
    fullHistory: 'Inscribed as a UNESCO World Heritage site in 2010, this sacred complex was developed between the early 16th century and late 18th century. It houses the burial tomb of Sheikh Safi al-Din, eponymous founder of the Safaviyya Sufi order, as well as Shah Ismail I, founder of the Safavid Empire. The complex includes the famed Chini Khaneh (House of Chinese Porcelains), Jannat Sara mosque, and tranquil paved courts.',
    highlights: [
      'UNESCO World Heritage Site (Inscribed 2010)',
      'Allah-Allah dome with cobalt mosaic tiles',
      'Historic Chini Khaneh porcelain vault',
      'Birthplace of the Safavid Renaissance'
    ],
    bestTime: 'Morning light (09:00 - 11:30) for glowing blue tiles',
    cameraExif: {
      lens: '16-35mm Ultra Wide-Angle',
      focalLength: '18mm',
      aperture: 'f/9.0',
      shutterSpeed: '1/250s',
      iso: '100',
      timeOfDay: 'Mid-Morning (10:20)',
      lighting: 'Crisp high-altitude direct sunlight'
    },
    tags: ['UNESCO', 'Safavid Architecture', 'Turquoise Dome', 'Mosque', 'Spiritual']
  },
  {
    id: 'shorabil-lake',
    nameEn: 'Shorabil Lake Promenade',
    nameFa: 'دریاچه و گردشگاه شورابیل',
    persianSubtitle: 'دریاچه طبیعی در دل شهر با انعکاس‌های رویایی',
    category: 'nature',
    image: '/src/assets/images/ardabil_shorabil_lake_1792134136411.jpg',
    aspectRatio: '16:9',
    elevationMeters: 1365,
    coordinates: { lat: 38.2215, lng: 48.2818 },
    shortDescription: 'Picturesque natural lake situated inside Ardabil, featuring serene dusk waters, a paved scenic ring trail, and Sabalan mountain views.',
    fullHistory: 'Shorabil is one of the only natural inland urban lakes in Iran. Originally a saline lake renowned for therapeutic muds, it was carefully refreshed with sweet mountain waters and now spans over 140 hectares. In autumn and winter, pelicans, wild ducks, and flamingos migrate here, while summer brings citizens and travelers to its breezy promenade and cycling circuit.',
    highlights: [
      '140-hectare pristine natural urban lake',
      '7.5 km illuminated lakeside walking & cycling trail',
      'Migratory wetland bird sanctuary',
      'Mirror reflections of twilight mountain ridges'
    ],
    bestTime: 'Twilight & Blue Hour (19:30 - 20:30)',
    cameraExif: {
      lens: '24-70mm f/2.8 Landscape',
      focalLength: '28mm',
      aperture: 'f/5.6',
      shutterSpeed: '1/30s (Tripod)',
      iso: '200',
      timeOfDay: 'Twilight / Blue Hour (19:45)',
      lighting: 'Ambient dusk sky with warm lantern illumination'
    },
    tags: ['Lake', 'Promenade', 'Reflections', 'Twilight', 'Nature']
  },
  {
    id: 'haft-cheshmeh',
    nameEn: 'Haft Cheshmeh (Seven Springs Bridge)',
    nameFa: 'پل تاریخی هفت چشمه (پل ججین)',
    persianSubtitle: 'پل تاریخی صفوی بر فراز رودخانه بالیقلو چای',
    category: 'architecture',
    image: '/src/assets/images/ardabil_haft_cheshmeh_1792134136882.jpg',
    aspectRatio: '4:3',
    elevationMeters: 1345,
    coordinates: { lat: 38.2452, lng: 48.2891 },
    shortDescription: 'Masterpiece of Safavid masonry featuring seven brick pointed arches gracefully crossing the Balikhlou River.',
    fullHistory: 'Also known as Pol-e Jajin, Haft Cheshmeh bridge dates back to the Safavid dynasty and spans the Balikhlou Chay (Fish River) which flows through the heart of Ardabil. The bridge is constructed with gypsum mortar and hand-fired red bricks atop sturdy stone foundation piers designed to withstand spring snowmelt torrents from Mount Sabalan.',
    highlights: [
      'Seven pointed Safavid brick arches',
      'Balikhlou Chay riverbank park & willows',
      'National Heritage Registered Monument',
      'Stone breakwaters engineered against glacial runoff'
    ],
    bestTime: 'Early Morning (08:00 - 10:00) with fresh river breeze',
    cameraExif: {
      lens: '35mm Prime f/1.8',
      focalLength: '35mm',
      aperture: 'f/7.1',
      shutterSpeed: '1/400s',
      iso: '100',
      timeOfDay: 'Morning (09:15)',
      lighting: 'Clear morning sun, water caustics'
    },
    tags: ['Historic Bridge', 'Safavid', 'River', 'Brick Architecture', 'Heritage']
  }
];

export const CITY_CULTURE_CARDS = [
  {
    title: 'Sabalan Pure Honey',
    titleFa: 'عسل طبیعی سبلان',
    desc: 'Harvested from alpine wildflower meadows across Mount Sabalan slopes, celebrated across Iran for purity and medicinal nectar.',
    icon: 'Flower2'
  },
  {
    title: 'Sarein Hydrotherapy',
    titleFa: 'آبگرم‌های معدنی سرعین',
    desc: 'Located 25km west of Ardabil, famous volcanic thermal hot springs rich in sulfur and minerals flowing straight from Sabalan.',
    icon: 'Waves'
  },
  {
    title: 'Halva Siah (Black Halva)',
    titleFa: 'حلوای سیاه سنتی اردبیل',
    desc: 'Ancient centuries-old restorative recipe made with sprouted wheat germ, mountain butter, walnut, cardamom, and pure honey.',
    icon: 'Flame'
  },
  {
    title: 'Silk & Wool Rugs',
    titleFa: 'فرش و گلیم دستباف اردبیل',
    desc: 'Home of the historic Ardabil Carpet (the 1539 masterpiece in London’s V&A Museum) and world-renowned nomadic Shahsavan kilims.',
    icon: 'Sparkles'
  }
];
