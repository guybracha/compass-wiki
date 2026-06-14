export interface PrimeChild {
  name: string;
  side: 'Hero' | 'Villain';
  power: string;
  tags: readonly string[];
  img: string;
  slug: string;
  primeSync?: number;
  inheritedFragment?: string;
  loyalty?: string;
}

const profiles: Record<string, { primeSync: number; inheritedFragment: string; loyalty: string }> = {
  "Voltage": { primeSync: 93, inheritedFragment: "Prime's electric pulse lattice", loyalty: "Alliance" },
  "Bloom": { primeSync: 88, inheritedFragment: "Prime's regenerative growth matrix", loyalty: "Alliance" },
  "Enforcer": { primeSync: 84, inheritedFragment: "Prime's dark-spectrum control", loyalty: "Unclear" },
  "Captain Phoenix": { primeSync: 91, inheritedFragment: "Prime's ignition core", loyalty: "Alliance" },
  "Kid Dimension": { primeSync: 86, inheritedFragment: "Prime's space-fold intuition", loyalty: "Alliance" },
  "Mindbend": { primeSync: 83, inheritedFragment: "Prime's neural pressure wave", loyalty: "Alliance" },
  "Killer Volt": { primeSync: 80, inheritedFragment: "Prime's unstable current spikes", loyalty: "Rogue" },
  "Human Rat": { primeSync: 67, inheritedFragment: "Prime's survival-adaptation reflex", loyalty: "Rogue" },
  "The Human Reactor": { primeSync: 76, inheritedFragment: "Prime's overload core", loyalty: "Rogue" },
  "General Darkness": { primeSync: 85, inheritedFragment: "Prime's eclipse resonance", loyalty: "Rogue" },
};

const raw = [
  // HEROES
  { name: "Voltage", side: "Hero", power: "Electricity", tags: ["Prime", "Tech", "Elemental"], img: "/contents/avatar2024/heroes/voltage-min.webp" },
  { name: "Bloom", side: "Hero", power: "Plant control", tags: ["Prime", "Elemental"], img: "/contents/avatar2024/heroes/bloom-min.webp" },
  { name: "Rubberman", side: "Hero", power: "Elasticity", tags: ["Prime"], img: "/contents/avatar2024/heroes/rubber-min.webp" },
  { name: "Enforcer", side: "Hero", power: "Living shadow", tags: ["Prime", "Mystic", "Dark"], img: "/contents/avatar2024/heroes/enforcer-min.webp" },
  { name: "Melody", side: "Hero", power: "Super-song", tags: ["Prime"], img: "/contents/avatar2024/heroes/melody-min.webp" },
  { name: "Cheerstar", side: "Hero", power: "Firework blasts", tags: ["Prime"], img: "/contents/avatar2024/heroes/cheerstar-min.webp" },
  { name: "Snowie", side: "Hero", power: "Snow creation", tags: ["Prime", "Mystic", "Elemental"], img: "/contents/avatar2024/heroes/snowie-min.webp" },
  { name: "Polar", side: "Hero", power: "Magnetic fields", tags: ["Prime", "Elemental"], img: "/contents/avatar2024/heroes/polar-min.webp" },
  { name: "Captain Phoenix", side: "Hero", power: "Pyrokinesis", tags: ["Prime", "Elemental"], img: "/contents/avatar2024/heroes/captainPhoenix-min.webp" },
  { name: "The Alchemist", side: "Hero", power: "Matter transmutation", tags: ["Prime", "Mystic", "Science"], img: "/contents/avatar2024/heroes/alchemist-min.webp" },
  { name: "Bricktown", side: "Hero", power: "Stone/brick control", tags: ["Prime", "Elemental"], img: "/contents/avatar2024/heroes/bricktown-min.webp" },
  { name: "Cheshire Surprise", side: "Hero", power: "Teleportation", tags: ["Prime", "Mystic"], img: "/contents/avatar2024/heroes/cheshireSurprise-min.webp" },
  { name: "Northlight", side: "Hero", power: "Light control", tags: ["Prime", "Elemental"], img: "/contents/avatar2024/heroes/northlight-min.webp" },
  { name: "Spectrum Man", side: "Hero", power: "Telekinesis & spectrum sight", tags: ["Prime"], img: "/contents/avatar2024/heroes/spectrumMan-min.webp" },
  { name: "Jawbreaker", side: "Hero", power: "Chews any material", tags: ["Prime"], img: "/contents/avatar2024/heroes/jawbreaker-min.webp" },
  { name: "Dice", side: "Hero", power: "Good luck manipulation", tags: ["Prime"], img: "/contents/avatar2024/heroes/dice-min.webp" },
  { name: "The Phoenician", side: "Hero", power: "Slow aging", tags: ["Prime", "Legendary"], img: "/contents/avatar2024/heroes/Phoenician-min.webp" },
  { name: "Genesis", side: "Hero", power: "Object creation from imagination", tags: ["Prime", "Mystic"], img: "/contents/avatar2024/heroes/genesis-min.webp" },
  { name: "Titanium", side: "Hero", power: "Metallic skin", tags: ["Prime"], img: "/contents/avatar2024/heroes/titanium-min.webp" },
  { name: "Sand Nomad", side: "Hero", power: "Sand control & dream-walking", tags: ["Prime", "Mystic", "Elemental"], img: "/contents/avatar2024/heroes/sandNomad-min.webp" },
  { name: "EMP", side: "Hero", power: "Electromagnetic pulses", tags: ["Prime", "Tech"], img: "/contents/avatar2024/heroes/emp-min.webp" },
  { name: "Rapunzel", side: "Hero", power: "Living hair", tags: ["Prime"], img: "/contents/avatar2024/heroes/rapunzel-min.webp" },
  { name: "The Architect", side: "Hero", power: "Constructs from existing matter", tags: ["Prime"], img: "/contents/avatar2024/heroes/architect-min.webp" },
  { name: "Stuck", side: "Hero", power: "Adhesive shots", tags: ["Prime"], img: "/contents/avatar2024/heroes/stuck-min.webp" },
  { name: "Basalt", side: "Hero", power: "Basalt-like tough skin", tags: ["Prime", "Elemental"], img: "/contents/avatar2024/heroes/basalt-min.webp" },
  { name: "Gunpowder", side: "Hero", power: "Explosions", tags: ["Prime", "Elemental"], img: "/contents/avatar2024/heroes/gunpowder-min.webp" },
  { name: "The Dreamer", side: "Hero", power: "Future sight", tags: ["Prime", "Mystic"], img: "/contents/avatar2024/heroes/dreamer-min.webp" },
  { name: "Mirror Girl", side: "Hero", power: "Invisibility", tags: ["Prime", "Mystic"], img: "/contents/avatar2024/heroes/mirrorGirl-min.webp" },
  { name: "The Impossible", side: "Hero", power: "Unstable over-power", tags: ["Prime"], img: "/contents/avatar2024/heroes/impossible-min.webp" },
  { name: "Captain Israel", side: "Hero", power: "Flight", tags: ["Prime"], img: "/contents/avatar2024/heroes/captainIsrael-min.webp" },
  { name: "Frog Girl", side: "Hero", power: "Super-leaps & long tongue", tags: ["Prime"], img: "/contents/avatar2024/heroes/frogGirl-min.webp" },
  { name: "Third-Eye", side: "Hero", power: "Tri-ocular super-vision", tags: ["Prime", "Mystic"], img: "/contents/avatar2024/heroes/thirdEye-min.webp" },
  { name: "Obelisk", side: "Hero", power: "Giant growth", tags: ["Prime"], img: "/contents/avatar2024/heroes/obelisk-min.webp" },
  { name: "Shrink", side: "Hero", power: "Miniaturization", tags: ["Prime"], img: "/contents/avatar2024/heroes/shrink-min.webp" },
  { name: "Mermaid", side: "Hero", power: "Shapeshift into mermaid", tags: ["Prime", "Undersea", "Mystic", "Legendary"], img: "/contents/avatar2024/heroes/mermaid-min.webp" },
  { name: "Art Einstein", side: "Hero", power: "Super-intellect", tags: ["Prime", "Science"], img: "/contents/avatar2024/heroes/artEinstein-min.webp" },
  { name: "Airdance", side: "Hero", power: "Aerokinesis", tags: ["Prime", "Elemental"], img: "/contents/avatar2024/heroes/airdance-min.webp" },
  { name: "McBot", side: "Hero", power: "Technopathy", tags: ["Prime", "Tech"], img: "/contents/avatar2024/heroes/mcBot-min.webp" },
  { name: "Kid Dimension", side: "Hero", power: "Interdimensional portals", tags: ["Prime", "Mystic", "Cosmic"], img: "/contents/avatar2024/heroes/kidDimension-min.webp" },
  { name: "Crystallo", side: "Hero", power: "Crystal form & creation", tags: ["Prime", "Elemental"], img: "/contents/avatar2024/heroes/crystallo-min.webp" },
  { name: "Meir Yarkoni", side: "Hero", power: "Rapid healing", tags: ["Prime"], img: "/contents/avatar2024/otherCharacters/meirYarkoni-min.webp" },
  { name: "Mindbend", side: "Hero", power: "Mind power", tags: ["Prime"], img: "/contents/avatar2024/heroes/mindbend-min.webp" },
  { name: "Sweet Girl", side: "Hero", power: "Sugar storm", tags: ["Prime"], img: "/contents/avatar2024/heroes/sweetGirl-min.webp" },
  { name: "Golda", side: "Hero", power: "Golden energy", tags: ["Prime"], img: "/contents/avatar2024/heroes/golda-min.webp" },
  { name: "Starguard", side: "Hero", power: "Cosmic energy generation", tags: ["Prime", "Cosmic"], img: "/contents/avatar2024/heroes/starguard-min.webp" },
  // VILLAINS
  { name: "Killer Volt", side: "Villain", power: "Electricity", tags: ["Prime", "Elemental"], img: "/contents/avatar2024/villains/killerVolt.webp" },
  { name: "Human Rat", side: "Villain", power: "Rat-like physiology", tags: ["Prime"], img: "/contents/avatar2024/villains/humanRat.webp" },
  { name: "Mr. Chalk", side: "Villain", power: "Turns matter to stone", tags: ["Prime", "Elemental"], img: "/contents/avatar2024/villains/mrChalk.webp" },
  { name: "Neon Master", side: "Villain", power: "Light control", tags: ["Prime", "Elemental"], img: "/contents/avatar2024/villains/neonMaster.webp" },
  { name: "Ice Princess", side: "Villain", power: "Ice", tags: ["Prime", "Elemental"], img: "/contents/avatar2024/villains/icePrincess.webp" },
  { name: "Mad Mechanic", side: "Villain", power: "Technopathy", tags: ["Prime", "Tech"], img: "/contents/avatar2024/villains/madMechanic.webp" },
  { name: "Fossa", side: "Villain", power: "Animalistic abilities", tags: ["Prime"], img: "/contents/avatar2024/villains/fossa.webp" },
  { name: "Übermensch", side: "Villain", power: "Deadly super-strength", tags: ["Prime"], img: "/contents/avatar2024/villains/ubermensch.webp" },
  { name: "The Human Reactor", side: "Villain", power: "Nuclear", tags: ["Prime", "Science"], img: "/character-not-found.svg" },
  { name: "Bushmaster", side: "Villain", power: "Poison creation", tags: ["Prime"], img: "/character-not-found.svg" },
  { name: "Mudman", side: "Villain", power: "Shapeshifting (mud)", tags: ["Prime", "Elemental"], img: "/contents/avatar2024/villains/mudman.webp" },
  { name: "The Golden Thief", side: "Villain", power: "Super-speed", tags: ["Prime"], img: "/character-not-found.svg" },
  { name: "Dynamito", side: "Villain", power: "Explosions", tags: ["Prime", "Elemental"], img: "/character-not-found.svg" },
  { name: "Q", side: "Villain", power: "Body reading & mimicry", tags: ["Prime"], img: "/contents/avatar2024/villains/Q.webp" },
  { name: "The Exterminator", side: "Villain", power: "Anesthetic gas", tags: ["Prime"], img: "/character-not-found.svg" },
  { name: "Parkour", side: "Villain", power: "Super-leaps & vaults", tags: ["Prime"], img: "/contents/avatar2024/villains/parkourFrog.webp" },
  { name: "General Darkness", side: "Villain", power: "Consumes dark energy", tags: ["Prime", "Mystic", "Dark"], img: "/contents/avatar2024/villains/generalDarkness.webp" },
  { name: "Ramesses the Immortal", side: "Villain", power: "Immortality", tags: ["Prime", "Mystic", "Legendary"], img: "/contents/avatar2024/villains/ramses.webp" },
  { name: "Black Eagle", side: "Villain", power: "Reflexes", tags: ["Prime"], img: "/character-not-found.svg" },
  { name: "Dark Mind", side: "Villain", power: "Telekinesis", tags: ["Prime", "Dark"], img: "/character-not-found.svg" },
  { name: "Alternatasha", side: "Villain", power: "Matter transmutation", tags: ["Prime"], img: "/character-not-found.svg" },
  { name: "Scarfield", side: "Villain", power: "Vampiric abilities", tags: ["Prime", "Mystic", "Dark"], img: "/contents/avatar2024/villains/scarfield.webp" },
  { name: "Sticker Man", side: "Villain", power: "Explosive stickers", tags: ["Prime"], img: "/contents/avatar2024/villains/stickerman.webp" },
  { name: "Madame Blackout", side: "Villain", power: "Shadow phasing", tags: ["Prime", "Mystic", "Dark"], img: "/contents/avatar2024/villains/madameBlackout.webp" },
  { name: "The Sphinx", side: "Villain", power: "Rapid healing", tags: ["Prime", "Legendary"], img: "/contents/avatar2024/villains/sphinx.webp" },
  { name: "Wizmaster", side: "Villain", power: "Dark magic", tags: ["Prime", "Mystic", "Dark"], img: "/contents/avatar2024/villains/wizMaster.webp" },
  { name: "Headmaster Vile", side: "Villain", power: "Mind manipulation & control", tags: ["Prime", "Dark"], img: "/contents/avatar2024/villains/headmasterVile.webp" },
] as const;

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export const primeChildren: PrimeChild[] = raw.map(r => ({
  ...r,
  tags: [...r.tags] as string[],
  side: r.side as 'Hero' | 'Villain',
  slug: toSlug(r.name),
  ...(profiles[r.name] || {}),
}));

export const primeTags = ['All', 'Hero', 'Villain', 'Prime', 'Tech', 'Mystic', 'Elemental', 'Cosmic', 'Dark', 'Legendary', 'Science', 'Undersea'];
