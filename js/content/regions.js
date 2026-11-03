// Regions of the atlas. Each has a colour pair [light, dark], an art style, and the question it asks.
export const REGIONS = [
  {
    id: 'latitude', name: 'Latitude', color: ['#2F6F92', '#73B7DB'], art: 'latitude',
    q: 'Which of your walls are real?',
    intro: 'Much of what people never attempt is ruled out by restrictions they never examined. Some are external and solid. Many are psychological, or cultural, or simply misperceived — and they dissolve when tested. This region is about telling them apart, and about the earned freedom to deviate.'
  },
  {
    id: 'self', name: 'Self-Authorship', color: ['#C2462B', '#F2805F'], art: 'self',
    q: 'Who decides who you are?',
    intro: 'Confidence, identity, authenticity and change — and the research behind them, which is stranger and more hopeful than the slogans. The central question: at what point does a person stop inheriting their values and start writing them?'
  },
  {
    id: 'inner', name: 'Inner Weather', color: ['#4F52C4', '#9497F5'], art: 'inner',
    q: 'What is a feeling for?',
    intro: 'Embarrassment, shame, fear, rejection, the sense of being watched. These are not defects to eliminate but signals with histories and functions. Understanding them changes how much room they take up.'
  },
  {
    id: 'between', name: 'Between People', color: ['#B7791A', '#EDB453'], art: 'between',
    q: 'What actually happens when two people connect?',
    intro: 'Conversation, listening, humour, friendship, charisma. A surprising amount of social skill turns out to be attention, correctly aimed — and a surprising amount of social fear turns out to be miscalculation.'
  },
  {
    id: 'voice', name: 'Voice & Presence', color: ['#1F8475', '#5FD0BD'], art: 'voice',
    q: 'How does a mind become audible?',
    intro: 'Speech, story, rhetoric and the body that delivers them. Separating what is known about nonverbal communication from the folklore that surrounds it — and finding the levers that genuinely matter.'
  },
  {
    id: 'mind', name: 'Intellectual Character', color: ['#7C4BB0', '#C29BEA'], art: 'mind',
    q: 'How do you know what you think?',
    intro: 'Curiosity, calibration, independence, taste. Intelligence is partly what you have; intellectual character is what you do with it — the habits that make a mind trustworthy, interesting and hard to fool.'
  },
  {
    id: 'craft', name: 'Craft & Becoming', color: ['#3D7A36', '#8BCB7E'], art: 'craft',
    q: 'How does anyone get good at anything?',
    intro: 'Practice, habit, plans and willpower — the machinery of turning intention into capability. Several famous findings here have been revised or overturned, and the revisions are more useful than the originals.'
  },
  {
    id: 'influence', name: 'Influence & Power', color: ['#A3285A', '#E77BA6'], art: 'influence',
    q: 'How do you move the world without bending yourself?',
    intro: 'Assertiveness, negotiation, persuasion, leadership. The skills of acting on other people — and the ethics of doing it in ways that survive their scrutiny.'
  },
  {
    id: 'surface', name: 'Surface & Substance', color: ['#7A7A12', '#C9C95A'], art: 'surface',
    q: 'What does appearance say, and should it?',
    intro: 'Faces, clothes, bearing and grace. People judge surfaces quickly and with unwarranted confidence. Knowing how that works lets you choose what your surface says — without mistaking it for the substance.'
  },
  {
    id: 'visions', name: 'Visions of Excellence', color: ['#4A4D57', '#B4B8C6'], art: 'visions',
    q: 'What would it mean to live remarkably?',
    intro: 'Aristotle, the Stoics, Confucius, Nietzsche, the Buddhist critique of the self. Serious traditions disagree deeply about what makes a human life excellent. Rather than choose one for you, this region lets you argue with all of them.'
  }
];

export const regionById = Object.fromEntries(REGIONS.map(r => [r.id, r]));

// Threads: curated journeys that cut across regions.
export const THREADS = [
  {
    id: 'seen', name: 'On being seen', color: ['#4F52C4', '#9497F5'],
    blurb: 'Why being watched feels heavier than it is — and what people actually notice.',
    stops: ['spotlight', 'transparency', 'embarrassment', 'liking-gap', 'body-language', 'faces']
  },
  {
    id: 'formidable', name: 'Becoming formidable', color: ['#3D7A36', '#8BCB7E'],
    blurb: 'From belief in your capability to the capability itself.',
    stops: ['efficacy', 'practice', 'calibration', 'assertiveness', 'negotiation']
  },
  {
    id: 'walls', name: 'Walls that are not there', color: ['#2F6F92', '#73B7DB'],
    blurb: 'Distinguishing real limits from inherited ones, then walking through the gaps.',
    stops: ['walls', 'norms', 'ladder', 'rejection', 'deviance', 'independence']
  },
  {
    id: 'examined', name: 'The authored life', color: ['#4A4D57', '#B4B8C6'],
    blurb: 'Who writes the self — and the traditions that answer differently.',
    stops: ['authenticity', 'self-authorship', 'arete', 'overcoming', 'anatta', 'compass']
  },
  {
    id: 'company', name: 'Interesting company', color: ['#B7791A', '#EDB453'],
    blurb: 'What makes someone genuinely good to talk to.',
    stops: ['questions', 'listening', 'curiosity', 'humor', 'storytelling', 'charisma']
  }
];
