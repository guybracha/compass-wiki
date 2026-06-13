export interface Location {
  id: string;
  name: string;
  region: string;
  image: string;
  description: string;
  type: string;
}

export const locations: Location[] = [
  { id: 'tel-giborim', name: 'Tel Giborim', region: 'Middle East', image: '/contents/locations/negev.jpg', description: 'Located south of Be\'er Sheva; served as a technological city of Israel and secret base of operations for the Interguard.', type: 'City' },
  { id: 'undercity', name: 'The UnderCity', region: 'Middle East', image: '/contents/locations/sewers.jpg', description: "An underground area located in Tel Aviv's sewers, inhabited by a tribe of creatures known as 'Partaches'. A lawless underworld beneath the city's streets.", type: 'Underground' },
  { id: 'saint-peter-temple', name: 'Saint Peter Temple', region: 'Middle East', image: '/contents/locations/fortress.jpg', description: 'A Crusader fortress in the eastern Galilee near the Golan Heights; used as a meeting place and strategic outpost for the Alliance.', type: 'Fortress' },
  { id: 'atlas-building', name: 'Herzliya — The Atlas Building', region: 'Middle East', image: '/contents/avatar2024/places/earthTower-min.png', description: "A business tower in the city's industrial zone; owned by Voltage. Serves as a public-facing headquarters for Alliance operations.", type: 'Headquarters' },
  { id: 'oriental-pearl', name: 'Oriental Pearl Restaurant', region: 'East Asia', image: '/contents/locations/restaurant.jpg', description: 'A high-end restaurant and clandestine meeting ground used by power brokers and villain organizations in the Pacific region.', type: 'Landmark' },
  { id: 'paper-park', name: 'Paper Park', region: 'East Asia', image: '/contents/locations/paper.jpg', description: 'A mysterious open-air archive and philosophical garden where ancient scrolls and Prime-Child legends are preserved.', type: 'Sacred Site' },
  { id: 'sublania', name: 'Sublania', region: 'Oceans', image: '/contents/locations/underwater.jpg', description: 'An underwater kingdom home to aquatic Prime-Children and ancient civilizations. Tsunami has strong ties to this realm.', type: 'Kingdom' },
  { id: 'dragon-la', name: 'Dragon-La', region: 'Himalayas', image: '/contents/locations/himalaya.jpg', description: 'A hidden mountain sanctuary high in the Himalayas, ancient training ground of Dragon Caesar and home to a lineage of martial arts masters.', type: 'Sanctuary' },
  { id: 'pacifia', name: 'Pacifia', region: 'Pacific Ocean', image: '/contents/locations/pacific.jpg', description: 'A floating island nation in the Pacific, home to a community of free Prime-Children who declared independence from all governments.', type: 'Island Nation' },
];

export const regionGroups = ['Middle East', 'East Asia', 'Oceans', 'Himalayas', 'Pacific Ocean'];
