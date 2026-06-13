export interface GalleryItem {
  title: string;
  src: string;
  caption: string;
  tags: string[];
}

export const galleryItems: GalleryItem[] = [
  { title: "Unite to Action!", src: "/contents/art2025/toAction.webp", caption: "Core poster – Compass Alliance to action.", tags: ["poster", "alliance"] },
  { title: "Bright Lights, Bigger City", src: "/contents/art2025/cyberpunk.webp", caption: "Mysterious cyberpunk cityscape.", tags: ["prime", "poster"] },
  { title: "Wing Squad", src: "/contents/art2025/wings.webp", caption: "The winged members of the Alliance: Dragon Fighter, Captain Phoenix, and Mariposa.", tags: ["prime", "poster"] },
  { title: "Honey, I Shrunk the Heroes", src: "/contents/art2025/shrink.webp", caption: "Dr. Monstro has shrunk Paladin, Voltage, and Lady Astral.", tags: ["prime", "poster"] },
  { title: "Kaiju Royale", src: "/contents/art2025/kaiju.webp", caption: "The whole Alliance faces off against gigantic kaiju.", tags: ["alliance", "poster"] },
  { title: "Hero Summit", src: "/contents/art2025/kaiju1.webp", caption: "The Compass Alliance convention of young heroes.", tags: ["alliance", "poster"] },
  { title: "Team Voltage", src: "/contents/art2025/voltage.webp", caption: "Voltage and his secret group.", tags: ["alliance", "poster"] },
  { title: "Election Day", src: "/contents/art2025/election.webp", caption: "Voltage, Gigantic, Lady Astral, and Astro Sentry fight to become the new leader.", tags: ["myth", "villains", "poster"] },
  { title: "Giant Size Alliance", src: "/contents/art2025/giantSize.webp", caption: "An homage to the classic Giant-Size X-Men #1 comic.", tags: ["space", "poster"] },
  { title: "A Wide Circle", src: "/contents/art2025/circle.webp", caption: "A concept art for a new project in 2026.", tags: ["poster"] },
  { title: "My Dream Team", src: "/contents/art2025/dreamteam.webp", caption: "A widescreen concept art featuring the Compass Alliance.", tags: ["poster", "alliance"] },
  { title: "One Piece Remake", src: "/contents/art2025/onePiece.webp", caption: "A scene remake from One Piece featuring Compass Alliance characters.", tags: ["alliance"] },
  { title: "Spectrum Man", src: "/contents/art2025/spectrumMan.webp", caption: "A concept art featuring Spectrum Man.", tags: ["prime"] },
  { title: "Futureberg Branch", src: "/contents/art2025/powerPoint.webp", caption: "A comedic scene of the Futureberg staff based on The Office.", tags: ["prime"] },
  { title: "Bruegel", src: "/contents/art2026/breugel.webp", caption: "A classical art-inspired composition with Compass World characters.", tags: ["poster"] },
  { title: "Hey Size", src: "/contents/art2026/hey-size.webp", caption: "Size in action — a dynamic character moment.", tags: ["prime", "poster"] },
  { title: "Intruder I", src: "/contents/art2026/intruder1.webp", caption: "First encounter with mysterious intruders.", tags: ["villains", "poster"] },
  { title: "Intruder II", src: "/contents/art2026/intruder2.webp", caption: "The second wave of invasion.", tags: ["villains", "poster"] },
  { title: "Size & Mariposa", src: "/contents/art2026/size-mariposa.webp", caption: "Size and Mariposa team-up moment.", tags: ["alliance", "poster"] },
  { title: "This Bored Threat", src: "/contents/art2026/this-bored-threat.webp", caption: "A villain with attitude — mystery threat.", tags: ["villains", "poster"] },
  { title: "Night of the Wolf", src: "/contents/art2026/wolf.webp", caption: "Fierce and untamed — werewolf transformation arc.", tags: ["poster"] },
  { title: "Compass Alliance Cover", src: "/contents/gallery/UniteCol-min.webp", caption: "The iconic Compass Alliance united key art.", tags: ["alliance", "poster"] },
  { title: "United Alliance Shaded", src: "/contents/gallery/UniteColShade.png", caption: "Shaded variant of the United Alliance poster.", tags: ["alliance", "poster"] },
  { title: "Grandmasters", src: "/contents/gallery/Grandmasters-min.png", caption: "The legendary Grandmasters team poster.", tags: ["alliance", "poster"] },
  { title: "Old Generation", src: "/contents/gallery/OldGeneration-min.jpg", caption: "Heroes of the old generation.", tags: ["alliance", "poster"] },
  { title: "Underwater Heroes", src: "/contents/gallery/Underwater-min.png", caption: "Aquatic heroes of the Compass World.", tags: ["prime", "space"] },
  { title: "Space Heroes", src: "/contents/gallery/Space-min.png", caption: "The cosmic defenders of Compass World.", tags: ["space", "poster"] },
  { title: "Doctor Monstro", src: "/contents/gallery/Monstro-min.png", caption: "The villainous Doctor Monstro key art.", tags: ["villains", "poster"] },
  { title: "Gigantic Gone", src: "/contents/gallery/GiganticGone-min.png", caption: "A powerful moment featuring Gigantic.", tags: ["alliance", "poster"] },
  { title: "The Twins", src: "/contents/gallery/Twins-min.png", caption: "Twin heroes of the Compass World.", tags: ["alliance"] },
  { title: "The Sewers", src: "/contents/gallery/Sewers-min.png", caption: "Adventures in the UnderCity sewers.", tags: ["prime"] },
  { title: "Voltage Key Art", src: "/contents/gallery/Voltage-min.png", caption: "Voltage — the charged heart of the Alliance.", tags: ["alliance", "poster"] },
  { title: "New Grandmasters", src: "/contents/gallery/NewGrandmasters.jpg", caption: "The new generation of Grandmasters.", tags: ["alliance", "poster"] },
];

export const galleryTags = ['all', 'alliance', 'prime', 'villains', 'space', 'poster', 'myth'];
