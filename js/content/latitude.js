// Region: Latitude — telling real walls from imagined ones.
export default [
  {
    id: 'walls', region: 'latitude', title: 'Three kinds of wall', level: 'framework', mins: 7,
    tags: ['restriction', 'fear', 'culture', 'possibility'],
    kicker: 'Some limits are made of stone. Some are made of other people’s opinions. Some are made of a forecast nobody checked.',
    q: 'How many of the things you “can’t” do have you actually tried to do?',
    related: [['norms', 'Cultural walls are often norms that almost nobody privately endorses.'], ['ladder', 'A method for testing psychological walls one rung at a time.'], ['efficacy', 'Belief in capability is built mostly by direct evidence — the kind walls prevent you from collecting.'], ['deviance', 'What happens, socially, when you walk through a cultural wall.'], ['stoa', 'The Stoic sorting of what is up to us and what is not.']],
    blocks: [
      { t: 'lede', text: 'Ask anyone why they haven’t done something they half-want to do — speak up in a meeting, wear the bold thing, apply for the job, travel alone — and the reasons come in three different materials, though they are rarely labelled.' },
      { t: 'p', text: '**External walls** are features of the world: laws, money, physics, other people’s actual decisions. **Cultural walls** are shared expectations — what “people like us” do, what is considered too much. **Psychological walls** are forecasts: *it would be unbearable, they would laugh, I’d freeze*. All three feel equally solid from the inside. They are not equally solid.' },
      { t: 'viz', name: 'walls', label: 'Figure 1.', caption: 'Choose a limit, then test it. Each kind of wall responds differently to pressure.' },
      { t: 'h', text: 'Why the forecast feels like a fact' },
      { t: 'p', text: 'Avoidance is self-sealing. If you never test the prediction “I would be humiliated”, you never collect the evidence that might disconfirm it — and the relief of not trying quietly reinforces the belief that trying was dangerous. Clinical psychologists describe exactly this loop in anxiety; the modern account of exposure therapy (see [[ladder]]) is built around breaking it by *testing expectancies*, not by forcing endurance.' },
      { t: 'evidence', level: 'robust', claim: 'People systematically overestimate how badly others will judge their mistakes and how intensely they will feel bad afterwards.', note: 'Work on the [[spotlight]] effect, the illusion of [[transparency]], and *affective forecasting* (Gilbert & Wilson) all point the same way: we predict stronger, longer-lasting reactions than actually occur.' },
      { t: 'p', text: 'Cultural walls have a different weakness. Many norms persist because each person assumes everyone else endorses them — a situation called *pluralistic ignorance*. When people discover private opinion, these walls can fall surprisingly fast (see [[norms]]).' },
      { t: 'p', text: 'External walls are real, and pretending otherwise is not empowerment but magical thinking. The practical skill is not to deny them, but to look for their actual edges: the exception process, the second door, the person who decides. Walls of this kind are often lower in places.' },
      { t: 'scenario', setup: 'You want to ask a well-known researcher a question after their talk, but you assume they would find it bothersome. Which kind of wall is this?', options: [{ text: 'External — they may genuinely be busy.', note: 'Partly. Their time is real. But you don’t yet know whether they would mind; you’re assuming it.' }, { text: 'Cultural — “people like me don’t approach people like them.”', note: 'Often present. Status norms about who may approach whom are learned, and vary by field and country.' }, { text: 'Psychological — a forecast of rejection.', note: 'Usually the largest component. Research on asking for help (Flynn & Lake 2008) finds people underestimate how willing others are to say yes by as much as half.' }], after: 'Most real walls are alloys. Separating the materials lets you respond to each part properly: respect the real constraint (keep it brief), question the norm, and test the forecast.' },
      { t: 'thought', q: 'If you could see a printout of every limit you’ve obeyed this year, labelled by material, which column would be longest?', text: 'There’s no right answer. The exercise is just in noticing that the columns exist.' },
      { t: 'reflect', q: 'Name one thing you’ve treated as impossible. What evidence, specifically, do you have?' }
    ],
    sources: ['Flynn, F. J. & Lake, V. K. B. (2008). “If you need help, just ask”. *Journal of Personality and Social Psychology*, 95(1).', 'Gilbert, D. T. & Wilson, T. D. (2007). Prospection: experiencing the future. *Science*, 317.', 'Prentice, D. A. & Miller, D. T. (1993). Pluralistic ignorance and alcohol use on campus. *JPSP*, 64(2).', 'Craske, M. G. et al. (2014). Maximizing exposure therapy: an inhibitory learning approach. *Behaviour Research and Therapy*, 58.']
  },
  {
    id: 'norms', region: 'latitude', title: 'The norm nobody holds', level: 'robust', mins: 6,
    tags: ['culture', 'conformity', 'pluralistic ignorance'],
    kicker: 'A rule can be enforced by everyone and believed by almost no one.',
    q: 'What if everyone around you secretly agrees with you, and nobody says so?',
    related: [['walls', 'Cultural walls are the most negotiable of the three.'], ['asch', 'The classic experiments on why people go along.'], ['deviance', 'The first person to break a norm pays a price — or earns credit.'], ['independence', 'Thinking for yourself without being merely contrary.']],
    blocks: [
      { t: 'lede', text: 'In the early 1990s, Deborah Prentice and Dale Miller asked Princeton students two questions: how comfortable they were with campus drinking, and how comfortable they thought the average student was. Most said they were less comfortable than the average. The average student, in other words, was a fiction.' },
      { t: 'p', text: 'This pattern — *pluralistic ignorance* — shows up wherever people infer what others believe from what they publicly do. If everyone conforms outwardly, everyone’s private doubt stays invisible, and each person concludes they are the odd one out.' },
      { t: 'viz', name: 'norms', label: 'Figure 2.', caption: 'A room where most people privately disagree with the norm. Drag the slider to make private views visible, and watch the public behaviour change.' },
      { t: 'evidence', level: 'supported', claim: 'In Saudi Arabia, most young married men privately supported women working outside the home but believed other men did not. Correcting that belief increased their willingness to help their wives find work.', note: 'Bursztyn, González & Yanagizawa-Drott (2020), *American Economic Review*. Months later, wives in the treated group were more likely to have applied for and interviewed for jobs.' },
      { t: 'predict', q: 'Students were asked how many of their peers felt comfortable with heavy drinking. Compared with the real figure, their estimates were…', options: ['Accurate on average', 'Too low — people were more comfortable than assumed', 'Too high — people assumed more comfort than existed'], answer: 2, explain: 'Students overestimated their peers’ comfort. And over time, men in particular shifted their *own* attitudes toward the imagined norm — a reminder that fictional norms can become real if no one tests them.' },
      { t: 'h', text: 'What this means in practice' },
      { t: 'p', text: 'You cannot read private opinion from public behaviour, especially where dissent is costly. This is why one person speaking first matters disproportionately: in [[asch|Asch]]’s conformity studies, a single ally reduced conformity dramatically. Someone has to go first so that others can discover they are not alone.' },
      { t: 'pull', text: 'The first dissenter is rarely alone. They are only first.' },
      { t: 'field', title: 'Ask the private question', steps: ['Pick a small, low-stakes group norm you have doubts about (meeting format, a ritual, a convention).', 'Ask two or three people privately, neutrally: “Honestly, what do you think of X?”', 'Record what you predicted they would say before asking.'], hypothesis: 'how often private views diverge from the public script — and whether the gap runs the same direction as yours.' }
    ],
    sources: ['Prentice, D. A. & Miller, D. T. (1993). *JPSP*, 64(2), 243–256.', 'Bursztyn, L., González, A. L. & Yanagizawa-Drott, D. (2020). Misperceived social norms: women working outside the home in Saudi Arabia. *American Economic Review*, 110(10).', 'Miller, D. T. & McFarland, C. (1987). Pluralistic ignorance: when similarity is interpreted as dissimilarity. *JPSP*, 53.']
  },
  {
    id: 'ladder', region: 'latitude', title: 'The ladder of tests', level: 'robust', mins: 8,
    tags: ['fear', 'anxiety', 'exposure', 'courage', 'method'],
    kicker: 'Courage is not a feeling you wait for. It is a series of experiments you design.',
    q: 'What would you do if you treated your fears as hypotheses?',
    related: [['walls', 'The ladder is the main tool for psychological walls.'], ['rejection', 'Rejection is the most common thing people build ladders around.'], ['efficacy', 'Each completed rung is a piece of mastery evidence.'], ['reappraisal', 'Changing the meaning of arousal before each step.'], ['flexibility', 'ACT reframes the goal as willingness, not fearlessness.']],
    blocks: [
      { t: 'lede', text: 'Exposure — approaching what you fear, in steps — is among the most effective interventions psychology has. But the popular version, “face your fears until they go away”, misdescribes how it works.' },
      { t: 'p', text: 'The older view held that exposure works by *habituation*: stay in the situation until the anxiety fades. Michelle Craske and colleagues argue the stronger mechanism is *inhibitory learning* — each step tests a specific prediction, and the surprise when it fails is what rewires expectation. The fear memory isn’t erased; a new, competing memory is laid down beside it.' },
      { t: 'evidence', level: 'robust', claim: 'Graded exposure is a first-line treatment for phobias, social anxiety and panic, with large effects across hundreds of trials.', note: 'The inhibitory learning account is newer and still being refined, but it has already changed practice: maximise prediction error, vary the context, and drop *safety behaviours* (see below).' },
      { t: 'viz', name: 'ladder', label: 'Figure 3.', caption: 'Build your own ladder. Write steps from least to most daunting, then note a prediction for each. Saved only on this device.' },
      { t: 'steps', items: [['Name the prediction', 'Not “I’m scared of parties” but “If I start a conversation with a stranger, they will look for a way to leave within a minute.”'], ['Pick a rung you could do this week', 'Daunting enough to be informative, not so much that you’d escape halfway.'], ['Drop the crutches', 'Safety behaviours — avoiding eye contact, rehearsing every line, holding a drink as a shield — prevent you from learning the prediction was wrong.'], ['Compare result to forecast', 'Write both down. The gap between them is the lesson.'], ['Move, or vary, the rung', 'Repeat in different places and with different people so the learning generalises.']] },
      { t: 'evidence', level: 'supported', claim: 'Safety behaviours maintain social anxiety, and dropping them improves outcomes.', note: 'Clark & Wells’ cognitive model (1995); experimental work by Wells et al. (1995) and McManus et al. (2008) showed people seemed *more* anxious to observers when using safety behaviours, not less.' },
      { t: 'p', text: 'There is no need to wait until the fear subsides before moving. In acceptance-based approaches (see [[flexibility]]) the aim is to carry the feeling with you while doing what you value — not to feel ready first.' },
      { t: 'reflect', q: 'What is one prediction you’ve never tested because the test itself feels like the danger?' },
      { t: 'p', text: '*A note of care:* the ladder is a method, not a dare. For fears that severely limit life, a clinician trained in CBT or exposure therapy can design ladders far better than any page can.' }
    ],
    sources: ['Craske, M. G., Treanor, M., Conway, C. C., Zbozinek, T. & Vervliet, B. (2014). *Behaviour Research and Therapy*, 58, 10–23.', 'Clark, D. M. & Wells, A. (1995). A cognitive model of social phobia. In Heimberg et al. (Eds.), *Social Phobia*.', 'McManus, F., Sacadura, C. & Clark, D. M. (2008). Why social anxiety persists. *Journal of Behavior Therapy and Experimental Psychiatry*, 39.']
  },
  {
    id: 'deviance', region: 'latitude', title: 'The credit to deviate', level: 'supported', mins: 6,
    tags: ['nonconformity', 'status', 'style', 'courage'],
    kicker: 'Breaking a rule can cost you standing — or signal that you have so much you can afford it.',
    q: 'When does breaking the rules make people respect you more?',
    related: [['norms', 'Some rules are only held up by everyone assuming everyone else holds them.'], ['style', 'Dress is the most visible arena for deviance.'], ['sprezzatura', 'Studied ease as a form of status display.'], ['independence', 'Independence of mind, not mere contrarianism.'], ['assertiveness', 'Breaking a norm politely is a learnable skill.']],
    blocks: [
      { t: 'lede', text: 'In 1958, Edwin Hollander proposed that groups grant members *idiosyncrasy credits*: by conforming and contributing early, a person earns latitude to deviate later. Deviance spends credit; contribution earns it.' },
      { t: 'p', text: 'This captures something everyday experience confirms — a newcomer who breaks protocol is “not getting it”, while a respected veteran doing the same is “refreshingly unconventional.” The behaviour is identical; its meaning depends on perceived standing and competence.' },
      { t: 'evidence', level: 'supported', claim: 'Under some conditions, nonconformity *raises* perceived status and competence — the “red sneakers effect.”', note: 'Bellezza, Gino & Keinan (2014): a professor in red sneakers or a shopper in gym clothes at a luxury boutique was judged higher-status — but only when observers believed the deviation was deliberate and the context was prestigious. When it looked accidental, the effect reversed.' },
      { t: 'compare', a: { over: 'Reads as', title: 'Lack of awareness', points: ['Deviation seems accidental', 'Person appears unaware of the norm', 'Low prior standing in the group', 'Context lacks a clear prestige frame'] }, b: { over: 'Reads as', title: 'Autonomy', points: ['Deviation is clearly chosen', 'Competence is otherwise visible', 'Done with ease rather than defiance ([[sprezzatura]])', 'Audience understands the norm being broken'] } },
      { t: 'p', text: 'There is an uncomfortable implication: the freedom to deviate is unequally distributed. People with less assumed status — often because of age, gender, ethnicity or class — receive fewer credits for the same behaviour. Recognising that is part of seeing walls clearly rather than blaming oneself for them.' },
      { t: 'thought', q: 'Who in your world has the most latitude to break convention, and how did they earn it?', text: 'Look for whether it came from competence, contribution, seniority or something less fair.' },
      { t: 'reflect', q: 'Is there a convention you follow only because you haven’t yet felt entitled to depart from it?' }
    ],
    sources: ['Hollander, E. P. (1958). Conformity, status, and idiosyncrasy credit. *Psychological Review*, 65(2).', 'Bellezza, S., Gino, F. & Keinan, A. (2014). The red sneakers effect. *Journal of Consumer Research*, 41(1).']
  }
];
