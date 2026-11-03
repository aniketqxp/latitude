// Region: Surface & Substance — appearance, style, ease.
export default [
  {
    id: 'faces', region: 'surface', title: 'Judged in a tenth of a second', level: 'robust', mins: 7,
    tags: ['appearance', 'first impressions', 'faces', 'photos', 'halo effect'],
    kicker: 'People decide things about your face almost instantly. They also decide differently from photo to photo.',
    q: 'Is there a single “you” that people see?',
    related: [['warmth', 'The two dimensions faces are judged on.'], ['style', 'The parts of appearance you choose.'], ['spotlight', 'People attend to your appearance less than you think.'], ['body-language', 'Snap judgments of nonverbal behaviour.']],
    blocks: [
      { t: 'lede', text: 'Janine Willis and Alexander Todorov found that people formed judgments of trustworthiness, competence and likeability from faces seen for just 100 milliseconds — and that these snap judgments barely changed with longer exposure.' },
      { t: 'evidence', level: 'robust', claim: 'Snap judgments from faces are fast, consistent across observers — and often inaccurate.', note: 'Todorov et al. (2005) found competence judgments from candidates’ faces predicted about 70% of US Senate races. But consistency is not accuracy: face-based judgments of traits like trustworthiness show weak or no validity (Todorov et al. 2015).' },
      { t: 'evidence', level: 'robust', claim: 'Different photos of the same person produce very different impressions.', note: 'Jenkins et al. (2011): impressions varied as much *within* one person’s photos as *between* people. Unfamiliar viewers sorting 40 photos of two people thought they showed around 7.5 different individuals. The “face” people judge is partly a moment, not a fixed fact.' },
      { t: 'p', text: 'This cuts both ways. Appearance matters — the halo effect (Thorndike 1920; Dion, Berscheid & Walster 1972) is real, and attractive people receive advantages. But the variability means much of what people react to is expression, lighting, angle and context — things that shift moment to moment and are partly in your control. Warm expressions reliably increase perceived trustworthiness.' },
      { t: 'p', text: 'And familiarity changes everything. Once people know you, judgments are driven by what they’ve seen you do. First impressions fade under accumulated experience, which is why the [[spotlight]] on your appearance is brightest only at the very start.' },
      { t: 'reflect', q: 'Look at five different photos of yourself. Do they show the same person to a stranger?' }
    ],
    sources: ['Willis, J. & Todorov, A. (2006). First impressions: making up your mind after a 100-ms exposure to a face. *Psychological Science*, 17(7).', 'Todorov, A., Mandisodza, A. N., Goren, A. & Hall, C. C. (2005). Inferences of competence from faces predict election outcomes. *Science*, 308.', 'Jenkins, R., White, D., Van Montfort, X. & Burton, A. M. (2011). Variability in photos of the same face. *Cognition*, 121(3).', 'Todorov, A. (2017). *Face Value*. Princeton University Press.']
  },
  {
    id: 'style', region: 'surface', title: 'Clothes as language', level: 'mixed', mins: 6,
    tags: ['style', 'clothing', 'fashion', 'self-presentation', 'enclothed cognition'],
    kicker: 'What you wear speaks before you do. The question is whether you chose the words.',
    q: 'Do clothes change how you think, or only how you’re seen?',
    related: [['deviance', 'When breaking dress codes raises status.'], ['sprezzatura', 'The art of seeming effortless.'], ['taste', 'Where taste comes from.'], ['authenticity', 'Trying on a self before you feel it.'], ['faces', 'Appearance and first impressions.']],
    blocks: [
      { t: 'lede', text: 'Clothing is one of the few channels of self-presentation entirely under your control. It communicates group membership, occasion-awareness, care, mood and aspiration — and like any language, it can be spoken fluently, awkwardly, or with deliberate accent.' },
      { t: 'evidence', level: 'mixed', claim: 'Wearing a lab coat described as a doctor’s improved attention — “enclothed cognition.”', note: 'Adam & Galinsky (2012) reported the effect; a large preregistered replication (Burns et al. 2019) failed to find it. The idea that clothes change cognition via their symbolic meaning remains plausible but unproven.' },
      { t: 'evidence', level: 'supported', claim: 'Formal clothing is associated with more abstract thinking and feelings of power in some studies.', note: 'Slepian et al. (2015). Small samples and effects; treat as suggestive.' },
      { t: 'p', text: 'The more defensible claim is social, not cognitive: others read clothing quickly, and you know they do. Dressing for a role can reduce self-monitoring, freeing attention. The effect may run through confidence rather than any magic in the fabric.' },
      { t: 'steps', items: [['Fit before fashion', 'Well-fitted simple clothes outperform poorly fitted expensive ones.'], ['Know the register', 'Read what is expected, then decide how far to depart.'], ['One deliberate signature', 'A single distinctive element reads as chosen; many can read as noise.'], ['Wear it before you feel it', 'New styles feel strange for a week. Most of that is [[spotlight]].']] },
      { t: 'reflect', q: 'Is there a way you’d like to dress that you don’t, yet? What stops you — the world, the culture, or the forecast?' }
    ],
    sources: ['Adam, H. & Galinsky, A. D. (2012). Enclothed cognition. *JESP*, 48(4).', 'Burns, D. M. et al. (2019). An old task in new clothes: a preregistered direct replication attempt of enclothed cognition. *Social Psychological and Personality Science*, 10(1).', 'Slepian, M. L. et al. (2015). The cognitive consequences of formal clothing. *SPPS*, 6(6).']
  },
  {
    id: 'sprezzatura', region: 'surface', title: 'Sprezzatura', level: 'interpretive', mins: 6,
    tags: ['grace', 'ease', 'Castiglione', 'effortlessness', 'presence'],
    kicker: 'A Renaissance courtier’s word for the art of making the difficult look easy.',
    q: 'Why do we admire people who seem not to try?',
    related: [['practice', 'The hours hidden behind apparent ease.'], ['deviance', 'Ease as a sign of earned freedom.'], ['style', 'Effortlessness in dress.'], ['taste', 'Refinement as social performance.'], ['junzi', 'A Confucian ideal of cultivated naturalness.']],
    blocks: [
      { t: 'lede', text: 'In *The Book of the Courtier* (1528), Baldassare Castiglione advised his ideal courtier to practise *sprezzatura*: “a certain nonchalance, so as to conceal all art and make whatever is done or said appear to be without effort.”' },
      { t: 'pull', text: 'True art is that which does not seem to be art.', cite: 'Castiglione, after Ovid' },
      { t: 'p', text: 'Sprezzatura has a double edge. At its best it describes the fluency of mastery — the dancer who no longer thinks about the steps. At its worst it is a deception: concealing effort to appear naturally gifted, which, as [[practice|research on practice]] shows, observers overvalue.' },
      { t: 'evidence', level: 'supported', claim: 'Audiences prize perceived natural talent over visible effort, even when they claim otherwise.', note: 'Tsay & Banaji (2011). The “naturalness bias” is one reason sprezzatura works socially — and a reason to be sceptical of it.' },
      { t: 'voices', items: [{ who: 'Castiglione', view: 'Conceal the art.', text: 'Visible strain diminishes grace; ease suggests deeper reserves.' }, { who: 'Confucius', view: 'Practise until it becomes natural.', text: 'At seventy, Confucius said he could follow his heart’s desire without transgressing — the end point of long cultivation (see [[junzi]]).' }, { who: 'Modern view', view: 'Ease is a by-product, not a performance.', text: 'Genuine fluency comes from overlearning, which frees attention for the people in front of you. That freedom is what reads as grace.' }] },
      { t: 'reflect', q: 'What do you do so well now that it looks effortless? How long did it take?' }
    ],
    sources: ['Castiglione, B. (1528). *Il Libro del Cortegiano*, Book I, ch. 26.', 'Burke, P. (1995). *The Fortunes of the Courtier*. Polity.', 'Confucius. *Analects* 2.4.']
  }
];
