// Region: Craft & Becoming — practice, habits, plans, self-control.
export default [
  {
    id: 'practice', region: 'craft', title: 'Practice, honestly', level: 'mixed', mins: 8,
    tags: ['skill', 'expertise', 'deliberate practice', '10,000 hours', 'talent'],
    kicker: 'Practice matters enormously. The famous number does not.',
    q: 'Can anyone become an expert with enough hours?',
    related: [['efficacy', 'Every gain becomes evidence for belief.'], ['habits', 'Practice has to become routine to accumulate.'], ['calibration', 'Expert intuition needs feedback.'], ['mindset', 'Belief in growth matters less than how you practise.'], ['sprezzatura', 'Hiding the hours behind apparent ease.']],
    blocks: [
      { t: 'lede', text: 'Anders Ericsson’s research on violinists in Berlin showed that the best had accumulated more hours of *deliberate practice* — focused, effortful work on specific weaknesses with feedback. Malcolm Gladwell turned this into the “10,000-hour rule.” Ericsson spent years objecting.' },
      { t: 'viz', name: 'practice', label: 'Figure 18.', caption: 'How much of the variation in performance does practice explain? It depends heavily on the domain (Macnamara et al. 2014).' },
      { t: 'evidence', level: 'mixed', claim: 'Deliberate practice explains a substantial but far from complete share of differences in skill.', note: 'Macnamara, Hambrick & Oswald (2014) meta-analysis: practice explained about 26% of variance in games, 21% in music, 18% in sports, 4% in education and under 1% in professions. Ericsson disputed their definition of “deliberate practice.” Both sides agree practice is necessary; they disagree on how much else matters.' },
      { t: 'p', text: 'What makes practice deliberate is the important part, and it is uncontroversial: working at the edge of your ability, on specific sub-skills, with immediate feedback, and with full concentration. Most people “practise” by repeating what they can already do, which produces automaticity, not improvement.' },
      { t: 'steps', items: [['Isolate a sub-skill', 'Not “get better at piano” but “clean the left hand in bars 12–16.”'], ['Work at the edge', 'Easy enough to attempt; hard enough that you fail sometimes.'], ['Get fast feedback', 'A teacher, a recording, a score — something that tells you immediately what went wrong.'], ['Rest deliberately', 'Ericsson’s violinists practised in short, intense sessions and napped more than average.']] },
      { t: 'evidence', level: 'supported', claim: 'People tend to prefer “naturals” over “strivers” with identical achievements.', note: 'Tsay & Banaji (2011): professional musicians favoured a performer described as naturally talented over one described as hard-working, even when they claimed to value effort more. Tsay later replicated the bias among entrepreneurs’ investors.' },
      { t: 'reflect', q: 'What do you practise by repeating, and what do you practise by stretching?' }
    ],
    sources: ['Ericsson, K. A., Krampe, R. T. & Tesch-Römer, C. (1993). The role of deliberate practice in the acquisition of expert performance. *Psychological Review*, 100(3).', 'Macnamara, B. N., Hambrick, D. Z. & Oswald, F. L. (2014). Deliberate practice and performance in music, games, sports, education, and professions. *Psychological Science*, 25(8).', 'Tsay, C.-J. & Banaji, M. R. (2011). Naturals and strivers. *JESP*, 47(2).']
  },
  {
    id: 'habits', region: 'craft', title: 'How habits form', level: 'supported', mins: 6,
    tags: ['habits', 'routine', '21 days', 'behaviour change'],
    kicker: 'Not 21 days. Not 30. Anywhere from three weeks to most of a year — and missing a day barely matters.',
    q: 'How long does it really take to build a habit?',
    related: [['if-then', 'Plans that bridge intention and action.'], ['willpower', 'Habits are how people avoid needing willpower.'], ['practice', 'Skill needs repeated practice to accumulate.'], ['change', 'Behaviour change can reshape personality over time.']],
    blocks: [
      { t: 'lede', text: 'Phillippa Lally and colleagues asked 96 volunteers to choose a new daily behaviour — drinking water at lunch, running before dinner — and to report each day how automatic it felt.' },
      { t: 'viz', name: 'habit', label: 'Figure 19.', caption: 'Automaticity rises steeply then plateaus. The median participant reached their plateau at 66 days; the range ran from 18 to 254.' },
      { t: 'evidence', level: 'supported', claim: 'On average habit formation took 66 days, with wide individual variation; occasionally missing a day did not derail it.', note: 'Lally et al. (2010), *European Journal of Social Psychology*. Small sample, but the shape of the curve has been echoed in later work (e.g. gym-attendance data analysed by Buyalskaya et al. 2023). The “21 days” figure traces to a 1960 self-help book about plastic surgery patients.' },
      { t: 'p', text: 'Habits are cued by context: a time, place, or preceding action. That’s why they can feel effortless once formed — and why moving house or changing jobs often disrupts them. Wendy Wood’s research suggests that a substantial share of daily behaviour is habitual, performed in the same context each day while thinking about something else.' },
      { t: 'steps', items: [['Choose a stable cue', '“After I pour my coffee” is better than “in the morning.”'], ['Make it small', 'Two pages, not a chapter. Frequency matters more than size early on.'], ['Reduce friction', 'Leave the running shoes by the door; make the undesired behaviour slightly harder.'], ['Don’t panic at a miss', 'One missed day had little effect on the curve.']] }
    ],
    sources: ['Lally, P., van Jaarsveld, C. H. M., Potts, H. W. W. & Wardle, J. (2010). How are habits formed? *European Journal of Social Psychology*, 40(6).', 'Wood, W. & Rünger, D. (2016). Psychology of habit. *Annual Review of Psychology*, 67.', 'Buyalskaya, A. et al. (2023). What can machine learning teach us about habit formation? *PNAS*, 120(46).']
  },
  {
    id: 'if-then', region: 'craft', title: 'If–then plans', level: 'robust', mins: 5,
    tags: ['implementation intentions', 'planning', 'goals', 'Gollwitzer'],
    kicker: 'Deciding in advance exactly when and where you’ll act roughly doubles the odds you will.',
    q: 'Why do good intentions so often fail to become action?',
    related: [['habits', 'If–then plans seed new habits.'], ['willpower', 'Plans substitute for in-the-moment effort.'], ['change', 'Concrete plans were what made trait-change goals work.'], ['assertiveness', 'Plans help you speak up in the moment.']],
    blocks: [
      { t: 'lede', text: 'Most people set goals: “I will exercise more.” Peter Gollwitzer studied what happens when people add a specific plan: “*If* it is 7am on a weekday, *then* I will put on my running shoes and go out.”' },
      { t: 'evidence', level: 'robust', claim: 'Implementation intentions have a medium-to-large effect on goal attainment.', note: 'Gollwitzer & Sheeran (2006) meta-analysed 94 studies: d ≈ 0.65. Effects found for health behaviours, studying, voting and more. The plan delegates control to a situational cue, so action no longer depends on remembering or deciding in the moment.' },
      { t: 'steps', items: [['Identify the critical moment', 'When, exactly, does the goal usually slip? (“When I get home tired.”)'], ['Write the if', 'A specific, recognisable cue.'], ['Write the then', 'A concrete, small first action.'], ['Plan for obstacles too', '“If I feel like skipping, then I will just put the shoes on.”']] },
      { t: 'p', text: 'If–then plans can also handle social moments: “If someone interrupts me, then I will say, ‘Let me finish this thought.’” Rehearsed in advance, the response becomes available when nerves would otherwise block it.' },
      { t: 'reflect', q: 'Write one if–then plan for something you’ve intended for a while.' }
    ],
    sources: ['Gollwitzer, P. M. (1999). Implementation intentions. *American Psychologist*, 54(7).', 'Gollwitzer, P. M. & Sheeran, P. (2006). Implementation intentions and goal achievement: a meta-analysis. *Advances in Experimental Social Psychology*, 38.']
  },
  {
    id: 'willpower', region: 'craft', title: 'Is willpower a muscle?', level: 'myth', mins: 6,
    tags: ['willpower', 'ego depletion', 'self-control', 'replication', 'discipline'],
    kicker: 'For two decades, self-control was described as a fuel tank. Then the tank failed to replicate.',
    q: 'Does resisting temptation really use something up?',
    related: [['habits', 'Highly self-controlled people mostly avoid temptation.'], ['if-then', 'Plans reduce reliance on in-the-moment control.'], ['mindset', 'Another famous finding that shrank on replication.'], ['stoa', 'An older, philosophical idea of self-command.']],
    blocks: [
      { t: 'lede', text: 'In Roy Baumeister’s 1998 study, people who resisted freshly baked cookies to eat radishes gave up sooner on an impossible puzzle. Hundreds of studies followed, describing self-control as a limited resource that “ego depletion” drains.' },
      { t: 'evidence', level: 'myth', claim: 'Exerting self-control depletes a limited resource, impairing subsequent self-control.', note: 'A 23-lab preregistered replication (Hagger et al. 2016, n ≈ 2,100) found an effect close to zero. A second multi-site project (Vohs et al. 2021, 36 labs) found a very small effect, d ≈ 0.06. The glucose explanation had already been challenged.' },
      { t: 'evidence', level: 'supported', claim: 'Beliefs about willpower may influence how much people tire.', note: 'Job, Dweck & Walton (2010) found that people who believed willpower was not limited showed little depletion. Later replications have been mixed, but the idea that fatigue is partly motivated has gained ground.' },
      { t: 'p', text: 'A more useful finding: people high in trait self-control don’t appear to resist temptation more. They *encounter* less of it, because they have arranged their lives — routines, environments, [[habits]] — so that temptation rarely arises (Hofmann et al. 2012; Galla & Duckworth 2015). Discipline is often design.' },
      { t: 'reflect', q: 'Where do you rely on resisting temptation when you could redesign the situation instead?' }
    ],
    sources: ['Baumeister, R. F. et al. (1998). Ego depletion. *JPSP*, 74(5).', 'Hagger, M. S. et al. (2016). A multilab preregistered replication of the ego-depletion effect. *Perspectives on Psychological Science*, 11(4).', 'Vohs, K. D. et al. (2021). A multisite preregistered paradigmatic test of the ego-depletion effect. *Psychological Science*, 32(10).', 'Hofmann, W. et al. (2012). Everyday temptations. *Journal of Personality*, 80(2).']
  }
];
