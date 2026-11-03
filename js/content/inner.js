// Region: Inner Weather — self-consciousness, shame, fear, emotion regulation.
export default [
  {
    id: 'spotlight', region: 'inner', title: 'The spotlight effect', level: 'robust', mins: 6,
    tags: ['self-consciousness', 'embarrassment', 'being seen', 'Gilovich'],
    kicker: 'You are the main character in your life. In everyone else’s, you are an extra.',
    q: 'How many people really noticed the thing you’re still embarrassed about?',
    related: [['transparency', 'The companion illusion: thinking your inner state is visible.'], ['embarrassment', 'What embarrassment is for, and why it signals well of you.'], ['liking-gap', 'Others like you more than you think after conversations.'], ['walls', 'Overestimated judgment is a classic psychological wall.']],
    blocks: [
      { t: 'lede', text: 'In 2000, Thomas Gilovich and colleagues had Cornell students put on a T-shirt bearing a large photo of Barry Manilow — at the time, deeply unfashionable — and walk into a room of peers. Afterwards, the students estimated how many people had noticed.' },
      { t: 'viz', name: 'spotlight', label: 'Figure 6.', caption: 'Estimate first, then reveal. The wearers predicted about half the room would notice. Roughly a quarter did.' },
      { t: 'evidence', level: 'robust', claim: 'People overestimate how much others notice their appearance and actions — both embarrassing and flattering.', note: 'Replicated across many paradigms: bad-hair days, contributions to group discussion, absence from a group, performance slips. The bias is driven by *anchoring* on one’s own vivid experience and insufficiently adjusting for others’ perspectives.' },
      { t: 'p', text: 'The effect also cuts the other way. If you’re hoping your clever comment or new haircut made a splash, fewer people registered it than you assume. Attention in a room is spread thin — most of it is occupied, at any moment, with each person’s own spotlight.' },
      { t: 'p', text: 'Over time, the effect fades further. People also overestimate how *harshly* others judge a slip, partly because they forget that observers weigh a single lapse against everything else they know about you, and partly because observers often feel empathy rather than contempt.' },
      { t: 'pull', text: 'Everyone in the room is busy wondering what everyone in the room thinks of them.' },
      { t: 'field', title: 'Run the noticing test', steps: ['Wear one mildly unusual item for a day — a bright scarf, odd socks, an unusual hat.', 'Beforehand, predict how many people will comment.', 'Count the actual comments, and note how long the self-consciousness lasted.'], hypothesis: 'the gap between predicted and actual attention, and how quickly the feeling fades once you stop monitoring it.' },
      { t: 'reflect', q: 'Recall a moment you still cringe about. Do you remember the equivalent moments of anyone else who was there?' }
    ],
    sources: ['Gilovich, T., Medvec, V. H. & Savitsky, K. (2000). The spotlight effect in social judgment. *JPSP*, 78(2), 211–222.', 'Savitsky, K., Epley, N. & Gilovich, T. (2001). Do others judge us as harshly as we think? *JPSP*, 81(1).', 'Gilovich, T. & Savitsky, K. (1999). The spotlight effect and the illusion of transparency. *Current Directions in Psychological Science*, 8(6).']
  },
  {
    id: 'transparency', region: 'inner', title: 'The illusion of transparency', level: 'robust', mins: 5,
    tags: ['nervousness', 'public speaking', 'anxiety', 'being seen'],
    kicker: 'Your nervousness feels like it’s written on your face. It mostly isn’t.',
    q: 'Can your audience see how nervous you are?',
    related: [['spotlight', 'The broader overestimate of attention.'], ['arousal', 'What to do with the nerves themselves.'], ['voice', 'Others hear your voice differently from how you hear it.'], ['rhetoric', 'What actually carries a speech.']],
    blocks: [
      { t: 'lede', text: 'Speakers asked to rate how nervous they appeared consistently rate themselves as more visibly anxious than audiences do. Because the internal signal is so loud, we assume it leaks.' },
      { t: 'evidence', level: 'robust', claim: 'People overestimate how transparent their internal states — nervousness, lying, disgust — are to observers.', note: 'Gilovich, Savitsky & Medvec (1998) demonstrated this for liars, tasters hiding disgust, and bystanders’ concern in emergencies.' },
      { t: 'evidence', level: 'supported', claim: 'Simply learning about the illusion of transparency improves speeches.', note: 'Savitsky & Gilovich (2003): speakers told about the illusion felt less anxious and were rated by observers as better speakers and more composed. Merely being reassured (“don’t worry”) did not have the same effect.' },
      { t: 'predict', q: 'In Savitsky & Gilovich (2003), which group gave speeches that observers rated best?', options: ['Speakers given no instructions', 'Speakers told “don’t worry, you’ll be fine”', 'Speakers told about the illusion of transparency'], answer: 2, explain: 'Explaining *why* nervousness is less visible than it feels worked; generic reassurance didn’t. Understanding a mechanism can be more calming than comfort.' },
      { t: 'p', text: 'This page is, in a sense, an intervention. You now know: the audience sees far less of your interior than you do.' }
    ],
    sources: ['Gilovich, T., Savitsky, K. & Medvec, V. H. (1998). The illusion of transparency. *JPSP*, 75(2).', 'Savitsky, K. & Gilovich, T. (2003). The illusion of transparency and the alleviation of speech anxiety. *Journal of Experimental Social Psychology*, 39(6).']
  },
  {
    id: 'embarrassment', region: 'inner', title: 'Embarrassment is an apology', level: 'supported', mins: 6,
    tags: ['embarrassment', 'awkwardness', 'social emotions', 'blushing'],
    kicker: 'The blush you hate is one of the most trust-inducing signals a human can send.',
    q: 'Why would evolution make us visibly mortified?',
    related: [['shame', 'Embarrassment’s heavier cousin — and the crucial difference.'], ['spotlight', 'The audience is less attentive than it feels.'], ['humor', 'Laughing at yourself is a skill.'], ['self-compassion', 'Treating your own blunders as a friend would.']],
    blocks: [
      { t: 'lede', text: 'Embarrassment follows minor social transgressions: tripping, mispronouncing a name, forgetting a face. Its signature — gaze aversion, a controlled smile, face-touching, sometimes a blush — looks like weakness. Researchers increasingly see it as appeasement: a nonverbal apology that says, “I know the rules, and I care.”' },
      { t: 'evidence', level: 'supported', claim: 'People who show embarrassment are trusted more and seen as more prosocial.', note: 'Feinberg, Willer & Keltner (2012): observers rated people who displayed embarrassment as more generous and more trustworthy, and were more willing to cooperate with them. Dijk et al. (2009) found that blushing after a mishap made people seem more likeable and evoked more forgiveness.' },
      { t: 'compare', a: { over: 'Embarrassment', title: '“That was awkward.”', points: ['Follows small, public slips', 'Often accompanied by smiling or laughter', 'Passes quickly', 'Invites forgiveness'] }, b: { over: 'Shame', title: '“I am bad.”', points: ['Global judgment of the self', 'Can occur privately', 'Lingers, ruminates', 'Prompts hiding and withdrawal ([[shame]])'] } },
      { t: 'p', text: 'This suggests a practical stance. Instead of hiding the blush or over-apologising, acknowledging the slip lightly — a laugh, a quick “well, that happened” — lets the appeasement signal do its work. The [[humor|benign violation]] theory of humour explains why a self-aware joke disarms so reliably.' },
      { t: 'scenario', setup: 'In a presentation, you confidently call a colleague by the wrong name. The room goes quiet. What now?', options: [{ text: 'Carry on as if nothing happened.', note: 'Possible, but the unacknowledged slip may linger in everyone’s attention, including yours.' }, { text: 'Apologise at length.', note: 'Over-apology converts a small moment into a large one and can make others uncomfortable.' }, { text: 'Correct with a light touch: “— and *Priya*, who I’ve apparently renamed. Sorry, Priya.”', note: 'Acknowledges, repairs and releases. This is embarrassment doing its job.' }], after: 'Embarrassment is resolved by acknowledgement, not concealment. The aim is to signal that you know the norm — then return the spotlight to the work.' },
      { t: 'reflect', q: 'When someone else was embarrassed in front of you, what did you actually feel toward them?' }
    ],
    sources: ['Feinberg, M., Willer, R. & Keltner, D. (2012). Flustered and faithful: embarrassment as a signal of prosociality. *JPSP*, 102(1).', 'Keltner, D. & Buswell, B. N. (1997). Embarrassment: its distinct form and appeasement functions. *Psychological Bulletin*, 122(3).', 'Dijk, C., de Jong, P. J. & Peters, M. L. (2009). The remedial value of blushing. *Emotion*, 9(2).']
  },
  {
    id: 'shame', region: 'inner', title: 'Shame and guilt', level: 'supported', mins: 7,
    tags: ['shame', 'guilt', 'self-criticism', 'moral emotions'],
    kicker: '“I did a bad thing” and “I am bad” lead to very different futures.',
    q: 'Does feeling terrible about yourself make you a better person?',
    related: [['embarrassment', 'The lighter, faster social emotion.'], ['self-compassion', 'The research-backed alternative to self-attack.'], ['rejection', 'Shame often arrives with being excluded.'], ['anatta', 'Shame depends on a self it can condemn.']],
    blocks: [
      { t: 'lede', text: 'June Tangney’s research distinguishes two self-conscious emotions that most people blur together. **Guilt** focuses on a behaviour: *I did something wrong.* **Shame** focuses on the self: *I am wrong.*' },
      { t: 'evidence', level: 'supported', claim: 'Guilt-proneness predicts repair, empathy and constructive behaviour; shame-proneness predicts hiding, blaming others, anger and psychological distress.', note: 'Tangney, Stuewig & Mashek (2007) review. Longitudinal work found guilt-prone children were less likely to engage in risky behaviour later. Some recent work suggests shame can motivate self-improvement when the self is seen as changeable — but the tendency toward withdrawal is robust.' },
      { t: 'p', text: 'The difference matters because shame is often mistaken for conscience. People sometimes hold on to self-condemnation as proof they take their failings seriously. But the research suggests the opposite: global self-condemnation tends to *reduce* the capacity to face and repair what went wrong, because looking at it is too painful.' },
      { t: 'steps', items: [['Locate the act', 'Translate “I’m such an idiot” into “I sent that email without checking it.”'], ['Assess the damage honestly', 'Who was affected, and how much?'], ['Repair what can be repaired', 'Apology, correction, restitution — specific, not grovelling.'], ['Extract the lesson, release the verdict', 'Change the process; drop the sentence passed on the self.']] },
      { t: 'p', text: '*Unwarranted* shame — about one’s body, background, accent, sexuality or social class — is a different matter: there is no act to repair, only an internalised judgement. Here the work is recognising where the verdict came from, which often reveals a cultural [[walls|wall]] rather than a moral failure.' },
      { t: 'reflect', q: 'Think of something you feel ashamed of. Is there a specific act inside it, or is it a verdict about who you are?' }
    ],
    sources: ['Tangney, J. P., Stuewig, J. & Mashek, D. J. (2007). Moral emotions and moral behavior. *Annual Review of Psychology*, 58.', 'Tangney, J. P. & Dearing, R. L. (2002). *Shame and Guilt*. Guilford.', 'Leach, C. W. & Cidam, A. (2015). When is shame linked to constructive approach orientation? A meta-analysis. *JPSP*, 109(6).']
  },
  {
    id: 'rejection', region: 'inner', title: 'The sting of rejection', level: 'mixed', mins: 7,
    tags: ['rejection', 'exclusion', 'pain', 'resilience'],
    kicker: 'Being left out really does hurt. How long it hurts is more up to you.',
    q: 'Why does a stranger ignoring you sting at all?',
    related: [['ladder', 'Rejection is the most common rung people avoid.'], ['shame', 'Rejection is often read, wrongly, as a verdict.'], ['liking-gap', 'You’re probably liked more than you think.'], ['reappraisal', 'Reinterpreting what the rejection means.'], ['negotiation', 'Asking — and hearing no — as an everyday skill.']],
    blocks: [
      { t: 'lede', text: 'Kip Williams’ “Cyberball” paradigm is almost absurdly minimal: three players toss a virtual ball, and two of them — actually a program — stop throwing it to you. Within minutes, people report lower mood, self-esteem and sense of belonging. Even when they know the others are computers.' },
      { t: 'evidence', level: 'robust', claim: 'Even brief, trivial exclusion produces immediate distress in most people.', note: 'Hundreds of Cyberball studies; Hartgerink et al. (2015) meta-analysis found large effects on need-threat measures (d > 1.4).' },
      { t: 'evidence', level: 'mixed', claim: '“Social pain uses the same brain circuits as physical pain.”', note: 'Eisenberger et al. (2003) found overlapping activity in the dorsal anterior cingulate. Later analyses (e.g. Woo et al. 2014) showed the neural patterns for social and physical pain can be distinguished. The metaphor is meaningful; the claim of identity is overstated.' },
      { t: 'p', text: 'The sting is immediate and nearly universal — a sensitive alarm calibrated for a world where exclusion from the group could be fatal. What varies is the second phase: whether people ruminate and withdraw, or recover and seek connection elsewhere. That phase is where interpretation matters most.' },
      { t: 'compare', a: { over: 'Interpretation', title: '“It means something about me.”', points: ['Global, stable, personal', 'Leads to avoidance of future asks', 'Makes each rejection compound'] }, b: { over: 'Interpretation', title: '“It means something about this.”', points: ['Specific, temporary, situational', 'Rejection as data about fit, timing, or the asker’s approach', 'Makes asking cheaper over time'] } },
      { t: 'p', text: 'People who practise asking — for favours, discounts, dates, opportunities — often report that the sting shrinks fast once rejections become frequent and unremarkable. Systematic evidence on such “rejection therapy” is thin, but the logic follows from [[ladder|graded exposure]]: repeated disconfirmation of the catastrophic forecast.' },
      { t: 'reflect', q: 'What would you ask for, if hearing “no” cost you nothing?' }
    ],
    sources: ['Williams, K. D. (2007). Ostracism. *Annual Review of Psychology*, 58.', 'Eisenberger, N. I., Lieberman, M. D. & Williams, K. D. (2003). Does rejection hurt? *Science*, 302.', 'Woo, C.-W. et al. (2014). Separate neural representations for physical pain and social rejection. *Nature Communications*, 5.', 'Hartgerink, C. H. J. et al. (2015). The ordinal effects of ostracism: a meta-analysis of 120 Cyberball studies. *PLoS ONE*, 10(5).']
  },
  {
    id: 'arousal', region: 'inner', title: 'Nerves as fuel', level: 'mixed', mins: 6,
    tags: ['anxiety', 'stress', 'performance', 'reappraisal'],
    kicker: 'Your body can’t tell excitement from fear. Sometimes, you can choose the label.',
    q: 'What if the racing heart is preparing you to perform?',
    related: [['reappraisal', 'The broader skill of changing an emotion’s meaning.'], ['transparency', 'Your nerves are less visible than they feel.'], ['efficacy', 'Interpreting physiological states is one of Bandura’s four sources.'], ['flexibility', 'Not changing the feeling at all — making room for it.']],
    blocks: [
      { t: 'lede', text: 'Before a talk, most people try to calm down. Alison Wood Brooks tried something different: she had people say “I am excited” before singing karaoke, giving a speech or solving maths problems.' },
      { t: 'viz', name: 'arousal', label: 'Figure 7.', caption: 'Same body, different labels. Choose an interpretation to see how the physiological state is reframed.' },
      { t: 'evidence', level: 'mixed', claim: 'Reappraising anxiety as excitement improved performance in several studies.', note: 'Brooks (2014): saying “I am excited” improved singing accuracy, persuasiveness and maths scores versus “I am calm” or “I am anxious.” Jamieson et al. (2010) found arousal reappraisal improved GRE maths scores. Later replications have been mixed, with smaller effects; the idea is plausible and low-cost, but not a guaranteed lever.' },
      { t: 'p', text: 'Why might it work? Calming down is a large physiological shift that is hard to do on command. Moving from anxiety to excitement keeps the arousal and changes only its *valence* — from threat to challenge. In Jamieson’s framing, the same heart rate can be read as “my body is failing me” or “my body is getting me ready.”' },
      { t: 'reflect', q: 'Recall a time you were nervous and then did well. Was the nervousness hindering you, or carrying you?' }
    ],
    sources: ['Brooks, A. W. (2014). Get excited: reappraising pre-performance anxiety as excitement. *Journal of Experimental Psychology: General*, 143(3).', 'Jamieson, J. P., Mendes, W. B., Blackstock, E. & Schmader, T. (2010). Turning the knots in your stomach into bows. *JESP*, 46(1).', 'Jamieson, J. P. et al. (2018). Optimizing stress responses with reappraisal and mindset interventions. *Anxiety, Stress & Coping*, 31(3).']
  },
  {
    id: 'reappraisal', region: 'inner', title: 'Changing the story', level: 'robust', mins: 6,
    tags: ['emotion regulation', 'reappraisal', 'suppression', 'labeling'],
    kicker: 'You can’t always choose a feeling. You can often choose what it is about.',
    q: 'Is it better to hide a feeling, or to rethink it?',
    related: [['arousal', 'A specific application to performance nerves.'], ['flexibility', 'The acceptance-based alternative.'], ['stoa', 'The Stoic version, two thousand years earlier.'], ['rejection', 'Reinterpretation shapes recovery after exclusion.']],
    blocks: [
      { t: 'lede', text: 'James Gross’s process model sorts emotion regulation strategies by when they act. Two have been studied most: **reappraisal**, which changes how you interpret a situation before the emotion fully forms, and **suppression**, which inhibits its expression afterwards.' },
      { t: 'evidence', level: 'robust', claim: 'Habitual reappraisal is associated with better wellbeing and relationships; habitual suppression with worse.', note: 'Gross & John (2003) and many later studies. Suppression reduces visible expression but not inner experience, increases physiological arousal, impairs memory for the conversation, and makes partners feel less connected (Butler et al. 2003).' },
      { t: 'evidence', level: 'supported', claim: 'Simply putting feelings into words — “affect labelling” — reduces their intensity.', note: 'Lieberman et al. (2007) found labelling emotions reduced amygdala response. Kircanski et al. (2012): people who labelled their fear while approaching a spider showed reduced physiological arousal a week later.' },
      { t: 'steps', items: [['Name it', '“I notice I’m feeling humiliated.” Specific words beat vague ones.'], ['Find the appraisal', 'What story makes this feeling make sense? (“They think I’m incompetent.”)'], ['Generate alternatives', 'What else might be true? What would I tell a friend?'], ['Choose the most accurate, not the most comforting', 'Reappraisal isn’t positive thinking; it’s better thinking.']] },
      { t: 'p', text: 'Reappraisal is not always best. In situations you *can* change, an accurate negative appraisal may motivate action, and reappraising it away can be a mistake (Troy et al. 2013). The skill is flexibility: picking strategies to fit situations.' }
    ],
    sources: ['Gross, J. J. & John, O. P. (2003). Individual differences in two emotion regulation processes. *JPSP*, 85(2).', 'Lieberman, M. D. et al. (2007). Putting feelings into words. *Psychological Science*, 18(5).', 'Troy, A. S., Shallcross, A. J. & Mauss, I. B. (2013). A person-by-situation approach to emotion regulation. *Psychological Science*, 24(12).']
  },
  {
    id: 'flexibility', region: 'inner', title: 'Willing, not fearless', level: 'supported', mins: 6,
    tags: ['ACT', 'acceptance', 'values', 'anxiety'],
    kicker: 'The goal is not to stop feeling afraid. It is to stop needing to.',
    q: 'What would you do if fear were allowed to come along?',
    related: [['ladder', 'Exposure, done willingly.'], ['reappraisal', 'A complementary strategy: change the meaning.'], ['compass', 'Values give willingness its direction.'], ['stoa', 'Ancient ideas of equanimity.']],
    blocks: [
      { t: 'lede', text: 'Acceptance and Commitment Therapy (ACT), developed by Steven Hayes, starts from a counterintuitive premise: much suffering comes not from painful feelings themselves but from the struggle to avoid them.' },
      { t: 'p', text: 'ACT calls the target *psychological flexibility*: being present with difficult thoughts and feelings while acting in line with chosen values. A person who needs to feel confident before speaking up will wait a long time. A person *willing* to speak up while nervous can begin today.' },
      { t: 'evidence', level: 'supported', claim: 'ACT is effective for anxiety, depression, chronic pain and more, with effects comparable to established therapies such as CBT.', note: 'Meta-analyses (e.g. A-Tjak et al. 2015; Gloster et al. 2020 review of 20 meta-analyses) support its efficacy. It is not clearly superior to CBT, and some trials were run by proponents.' },
      { t: 'compare', a: { over: 'Control agenda', title: '“First I need to feel ready.”', points: ['Feelings must change before action', 'Avoidance shrinks life', 'Each avoided situation strengthens the fear'] }, b: { over: 'Willingness', title: '“I can bring this feeling along.”', points: ['Action guided by values', 'Feelings are allowed, not obeyed', 'Life widens even while discomfort stays'] } },
      { t: 'thought', q: 'Imagine your fear as a passenger on a bus you are driving. It shouts directions. You don’t have to throw it off. You also don’t have to turn where it says.', text: 'This is a classic ACT metaphor (“passengers on the bus”).' },
      { t: 'reflect', q: 'What do you care about enough that you would feel afraid for it?' }
    ],
    sources: ['Hayes, S. C., Strosahl, K. D. & Wilson, K. G. (2012). *Acceptance and Commitment Therapy* (2nd ed.). Guilford.', 'A-Tjak, J. G. L. et al. (2015). A meta-analysis of the efficacy of ACT. *Psychotherapy and Psychosomatics*, 84(1).', 'Gloster, A. T. et al. (2020). The empirical status of ACT: a review of meta-analyses. *Journal of Contextual Behavioral Science*, 18.']
  },
  {
    id: 'self-compassion', region: 'inner', title: 'The kinder coach', level: 'supported', mins: 6,
    tags: ['self-compassion', 'self-criticism', 'resilience', 'motivation'],
    kicker: 'Self-criticism feels like it keeps you sharp. The evidence suggests it mostly keeps you scared.',
    q: 'Would you improve faster if you were kinder to yourself?',
    related: [['shame', 'Self-compassion is the clearest antidote to shame.'], ['confidence', 'A steadier foundation than self-esteem.'], ['practice', 'Learning requires surviving your own mistakes.'], ['embarrassment', 'Forgiving yourself the small slips.']],
    blocks: [
      { t: 'lede', text: 'Kristin Neff defines self-compassion with three parts: kindness rather than harsh judgment, recognising that failure is part of common humanity rather than isolating, and mindful awareness of pain rather than over-identifying with it.' },
      { t: 'evidence', level: 'supported', claim: 'Self-compassion after failure increases motivation to improve — not complacency.', note: 'Breines & Chen (2012): people induced to be self-compassionate about a failure studied longer for a retest and were more motivated to avoid repeating a moral transgression than those given self-esteem boosts or no instruction.' },
      { t: 'p', text: 'Unlike self-esteem, self-compassion doesn’t require you to be above average. It is available precisely when you are not succeeding — which is when you need it most. And it appears to reduce the defensiveness that blocks learning from mistakes.' },
      { t: 'evidence', level: 'mixed', claim: 'Self-compassion strongly predicts wellbeing.', note: 'Correlational links are large, but some of the commonly used scale’s items overlap with neuroticism, inflating associations (Muris & Petrocchi 2017). Experimental studies support the motivational effect more cleanly.' },
      { t: 'thought', q: 'Write down what you said to yourself after your last mistake. Now imagine saying it, word for word, to a friend who made the same mistake.', text: 'Most people find they wouldn’t. The question is why the standard differs.' }
    ],
    sources: ['Neff, K. D. (2003). Self-compassion: an alternative conceptualization of a healthy attitude toward oneself. *Self and Identity*, 2(2).', 'Breines, J. G. & Chen, S. (2012). Self-compassion increases self-improvement motivation. *Personality and Social Psychology Bulletin*, 38(9).', 'Muris, P. & Petrocchi, N. (2017). Protection or vulnerability? *Clinical Psychology & Psychotherapy*, 24(2).']
  }
];
