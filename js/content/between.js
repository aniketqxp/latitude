// Region: Between People — conversation, liking, friendship, humour, warmth.
export default [
  {
    id: 'questions', region: 'between', title: 'The power of the follow-up', level: 'supported', mins: 6,
    tags: ['conversation', 'questions', 'curiosity', 'liking'],
    kicker: 'The question that makes people like you is the second one.',
    q: 'What makes a conversation feel like it went well?',
    related: [['listening', 'Asking is half; hearing is the other.'], ['liking-gap', 'Your conversation partners probably liked you more than you think.'], ['curiosity', 'Genuine interest is the engine of good questions.'], ['charisma', 'Much of what reads as charisma is attention.']],
    blocks: [
      { t: 'lede', text: 'Karen Huang and colleagues at Harvard had strangers chat online for fifteen minutes, instructing some to ask many questions and others to ask few. The question-askers were liked more. But one type of question did most of the work.' },
      { t: 'evidence', level: 'supported', claim: 'Asking more questions — especially follow-up questions — increases liking, in both chats and speed dates.', note: 'Huang, Yeomans, Brooks, Minson & Gino (2017), *JPSP*. Follow-ups (“Wait, why did you move to Lisbon?”) signal that you were listening and want to know more; they outperformed switch questions and introductory questions.' },
      { t: 'p', text: 'People systematically underuse questions because they underestimate how much they will be liked for asking — and they focus on being interesting rather than interested. Follow-ups are also easier than people think: they require no planning, only attention to what the other person just said.' },
      { t: 'evidence', level: 'supported', claim: 'People avoid deeper conversations with strangers because they wrongly expect them to be awkward.', note: 'Kardas, Kumar & Epley (2022): across 12 experiments, deep conversations were less awkward and produced more connection than participants predicted. Strangers were more interested in their deeper disclosures than they expected.' },
      { t: 'scenario', setup: 'A new acquaintance mentions they spent last summer working on a fishing boat. Which reply is most likely to deepen the conversation?', options: [{ text: '“Cool. I went sailing once in Greece.”', note: 'A *shift response* — it turns the topic to you. Sociologist Charles Derber found these dominate conversations, and they quietly end threads.' }, { text: '“Nice. So what do you do now?”', note: 'A switch question. Fine, but it drops a vivid thread they offered.' }, { text: '“A fishing boat! What was the hardest part of that?”', note: 'A follow-up and a *support response* — it invites them to go deeper on their own topic.' }], after: 'The best conversationalists often say surprisingly little. They notice the threads people offer and pull on them.' },
      { t: 'field', title: 'Three follow-ups', steps: ['In your next conversation, ask at least three follow-up questions before switching topic.', 'Predict beforehand how the other person will respond.', 'Notice how the conversation’s depth and energy change.'], hypothesis: 'whether the other person begins sharing more, and whether you find them more interesting too.' }
    ],
    sources: ['Huang, K., Yeomans, M., Brooks, A. W., Minson, J. & Gino, F. (2017). It doesn’t hurt to ask. *JPSP*, 113(3).', 'Kardas, M., Kumar, A. & Epley, N. (2022). Overly shallow? Miscalibrated expectations create a barrier to deeper conversation. *JPSP*, 122(3).', 'Derber, C. (1979/2000). *The Pursuit of Attention*. Oxford University Press.']
  },
  {
    id: 'listening', region: 'between', title: 'Listening that changes people', level: 'supported', mins: 6,
    tags: ['listening', 'attention', 'empathy', 'conversation'],
    kicker: 'Being truly heard makes people less defensive, more reflective, and more open — even to views they oppose.',
    q: 'What does good listening do to the person talking?',
    related: [['questions', 'Good questions are listening made audible.'], ['persuasion', 'Listening is one of the most underrated persuasion tools.'], ['steelman', 'Listening to understand, not to rebut.'], ['warmth', 'Attention is read as warmth.']],
    blocks: [
      { t: 'lede', text: 'Guy Itzchakov and Avraham Kluger have studied what happens to speakers who are listened to well — with attention, comprehension and non-judgment — compared with those who are listened to distractedly.' },
      { t: 'evidence', level: 'supported', claim: 'Speakers who experience high-quality listening become less anxious, more self-aware, and hold their attitudes in a more nuanced, less extreme way.', note: 'Itzchakov et al. (2017, 2018): good listening increased “attitude complexity” — speakers saw more sides of their own views — without necessarily changing them. Effects found in lab studies and workplace interventions.' },
      { t: 'p', text: 'That last finding matters: being heard makes people *less* defensive. When you feel you must fight for your view to be acknowledged, you stake out an extreme version of it. When you feel understood, you can afford to notice the complications.' },
      { t: 'myths', items: [['“Active listening means nodding and paraphrasing.”', 'Mechanical paraphrasing can feel scripted. What matters is that the speaker *perceives* genuine attention and understanding.'], ['“Good listeners stay silent.”', 'Silence plus distraction is poor listening. Thoughtful questions and accurate reflections show you followed.'], ['“Listening means agreeing.”', 'You can understand fully and still disagree. Understanding first tends to make disagreement more productive.']] },
      { t: 'reflect', q: 'Who in your life makes you feel genuinely heard? What do they do that others don’t?' }
    ],
    sources: ['Itzchakov, G., Kluger, A. N. & Castro, D. R. (2017). I am aware of my inconsistencies but can tolerate them. *Personality and Social Psychology Bulletin*, 43(1).', 'Kluger, A. N. & Itzchakov, G. (2022). The power of listening at work. *Annual Review of Organizational Psychology*, 9.', 'Rogers, C. R. & Farson, R. E. (1957). *Active Listening*.']
  },
  {
    id: 'liking-gap', region: 'between', title: 'The liking gap', level: 'robust', mins: 5,
    tags: ['conversation', 'self-consciousness', 'liking', 'strangers'],
    kicker: 'After talking with a stranger, they probably liked you more than you think.',
    q: 'How accurately do you judge how a conversation went?',
    related: [['spotlight', 'Another way we misjudge others’ minds.'], ['questions', 'What actually drives liking.'], ['friendship', 'From liking to friendship takes time.'], ['rejection', 'The fear behind not starting conversations.']],
    blocks: [
      { t: 'lede', text: 'Erica Boothby and colleagues paired strangers for short conversations, then asked each: how much did you like your partner, and how much do you think they liked you? Consistently, people underestimated how much they were liked.' },
      { t: 'viz', name: 'likinggap', label: 'Figure 8.', caption: 'How much you liked them, how much you think they liked you, and how much they actually did. Drag to make your estimate.' },
      { t: 'evidence', level: 'robust', claim: 'People underestimate how much their conversation partners like them and enjoy their company.', note: 'Boothby, Cooney, Sandstrom & Clark (2018), *Psychological Science* — found in lab conversations, a personal-development workshop, and among new college roommates, where the gap persisted for months.' },
      { t: 'p', text: 'One reason: we spend conversations scrutinising our own performance — the awkward pause, the weak joke — while our partners are busy worrying about theirs. We each overweight our own missteps and miss the signals of the other’s enjoyment.' },
      { t: 'evidence', level: 'supported', claim: 'People are too pessimistic about talking to strangers in general.', note: 'Epley & Schroeder (2014): commuters told to talk to a stranger on the train had a more pleasant journey than those told to keep to themselves — the opposite of what they predicted. Most also overestimated how likely they were to be rebuffed.' },
      { t: 'reflect', q: 'Recall a conversation you left feeling awkward about. What evidence did you have that the other person felt the same?' }
    ],
    sources: ['Boothby, E. J., Cooney, G., Sandstrom, G. M. & Clark, M. S. (2018). The liking gap in conversations. *Psychological Science*, 29(11).', 'Epley, N. & Schroeder, J. (2014). Mistakenly seeking solitude. *Journal of Experimental Psychology: General*, 143(5).', 'Sandstrom, G. M. & Boothby, E. J. (2021). Why do people avoid talking to strangers? *Self and Identity*, 20(1).']
  },
  {
    id: 'friendship', region: 'between', title: 'How friends are made', level: 'supported', mins: 6,
    tags: ['friendship', 'loneliness', 'time', 'belonging'],
    kicker: 'Friendship isn’t found. It accumulates — at a rate you can roughly calculate.',
    q: 'How many hours does it take to make a friend?',
    related: [['liking-gap', 'Early conversations go better than you think.'], ['questions', 'Deeper conversations accelerate closeness.'], ['humor', 'Shared laughter as social glue.'], ['habits', 'Repeated, unplanned contact is the raw material.']],
    blocks: [
      { t: 'lede', text: 'Jeffrey Hall surveyed adults who had recently moved and students in their first weeks of college, asking how much time they had spent with new acquaintances and how close they felt.' },
      { t: 'viz', name: 'friendship', label: 'Figure 9.', caption: 'Approximate hours of time together associated with each stage, from Hall (2019). Drag to accumulate time.' },
      { t: 'evidence', level: 'supported', claim: 'Moving from acquaintance to casual friend took around 50 hours; to friend about 90; to close friend over 200.', note: 'Hall (2019), *Journal of Social and Personal Relationships*. Based on self-report; the numbers are rough. What mattered was not only hours but *how* they were spent — hanging out, joking and catching up predicted closeness more than working together.' },
      { t: 'p', text: 'Sociologists have long noted the conditions under which friendships form: proximity, repeated unplanned interaction, and settings that encourage people to let their guard down. These conditions are abundant at university and scarce in adult working life — one reason many adults find friendship-making harder, and not a sign of personal failing.' },
      { t: 'steps', items: [['Put yourself in repeated contexts', 'A weekly class, club or team beats a one-off event.'], ['Initiate the second meeting', 'Many friendships stall because both people wait to be asked.'], ['Let it be unremarkable', 'Ordinary time together builds more than elaborate plans.'], ['Self-disclose gradually', 'Reciprocal, escalating openness builds closeness (Aron et al. 1997).']] },
      { t: 'reflect', q: 'Which of your friendships began because you happened to be in the same place, repeatedly?' }
    ],
    sources: ['Hall, J. A. (2019). How many hours does it take to make a friend? *Journal of Social and Personal Relationships*, 36(4).', 'Aron, A. et al. (1997). The experimental generation of interpersonal closeness. *PSPB*, 23(4).', 'Festinger, L., Schachter, S. & Back, K. (1950). *Social Pressures in Informal Groups*.']
  },
  {
    id: 'humor', region: 'between', title: 'Why things are funny', level: 'supported', mins: 6,
    tags: ['humour', 'wit', 'status', 'connection'],
    kicker: 'A joke is a small, safe violation. Get the proportions wrong and it isn’t funny — or isn’t safe.',
    q: 'Can you learn to be funnier?',
    related: [['embarrassment', 'Self-deprecating humour defuses awkward moments.'], ['charisma', 'Humour is a frequent ingredient of charisma.'], ['storytelling', 'Most real-world humour is storytelling.'], ['friendship', 'Shared laughter bonds.']],
    blocks: [
      { t: 'lede', text: 'Peter McGraw and Caleb Warren’s *benign violation theory* proposes that humour arises when something seems wrong — a violation of how things should be — but also okay, safe or harmless, at the same time.' },
      { t: 'viz', name: 'benign', label: 'Figure 10.', caption: 'Too benign and it’s boring; too much violation and it’s offensive. Move the dot to find the narrow zone where laughter happens.' },
      { t: 'evidence', level: 'supported', claim: 'Humour is more likely when a violation is simultaneously seen as benign — for instance through psychological distance.', note: 'McGraw & Warren (2010). A tragedy can become funny with time; a minor mishap is funniest when it’s recent. The theory is broad and debated, but it organises much evidence.' },
      { t: 'evidence', level: 'supported', claim: 'Successful humour raises perceived confidence and competence — and status; failed humour lowers it.', note: 'Bitterly, Brooks & Schweitzer (2017): appropriate jokes increased status; inappropriate jokes reduced perceived competence, though they still signalled confidence.' },
      { t: 'p', text: 'Rod Martin’s research distinguishes *styles*: affiliative (jokes that bring people together), self-enhancing (seeing life’s absurdity), aggressive (humour at others’ expense), and self-defeating (putting yourself down to please). The first two are linked with wellbeing; the last two with poorer outcomes — even though self-defeating humour can get laughs.' },
      { t: 'p', text: 'Humour can be practised. Improvisers train *noticing* — attending closely to what is actually happening, which is where most real humour lives — and *saying yes* to others’ offers. Most conversational wit is observation, not invention.' }
    ],
    sources: ['McGraw, A. P. & Warren, C. (2010). Benign violations: making immoral behavior funny. *Psychological Science*, 21(8).', 'Bitterly, T. B., Brooks, A. W. & Schweitzer, M. E. (2017). Risky business: when humor increases and decreases status. *JPSP*, 112(3).', 'Martin, R. A. et al. (2003). Individual differences in uses of humor. *Journal of Research in Personality*, 37(1).']
  },
  {
    id: 'warmth', region: 'between', title: 'Warmth before competence', level: 'framework', mins: 6,
    tags: ['first impressions', 'warmth', 'competence', 'trust'],
    kicker: 'People ask two questions about anyone new: do they mean me well, and can they act on it?',
    q: 'What do people decide about you first?',
    related: [['charisma', 'Charisma blends both dimensions.'], ['faces', 'Snap judgments from appearance are fast and often wrong.'], ['leadership', 'Leaders need both, and often overplay competence.'], ['listening', 'Attention is a primary warmth signal.']],
    blocks: [
      { t: 'lede', text: 'Susan Fiske, Amy Cuddy and Peter Glick’s *stereotype content model* proposes that impressions of people and groups vary on two broad dimensions: **warmth** (intentions — friendly, trustworthy) and **competence** (ability to carry out those intentions).' },
      { t: 'viz', name: 'warmth', label: 'Figure 11.', caption: 'The two-dimensional space of impressions. Tap a quadrant to see the emotion people tend to feel toward those who land there.' },
      { t: 'evidence', level: 'framework', claim: 'Warmth and competence capture much of the variance in social judgment across cultures.', note: 'Supported across dozens of countries (Cuddy et al. 2009). Later work suggests “warmth” may split into sociability and morality, with morality (honesty, fairness) especially important (Goodwin et al. 2014).' },
      { t: 'p', text: 'People trying to impress often lead with competence — credentials, sophistication, sharpness. But warmth judgments are made faster and weigh heavily, particularly in whether others will trust or cooperate with you. Competence without visible goodwill can register as threat.' },
      { t: 'reflect', q: 'In new situations, which do you instinctively try to project first — warmth or competence?' }
    ],
    sources: ['Fiske, S. T., Cuddy, A. J. C. & Glick, P. (2007). Universal dimensions of social cognition: warmth and competence. *Trends in Cognitive Sciences*, 11(2).', 'Cuddy, A. J. C. et al. (2009). Stereotype content model across cultures. *British Journal of Social Psychology*, 48(1).', 'Goodwin, G. P., Piazza, J. & Rozin, P. (2014). Moral character predominates in person perception. *JPSP*, 106(1).']
  },
  {
    id: 'charisma', region: 'between', title: 'Charisma can be taught', level: 'supported', mins: 6,
    tags: ['charisma', 'presence', 'leadership', 'rhetoric'],
    kicker: 'Not a gift you’re born with — a set of verbal and nonverbal tactics you can learn.',
    q: 'Is charisma something you have, or something you do?',
    related: [['rhetoric', 'Many charismatic tactics are classical rhetorical devices.'], ['warmth', 'Charisma blends warmth and competence signals.'], ['storytelling', 'Stories and metaphors carry charismatic speech.'], ['voice', 'Vocal variety and pace.'], ['leadership', 'Charisma is useful but not sufficient.']],
    blocks: [
      { t: 'lede', text: 'John Antonakis and colleagues identified twelve “charismatic leadership tactics” — including metaphors, stories, contrasts, three-part lists, rhetorical questions, expressions of moral conviction and of the group’s sentiment, high goals, and animated voice and gesture — then tested whether they could be trained.' },
      { t: 'evidence', level: 'supported', claim: 'Managers trained in charismatic tactics were rated as more charismatic and more effective by observers.', note: 'Antonakis, Fenley & Liechti (2011): training improved ratings in both field and lab studies, with large effects. A brief training improved ratings of MBA students’ speeches by around 60%.' },
      { t: 'p', text: 'Olivia Fox Cabane’s popular framing — presence, power and warmth — overlaps with this. The deepest ingredient may be the simplest: *undivided attention*. People who are fully present in a conversation, not scanning for something better, are experienced as magnetic.' },
      { t: 'p', text: 'There is a shadow side. Charisma can be used to sell bad ideas, and charismatic leaders can be dangerous precisely because they are persuasive. Cultivating charisma well means also cultivating judgment about what to be charismatic *for*.' },
      { t: 'field', title: 'One tactic per conversation', steps: ['Pick one tactic: a vivid metaphor, a contrast (“not X, but Y”), or a three-part list.', 'Use it deliberately once in a meeting or conversation.', 'Notice whether it lands — whether people repeat it or respond to it.'], hypothesis: 'whether structured language makes your points more memorable.' }
    ],
    sources: ['Antonakis, J., Fenley, M. & Liechti, S. (2011). Can charisma be taught? *Academy of Management Learning & Education*, 10(3).', 'Antonakis, J., Bastardoz, N., Jacquart, P. & Shamir, B. (2016). Charisma: an ill-defined and ill-measured gift. *Annual Review of Organizational Psychology*, 3.']
  }
];
