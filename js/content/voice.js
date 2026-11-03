// Region: Voice & Presence — body language, voice, story, rhetoric.
export default [
  {
    id: 'body-language', region: 'voice', title: 'What bodies actually say', level: 'myth', mins: 8,
    tags: ['body language', 'nonverbal', 'power posing', 'Mehrabian', 'lie detection'],
    kicker: 'Nonverbal communication is real and powerful. Most popular “decoding” of it is not.',
    q: 'Do crossed arms really mean someone is defensive?',
    related: [['voice', 'Your voice carries more of your mind than your face.'], ['transparency', 'Others read less from you than you fear.'], ['faces', 'How fast — and how wrongly — we judge faces.'], ['confidence', 'What confidence really is, under the posture.'], ['calibration', 'Lie-detection is a case study in overconfidence.']],
    blocks: [
      { t: 'lede', text: 'Few areas of pop psychology are as full of confident nonsense as body language. Some of it rests on real but narrow findings stretched beyond recognition. Some has been tested directly and failed.' },
      { t: 'viz', name: 'mehrabian', label: 'Figure 12.', caption: 'The famous “7–38–55” rule. Tap to see what Mehrabian’s experiments actually involved — and what he says about how the numbers are used.' },
      { t: 'myths', items: [['“93% of communication is nonverbal.”', 'Mehrabian’s 1967 studies used single words spoken in a tone that conflicted with their meaning, and measured only judgments of liking. He has repeatedly said the figures do not apply to communication in general.'], ['“Crossed arms mean defensiveness.”', 'Single gestures have many causes (cold, comfort, habit). No reliable dictionary maps postures to meanings.'], ['“Liars avoid eye contact.”', 'Meta-analyses find cues to deception are faint and unreliable; people detect lies at around 54% — barely above chance (Bond & DePaulo 2006).'], ['“Power posing raises testosterone and confidence.”', 'The hormonal effects failed to replicate (Ranehill et al. 2015). A small effect on *feeling* powerful may remain; effects on behaviour are unsupported.']] },
      { t: 'evidence', level: 'myth', claim: 'Two minutes of expansive “power poses” changes hormone levels and risk-taking.', note: 'Carney, Cuddy & Yap (2010) reported these effects; a larger replication (Ranehill et al. 2015, n = 200) found no hormonal or behavioural effects. Carney later stated she no longer believes the effects are real. Later meta-analytic work suggests a small effect on self-reported feelings of power only.' },
      { t: 'evidence', level: 'robust', claim: 'Yet people do form surprisingly accurate impressions from brief nonverbal “thin slices.”', note: 'Ambady & Rosenthal (1993): ratings of 30-second silent clips of teachers predicted end-of-term student evaluations. Accuracy is real for broad impressions — warmth, enthusiasm — not for decoding specific hidden thoughts.' },
      { t: 'p', text: 'The useful lesson is about *gestalt*, not gestures. Observers pick up on overall energy, engagement and ease from the whole person in context. Trying to perform specific “confident” postures tends to look like what it is: a performance. Attending fully to the conversation tends to produce the right signals on its own.' },
      { t: 'reflect', q: 'Is there a “rule” about body language you have been following — or judging others by? Where did you learn it?' }
    ],
    sources: ['Mehrabian, A. & Wiener, M. (1967). Decoding of inconsistent communications. *JPSP*, 6(1).', 'Ranehill, E. et al. (2015). Assessing the robustness of power posing. *Psychological Science*, 26(5).', 'Bond, C. F. & DePaulo, B. M. (2006). Accuracy of deception judgments. *Personality and Social Psychology Review*, 10(3).', 'Ambady, N. & Rosenthal, R. (1993). Half a minute. *JPSP*, 64(3).']
  },
  {
    id: 'voice', region: 'voice', title: 'The sound of a mind', level: 'supported', mins: 6,
    tags: ['voice', 'speaking', 'job interviews', 'presence'],
    kicker: 'Hearing someone’s reasoning makes them seem more thoughtful than reading the same words.',
    q: 'Should you write that pitch — or say it?',
    related: [['rhetoric', 'The architecture of what you say.'], ['body-language', 'The voice carries more than the body.'], ['transparency', 'You hear yourself very differently than others do.'], ['storytelling', 'Voices bring stories to life.']],
    blocks: [
      { t: 'lede', text: 'Juliana Schroeder and Nicholas Epley had MBA students make job pitches, then gave evaluators either the transcript or an audio recording. Same words. Different mind perceived.' },
      { t: 'evidence', level: 'supported', claim: 'Evaluators who heard a pitch rated the candidate as more competent, thoughtful and intelligent — and were more interested in hiring them — than those who read the identical text.', note: 'Schroeder & Epley (2015), *Psychological Science*. Adding video didn’t improve on audio alone. Paralinguistic cues — variation in pitch, pace and volume — appear to convey thinking itself.' },
      { t: 'p', text: 'This suggests a counterintuitive principle for disagreements and applications alike: where possible, let people *hear* you. Schroeder later found that people seemed more human and less dismissible when their opposing political views were heard rather than read.' },
      { t: 'steps', items: [['Vary your pitch', 'Monotone delivery strips the cues that convey thought.'], ['Use pauses', 'A pause before a key point signals it matters, and lets you think.'], ['Slow down for the important bits', 'Pace changes mark structure.'], ['Record yourself once', 'Your voice sounds strange to you because you normally hear it through bone conduction. Others are used to the recorded version.']] },
      { t: 'reflect', q: 'When did a message you wrote get misread in a way that wouldn’t have happened if you’d said it?' }
    ],
    sources: ['Schroeder, J. & Epley, N. (2015). The sound of intellect. *Psychological Science*, 26(6).', 'Schroeder, J., Kardas, M. & Epley, N. (2017). The humanizing voice. *Psychological Science*, 28(12).']
  },
  {
    id: 'storytelling', region: 'voice', title: 'The shape of a story', level: 'supported', mins: 7,
    tags: ['storytelling', 'narrative', 'persuasion', 'memory'],
    kicker: 'Stories are not decoration on an argument. They are a different way of reaching a mind.',
    q: 'Why do people remember stories long after they forget the facts?',
    related: [['rhetoric', 'Story is one of rhetoric’s oldest tools.'], ['persuasion', 'Narrative persuades by transporting, not arguing.'], ['charisma', 'Charismatic speakers tell stories.'], ['humor', 'Most real humour is storytelling.']],
    blocks: [
      { t: 'lede', text: 'Kurt Vonnegut joked that stories have shapes you could draw on graph paper. In 2016, a team analysing over 1,700 novels found that most emotional trajectories do cluster into a handful of shapes.' },
      { t: 'viz', name: 'arcs', label: 'Figure 13.', caption: 'Six core arcs found in Project Gutenberg fiction (Reagan et al. 2016). Tap each to see an example.' },
      { t: 'evidence', level: 'supported', claim: 'Being “transported” into a narrative reduces counter-arguing and can shift beliefs.', note: 'Green & Brock (2000) introduced transportation theory; meta-analyses (van Laer et al. 2014) find transportation predicts story-consistent attitudes. Stories persuade partly by absorbing attention that would otherwise generate objections.' },
      { t: 'evidence', level: 'supported', claim: 'When someone tells a story, listeners’ brain activity can align with the speaker’s — and more alignment predicts better comprehension.', note: 'Stephens, Silbert & Hasson (2010). A small fMRI study, but consistent with later work on neural coupling during narrative.' },
      { t: 'steps', items: [['Start in motion', 'Begin at a moment of change, not with background.'], ['Name a want and an obstacle', 'Stories run on someone wanting something and being blocked.'], ['Use the concrete detail', 'One specific detail (the smell of the hospital corridor) beats three abstractions.'], ['Let the turn carry the point', 'Don’t explain the moral at length; the change in the story is the meaning.']] },
      { t: 'reflect', q: 'What story do you tell most often about yourself? What shape is it?' }
    ],
    sources: ['Reagan, A. J. et al. (2016). The emotional arcs of stories are dominated by six basic shapes. *EPJ Data Science*, 5.', 'Green, M. C. & Brock, T. C. (2000). The role of transportation in the persuasiveness of public narratives. *JPSP*, 79(5).', 'Stephens, G. J., Silbert, L. J. & Hasson, U. (2010). Speaker–listener neural coupling. *PNAS*, 107(32).']
  },
  {
    id: 'rhetoric', region: 'voice', title: 'Ethos, pathos, logos', level: 'interpretive', mins: 6,
    tags: ['rhetoric', 'Aristotle', 'public speaking', 'persuasion'],
    kicker: 'Aristotle’s three modes of persuasion are 2,300 years old and still the best map of a speech.',
    q: 'Why do good arguments so often lose?',
    related: [['persuasion', 'What modern research adds to the classical account.'], ['charisma', 'Charismatic tactics are rhetoric in practice.'], ['storytelling', 'Pathos often travels by story.'], ['arete', 'Aristotle’s ethics and rhetoric share a vision of character.']],
    blocks: [
      { t: 'lede', text: 'In the *Rhetoric*, Aristotle argued that persuasion has three sources: the character of the speaker (**ethos**), the emotions of the audience (**pathos**), and the argument itself (**logos**). He thought ethos might be the most powerful of all.' },
      { t: 'viz', name: 'rhetoric', label: 'Figure 14.', caption: 'Balance the three appeals. Too much of one, and the speech tips into a familiar failure mode.' },
      { t: 'p', text: 'Aristotle did not mean ethos as reputation. He meant character as *displayed in the speech*: practical wisdom (phronesis), virtue (arete), and goodwill toward the audience (eunoia). Remarkably, this triad maps closely onto the modern [[warmth|warmth–competence]] model — goodwill is warmth; practical wisdom is competence.' },
      { t: 'evidence', level: 'interpretive', claim: 'Aristotle’s framework is a philosophical analysis, not an empirical finding — but modern research has repeatedly rediscovered its distinctions.', note: 'Source credibility research, emotion in persuasion, and argument-quality effects in the [[persuasion|elaboration likelihood model]] each correspond to one appeal.' },
      { t: 'reflect', q: 'Think of the last time you failed to persuade someone with a good argument. Which appeal was missing?' }
    ],
    sources: ['Aristotle. *Rhetoric*, Book I.2 and II.1.', 'Garver, E. (1994). *Aristotle’s Rhetoric: An Art of Character*. University of Chicago Press.']
  }
];
