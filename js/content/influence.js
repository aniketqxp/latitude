// Region: Influence & Power — assertiveness, negotiation, persuasion, leadership.
export default [
  {
    id: 'assertiveness', region: 'influence', title: 'The assertiveness curve', level: 'supported', mins: 7,
    tags: ['assertiveness', 'speaking up', 'boundaries', 'conflict'],
    kicker: 'Too little and you’re overlooked. Too much and you’re resented. And you’re probably wrong about which you’re doing.',
    q: 'When you push back, do you come across as too pushy?',
    related: [['negotiation', 'Assertiveness at the bargaining table.'], ['if-then', 'Pre-planned responses help you speak up.'], ['asch', 'Speaking up against a group.'], ['leadership', 'Voice and safety in teams.'], ['warmth', 'Assertion lands better with visible goodwill.']],
    blocks: [
      { t: 'lede', text: 'Daniel Ames and Francis Flynn asked colleagues to rate managers on assertiveness and leadership effectiveness. The relationship was an inverted U: the most effective leaders were moderate, and the middle zone was narrower than people thought.' },
      { t: 'viz', name: 'assert', label: 'Figure 20.', caption: 'Drag to choose a level of assertiveness. See how others perceive it — and how you think they perceive it.' },
      { t: 'evidence', level: 'supported', claim: 'People who are appropriately assertive often believe they have overstepped — the “line-crossing illusion.”', note: 'Ames & Wazlawek (2014): in negotiations, many participants thought they had come across as overly assertive when their counterparts saw them as appropriate or even under-assertive. This misperception led them to make concessions to repair damage that didn’t exist.' },
      { t: 'p', text: 'The illusion is closely related to the [[transparency|illusion of transparency]]: the internal experience of pushing feels loud, so we assume it sounded loud. If you are worried you were too assertive, the odds are good you weren’t.' },
      { t: 'steps', items: [['State the need, not the accusation', '“I need the draft by Thursday to review it properly,” not “You always send things late.”'], ['Be brief', 'Long justifications signal you expect to be refused.'], ['Hold the silence', 'After making a request, stop talking.'], ['Pair firmness with warmth', 'Clarity about the issue, goodwill toward the person.']] },
      { t: 'reflect', q: 'When did you last soften something you said because you feared you had overstepped? Did you have evidence you had?' }
    ],
    sources: ['Ames, D. R. & Flynn, F. J. (2007). What breaks a leader: the curvilinear relation between assertiveness and leadership. *JPSP*, 92(2).', 'Ames, D. R. & Wazlawek, A. S. (2014). Pushing in the dark: causes and consequences of limited self-awareness for interpersonal assertiveness. *PSPB*, 40(6).']
  },
  {
    id: 'negotiation', region: 'influence', title: 'Negotiation, demystified', level: 'supported', mins: 8,
    tags: ['negotiation', 'BATNA', 'anchoring', 'salary', 'ZOPA'],
    kicker: 'Most negotiation power is decided before anyone speaks — by what each side will do if they walk away.',
    q: 'Who should make the first offer?',
    related: [['assertiveness', 'Asking for more without overreaching.'], ['rejection', 'Hearing no is part of negotiating.'], ['persuasion', 'Changing what the other side wants.'], ['calibration', 'Knowing the realistic range.']],
    blocks: [
      { t: 'lede', text: 'Roger Fisher and William Ury’s *Getting to Yes* (1981) introduced the idea that shaped modern negotiation teaching: your power depends on your **BATNA** — your Best Alternative To a Negotiated Agreement. The better your alternative, the less you need this deal.' },
      { t: 'viz', name: 'zopa', label: 'Figure 21.', caption: 'Seller and buyer each have a walk-away point. Drag them to see whether a zone of possible agreement exists, and where an anchor might land.' },
      { t: 'evidence', level: 'supported', claim: 'First offers act as anchors, and the party that makes the first offer often gets a better outcome.', note: 'Galinsky & Mussweiler (2001): first offers strongly predicted final settlements. The advantage reverses when the first mover lacks information about the other side’s range — then an anchor can be badly placed.' },
      { t: 'p', text: 'Fisher and Ury also distinguished *positions* (what someone says they want) from *interests* (why they want it). Two parties fighting over a single number can often find more value by discovering what each actually cares about — timing, risk, recognition, flexibility.' },
      { t: 'steps', items: [['Improve your BATNA first', 'Before negotiating a salary, get a competing offer or clarify your next-best option.'], ['Research the range', 'Know what is realistic; ambiguity is where anchors do most damage.'], ['Make an ambitious, justified first offer', 'With a reason, it reads as principled rather than greedy.'], ['Explore interests with questions', '“What’s driving that deadline?”'], ['Trade, don’t concede', 'Give something only in exchange for something.']] },
      { t: 'evidence', level: 'mixed', claim: 'Gender gaps in negotiation are partly explained by different backlash for the same behaviour.', note: 'Bowles, Babcock & Lai (2007) found women who initiated salary negotiation faced more social cost than men. Later work finds the gap in propensity to negotiate has narrowed, and framing the ask in relational terms can reduce backlash. The wall here is partly external.' }
    ],
    sources: ['Fisher, R., Ury, W. & Patton, B. (1981/2011). *Getting to Yes*. Penguin.', 'Galinsky, A. D. & Mussweiler, T. (2001). First offers as anchors. *JPSP*, 81(4).', 'Bowles, H. R., Babcock, L. & Lai, L. (2007). Social incentives for gender differences in the propensity to initiate negotiations. *OBHDP*, 103(1).']
  },
  {
    id: 'persuasion', region: 'influence', title: 'Changing minds', level: 'supported', mins: 7,
    tags: ['persuasion', 'argument', 'attitude change', 'deep canvassing'],
    kicker: 'People are rarely argued out of beliefs. They are sometimes listened out of them.',
    q: 'Has anyone ever changed your mind in an argument?',
    related: [['listening', 'High-quality listening reduces defensiveness.'], ['rhetoric', 'The classical structure of persuasion.'], ['storytelling', 'Narrative transportation reduces counter-arguing.'], ['steelman', 'Understanding the other view first.']],
    blocks: [
      { t: 'lede', text: 'Richard Petty and John Cacioppo’s *elaboration likelihood model* proposes two routes to persuasion. When people are motivated and able to think carefully, argument quality matters (the central route). When they are not, cues like attractiveness, number of arguments or source prestige do the work (the peripheral route).' },
      { t: 'evidence', level: 'supported', claim: 'Attitudes changed via careful thinking are more durable and more predictive of behaviour.', note: 'A core ELM finding across many studies. Peripheral-route changes tend to fade.' },
      { t: 'evidence', level: 'supported', claim: 'A ten-minute non-judgmental conversation reduced prejudice for months.', note: 'Broockman & Kalla (2016), *Science*: “deep canvassing” — canvassers asked voters about their experiences and listened, then shared a personal story — reduced transphobia, with effects lasting at least three months. Notably, the original 2014 study on this topic was fraudulent and retracted; this was the clean replication.' },
      { t: 'p', text: 'Hugo Mercier and Dan Sperber’s work suggests something reassuring: people are not as gullible as often claimed. We evaluate arguments well when we are on the receiving end — it is our own reasoning we scrutinise poorly. Good arguments, delivered by someone who seems to understand us, *do* work. They just rarely work instantly.' },
      { t: 'myths', items: [['“Facts don’t change minds.”', 'The “backfire effect” — corrections strengthening false beliefs — has largely failed to replicate (Wood & Porter 2019). Facts usually shift beliefs modestly.'], ['“Persuasion is manipulation.”', 'Some is. But offering reasons, listening, and telling the truth vividly is how ideas move between free minds.']] }
    ],
    sources: ['Petty, R. E. & Cacioppo, J. T. (1986). The elaboration likelihood model of persuasion. *Advances in Experimental Social Psychology*, 19.', 'Broockman, D. & Kalla, J. (2016). Durably reducing transphobia. *Science*, 352.', 'Wood, T. & Porter, E. (2019). The elusive backfire effect. *Political Behavior*, 41.', 'Mercier, H. (2020). *Not Born Yesterday*. Princeton University Press.']
  },
  {
    id: 'leadership', region: 'influence', title: 'Psychological safety', level: 'supported', mins: 6,
    tags: ['leadership', 'teams', 'psychological safety', 'voice'],
    kicker: 'The best teams didn’t make fewer mistakes. They reported more.',
    q: 'What makes a group of people willing to speak up?',
    related: [['assertiveness', 'Individual voice, team context.'], ['asch', 'Why people stay silent in groups.'], ['warmth', 'Leaders’ warmth enables candour.'], ['charisma', 'Charisma is one tool among many.']],
    blocks: [
      { t: 'lede', text: 'Studying hospital teams, Amy Edmondson found something puzzling: the better-led units seemed to make *more* medication errors. On closer inspection, they weren’t making more mistakes. They were more willing to report them.' },
      { t: 'evidence', level: 'supported', claim: 'Team psychological safety — a shared belief that it’s safe to take interpersonal risks — predicts learning behaviour and performance.', note: 'Edmondson (1999) and a large subsequent literature; Frazier et al. (2017) meta-analysis linked psychological safety to performance, learning and engagement. Google’s Project Aristotle (2015) found it the most important factor among its teams.' },
      { t: 'p', text: 'Psychological safety is not niceness or low standards. Edmondson pairs it with accountability: high safety and high standards produce a “learning zone”; high safety and low standards produce a comfort zone; low safety and high standards produce an anxiety zone.' },
      { t: 'steps', items: [['Frame work as learning', '“We haven’t done this before; we’ll need everyone’s input.”'], ['Acknowledge your own fallibility', '“I may be missing something.”'], ['Ask real questions', 'Not “any concerns?” but “What are we not seeing?”'], ['Respond productively to bad news', 'Thank the messenger. The first reaction sets the norm.']] },
      { t: 'reflect', q: 'In which groups do you speak freely, and in which do you edit yourself? What’s the difference?' }
    ],
    sources: ['Edmondson, A. (1999). Psychological safety and learning behavior in work teams. *Administrative Science Quarterly*, 44(2).', 'Frazier, M. L. et al. (2017). Psychological safety: a meta-analytic review. *Personnel Psychology*, 70(1).', 'Edmondson, A. (2018). *The Fearless Organization*. Wiley.']
  }
];
