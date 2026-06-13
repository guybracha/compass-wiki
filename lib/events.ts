export interface WikiEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  result: string;
  banner: string;
  prelude: string;
  clash: string;
  aftermath: string;
  participants: string[];
  items: string[];
}

export const eventsCatalog: WikiEvent[] = [
  {
    id: 'guest-on-the-ship',
    title: 'Guest on the Ship',
    date: 'Alliance Year 04',
    location: "Aboard the heroes' ship at sea",
    result: 'Unexpected alliance tension and emotional fallout',
    banner: '/contents/historyImg/2023.webp',
    prelude: "The heroes are returning from an adventure and are suffering from extreme boredom. Dragon Fighter suggests they should have brought books to read.",
    clash: "The evil Ice Princess unexpectedly emerges from the ship refrigerator. She reveals she fled from Q and surprises everyone by kissing Comrade.",
    aftermath: 'Mariposa confesses that she accidentally cast a love spell on the Ice Princess during their last battle with Q.',
    participants: ['Dragon Fighter', 'Mariposa', 'Tsunami', 'Comrade', 'Size', 'Voltage', 'Paladin', 'Gigantic', 'Lady Astral', 'Ice Princess'],
    items: ['Ship Refrigerator', 'Books']
  },
  {
    id: 'the-bored-threat',
    title: 'The Bored Threat',
    date: 'Alliance Year 04',
    location: 'The City Park inspired by Herzliya and Yarkon parks',
    result: 'Villain neutralized and public morale restored',
    banner: '/contents/historyImg/2022.webp',
    prelude: 'The heroes spend a day off in the park, though Agamemnon insists they should be fighting constantly.',
    clash: 'The villain Planto attacks out of boredom, demanding a fight. After he accidentally damages a nearby mall, the heroes engage him. Size shrinks, latches onto Planto\'s suit, and triggers its self-destruct.',
    aftermath: 'Planto is left in Compass Alliance pajamas and sent flying into the sky by Mariposa.',
    participants: ['Voltage', 'Gigantic', 'Enforcer', 'Melody', 'Size', 'Mariposa', 'Agamemnon', 'Tsunami', 'Dragon Caesar'],
    items: ['Elemental Technology Suit', 'Force Field']
  },
  {
    id: 'night-of-the-wolf',
    title: 'Night of the Wolf',
    date: 'Alliance Year 05',
    location: 'A northern village in the Galilee near a dark forest',
    result: 'Curse lifted and village restored',
    banner: '/contents/historyImg/2021.webp',
    prelude: 'The Alliance investigates a supernatural mystery while Northlight struggles with deep self-doubt.',
    clash: "Villagers are turned into werewolves by The Bratty Witch, the Wizmaster's daughter, acting out of boredom. Northlight overcomes her doubt and uses her aura to create an illusion of morning light, breaking the nightly curse.",
    aftermath: 'The villagers return to human form, and the young witch is grounded by her mother for two weeks.',
    participants: ['Paladin', 'Lady Astral', 'Comrade', 'Ice Princess', 'Northlight', 'Techno', 'Cheerstar', 'Optimus Quantum', 'The Bratty Witch'],
    items: ['Magical Energy', 'Light Aura']
  },
  {
    id: 'hero-pile',
    title: 'Hero Pile (Welcome to the Compass Alliance)',
    date: 'Alliance Year 03',
    location: 'The Alliance roadside inn',
    result: 'Nelly accepted into the Alliance',
    banner: '/contents/historyImg/2023.webp',
    prelude: 'Size returns from an adventure in Port-City accompanied by Nelly.',
    clash: 'Johnny B. Goode tries to flirt with Nelly but makes an embarrassing slip of the tongue, sparking a massive brawl. The six founding members arrive and put Nelly through a three-question test.',
    aftermath: 'Nelly is officially invited to join the Alliance and begins searching for her own superhero name.',
    participants: ['Size', 'Nelly', 'Johnny B. Goode', 'Northlight', 'Paladin', 'Voltage', 'Lady Astral', 'Gigantic', 'Comrade', 'Tsunami'],
    items: ['Anvil', 'Swamp Water']
  },
  {
    id: 'when-paladin-met-astral',
    title: 'When Paladin Met Astral',
    date: 'Early Legends Era',
    location: 'The Kingdom Forest',
    result: 'Origin of an iconic duo',
    banner: '/contents/historyImg/750BC.webp',
    prelude: 'Paladin, a young knight, is sent on a mission to hunt a rare unicorn.',
    clash: 'He discovers the unicorn is actually a centauress, a human princess magically transformed and exiled. A mysterious connection forms between them.',
    aftermath: 'Paladin abandons the hunt to become a holy knight, and Lady Astral becomes his warrior partner.',
    participants: ['Paladin', 'Lady Astral'],
    items: ['Hunting Weapon']
  },
];
