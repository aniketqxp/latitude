// Region: Self-Authorship — confidence, identity, authenticity, change.
export default [
  {
    id: 'efficacy', region: 'self', title: 'Where belief comes from', level: 'robust', mins: 7,
    tags: ['confidence', 'self-efficacy', 'Bandura', 'skill'],
    kicker: 'Confidence that lasts is not a mood you install. It is a conclusion you draw from evidence.',
    q: 'Can you talk yourself into believing you can do something?',
    related: [['confidence', 'Why “just be confident” fails, and what confidence actually tracks.'], ['practice', 'Mastery experiences are made by deliberate practice.'], ['ladder', 'Graded steps produce exactly the evidence efficacy needs.'], ['arousal', 'How you read your racing heart is one of the four sources.'], ['calibration', 'Belief should track ability, not outrun it.']],
    blocks: [
      { t: 'lede', text: 'In 1977 Albert Bandura proposed that people’s belief in their ability to execute a specific task — *self-efficacy* — predicts whether they try, how hard they try and how long they persist. Crucially, it is domain-specific. You can have high efficacy for cooking and none for public speaking.' },
      { t: 'p', text: 'Bandura described four sources of efficacy beliefs, and they are not equally powerful.' },
      { t: 'viz', name: 'efficacy', label: 'Figure 4.', caption: 'The four sources, roughly ordered by strength. Tap each to see how it works and what weakens it.' },
      { t: 'evidence', level: 'robust', claim: 'Self-efficacy predicts performance and persistence across domains from health behaviour to academic achievement to sport.', note: 'Meta-analyses (e.g. Stajkovic & Luthans 1998, r ≈ .38 with work performance) support the link, though some of it reflects past performance shaping belief rather than belief causing performance. The arrow runs both ways.' },
      { t: 'p', text: 'The practical upshot is strong: *mastery experiences* — succeeding at a challenge that was hard for you — are the most potent source. Affirmations and pep talks (verbal persuasion) help a little but fade quickly if experience contradicts them. This is why carefully graded steps work: each rung of a [[ladder]] is designed to be a winnable experiment.' },
      { t: 'predict', q: 'Which is likely to produce the most durable boost to someone’s belief they can give a talk?', options: ['A mentor telling them they are a natural', 'Watching a similar peer give a good talk', 'Giving three short, slightly harder talks to friendly audiences', 'Repeating “I am a confident speaker” every morning'], answer: 2, explain: 'Mastery experience is the strongest source, especially when the person attributes success to their own effort rather than luck. Watching a similar peer (vicarious experience) is the next strongest.' },
      { t: 'pull', text: 'Belief built on evidence survives setbacks. Belief built on slogans breaks at the first one.' },
      { t: 'reflect', q: 'In what domain did you once lack confidence and now have it? What actually changed?' }
    ],
    sources: ['Bandura, A. (1977). Self-efficacy: toward a unifying theory of behavioral change. *Psychological Review*, 84(2).', 'Bandura, A. (1997). *Self-Efficacy: The Exercise of Control*. Freeman.', 'Stajkovic, A. D. & Luthans, F. (1998). Self-efficacy and work-related performance: a meta-analysis. *Psychological Bulletin*, 124(2).']
  },
  {
    id: 'confidence', region: 'self', title: 'Confidence, unbundled', level: 'supported', mins: 7,
    tags: ['confidence', 'self-esteem', 'overconfidence', 'humility'],
    kicker: '“Confidence” names at least four different things. Mixing them up produces bad advice.',
    q: 'Is confidence a trait you have or a judgment you make?',
    related: [['efficacy', 'Task-specific confidence and where it comes from.'], ['calibration', 'The most underrated form of confidence: accurately knowing what you know.'], ['self-compassion', 'A steadier base than self-esteem.'], ['spotlight', 'Much self-consciousness is miscalculation about attention.'], ['charisma', 'What “presence” actually consists of.']],
    blocks: [
      { t: 'lede', text: 'When people say they want to be more confident, they might mean very different things: to feel worthy, to believe they can do a task, to seem assured to others, or to be willing to act without certainty. These come apart, and the research on each says something different.' },
      { t: 'compare', a: { over: 'Inside', title: 'What you believe', points: ['**Self-esteem** — global sense of worth', '**Self-efficacy** — task-specific capability ([[efficacy]])', '**Calibration** — how well your certainty matches reality ([[calibration]])'] }, b: { over: 'Outside', title: 'What you do and show', points: ['**Assurance** — composure under observation', '**Decisiveness** — acting despite incomplete information', '**Ease** — absence of visible strain ([[sprezzatura]])'] } },
      { t: 'evidence', level: 'mixed', claim: 'Raising self-esteem directly does not reliably improve performance, relationships or health.', note: 'Baumeister, Campbell, Krueger & Vohs (2003) reviewed the evidence for the self-esteem movement and found modest correlations, mostly explained by success raising self-esteem rather than the reverse. High self-esteem predicted happiness and initiative, but also some risky behaviour.' },
      { t: 'p', text: 'The forms that most consistently help are *specific* and *grounded*: believing you can do this particular thing because you have evidence, and being able to tolerate the discomfort of not yet being sure. Global self-esteem tends to follow from a life of meeting challenges, not the other way round.' },
      { t: 'myths', items: [['“Fake it till you make it.”', 'Partly true in a narrow sense — acting before you feel ready lets you collect mastery evidence. False if it means projecting certainty you don’t have; overconfidence damages trust once discovered.'], ['“Confident people don’t feel nervous.”', 'Experienced performers commonly report strong pre-performance arousal. What differs is interpretation (see [[arousal]]).'], ['“Power poses make you confident.”', 'The hormonal claims failed replication; see [[body-language]].']] },
      { t: 'evidence', level: 'supported', claim: 'Overconfident people are often granted status initially — but the effect depends on not being exposed.', note: 'Anderson et al. (2012) found overconfidence earned status in groups; later work (Kennedy, Anderson & Moore 2013) found the penalty when overconfidence was revealed was smaller than expected, though real. Calibration remains the safer long-run strategy for trust.' },
      { t: 'thought', q: 'Picture the most genuinely self-assured person you know. Which of the six forms above do they actually have?', text: 'Often it is ease and calibration — knowing exactly what they know — rather than loudness.' }
    ],
    sources: ['Baumeister, R. F., Campbell, J. D., Krueger, J. I. & Vohs, K. D. (2003). Does high self-esteem cause better performance…? *Psychological Science in the Public Interest*, 4(1).', 'Anderson, C., Brion, S., Moore, D. A. & Kennedy, J. A. (2012). A status-enhancement account of overconfidence. *JPSP*, 103(4).', 'Kennedy, J. A., Anderson, C. & Moore, D. A. (2013). When overconfidence is revealed to others. *OBHDP*, 122(2).']
  },
  {
    id: 'authenticity', region: 'self', title: 'The authenticity paradox', level: 'mixed', mins: 7,
    tags: ['authenticity', 'identity', 'personality', 'growth'],
    kicker: 'If you only ever act like yourself, how would you ever become anyone else?',
    q: 'Is acting out of character a betrayal, or how character grows?',
    related: [['self-authorship', 'Authenticity as authorship rather than discovery.'], ['change', 'Personality changes more than most people think.'], ['anatta', 'A tradition that questions whether there is a fixed self to be true to.'], ['overcoming', 'Nietzsche’s “become who you are.”'], ['style', 'Wearing a new self before you feel like it.']],
    blocks: [
      { t: 'lede', text: '“Just be yourself” assumes a self already exists, fully formed, waiting to be expressed. But people often feel most authentic when acting in ways they would not have predicted of themselves.' },
      { t: 'evidence', level: 'supported', claim: 'People tend to report feeling most authentic when they act extraverted, conscientious and emotionally stable — regardless of their trait levels.', note: 'Fleeson & Wilt (2010) and others using experience-sampling found that state authenticity tracks these “positive” states even among introverts. Interpretations differ: it may reflect cultural ideals, or that these states feel good, rather than a hidden true self.' },
      { t: 'p', text: 'Herminia Ibarra describes an “authenticity trap”: leaders who stick rigidly to what feels natural can fail to grow into new roles. She argues for *playful* trying-on of styles borrowed from others, keeping what fits. The self is less a thing discovered than a thing iteratively made.' },
      { t: 'voices', items: [{ who: 'Romantic view', view: 'There is an inner core; be loyal to it.', text: 'Rousseau and later Romantics located authenticity in uncorrupted feeling, prior to social mask.' }, { who: 'Existentialist view', view: 'There is no core; you are your choices.', text: 'Sartre: existence precedes essence. Authenticity is owning that you choose, rather than hiding behind “that’s just how I am.”' }, { who: 'Developmental view', view: 'The self is a story you increasingly author.', text: 'Kegan and Baxter Magolda (see [[self-authorship]]): maturity is moving from being written by others’ expectations to writing your own.' }, { who: 'Buddhist view', view: 'The self you’re trying to be true to is a process, not an entity.', text: 'See [[anatta|anattā]]. Authenticity becomes about clear seeing rather than self-expression.' }] },
      { t: 'p', text: 'One workable synthesis: be faithful to your *values* while being experimental with your *behaviours*. Trying a new way of speaking or dressing isn’t fakeness if it serves something you genuinely care about.' },
      { t: 'reflect', q: 'When did doing something “unlike you” end up feeling more like you than what came before?' }
    ],
    sources: ['Fleeson, W. & Wilt, J. (2010). The relevance of Big Five trait content in behavior to subjective authenticity. *Journal of Personality*, 78(4).', 'Ibarra, H. (2015). The authenticity paradox. *Harvard Business Review*, Jan–Feb.', 'Sartre, J.-P. (1946). *Existentialism Is a Humanism*.']
  },
  {
    id: 'self-authorship', region: 'self', title: 'Writing your own rules', level: 'framework', mins: 8,
    tags: ['development', 'Kegan', 'identity', 'values', 'autonomy'],
    kicker: 'Most adults never notice the moment their values stop being inherited and start being chosen. Some never reach it.',
    q: 'Whose voice is it when you tell yourself what you should do?',
    related: [['authenticity', 'The self as something made, not merely found.'], ['independence', 'Holding views because you evaluated them.'], ['compass', 'Comparing ideals of a good life.'], ['stoa', 'An ancient programme for governing your own judgments.'], ['walls', 'Inherited rules are often the walls we never examined.']],
    blocks: [
      { t: 'lede', text: 'Developmental psychologist Robert Kegan proposed that adults can move through qualitatively different ways of making meaning. The key shift is in what you are *subject to* — embedded in, unable to see — versus what you can hold as *object*, look at and reshape.' },
      { t: 'viz', name: 'kegan', label: 'Figure 5.', caption: 'Three adult orders of mind. Tap each to see what a person at that stage can and cannot step back from.' },
      { t: 'p', text: 'At the *socialized* stage, a person’s sense of self is constituted by the expectations of others and the groups they belong to: conflict between two valued authorities feels like being torn apart. At the *self-authoring* stage, the person has an internal compass that can evaluate those expectations — accepting some, rejecting others. Marcia Baxter Magolda, studying people longitudinally through their twenties and thirties, described the passage between them as a “crossroads” when external formulas stop working.' },
      { t: 'evidence', level: 'framework', claim: 'Kegan’s stages are a theoretical framework with some empirical support, not a precisely measured ladder.', note: 'The Subject-Object Interview has reasonable reliability in trained hands, and longitudinal work (e.g. Kegan, Lahey, Baxter Magolda) is consistent with the model. But samples are small, and stage models in general risk implying a hierarchy of human worth. Use it as a lens, not a ranking.' },
      { t: 'steps', items: [['Notice the “should”', 'When you feel you should do something, ask: who first said so?'], ['Interview the rule', 'What was it protecting? Does that still apply?'], ['Keep, revise or retire it', 'Self-authorship doesn’t mean rejecting inheritance — many inherited values survive examination and become truly yours.'], ['Hold your own rules lightly too', 'Kegan’s rarer fifth order sees even one’s self-authored system as partial.']] },
      { t: 'thought', q: 'Imagine your parents, your profession and your closest friends all disagreed with a choice you believed was right. What would you rely on to decide?', text: 'Whatever that resource is — principle, evidence, intuition, tradition — it is the beginning of an internal compass.' },
      { t: 'reflect', q: 'Name a value you hold that you have actually examined, and one you have not.' }
    ],
    sources: ['Kegan, R. (1994). *In Over Our Heads: The Mental Demands of Modern Life*. Harvard University Press.', 'Baxter Magolda, M. B. (2001). *Making Their Own Way*. Stylus.', 'Kegan, R. & Lahey, L. L. (2009). *Immunity to Change*. Harvard Business Press.']
  },
  {
    id: 'change', region: 'self', title: 'Personality is not fixed', level: 'supported', mins: 6,
    tags: ['personality', 'change', 'growth', 'Big Five'],
    kicker: 'Traits are stable enough to describe you and plastic enough to change — especially if you want them to.',
    q: 'Could you become noticeably more outgoing, calm or disciplined in a year?',
    related: [['authenticity', 'Changing yourself without feeling fake.'], ['habits', 'The mechanics of behaviour change.'], ['mindset', 'What the growth-mindset research does and doesn’t show.'], ['if-then', 'A concrete technique with strong evidence.']],
    blocks: [
      { t: 'lede', text: 'The Big Five traits — openness, conscientiousness, extraversion, agreeableness, neuroticism — are moderately stable across adulthood. But “moderately” hides real movement: on average people become more conscientious, agreeable and emotionally stable from adolescence into middle age.' },
      { t: 'evidence', level: 'supported', claim: 'Psychological interventions produce meaningful personality change, especially reductions in neuroticism, within weeks.', note: 'Roberts et al. (2017) meta-analysed 207 intervention studies: an average change of about half a standard deviation in emotional stability, largely maintained at follow-up. Most of these interventions targeted anxiety or depression, not personality itself.' },
      { t: 'evidence', level: 'mixed', claim: 'People who *want* to change a trait can do so, with modest effects — but wanting alone is not enough.', note: 'Hudson & Fraley (2015) found that change goals predicted trait change over 16 weeks, particularly with concrete implementation plans. Later work (Hudson et al. 2019) found change depended on actually doing the trait-relevant behaviours, not merely aspiring.' },
      { t: 'p', text: 'The working mechanism appears to be state-to-trait: repeatedly *acting* in a trait-consistent way (initiating conversations, finishing tasks) gradually shifts both habits and self-concept. This is where [[habits]] and [[if-then]] plans meet personality.' },
      { t: 'reflect', q: 'If you were deliberately to shift one trait by a small amount, which would you choose, and what behaviour would be its first expression?' }
    ],
    sources: ['Roberts, B. W. et al. (2017). A systematic review of personality trait change through intervention. *Psychological Bulletin*, 143(2).', 'Hudson, N. W. & Fraley, R. C. (2015). Volitional personality trait change. *JPSP*, 109(3).', 'Roberts, B. W., Walton, K. E. & Viechtbauer, W. (2006). Patterns of mean-level change in personality traits across the life course. *Psychological Bulletin*, 132(1).']
  },
  {
    id: 'mindset', region: 'self', title: 'Mindsets, measured', level: 'mixed', mins: 6,
    tags: ['growth mindset', 'Dweck', 'replication', 'learning'],
    kicker: 'The idea that ability can grow is true. The idea that believing so transforms outcomes is far smaller than advertised.',
    q: 'Does believing you can improve actually make you improve?',
    related: [['change', 'Traits can change — the evidence is stronger there.'], ['practice', 'Improvement depends mostly on how you practise.'], ['willpower', 'Another famous finding that shrank on replication.'], ['efficacy', 'Specific beliefs, grounded in evidence, predict more.']],
    blocks: [
      { t: 'lede', text: 'Carol Dweck’s research distinguished people who see ability as fixed from those who see it as growable, and linked the latter to persistence after failure. The idea spread into classrooms worldwide. Then came the large replications.' },
      { t: 'evidence', level: 'mixed', claim: 'Growth-mindset interventions have small average effects on academic achievement, concentrated in students at risk.', note: 'Sisk et al. (2018) meta-analysis: overall effect d ≈ 0.08. The US National Study of Learning Mindsets (Yeager et al. 2019, n ≈ 12,000) found a small improvement in grades among lower-achieving students, larger where peer norms supported challenge-seeking.' },
      { t: 'p', text: 'That is not nothing — a cheap, brief intervention that helps struggling students a little is valuable. But it is not the transformative force popular accounts suggest. Dweck herself has cautioned against “false growth mindset” — praising effort regardless of results, or treating mindset as a personality label.' },
      { t: 'myths', items: [['“Just praise effort.”', 'Praising effort that isn’t producing learning can backfire. The useful message links effort to *strategy* and to progress.'], ['“People are either growth- or fixed-mindset.”', 'Everyone holds a mix, varying by domain and by moment.'], ['“Mindset explains achievement gaps.”', 'Correlations between mindset and achievement are small (r ≈ .10).']] },
      { t: 'thought', q: 'Why might a modest, true idea become an exaggerated cultural slogan?', text: 'Consider who benefits from simple stories, and how replication rarely makes headlines.' }
    ],
    sources: ['Dweck, C. S. (2006). *Mindset*. Random House.', 'Sisk, V. F. et al. (2018). To what extent and under which circumstances are growth mind-sets important to academic achievement? *Psychological Science*, 29(4).', 'Yeager, D. S. et al. (2019). A national experiment reveals where a growth mindset improves achievement. *Nature*, 573.']
  }
];
