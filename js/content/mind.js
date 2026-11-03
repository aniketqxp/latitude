// Region: Intellectual Character — curiosity, calibration, steelmanning, independence, taste.
export default [
  {
    id: 'curiosity', region: 'mind', title: 'The information gap', level: 'supported', mins: 6,
    tags: ['curiosity', 'learning', 'questions', 'attention'],
    kicker: 'Curiosity isn’t triggered by knowing nothing. It’s triggered by knowing a little.',
    q: 'Why does a half-told story itch?',
    related: [['questions', 'Curiosity in conversation.'], ['calibration', 'Curiosity is fed by noticing what you don’t know.'], ['practice', 'Curious learners practise more.'], ['taste', 'Curiosity broadens what you can appreciate.']],
    blocks: [
      { t: 'lede', text: 'George Loewenstein’s *information-gap theory* proposes that curiosity is a form of cognitive deprivation: it arises when we notice a gap between what we know and what we want to know. Too little knowledge, and there is no gap to notice. Too much, and the gap is closed.' },
      { t: 'viz', name: 'curiosity', label: 'Figure 15.', caption: 'Curiosity peaks at moderate confidence. Drag to adjust how much you think you know about a question.' },
      { t: 'evidence', level: 'supported', claim: 'Curiosity follows an inverted-U against confidence, and curious states enhance memory — even for incidental information.', note: 'Kang et al. (2009) found curiosity peaked at intermediate confidence for trivia answers. Gruber, Gelman & Ranganath (2014) showed that when curious, people better remembered unrelated faces shown during the wait — curiosity primes learning broadly.' },
      { t: 'p', text: 'This suggests a practical stance: to become more curious about a field, learn a little about it. Total ignorance is not fertile. A first map of a territory reveals its blank spaces — and blank spaces are what pull us in.' },
      { t: 'reflect', q: 'What subject do you know just enough about to want to know more?' }
    ],
    sources: ['Loewenstein, G. (1994). The psychology of curiosity. *Psychological Bulletin*, 116(1).', 'Kang, M. J. et al. (2009). The wick in the candle of learning. *Psychological Science*, 20(8).', 'Gruber, M. J., Gelman, B. D. & Ranganath, C. (2014). States of curiosity modulate hippocampus-dependent learning. *Neuron*, 84(2).']
  },
  {
    id: 'calibration', region: 'mind', title: 'Knowing what you know', level: 'robust', mins: 7,
    tags: ['overconfidence', 'forecasting', 'judgment', 'humility'],
    kicker: 'The most underrated form of confidence is being exactly as sure as the evidence allows.',
    q: 'When you say you’re 90% sure, are you right 90% of the time?',
    related: [['confidence', 'Calibration as a distinct form of confidence.'], ['steelman', 'Testing your views against their best opposition.'], ['independence', 'Calibrated thinkers update without caving.'], ['practice', 'Experts are calibrated only where feedback is fast.']],
    blocks: [
      { t: 'lede', text: 'Ask people for a range they are 90% sure contains the answer to a factual question, and the true answer falls outside it far more than 10% of the time. This *overprecision* is among the most robust biases in judgment research.' },
      { t: 'viz', name: 'calibrate', label: 'Figure 16.', caption: 'Give 90% confidence ranges for five quantities. A calibrated person would capture four or five.' },
      { t: 'evidence', level: 'robust', claim: 'People’s 90% confidence intervals typically contain the truth only 30–60% of the time.', note: 'Moore & Healy (2008) distinguish overestimation, overplacement and overprecision; overprecision is the most persistent. Found across experts and laypeople.' },
      { t: 'evidence', level: 'supported', claim: 'Calibration and forecasting accuracy can be trained.', note: 'In Philip Tetlock’s Good Judgment Project, brief training in probabilistic reasoning improved accuracy by around 10%. The best “superforecasters” were not geniuses but habitual updaters who broke problems down and kept score.' },
      { t: 'p', text: 'Kahneman and Klein, from opposite camps, agreed on when expert intuition can be trusted: in environments that are regular enough to learn, with fast, clear feedback. A chess player or firefighter may be well calibrated. A pundit or stock-picker rarely is, because the feedback is slow, noisy and easy to explain away.' },
      { t: 'steps', items: [['Say a number', 'Replace “probably” with “about 70%.” Vague words hide miscalibration.'], ['Widen your ranges', 'Your first range is almost certainly too narrow.'], ['Keep score', 'Write predictions down and check them. Memory flatters.'], ['Update in small steps', 'Good forecasters revise often, by modest amounts.']] }
    ],
    sources: ['Moore, D. A. & Healy, P. J. (2008). The trouble with overconfidence. *Psychological Review*, 115(2).', 'Tetlock, P. E. & Gardner, D. (2015). *Superforecasting*. Crown.', 'Kahneman, D. & Klein, G. (2009). Conditions for intuitive expertise. *American Psychologist*, 64(6).']
  },
  {
    id: 'steelman', region: 'mind', title: 'The steelman', level: 'interpretive', mins: 6,
    tags: ['argument', 'open-mindedness', 'disagreement', 'Mill'],
    kicker: 'You don’t understand your own view until you can state the best case against it.',
    q: 'Could you argue your opponent’s side well enough to satisfy them?',
    related: [['listening', 'Steelmanning begins with listening.'], ['calibration', 'Strong opposition tests your certainty.'], ['independence', 'Neither caving nor entrenching.'], ['persuasion', 'People are persuaded by those who understand them.']],
    blocks: [
      { t: 'lede', text: 'John Stuart Mill wrote in *On Liberty* that someone who knows only their own side of a case knows little even of that. The modern name for the remedy is the *steelman*: stating an opposing view in its strongest form before responding.' },
      { t: 'pull', text: 'He who knows only his own side of the case knows little of that.', cite: 'J. S. Mill, On Liberty (1859)' },
      { t: 'p', text: 'Philosopher Daniel Dennett proposed a version of this as “Rapoport’s rules”: first re-express the other person’s position so clearly that they say, “Thanks, I wish I’d put it that way.” Then list points of agreement and anything you learned. Only then rebut.' },
      { t: 'evidence', level: 'supported', claim: 'Reasoning works better in groups that argue than in individuals reasoning alone.', note: 'Mercier & Sperber’s argumentative theory of reasoning suggests we are poor at evaluating our own arguments but good at evaluating others’. Groups solving logic problems together perform far better than individuals (e.g. Moshman & Geil 1998).' },
      { t: 'thought', q: 'Pick a view you hold strongly. Write the best argument against it — one that someone who holds that view would recognise.', text: 'If you can’t, you’ve found something worth learning.' },
      { t: 'reflect', q: 'What is the strongest argument against something you believe?' }
    ],
    sources: ['Mill, J. S. (1859). *On Liberty*, ch. 2.', 'Dennett, D. C. (2013). *Intuition Pumps and Other Tools for Thinking*. Norton.', 'Mercier, H. & Sperber, D. (2017). *The Enigma of Reason*. Harvard University Press.']
  },
  {
    id: 'asch', region: 'mind', title: 'Going along', level: 'robust', mins: 6,
    tags: ['conformity', 'Asch', 'social pressure', 'dissent'],
    kicker: 'When a group says something obviously false, most people dissent — but almost everyone wavers at least once.',
    q: 'Would you contradict a room that’s plainly wrong?',
    related: [['norms', 'Private views often diverge from public behaviour.'], ['independence', 'What independence of mind requires.'], ['deviance', 'What happens to those who dissent.'], ['assertiveness', 'Speaking up in the moment.']],
    blocks: [
      { t: 'lede', text: 'In Solomon Asch’s 1950s studies, a participant sat among confederates judging which of three lines matched a reference line. The answer was obvious. On critical trials, the confederates unanimously gave the wrong one.' },
      { t: 'viz', name: 'asch', label: 'Figure 17.', caption: 'One trial. Answer before you hear the group, then see how the presence of a single ally changes things.' },
      { t: 'evidence', level: 'robust', claim: 'Participants conformed on about a third of critical trials; three-quarters conformed at least once.', note: 'Asch (1956). Often summarised as showing that people are sheep, but a quarter never conformed, and on two-thirds of trials people gave the correct answer despite the group.' },
      { t: 'evidence', level: 'robust', claim: 'A single dissenting ally dramatically reduces conformity.', note: 'When one confederate gave the correct answer, conformity fell by around three-quarters. The ally didn’t need to be correct — any break in unanimity helped.' },
      { t: 'p', text: 'This is the hopeful core of the conformity literature: unanimity is fragile. The first voice of dissent makes it much easier for others to follow. In settings from meetings to juries, being that first voice is a disproportionate contribution — as [[norms|pluralistic ignorance]] shows, many people may privately agree.' },
      { t: 'reflect', q: 'When did you last go along with something you privately thought was wrong? What would it have taken to say so?' }
    ],
    sources: ['Asch, S. E. (1956). Studies of independence and conformity. *Psychological Monographs*, 70(9).', 'Bond, R. & Smith, P. B. (1996). Culture and conformity: a meta-analysis. *Psychological Bulletin*, 119(1).']
  },
  {
    id: 'independence', region: 'mind', title: 'Independence of mind', level: 'interpretive', mins: 6,
    tags: ['independence', 'thinking', 'Emerson', 'contrarianism', 'autonomy'],
    kicker: 'Not believing what everyone believes is easy. Believing only what you have reasons for is hard.',
    q: 'How do you know which of your beliefs are actually yours?',
    related: [['asch', 'The experimental picture of social pressure.'], ['steelman', 'Engaging opposing views well.'], ['self-authorship', 'Holding self-authored values.'], ['calibration', 'Independence must be calibrated, not merely contrary.'], ['overcoming', 'Nietzsche on the free spirit.']],
    blocks: [
      { t: 'lede', text: '“Whoso would be a man must be a nonconformist,” wrote Emerson in *Self-Reliance*. But nonconformity can become its own conformity — the contrarian who predictably opposes whatever is popular is just as captured by the crowd, in reverse.' },
      { t: 'compare', a: { over: 'Looks like independence', title: 'Contrarianism', points: ['Position defined by opposition', 'Predictable from the mainstream view', 'Rarely updates', 'Treats being different as being right'] }, b: { over: 'Is independence', title: 'Autonomy of judgment', points: ['Position defined by reasons', 'Agrees with the crowd when the crowd is right', 'Updates on evidence', 'Can say “I don’t know”'] } },
      { t: 'p', text: 'True independence involves accepting that most of what you know comes from trusting others — experts, institutions, testimony. Nobody can verify everything personally. The independent mind is distinguished not by trusting no one, but by choosing whom to trust for good reasons, and noticing when that trust is no longer warranted.' },
      { t: 'evidence', level: 'interpretive', claim: 'Epistemic autonomy and epistemic dependence are not opposites.', note: 'Philosophers of testimony (e.g. Hardwig 1985, Goldman 2001) argue that rational dependence on experts is unavoidable; the question is how to evaluate sources one cannot fully check.' },
      { t: 'thought', q: 'List three beliefs you hold that most people around you share. For each: could you give the reasons, or only the source?', text: 'Neither answer is shameful. But knowing which is which is the beginning of independence.' }
    ],
    sources: ['Emerson, R. W. (1841). *Self-Reliance*.', 'Hardwig, J. (1985). Epistemic dependence. *Journal of Philosophy*, 82(7).', 'Goldman, A. I. (2001). Experts: which ones should you trust? *Philosophy and Phenomenological Research*, 63(1).']
  },
  {
    id: 'taste', region: 'mind', title: 'Can taste be educated?', level: 'interpretive', mins: 6,
    tags: ['taste', 'aesthetics', 'Hume', 'Bourdieu', 'culture'],
    kicker: 'Taste is part perception, part education, part social signal. Untangling them frees you to develop your own.',
    q: 'Is good taste just what rich people like?',
    related: [['style', 'Taste made visible on the body.'], ['curiosity', 'Exposure creates appreciation.'], ['sprezzatura', 'The social performance of refinement.'], ['independence', 'Having taste versus following it.']],
    blocks: [
      { t: 'lede', text: 'David Hume, in *Of the Standard of Taste* (1757), argued that although beauty is not a property of objects alone, some judges are better than others — through “delicacy” of perception, practice, comparison, freedom from prejudice and good sense.' },
      { t: 'voices', items: [{ who: 'Hume', view: 'Taste can be trained.', text: 'Expertise through practice and comparison makes some judgments more reliable. The true judges are rare, but their verdicts converge over time.' }, { who: 'Kant', view: 'Judgments of beauty claim universality.', text: 'When we call something beautiful we speak as if everyone should agree, even though no rule can compel them.' }, { who: 'Bourdieu', view: 'Taste classifies the classifier.', text: '*Distinction* (1979): preferences in art, food and dress function to mark social class. “Good taste” is often the taste of those with the cultural capital to define it.' }, { who: 'Synthesis', view: 'Both can be true.', text: 'Exposure and attention genuinely refine perception, *and* taste is used for social sorting. Knowing the second helps you pursue the first freely.' }] },
      { t: 'evidence', level: 'supported', claim: 'Repeated exposure tends to increase liking, and expertise changes what people perceive.', note: 'The mere exposure effect (Zajonc 1968) is well established, though moderated by complexity. Wine and art experts perceive distinctions novices miss, but also show strong context effects — expertise is real but not immune to framing.' },
      { t: 'reflect', q: 'What do you love that you were never taught to? What did you learn to love?' }
    ],
    sources: ['Hume, D. (1757). *Of the Standard of Taste*.', 'Bourdieu, P. (1979/1984). *Distinction: A Social Critique of the Judgement of Taste*.', 'Zajonc, R. B. (1968). Attitudinal effects of mere exposure. *JPSP*, 9(2).']
  }
];
