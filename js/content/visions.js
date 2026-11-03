// Region: Visions of Excellence — philosophical ideals of a life well lived.
export default [
  {
    id: 'compass', region: 'visions', title: 'A compass of ideals', level: 'interpretive', mins: 6,
    tags: ['philosophy', 'values', 'good life', 'traditions'],
    kicker: 'Every tradition that asked “what is an excellent human?” answered differently. Comparing them is a way to find your own answer.',
    q: 'Which vision of excellence pulls at you?',
    related: [['arete', 'Aristotle’s answer.'], ['stoa', 'The Stoics’ answer.'], ['junzi', 'Confucius’s answer.'], ['overcoming', 'Nietzsche’s answer.'], ['anatta', 'The Buddhist challenge to the question itself.'], ['self-authorship', 'Choosing among ideals.']],
    blocks: [
      { t: 'lede', text: 'Ideas about human excellence differ less in their virtues than in their emphasis. Some prize mastery over circumstance; others, harmony with others; others, the freedom to remake oneself; others, release from the self entirely.' },
      { t: 'viz', name: 'compass', label: 'Figure 22.', caption: 'Set the sliders to describe what you value. The compass shows which traditions sit nearest. It is a starting point for reading, not a verdict — nothing is sent anywhere.' },
      { t: 'p', text: 'These traditions are not a menu from which to pick one. Most thoughtful people end up with a personal synthesis — an Aristotelian sense of cultivated character, say, joined to a Stoic equanimity about outcomes and a Buddhist suspicion of ego. The aim of comparison is to make that synthesis conscious.' },
      { t: 'thought', q: 'If you were remembered for exemplifying one idea about how to live, which would you want it to be?', text: 'Then ask whether your current days are evidence for that idea.' },
      { t: 'reflect', q: 'Which tradition here seems most alien to you? What might it see that you don’t?' }
    ],
    sources: ['Hadot, P. (1995). *Philosophy as a Way of Life*. Blackwell.', 'Flanagan, O. (2017). *The Geography of Morals*. Oxford University Press.']
  },
  {
    id: 'arete', region: 'visions', title: 'Arete: excellence as habit', level: 'interpretive', mins: 7,
    tags: ['Aristotle', 'virtue', 'character', 'mean', 'flourishing'],
    kicker: 'For Aristotle, you become brave by doing brave things — and the virtue lies between two failures.',
    q: 'Is courage the opposite of fear?',
    related: [['habits', 'Aristotle’s ethics is fundamentally about habituation.'], ['rhetoric', 'His account of persuasion through character.'], ['assertiveness', 'Assertiveness as a mean between extremes.'], ['compass', 'Comparing visions of excellence.'], ['stoa', 'The Stoics radicalised his idea of virtue.']],
    blocks: [
      { t: 'lede', text: 'The Greek *arete* is usually translated “virtue,” but it originally meant excellence of any kind — the arete of a knife is to cut well. For Aristotle, human arete is excellence in the activities characteristic of a human being: reasoning, choosing, living with others.' },
      { t: 'viz', name: 'mean', label: 'Figure 23.', caption: 'The doctrine of the mean. Choose a virtue and slide between its deficiency and excess.' },
      { t: 'p', text: 'Two of Aristotle’s ideas remain strikingly modern. First: virtues are acquired by practice. “We become just by doing just acts, temperate by doing temperate acts, brave by doing brave acts.” Character is a set of [[habits]] of perception and response. Second: virtue lies at a *mean* relative to us — courage between cowardice and recklessness, generosity between stinginess and extravagance. The mean is not mediocrity; it is getting it right, which requires judgment (*phronesis*).' },
      { t: 'evidence', level: 'interpretive', claim: 'Aristotle’s virtue ethics is a philosophical framework, not an empirical theory — but parts of it echo modern findings.', note: 'The idea that character is built through repeated action resonates with research on [[change|personality change]] through behaviour. Inverted-U relationships, as with [[assertiveness]], are a modern rediscovery of the mean.' },
      { t: 'p', text: 'Aristotle’s aim was *eudaimonia* — not happiness as feeling, but flourishing as an activity: a life of excellent functioning, among friends, over a complete lifetime. It is not something you have, but something you do.' },
      { t: 'reflect', q: 'Pick a virtue you care about. Which direction do you tend to miss it — deficiency or excess?' }
    ],
    sources: ['Aristotle. *Nicomachean Ethics*, Books II and VI.', 'Kraut, R. (2022). Aristotle’s ethics. *Stanford Encyclopedia of Philosophy*.', 'MacIntyre, A. (1981). *After Virtue*. Notre Dame.']
  },
  {
    id: 'stoa', region: 'visions', title: 'The Stoic sorting', level: 'interpretive', mins: 7,
    tags: ['Stoicism', 'Epictetus', 'control', 'equanimity', 'resilience'],
    kicker: 'Some things are up to us and some are not. Almost everything follows from sorting them correctly.',
    q: 'What would change if you stopped trying to control the outcome?',
    related: [['reappraisal', 'CBT descends partly from Stoic ideas about judgment.'], ['flexibility', 'Acceptance, in a modern clinical form.'], ['walls', 'Sorting real walls from imagined ones.'], ['arete', 'Stoics held virtue to be the only true good.'], ['compass', 'Comparing visions of excellence.']],
    blocks: [
      { t: 'lede', text: 'Epictetus, born a slave in the first century, opens his *Handbook* with a division: “Some things are within our power, while others are not. Within our power are opinion, motivation, desire, aversion… Not within our power are our body, our property, reputation, office.”' },
      { t: 'viz', name: 'control', label: 'Figure 24.', caption: 'Sort the items into what is up to you, what is not, and what is partly both. Tap each to place it.' },
      { t: 'p', text: 'Modern readers often add a third category: things partly up to us. The Stoic move then is to *internalise the goal* — not “win the match” (not fully up to you) but “play as well as I can” (up to you). You still care about the outcome, but your equanimity doesn’t depend on it.' },
      { t: 'evidence', level: 'interpretive', claim: 'Stoicism directly influenced cognitive therapy.', note: 'Albert Ellis and Aaron Beck both cited Epictetus’s line, “People are disturbed not by things, but by the views they take of them.” The resemblance between Stoic practice and [[reappraisal|cognitive reappraisal]] is deliberate.' },
      { t: 'p', text: 'A misreading to avoid: Stoicism is not emotional suppression. The Stoics aimed to change the judgments that produce destructive passions, and they valued *eupatheiai* — good feelings such as joy and goodwill. Nor is it passivity: Marcus Aurelius governed an empire and Seneca worked in politics.' },
      { t: 'reflect', q: 'What are you currently anxious about? Which part of it is genuinely up to you?' }
    ],
    sources: ['Epictetus. *Enchiridion*, 1 and 5.', 'Marcus Aurelius. *Meditations*.', 'Robertson, D. (2019). *The Philosophy of Cognitive-Behavioural Therapy* (2nd ed.). Routledge.']
  },
  {
    id: 'overcoming', region: 'visions', title: 'Become who you are', level: 'interpretive', mins: 7,
    tags: ['Nietzsche', 'self-overcoming', 'style', 'creativity', 'values'],
    kicker: 'Nietzsche’s challenge: give style to your character — and make your life something you would will to repeat.',
    q: 'Would you live this exact life again, infinitely?',
    related: [['authenticity', 'Self-creation versus self-discovery.'], ['self-authorship', 'Writing your own values.'], ['independence', 'The free spirit.'], ['compass', 'Comparing visions of excellence.'], ['anatta', 'A radically different view of the self.']],
    blocks: [
      { t: 'lede', text: 'Friedrich Nietzsche borrowed Pindar’s phrase “Become who you are” as a subtitle for his late autobiography. He did not mean “discover your hidden true self.” He meant something closer to: shape the raw material you are into a coherent work.' },
      { t: 'pull', text: 'One thing is needful: to “give style” to one’s character — a great and rare art!', cite: 'Nietzsche, The Gay Science §290' },
      { t: 'p', text: 'In §290 of *The Gay Science*, Nietzsche describes someone who surveys the strengths and weaknesses of their nature and fits them into an artistic plan, until even the weaknesses delight the eye. Not by eliminating them, but by integrating them into a style.' },
      { t: 'p', text: 'His thought experiment of *eternal recurrence* asks: if a demon told you that you must live your life again, every pain and joy in the same order, forever — would you curse him, or call it divine? Nietzsche used it as a test of affirmation: a way of asking whether you are living a life you can fully say yes to.' },
      { t: 'evidence', level: 'interpretive', claim: 'Nietzsche is often misread as advocating domination or nihilism.', note: 'His “will to power” is primarily about self-overcoming and creative growth; his diagnosis of nihilism was something he sought to overcome, not endorse. The Nazi appropriation relied substantially on his sister’s edits of his notes.' },
      { t: 'thought', q: 'Imagine the demon’s offer. Which parts of your current life would you be glad to repeat, and which would you change now that you know they’d recur?', text: 'Nietzsche wanted the question to be a lever, not a judgment.' }
    ],
    sources: ['Nietzsche, F. (1882). *The Gay Science*, §§290, 341.', 'Nietzsche, F. (1888). *Ecce Homo*.', 'Nehamas, A. (1985). *Nietzsche: Life as Literature*. Harvard University Press.']
  },
  {
    id: 'junzi', region: 'visions', title: 'The exemplary person', level: 'interpretive', mins: 6,
    tags: ['Confucius', 'junzi', 'ritual', 'relationships', 'cultivation'],
    kicker: 'In Confucian thought, excellence is relational: you become fully human through how you treat others.',
    q: 'Can courtesy be a form of moral cultivation?',
    related: [['sprezzatura', 'Practice until propriety becomes natural.'], ['warmth', 'Ren — humaneness — at the centre.'], ['arete', 'Another account of cultivated character.'], ['compass', 'Comparing visions of excellence.'], ['listening', 'Attentiveness to others as a discipline.']],
    blocks: [
      { t: 'lede', text: 'Confucius’s *junzi* — often translated “gentleman” or “exemplary person” — was originally a term for nobility of birth. Confucius redefined it as nobility of character, attainable by anyone through learning and self-cultivation.' },
      { t: 'pull', text: 'In ancient times people learned for the sake of themselves; nowadays they learn for the sake of others.', cite: 'Analects 14.24' },
      { t: 'p', text: 'That line, often puzzling at first, distinguishes learning to transform oneself from learning to impress. The *junzi* cultivates *ren* (humaneness, care for others) through *li* (ritual propriety) — not empty etiquette, but the forms of respect that shape attention and feeling through practice.' },
      { t: 'compare', a: { over: 'Exemplary person (junzi)', title: 'Seeks within', points: ['Concerned with what is right', 'Harmonious but not conforming', 'Ashamed when words exceed deeds', 'Learns for self-transformation'] }, b: { over: 'Petty person (xiaoren)', title: 'Seeks from others', points: ['Concerned with profit', 'Conforming but not harmonious', 'Speaks more than acts', 'Learns to be seen as learned'] } },
      { t: 'evidence', level: 'interpretive', claim: 'Confucian ethics is often read as rigidly hierarchical; that is partly but not wholly accurate.', note: 'Confucius endorsed relational roles but also remonstration with rulers, and redefined nobility by virtue. Contemporary scholars (e.g. Ames & Rosemont) emphasise role ethics as cultivated responsiveness rather than obedience.' },
      { t: 'reflect', q: 'Which of your everyday courtesies are empty, and which actually shape how you attend to people?' }
    ],
    sources: ['Confucius. *Analects*, esp. 2.4, 13.23, 14.24.', 'Ames, R. T. & Rosemont, H. (1998). *The Analects of Confucius: A Philosophical Translation*. Ballantine.', 'Ivanhoe, P. J. (2000). *Confucian Moral Self Cultivation*. Hackett.']
  },
  {
    id: 'anatta', region: 'visions', title: 'The self as process', level: 'interpretive', mins: 7,
    tags: ['Buddhism', 'non-self', 'anatta', 'ego', 'self-consciousness'],
    kicker: 'What if much of the pain of being seen depends on a self that, looked at closely, is hard to find?',
    q: 'Who exactly is embarrassed?',
    related: [['spotlight', 'The self as the centre of attention.'], ['shame', 'Shame depends on a self to condemn.'], ['authenticity', 'What does it mean to be true to a process?'], ['compass', 'Comparing visions of excellence.'], ['flexibility', 'ACT’s “self-as-context” borrows from contemplative traditions.']],
    blocks: [
      { t: 'lede', text: 'The Buddhist teaching of *anattā* (non-self) holds that none of the components of experience — body, feelings, perceptions, mental formations, consciousness — is a permanent, unchanging self. What we call “I” is a process, not a thing.' },
      { t: 'p', text: 'In the *Anattalakkhaṇa Sutta*, the Buddha examines each component in turn and asks: is it permanent? Is it under complete control? If not, is it fitting to regard it as “this is mine, this is I, this is my self”? The teaching is offered as a means to freedom from suffering — especially the suffering of clinging and defending.' },
      { t: 'evidence', level: 'interpretive', claim: 'Non-self is a philosophical and contemplative claim, but it has intriguing echoes in psychology and neuroscience.', note: 'Philosophers such as Hume (the self as a “bundle of perceptions”) and Derek Parfit reached similar conclusions independently. Research on self-referential processing and meditation is active but preliminary.' },
      { t: 'p', text: 'Read practically, it suggests a shift in where attention rests. Much self-consciousness involves treating the self as an object constantly under evaluation. Seeing the self as a changing process — this mood, this sensation, this thought, arising and passing — can loosen the grip of the verdict. Embarrassment then happens *in* you, rather than happening *to* a fixed you.' },
      { t: 'voices', items: [{ who: 'Theravāda', view: 'No permanent self in any aggregate.', text: 'Insight into anattā is one of the three marks of existence, alongside impermanence and unsatisfactoriness.' }, { who: 'Hume', view: 'A bundle of perceptions.', text: '“When I enter most intimately into what I call myself, I always stumble on some particular perception or other.”' }, { who: 'Psychology', view: 'A self-model, constantly updated.', text: 'The self as a construct the mind builds and revises, not a hidden entity.' }] },
      { t: 'thought', q: 'Right now, try to find the one who is reading. Is it the eyes, the thoughts, the sense of “me”? Where does it stop?', text: 'You don’t have to come to any conclusion. Just notice what happens to self-consciousness while you look.' }
    ],
    sources: ['*Anattalakkhaṇa Sutta*, Saṃyutta Nikāya 22.59.', 'Hume, D. (1739). *A Treatise of Human Nature*, I.iv.6.', 'Siderits, M. (2007). *Buddhism as Philosophy*. Hackett.', 'Parfit, D. (1984). *Reasons and Persons*, Part III.']
  }
];
