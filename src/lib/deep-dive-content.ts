// Extended content for /learn/[type] deep-dive pages
// Each entry augments the base AssessmentConfig with history, validation, and practical information

export interface DeepDiveContent {
  id: string
  overview: {
    what: string // What the assessment measures
    why: string  // Why it matters
  }
  history: {
    creators: string
    year: number
    context: string // Research context and story behind it
    evolution: string // How it's evolved or been adapted
  }
  validation: {
    internalConsistency: string // Cronbach's alpha
    testRetest: string // Test-retest reliability
    sampleInfo: string // Key validation study info
    convergent: string // What it correlates with
    notes: string // Additional validation notes
  }
  practicalApplications: {
    title: string
    description: string
  }[]
  keyFindings: {
    finding: string
    source: string
  }[]
  references: {
    text: string // APA-formatted reference
    isPrimary?: boolean // The original/main citation
  }[]
}

export const deepDiveContent: Record<string, DeepDiveContent> = {
  swls: {
    id: 'swls',
    overview: {
      what: 'The Satisfaction With Life Scale (SWLS) measures your global cognitive judgment of life satisfaction. Unlike measures of positive affect or happiness, the SWLS assesses your conscious evaluative judgment of your life using your own criteria — not how often you feel happy, but how you judge your life as a whole.',
      why: 'Life satisfaction is one of the three core components of subjective well-being (alongside positive affect and low negative affect). Understanding your life satisfaction helps you identify whether the gap between your life as it is and your life as you want it to be is large or small — and which domains might be driving that gap.',
    },
    history: {
      creators: 'Ed Diener, Robert A. Emmons, Randy J. Larsen, and Sharon Griffin',
      year: 1985,
      context: 'The SWLS emerged from Ed Diener\'s pioneering work on subjective well-being at the University of Illinois. In the early 1980s, most well-being research relied on single-item measures ("How satisfied are you with your life?"), which were unreliable and couldn\'t capture the construct\'s complexity. Diener and colleagues developed the SWLS to provide a brief but psychometrically sound multi-item measure that would allow individuals to integrate and weigh their life domains according to their own values.',
      evolution: 'Since its publication, the SWLS has become one of the most widely used instruments in positive psychology and well-being research. It has been translated into dozens of languages and validated across cultures worldwide. Diener later developed complementary scales (the Scale of Positive and Negative Experience, the Flourishing Scale) to capture additional dimensions of well-being, but the SWLS remains the gold standard for cognitive life satisfaction.',
    },
    validation: {
      internalConsistency: 'Cronbach\'s alpha of .87 in the original study, consistently ranging from .79 to .89 across subsequent studies.',
      testRetest: '.82 over a 2-month interval, indicating good temporal stability. Scores do shift over longer periods in response to life events, as expected for a measure sensitive to real changes in life circumstances.',
      sampleInfo: 'The original validation used 176 undergraduate students. Since then, the SWLS has been validated with thousands of participants across diverse populations including elderly adults, prison inmates, psychotherapy clients, and samples from over 40 countries.',
      convergent: 'Correlates strongly with other well-being measures: .68 with the Fordyce happiness measure, .62 with the Andrews-Withey life satisfaction measure. Also correlates with peer reports of life satisfaction, confirming it\'s not purely self-report bias.',
      notes: 'The SWLS shows good discriminant validity — it is related to but distinct from measures of positive affect, self-esteem, and emotional well-being. It is sensitive to clinical interventions, making it useful as a therapy outcome measure.',
    },
    practicalApplications: [
      {
        title: 'Clinical Psychology',
        description: 'Used as an outcome measure in psychotherapy to track changes in life satisfaction over the course of treatment.',
      },
      {
        title: 'Cross-Cultural Research',
        description: 'Widely used to compare life satisfaction across nations and cultures, contributing to the World Happiness Report and similar initiatives.',
      },
      {
        title: 'Organizational Psychology',
        description: 'Applied in workplace well-being programs to assess employee satisfaction beyond job-specific measures.',
      },
      {
        title: 'Personal Development',
        description: 'Helps individuals identify the gap between their current life and their ideal, providing a starting point for goal-setting and intentional change.',
      },
    ],
    keyFindings: [
      {
        finding: 'Income has a moderate positive relationship with life satisfaction, but the relationship plateaus — beyond a comfortable income, additional wealth has diminishing returns.',
        source: 'Diener & Biswas-Diener, 2002',
      },
      {
        finding: 'Social relationships are consistently the strongest predictor of life satisfaction across cultures.',
        source: 'Diener & Seligman, 2002',
      },
      {
        finding: 'Life satisfaction scores can change meaningfully over time, particularly in response to major life events like marriage, job loss, or disability — though people tend to partially adapt.',
        source: 'Lucas et al., 2003',
      },
    ],
    references: [
      {
        text: 'Diener, E., Emmons, R. A., Larsen, R. J., & Griffin, S. (1985). The Satisfaction With Life Scale. Journal of Personality Assessment, 49(1), 71–75.',
        isPrimary: true,
      },
      {
        text: 'Pavot, W., & Diener, E. (1993). Review of the Satisfaction With Life Scale. Psychological Assessment, 5(2), 164–172.',
      },
      {
        text: 'Diener, E., & Seligman, M. E. P. (2002). Very happy people. Psychological Science, 13(1), 81–84.',
      },
      {
        text: 'Pavot, W., & Diener, E. (2008). The Satisfaction With Life Scale and the emerging construct of life satisfaction. The Journal of Positive Psychology, 3(2), 137–152.',
      },
    ],
  },

  grit: {
    id: 'grit',
    overview: {
      what: 'The Short Grit Scale (Grit-S) measures two components of grit: consistency of interest (maintaining focus on the same goals over time) and perseverance of effort (working hard despite setbacks). Together, these capture your tendency to sustain passion and effort toward long-term goals.',
      why: 'Talent and intelligence are often overemphasized as predictors of success. Grit research shows that sustained effort and consistent interests matter at least as much — and in many contexts, more. Understanding your grit profile helps you see whether you tend to stick with goals or shift between interests, and whether you push through difficulty or pull back.',
    },
    history: {
      creators: 'Angela Duckworth, Christopher Peterson, Michael D. Matthews, and Dennis R. Kelly',
      year: 2007,
      context: 'Angela Duckworth\'s grit research began with a simple observation: at West Point Military Academy, the best predictor of which cadets would survive the grueling "Beast Barracks" summer training wasn\'t SAT scores, high school rank, or athletic ability — it was grit. Duckworth, then a graduate student at the University of Pennsylvania under Martin Seligman, developed the original 12-item Grit Scale to measure this construct. The 8-item Short Grit Scale (Grit-S) followed in 2009 for contexts requiring brevity.',
      evolution: 'The concept of grit became a cultural phenomenon after Duckworth\'s 2013 TED talk (viewed over 30 million times) and her 2016 book "Grit: The Power of Passion and Perseverance." The scale has been used in education, military, business, and sports settings worldwide. Academic debate continues about whether grit is sufficiently distinct from conscientiousness (a Big Five trait), with Duckworth arguing that grit specifically captures the long-term stamina dimension that conscientiousness alone does not.',
    },
    validation: {
      internalConsistency: 'Cronbach\'s alpha of .82 for the overall Grit-S scale, with .73 for Consistency of Interest and .71 for Perseverance of Effort subscales.',
      testRetest: '.68 over a 1-year interval — somewhat lower than some personality measures, consistent with grit being partially malleable over time.',
      sampleInfo: 'Validated across diverse samples including West Point cadets (N = 1,218), National Spelling Bee finalists (N = 175), Ivy League undergraduates (N = 139), and U.S. Army Special Operations Forces candidates.',
      convergent: 'Positively correlated with conscientiousness (.77), self-control (.57), and educational attainment. Predicts retention in challenging settings (military training, teaching programs) above and beyond IQ and conscientiousness.',
      notes: 'Grit predicts performance in "marathon" challenges (retention at West Point, GPA over years, career tenure) better than "sprint" challenges (single-test performance). The two subscales show somewhat different predictive patterns — Consistency of Interest is often the stronger predictor of long-term outcomes.',
    },
    practicalApplications: [
      {
        title: 'Education',
        description: 'Schools and universities use grit assessments to identify students who may benefit from persistence-building interventions and to study what predicts long-term academic success.',
      },
      {
        title: 'Military Selection',
        description: 'Used at West Point and in Special Operations selection to predict which candidates will complete demanding training programs.',
      },
      {
        title: 'Career Development',
        description: 'Helps individuals understand whether they tend to follow through on long-term career goals or frequently shift interests — both patterns have trade-offs worth understanding.',
      },
      {
        title: 'Coaching & Personal Growth',
        description: 'Coaches use grit profiles to help clients develop deliberate practice habits and maintain focus on meaningful long-term goals.',
      },
    ],
    keyFindings: [
      {
        finding: 'Grit predicted survival through West Point\'s Beast Barracks better than self-control, SAT scores, class rank, or physical fitness.',
        source: 'Duckworth et al., 2007',
      },
      {
        finding: 'Among National Spelling Bee finalists, grittier competitors practiced more and advanced further — not because they were smarter, but because they put in more deliberate practice hours.',
        source: 'Duckworth et al., 2011',
      },
      {
        finding: 'Grit tends to increase with age, suggesting it is partially developed through life experience rather than being a fixed trait.',
        source: 'Duckworth & Quinn, 2009',
      },
    ],
    references: [
      {
        text: 'Duckworth, A. L., Peterson, C., Matthews, M. D., & Kelly, D. R. (2007). Grit: Perseverance and passion for long-term goals. Journal of Personality and Social Psychology, 92(6), 1087–1101.',
        isPrimary: true,
      },
      {
        text: 'Duckworth, A. L., & Quinn, P. D. (2009). Development and validation of the Short Grit Scale (Grit-S). Journal of Personality Assessment, 91(2), 166–174.',
      },
      {
        text: 'Credé, M., Tynan, M. C., & Harms, P. D. (2017). Much ado about grit: A meta-analytic synthesis of the grit literature. Journal of Personality and Social Psychology, 113(3), 492–511.',
      },
      {
        text: 'Duckworth, A. L. (2016). Grit: The Power of Passion and Perseverance. Scribner.',
      },
    ],
  },

  bigfive: {
    id: 'bigfive',
    overview: {
      what: 'The IPIP-20 Big Five Mini measures the five broad personality dimensions that decades of factor-analytic research have identified as the fundamental structure of human personality: Openness to Experience, Conscientiousness, Extraversion, Agreeableness, and Neuroticism (often remembered as OCEAN). Each trait represents a spectrum, not a binary.',
      why: 'The Big Five model is the most empirically supported framework for understanding personality in all of psychology. Your profile across these five dimensions predicts a remarkable range of life outcomes — from career success and relationship satisfaction to health behaviors and political attitudes. Understanding your Big Five profile gives you a research-backed map of your behavioral tendencies.',
    },
    history: {
      creators: 'The Big Five model was developed over decades by multiple researchers, most notably Lewis Goldberg, Paul Costa, and Robert McCrae. The IPIP-20 items come from the International Personality Item Pool, a public-domain resource created by Goldberg and colleagues.',
      year: 1992,
      context: 'The Big Five model emerged from the "lexical hypothesis" — the idea that the most important personality differences are encoded in language. In the 1930s–40s, Gordon Allport and Henry Odbert identified thousands of personality-descriptive words in English. By the 1960s–90s, factor analyses by multiple independent research groups (Goldberg in Oregon, Costa & McCrae at the NIH) consistently found that personality descriptions clustered into five broad factors. Costa and McCrae\'s NEO-PI-R (1992) became the most widely used professional measure, but its items are copyrighted. The International Personality Item Pool (IPIP) was created to provide free, open-source alternatives.',
      evolution: 'The Big Five is now the dominant model in personality psychology. The 20-item mini version used here sacrifices some precision for brevity — full Big Five inventories use 60–240 items. However, short-form Big Five measures have been shown to capture the essential structure reliably enough for research and self-discovery. Modern research is exploring facets within each trait (e.g., the six facets of Neuroticism in Costa & McCrae\'s model) and how personality changes across the lifespan.',
    },
    validation: {
      internalConsistency: 'For 20-item short forms, Cronbach\'s alpha typically ranges from .65 to .80 per trait — lower than full-length measures but acceptable for a 4-item-per-trait scale.',
      testRetest: 'Big Five traits show high test-retest reliability over weeks to months (.80–.90 for full measures). Even short forms show .70+ stability over several weeks.',
      sampleInfo: 'The Big Five model has been validated in thousands of studies across virtually every culture studied. The IPIP item pool has been used in samples totaling hundreds of thousands of participants worldwide.',
      convergent: 'Big Five scores predict job performance (especially Conscientiousness), relationship satisfaction (low Neuroticism, high Agreeableness), academic achievement (Conscientiousness, Openness), mental health (Neuroticism), and even longevity (Conscientiousness).',
      notes: 'Short-form measures like the IPIP-20 are best for getting a general picture of your personality profile. For high-stakes decisions (clinical diagnosis, personnel selection), longer and more precise measures are recommended.',
    },
    practicalApplications: [
      {
        title: 'Career Guidance',
        description: 'Different personality profiles tend to thrive in different career environments. High Openness suits creative and exploratory roles; high Conscientiousness predicts success in structured, detail-oriented work.',
      },
      {
        title: 'Relationship Understanding',
        description: 'Big Five profiles help explain interpersonal dynamics. For example, differences in Extraversion between partners predict how they prefer to spend leisure time.',
      },
      {
        title: 'Clinical Psychology',
        description: 'Neuroticism is the single strongest personality predictor of mental health difficulties. Understanding your standing helps contextualize your emotional experiences.',
      },
      {
        title: 'Personal Growth',
        description: 'While personality traits are relatively stable, they do shift gradually — especially Agreeableness and Conscientiousness, which tend to increase through adulthood. Knowing your profile helps you work with your tendencies rather than against them.',
      },
    ],
    keyFindings: [
      {
        finding: 'Conscientiousness is the strongest personality predictor of job performance across virtually all occupations.',
        source: 'Barrick & Mount, 1991',
      },
      {
        finding: 'Personality traits change across the lifespan: people tend to become more agreeable, more conscientious, and less neurotic as they age — a pattern researchers call "personality maturation."',
        source: 'Roberts et al., 2006',
      },
      {
        finding: 'The Big Five structure has been replicated in over 50 cultures, suggesting these five dimensions reflect universal aspects of human personality rather than Western cultural artifacts.',
        source: 'McCrae & Costa, 1997',
      },
    ],
    references: [
      {
        text: 'Goldberg, L. R. (1992). The development of markers for the Big-Five factor structure. Psychological Assessment, 4(1), 26–42.',
        isPrimary: true,
      },
      {
        text: 'Costa, P. T., & McCrae, R. R. (1992). Revised NEO Personality Inventory (NEO-PI-R) and NEO Five-Factor Inventory (NEO-FFI) professional manual. Psychological Assessment Resources.',
      },
      {
        text: 'Goldberg, L. R., Johnson, J. A., Eber, H. W., Hogan, R., Ashton, M. C., Cloninger, C. R., & Gough, H. G. (2006). The International Personality Item Pool and the future of public-domain personality measures. Journal of Research in Personality, 40(1), 84–96.',
      },
      {
        text: 'Roberts, B. W., Walton, K. E., & Viechtbauer, W. (2006). Patterns of mean-level change in personality traits across the life course: A meta-analysis of longitudinal studies. Psychological Bulletin, 132(1), 1–25.',
      },
    ],
  },

  rosenberg: {
    id: 'rosenberg',
    overview: {
      what: 'The Rosenberg Self-Esteem Scale (RSE) measures global self-worth — your overall evaluation of yourself as a person. It captures the degree to which you feel you are a person of value, with good qualities, and capable of doing things as well as others. It does not measure specific domains of self-esteem (academic, social, physical) but rather your general sense of self-acceptance.',
      why: 'Self-esteem is one of the most studied constructs in psychology because it predicts a wide range of outcomes: mental health, relationship quality, academic and career success, and resilience to stress. Low self-esteem is associated with depression, anxiety, and interpersonal difficulties, while healthy self-esteem provides a psychological buffer against life\'s setbacks.',
    },
    history: {
      creators: 'Morris Rosenberg',
      year: 1965,
      context: 'Morris Rosenberg, a sociologist at the University of Maryland, developed the RSE as part of a large-scale study of over 5,000 high school students in New York State. His landmark book "Society and the Adolescent Self-Image" explored how social factors — family structure, social class, religious background, and ethnic identity — shape young people\'s self-esteem. The 10-item scale was designed to be brief, unidimensional, and easy to administer.',
      evolution: 'Despite being developed for adolescents, the RSE quickly became the dominant self-esteem measure across all age groups. It has been translated into over 50 languages and used in thousands of studies. It remains the most widely cited self-esteem instrument in the social sciences, over 60 years after publication. Debate continues about whether the scale is truly unidimensional or whether the 5 positively-worded and 5 negatively-worded items form two subfactors (self-competence and self-deprecation).',
    },
    validation: {
      internalConsistency: 'Cronbach\'s alpha typically ranges from .77 to .88 across studies, with a mean of .81 in a meta-analysis of 53 countries.',
      testRetest: '.85 over a 2-week interval, .63 over 7 months. The moderate long-term stability reflects the fact that self-esteem is partly trait-like and partly responsive to life circumstances.',
      sampleInfo: 'Originally validated with 5,024 high school juniors and seniors in New York State. Since then validated across virtually every demographic group, age range, and culture studied.',
      convergent: 'Correlates -.64 with depression (Beck Depression Inventory), .55 with life satisfaction (SWLS), and .65 with general well-being. Negatively correlated with anxiety (-.54) and neuroticism (-.59).',
      notes: 'The RSE uses reverse-scored items to reduce acquiescence bias. Some researchers have found that lower-literacy populations or very young respondents sometimes struggle with the negatively-worded items, which can inflate apparent two-factor solutions.',
    },
    practicalApplications: [
      {
        title: 'Clinical Assessment',
        description: 'Widely used as a screening tool and outcome measure in psychotherapy for depression, anxiety, and eating disorders.',
      },
      {
        title: 'Education',
        description: 'Used in schools to identify students at risk for social-emotional difficulties and to evaluate the effectiveness of self-esteem-building programs.',
      },
      {
        title: 'Developmental Psychology',
        description: 'Used to track self-esteem trajectories across the lifespan, revealing that self-esteem typically rises from adolescence through middle adulthood, then declines in old age.',
      },
      {
        title: 'Cross-Cultural Research',
        description: 'The most common instrument for comparing self-esteem across cultures, revealing important differences in how collectivist vs. individualist societies relate to self-worth.',
      },
    ],
    keyFindings: [
      {
        finding: 'Self-esteem follows a predictable developmental trajectory: it drops during adolescence, rises steadily through adulthood, peaks around age 60, and then declines.',
        source: 'Orth et al., 2010',
      },
      {
        finding: 'Low self-esteem is a risk factor for depression, but the relationship is bidirectional — depression also erodes self-esteem over time, creating a vicious cycle.',
        source: 'Sowislo & Orth, 2013',
      },
      {
        finding: 'Pursuing self-esteem through external validation (grades, appearance, approval) is linked to worse outcomes than basing self-worth on intrinsic values and personal growth.',
        source: 'Crocker & Park, 2004',
      },
    ],
    references: [
      {
        text: 'Rosenberg, M. (1965). Society and the Adolescent Self-Image. Princeton University Press.',
        isPrimary: true,
      },
      {
        text: 'Schmitt, D. P., & Allik, J. (2005). Simultaneous administration of the Rosenberg Self-Esteem Scale in 53 nations. Journal of Personality and Social Psychology, 89(4), 623–642.',
      },
      {
        text: 'Orth, U., Trzesniewski, K. H., & Robins, R. W. (2010). Self-esteem development from young adulthood to old age: A cohort-sequential longitudinal study. Journal of Personality and Social Psychology, 98(4), 645–658.',
      },
      {
        text: 'Sowislo, J. F., & Orth, U. (2013). Does low self-esteem predict depression and anxiety? A meta-analysis of longitudinal studies. Psychological Bulletin, 139(1), 213–240.',
      },
    ],
  },

  mindset: {
    id: 'mindset',
    overview: {
      what: 'The Growth Mindset Scale measures where you fall on the continuum between a fixed mindset (believing your basic abilities, intelligence, and talents are fixed traits that cannot be changed) and a growth mindset (believing these qualities can be developed through effort, strategies, and help from others). The scale captures your implicit theories about the malleability of human attributes.',
      why: 'Your beliefs about whether ability is fixed or developable have profound effects on how you respond to challenges, setbacks, and effort. People with a growth mindset tend to embrace challenges, persist through obstacles, and view effort as a path to mastery — while those with a fixed mindset may avoid challenges, give up easily, and see effort as a sign of inadequacy.',
    },
    history: {
      creators: 'Carol S. Dweck',
      year: 1999,
      context: 'Carol Dweck\'s mindset research grew from decades of studying how children respond to failure. In the 1970s–80s at Columbia and Stanford, Dweck noticed that some children were "helpless" in the face of difficulty (giving up, attributing failure to lack of ability) while others were "mastery-oriented" (persisting, trying new strategies). She traced these patterns to underlying beliefs about intelligence: children who believed intelligence was fixed showed the helpless pattern, while those who believed it was malleable showed the mastery pattern. The scale formalizes the measurement of these "implicit theories."',
      evolution: 'Dweck\'s 2006 book "Mindset: The New Psychology of Success" brought the concept to a mainstream audience, making "growth mindset" one of the most recognized terms in popular psychology. The concept has been widely adopted in education, with many schools implementing growth mindset interventions. More recent research has focused on when and how mindset matters most, finding that interventions are most effective for students facing challenges or transitions.',
    },
    validation: {
      internalConsistency: 'Cronbach\'s alpha of .94–.98 for the intelligence theories scale in Dweck\'s original studies, reflecting the scale\'s high internal coherence.',
      testRetest: '.80 over a 2-week interval. Mindset beliefs are moderately stable but can shift through targeted interventions, educational experiences, or significant life events.',
      sampleInfo: 'Validated across multiple samples including elementary school children, adolescents, college students, and adults. Cross-cultural validation in East Asian, European, and American samples.',
      convergent: 'Growth mindset correlates with greater persistence after failure, higher academic achievement (particularly for students facing challenges), openness to learning, and resilience. Fixed mindset correlates with avoidance of challenge, performance anxiety, and defensive responses to feedback.',
      notes: 'The scale measures beliefs, not behavior. Someone can hold a growth mindset and still struggle with implementation. Recent large-scale studies suggest mindset interventions have meaningful but modest effects, particularly for at-risk students.',
    },
    practicalApplications: [
      {
        title: 'Education',
        description: 'Schools use mindset assessments to design interventions that help students embrace challenges and develop resilience. Growth mindset programs have been implemented in thousands of schools worldwide.',
      },
      {
        title: 'Parenting',
        description: 'Research shows that praising effort and strategy ("You worked really hard on that") fosters growth mindset more than praising ability ("You\'re so smart"), shaping how children approach learning.',
      },
      {
        title: 'Organizational Development',
        description: 'Companies use mindset research to build cultures that value learning and development over fixed talent, affecting hiring, feedback practices, and how failure is treated.',
      },
      {
        title: 'Sports Psychology',
        description: 'Athletes with growth mindsets respond to setbacks more constructively, viewing losses as learning opportunities rather than evidence of permanent limitation.',
      },
    ],
    keyFindings: [
      {
        finding: 'A brief online growth mindset intervention improved grades for lower-achieving students and increased enrollment in advanced math courses, with effects persisting over the school year.',
        source: 'Yeager et al., 2019 (Nature)',
      },
      {
        finding: 'When people believe intelligence is fixed, they interpret effort as a sign of low ability. When they believe it\'s malleable, they interpret effort as a path to growth.',
        source: 'Dweck & Leggett, 1988',
      },
      {
        finding: 'Mindset beliefs affect neurological responses to errors: growth mindset individuals show greater attention to corrective feedback in EEG studies.',
        source: 'Moser et al., 2011',
      },
    ],
    references: [
      {
        text: 'Dweck, C. S. (1999). Self-Theories: Their Role in Motivation, Personality, and Development. Psychology Press.',
        isPrimary: true,
      },
      {
        text: 'Dweck, C. S. (2006). Mindset: The New Psychology of Success. Random House.',
      },
      {
        text: 'Yeager, D. S., Hanselman, P., Walton, G. M., et al. (2019). A national experiment reveals where a growth mindset improves achievement. Nature, 573, 364–369.',
      },
      {
        text: 'Sisk, V. F., Burgoyne, A. P., Sun, J., Butler, J. L., & Macnamara, B. N. (2018). To what extent and under what circumstances are growth mind-sets important to academic achievement? Two meta-analyses. Psychological Science, 29(4), 549–571.',
      },
    ],
  },

  perma: {
    id: 'perma',
    overview: {
      what: 'The PERMA Profiler measures five pillars of well-being identified by Martin Seligman: Positive Emotion (feeling good), Engagement (being absorbed in activities), Relationships (feeling loved and connected), Meaning (having a sense of purpose), and Accomplishment (achieving goals). It also includes supplementary measures of Negative Emotion, Health, and Loneliness. Together, these dimensions provide a multidimensional map of your flourishing.',
      why: 'Traditional well-being measures focus on happiness or life satisfaction — single dimensions of a complex experience. The PERMA model argues that flourishing requires multiple elements, and that people can be strong in some areas while struggling in others. Understanding your PERMA profile reveals not just how well you\'re doing overall, but which specific pillars are supporting you and which might need attention.',
    },
    history: {
      creators: 'Martin E. P. Seligman (theory); Julie Butler, Margaret L. Kern (PERMA Profiler)',
      year: 2011,
      context: 'Martin Seligman, often called the "father of positive psychology," originally proposed that well-being consisted of three elements: positive emotion, engagement, and meaning. In his 2011 book "Flourish," he expanded this to five elements (PERMA), arguing that accomplishment and relationships deserved their own place in the model. The PERMA Profiler was developed by Butler and Kern to measure these five pillars, plus supplementary dimensions, in a brief self-report format.',
      evolution: 'The PERMA framework has become one of the most influential models in positive psychology, widely used in education (Geelong Grammar School in Australia was an early adopter), organizational well-being programs, and national well-being measurement initiatives. Critics note that the five pillars were proposed theoretically rather than derived empirically, and debate continues about whether PERMA captures all essential dimensions of well-being (some argue for including physical health, economic security, or environmental quality).',
    },
    validation: {
      internalConsistency: 'Cronbach\'s alpha for the overall PERMA composite is .94. Individual pillar alphas range from .81 to .90.',
      testRetest: 'Not formally reported in the original study, but subsequent studies show moderate to good stability over weeks to months, consistent with well-being measures.',
      sampleInfo: 'Validated in a large international sample (N > 31,000) across multiple countries. The factor structure has been replicated across cultures, though the relative importance of each pillar varies.',
      convergent: 'PERMA scores correlate strongly with established well-being measures: .78 with the SWLS, .73 with the WHO-5 Well-Being Index. Each pillar also shows expected associations with related constructs (e.g., Relationships with social support measures, Meaning with purpose-in-life scales).',
      notes: 'The 23-item version includes filler items for Negative Emotion, Health, Loneliness, and Overall Happiness. Only the 15 PERMA items contribute to the main score. The supplementary items provide useful context but are scored separately.',
    },
    practicalApplications: [
      {
        title: 'Positive Education',
        description: 'Schools worldwide use PERMA as a framework for student well-being programs, measuring and building each pillar through targeted curricula and school culture.',
      },
      {
        title: 'Workplace Well-Being',
        description: 'Organizations use PERMA profiles to understand which dimensions of employee well-being need support — whether that\'s meaning, engagement, social connection, or achievement.',
      },
      {
        title: 'Coaching & Therapy',
        description: 'PERMA profiles help coaches and therapists identify specific areas for growth rather than treating well-being as a single target.',
      },
      {
        title: 'National Well-Being Policy',
        description: 'Some governments and organizations use PERMA-based frameworks alongside GDP to measure national well-being and guide public policy.',
      },
    ],
    keyFindings: [
      {
        finding: 'The five PERMA elements are correlated but distinct — people can flourish in some areas while struggling in others, supporting a multidimensional rather than unitary view of well-being.',
        source: 'Butler & Kern, 2016',
      },
      {
        finding: 'Engagement (flow states) is the pillar least correlated with positive emotion, suggesting that deep absorption in challenging activities contributes to flourishing even without feeling "happy" in the moment.',
        source: 'Seligman, 2011',
      },
      {
        finding: 'Meaning and Relationships are consistently the strongest predictors of overall life satisfaction across cultures.',
        source: 'Kern et al., 2015',
      },
    ],
    references: [
      {
        text: 'Seligman, M. E. P. (2011). Flourish: A Visionary New Understanding of Happiness and Well-Being. Free Press.',
        isPrimary: true,
      },
      {
        text: 'Butler, J., & Kern, M. L. (2016). The PERMA-Profiler: A brief multidimensional measure of flourishing. International Journal of Wellbeing, 6(3), 1–48.',
      },
      {
        text: 'Kern, M. L., Waters, L. E., Adler, A., & White, M. A. (2015). A multidimensional approach to measuring well-being in students: Application of the PERMA framework. The Journal of Positive Psychology, 10(3), 262–271.',
      },
      {
        text: 'Goodman, F. R., Disabato, D. J., Kashdan, T. B., & Kauffman, S. B. (2018). Measuring well-being: A comparison of subjective well-being and PERMA. The Journal of Positive Psychology, 13(4), 321–332.',
      },
    ],
  },

  happiness: {
    id: 'happiness',
    overview: {
      what: 'The Subjective Happiness Scale (SHS) measures global subjective happiness — not specific life circumstances or emotions, but your overall self-assessment of whether you are a happy or unhappy person. With just 4 items, it captures your general happiness through both direct self-rating and comparison with peers, providing a remarkably efficient yet reliable measure.',
      why: 'Happiness researchers have found that people\'s own global assessment of their happiness is often a better predictor of behavior and outcomes than objective measures of life circumstances. The SHS captures this subjective, integrative judgment — how happy you feel yourself to be — which is influenced by personality, social comparison, and cognitive interpretation as much as by objective conditions.',
    },
    history: {
      creators: 'Sonja Lyubomirsky and Heidi S. Lepper',
      year: 1999,
      context: 'Sonja Lyubomirsky, a psychology professor at UC Riverside, developed the SHS because existing happiness measures were either too long for practical use or focused on specific components of happiness (positive affect, life satisfaction) rather than the global subjective experience. She wanted to capture what people mean when they say "I\'m a happy person" — an integrative judgment that goes beyond the sum of its parts. The scale was validated through 14 studies with over 2,700 participants.',
      evolution: 'The SHS became widely adopted precisely because of its brevity — 4 items that can be administered in under a minute. It has been translated into dozens of languages and used in hundreds of studies worldwide. Lyubomirsky\'s subsequent research focused on "happiness interventions" — evidence-based activities that can sustainably increase happiness — documented in her popular book "The How of Happiness" (2008).',
    },
    validation: {
      internalConsistency: 'Cronbach\'s alpha ranges from .79 to .94 across 14 validation samples, with a mean of .86.',
      testRetest: '.72 over periods ranging from 3 weeks to 1 year, suggesting happiness is moderately stable but responsive to life changes and interventions.',
      sampleInfo: 'Validated across 14 samples (total N > 2,700) including American and Russian community members, college students, and older adults.',
      convergent: 'Correlates .62–.72 with other happiness measures (e.g., single-item happiness), .58 with the SWLS, .52 with optimism, and -.55 with depression. Peer reports of respondents\' happiness correlate .54 with self-reports, confirming validity beyond self-report bias.',
      notes: 'The SHS is distinct from life satisfaction measures in that it captures the emotional/experiential component of happiness more directly. Item 4 is reverse-scored, describing an unhappy person and asking how much the description applies.',
    },
    practicalApplications: [
      {
        title: 'Happiness Research',
        description: 'The most commonly used brief happiness measure in positive psychology research, enabling efficient assessment in large-scale and longitudinal studies.',
      },
      {
        title: 'Intervention Studies',
        description: 'Used as the primary outcome measure in studies testing happiness-boosting interventions like gratitude journaling, acts of kindness, and meditation.',
      },
      {
        title: 'Cross-Cultural Comparison',
        description: 'Its brevity and simplicity make it ideal for comparing happiness across cultures with different languages and educational backgrounds.',
      },
      {
        title: 'Personal Benchmarking',
        description: 'Provides a quick snapshot of your global happiness that can be tracked over time to see the effects of life changes or intentional practices.',
      },
    ],
    keyFindings: [
      {
        finding: 'Approximately 50% of individual differences in happiness are attributable to genetics, 10% to life circumstances, and 40% to intentional activities — suggesting substantial room for change.',
        source: 'Lyubomirsky, Sheldon, & Schkade, 2005',
      },
      {
        finding: 'Happy people (as measured by the SHS) don\'t experience fewer negative events — they interpret and respond to events differently, using more positive reframing and social support.',
        source: 'Lyubomirsky & Tucker, 1998',
      },
      {
        finding: 'Simple, intentional activities like expressing gratitude, practicing kindness, and savoring positive experiences can produce sustained increases in happiness.',
        source: 'Lyubomirsky, 2008',
      },
    ],
    references: [
      {
        text: 'Lyubomirsky, S., & Lepper, H. S. (1999). A measure of subjective happiness: Preliminary reliability and construct validation. Social Indicators Research, 46(2), 137–155.',
        isPrimary: true,
      },
      {
        text: 'Lyubomirsky, S. (2008). The How of Happiness: A Scientific Approach to Getting the Life You Want. Penguin Press.',
      },
      {
        text: 'Lyubomirsky, S., Sheldon, K. M., & Schkade, D. (2005). Pursuing happiness: The architecture of sustainable change. Review of General Psychology, 9(2), 111–131.',
      },
      {
        text: 'Lyubomirsky, S., King, L., & Diener, E. (2005). The benefits of frequent positive affect: Does happiness lead to success? Psychological Bulletin, 131(6), 803–855.',
      },
    ],
  },

  dass21: {
    id: 'dass21',
    overview: {
      what: 'The DASS-21 is a 21-item screening tool that measures three related but distinct negative emotional states: Depression (hopelessness, low self-esteem, lack of interest), Anxiety (autonomic arousal, situational anxiety, subjective anxious affect), and Stress (difficulty relaxing, nervous tension, irritability, agitation). Each subscale contains 7 items, and scores are doubled to map onto the full 42-item DASS norms.',
      why: 'Depression, anxiety, and stress frequently co-occur, but they are distinct experiences that may require different approaches. The DASS-21 helps differentiate between these three states — something that single measures of "distress" cannot do. Understanding which dimension is elevated helps clarify what kind of support might be most helpful.',
    },
    history: {
      creators: 'Syd H. Lovibond and Peter F. Lovibond',
      year: 1995,
      context: 'The DASS was developed by Syd and Peter Lovibond at the University of New South Wales, Australia. They recognized that existing measures of depression and anxiety had significant overlap, making it difficult to distinguish between these conditions. Starting from a large item pool, they used factor analysis to identify three clearly separable dimensions. The original 42-item DASS was published in 1995; the shortened 21-item version (DASS-21) was created to provide an efficient alternative that maintains the same three-factor structure.',
      evolution: 'The DASS-21 has become one of the most widely used screening tools in clinical and research settings worldwide. It is freely available (no copyright fees), which has contributed to its widespread adoption. It is not a diagnostic tool — it screens for symptoms and severity — but it is widely used in primary care, clinical psychology, and research as a quick assessment of emotional distress. It has been translated into over 40 languages.',
    },
    validation: {
      internalConsistency: 'Cronbach\'s alpha: .91 for Depression, .84 for Anxiety, .90 for Stress, and .93 for the total scale in clinical samples.',
      testRetest: '.71–.81 over a 2-week interval for the three subscales, indicating acceptable short-term stability while remaining sensitive to genuine changes in symptoms.',
      sampleInfo: 'Validated in both clinical (N = 437 psychiatric outpatients) and non-clinical samples (N = 717 community adults) in the original studies. Since then validated in dozens of countries and clinical populations.',
      convergent: 'DASS Depression correlates .79 with the Beck Depression Inventory (BDI-II). DASS Anxiety correlates .85 with the Beck Anxiety Inventory (BAI). The three subscales show good discriminant validity — each measures a distinct construct while acknowledging their interrelation.',
      notes: 'The DASS-21 is a screening tool, not a diagnostic instrument. Elevated scores suggest the presence of symptoms but do not constitute a clinical diagnosis. Anyone scoring in the "severe" or "extremely severe" range should consider seeking professional evaluation.',
    },
    practicalApplications: [
      {
        title: 'Clinical Screening',
        description: 'Used in primary care and mental health settings to quickly screen for depression, anxiety, and stress symptoms and to monitor treatment progress.',
      },
      {
        title: 'Research',
        description: 'One of the most commonly used measures in mental health research due to its brevity, free availability, and ability to differentiate three dimensions of distress.',
      },
      {
        title: 'Workplace Well-Being',
        description: 'Used in occupational health programs to assess employee mental health and identify when stress, anxiety, or depression may be affecting a workforce.',
      },
      {
        title: 'Treatment Monitoring',
        description: 'Administered repeatedly during therapy to track changes in depression, anxiety, and stress separately — helping clinicians understand which symptoms are responding to treatment.',
      },
    ],
    keyFindings: [
      {
        finding: 'The three-factor structure (Depression, Anxiety, Stress) is consistently replicated across cultures and populations, supporting the DASS-21\'s claim to measure three distinct dimensions of distress.',
        source: 'Henry & Crawford, 2005',
      },
      {
        finding: 'DASS-21 scores are sensitive to treatment effects in psychotherapy and pharmacotherapy trials, making it a useful outcome measure for clinical research.',
        source: 'Antony et al., 1998',
      },
      {
        finding: 'Approximately 1 in 4 adults score in the mild-or-above range on at least one DASS-21 subscale, highlighting the prevalence of subclinical emotional distress in the general population.',
        source: 'Crawford & Henry, 2003',
      },
    ],
    references: [
      {
        text: 'Lovibond, S. H., & Lovibond, P. F. (1995). Manual for the Depression Anxiety Stress Scales (2nd ed.). Psychology Foundation of Australia.',
        isPrimary: true,
      },
      {
        text: 'Antony, M. M., Bieling, P. J., Cox, B. J., Enns, M. W., & Swinson, R. P. (1998). Psychometric properties of the 42-item and 21-item versions of the Depression Anxiety Stress Scales in clinical groups and a community sample. Psychological Assessment, 10(2), 176–181.',
      },
      {
        text: 'Henry, J. D., & Crawford, J. R. (2005). The short-form version of the Depression Anxiety Stress Scales (DASS-21): Construct validity and normative data in a large non-clinical sample. British Journal of Clinical Psychology, 44(2), 227–239.',
      },
      {
        text: 'Crawford, J. R., & Henry, J. D. (2003). The Depression Anxiety Stress Scales (DASS): Normative data and latent structure in a large non-clinical sample. British Journal of Clinical Psychology, 42(2), 111–131.',
      },
    ],
  },

  hope: {
    id: 'hope',
    overview: {
      what: 'The Adult Hope Scale measures hope as defined by C. R. Snyder\'s cognitive model: the perceived ability to produce pathways to desired goals (Pathways thinking) and the motivation to use those pathways (Agency thinking). This is not hope as a vague feeling of optimism — it is a specific cognitive pattern of goal-directed thinking that combines "I can find a way" with "I will pursue it."',
      why: 'Hope, in Snyder\'s model, is a powerful predictor of well-being and achievement because it captures both the cognitive and motivational components of goal pursuit. High-hope individuals don\'t just want things to go well — they actively generate routes to their goals and sustain the motivation to follow through, even when obstacles arise.',
    },
    history: {
      creators: 'C. R. (Charles Richard) Snyder, Cheri Harris, John R. Anderson, Sharon A. Holleran, Lori M. Irving, Sandra T. Sigmon, Lauren Yoshinobu, June Gibb, Charyle Langelle, and Pat Harney',
      year: 1991,
      context: 'C. R. Snyder, a clinical psychologist at the University of Kansas, developed hope theory in the late 1980s as an alternative to purely emotional models of hope. He argued that hope is fundamentally cognitive — it\'s about how you think about goals, not just how you feel. The 12-item Adult Hope Scale (also called the Hope Scale or Trait Hope Scale) includes 4 Pathways items, 4 Agency items, and 4 filler items that are not scored. The filler items prevent respondents from guessing what the scale measures.',
      evolution: 'Snyder\'s hope theory spawned extensive research connecting hope to academic achievement, athletic performance, physical health, psychotherapy outcomes, and coping with illness. After Snyder\'s death in 2006, his colleagues continued the research program. Hope theory has influenced clinical interventions (Hope Therapy), educational programs, and organizational development. The scale remains widely used in positive psychology alongside measures of optimism, self-efficacy, and resilience.',
    },
    validation: {
      internalConsistency: 'Cronbach\'s alpha ranges from .74 to .84 for the overall scale, .71–.76 for Agency, and .63–.80 for Pathways across multiple studies.',
      testRetest: '.80 over a 3-week interval, .73 over 8 weeks, and .76 over 10 weeks. Hope is relatively stable but can be developed through therapeutic interventions.',
      sampleInfo: 'Originally validated across six samples (total N > 3,000) including college students, outpatient psychotherapy clients, and inpatients. Subsequently validated across ages, cultures, and clinical populations.',
      convergent: 'Correlates .60 with optimism (LOT-R), .50 with self-esteem (RSE), and -.51 with depression (BDI). Hope predicts academic achievement above and beyond intelligence, prior achievement, self-esteem, and personality.',
      notes: 'The scale includes 4 filler items (items 3, 5, 7, 11) to reduce response bias. Only the 8 remaining items are scored. Agency and Pathways can be examined separately to understand whether someone struggles more with generating routes or sustaining motivation.',
    },
    practicalApplications: [
      {
        title: 'Clinical Psychology',
        description: 'Hope Therapy is an evidence-based intervention that helps clients develop both pathways thinking (generating routes to goals) and agency thinking (sustaining motivation), showing effectiveness for depression and anxiety.',
      },
      {
        title: 'Education',
        description: 'High-hope students earn better grades, are more likely to graduate, and persist longer in the face of academic challenges — making hope a valuable target for educational interventions.',
      },
      {
        title: 'Health Psychology',
        description: 'Higher hope is associated with better coping with chronic illness, greater adherence to medical treatment, and faster recovery from injury and surgery.',
      },
      {
        title: 'Coaching',
        description: 'Coaches use Pathways/Agency profiles to help clients identify whether they need help generating solutions (pathways) or sustaining motivation and effort (agency).',
      },
    ],
    keyFindings: [
      {
        finding: 'Hope predicted college GPA above and beyond entrance exam scores, high school GPA, and self-esteem — suggesting it captures a unique motivational-cognitive resource.',
        source: 'Snyder et al., 2002',
      },
      {
        finding: 'High-hope individuals generate more alternative pathways to goals when the original path is blocked, making them more resilient to obstacles.',
        source: 'Snyder, 1994',
      },
      {
        finding: 'A brief hope-based intervention (8 sessions of Hope Therapy) significantly reduced depression and anxiety symptoms compared to a control group.',
        source: 'Cheavens et al., 2006',
      },
    ],
    references: [
      {
        text: 'Snyder, C. R., Harris, C., Anderson, J. R., Holleran, S. A., Irving, L. M., Sigmon, S. T., ... & Harney, P. (1991). The will and the ways: Development and validation of an individual-differences measure of hope. Journal of Personality and Social Psychology, 60(4), 570–585.',
        isPrimary: true,
      },
      {
        text: 'Snyder, C. R. (2002). Hope theory: Rainbows in the mind. Psychological Inquiry, 13(4), 249–275.',
      },
      {
        text: 'Cheavens, J. S., Feldman, D. B., Gum, A., Michael, S. T., & Snyder, C. R. (2006). Hope therapy in a community sample: A pilot investigation. Social Indicators Research, 77(1), 61–78.',
      },
      {
        text: 'Snyder, C. R., Shorey, H. S., Cheavens, J., Pulvers, K. M., Adams, V. H., & Wiklund, C. (2002). Hope and academic success in college. Journal of Educational Psychology, 94(4), 820–826.',
      },
    ],
  },

  selfcompassion: {
    id: 'selfcompassion',
    overview: {
      what: 'The Self-Compassion Scale Short Form (SCS-SF) measures how you relate to yourself during times of difficulty, failure, and suffering. It captures three pairs of opposing facets: Self-Kindness vs. Self-Judgment (being warm vs. critical toward yourself), Common Humanity vs. Isolation (seeing suffering as part of the shared human experience vs. feeling alone in it), and Mindfulness vs. Over-Identification (holding painful thoughts in balanced awareness vs. being consumed by them).',
      why: 'Self-compassion offers an alternative to self-esteem as a source of psychological resilience. Unlike self-esteem, which depends on feeling better than others or meeting standards, self-compassion provides unconditional self-support — it doesn\'t require success, superiority, or external validation. Research shows it is a powerful predictor of mental health and well-being, and it can be cultivated through practice.',
    },
    history: {
      creators: 'Kristin D. Neff',
      year: 2003,
      context: 'Kristin Neff, a developmental psychologist at the University of Texas at Austin, drew on Buddhist philosophy to conceptualize self-compassion as a Western psychological construct. She observed that while compassion toward others was well-studied, compassion directed inward was largely neglected in psychology. She defined self-compassion as having three core components — self-kindness, common humanity, and mindfulness — each contrasted with its unhealthy opposite. The original 26-item scale was published in 2003; the 12-item Short Form followed in 2011 for efficient assessment.',
      evolution: 'Self-compassion has become one of the most active research areas in clinical and positive psychology. Neff and Christopher Germer developed Mindful Self-Compassion (MSC), an 8-week training program that has been taught worldwide and shown to significantly increase self-compassion and well-being. The concept has influenced therapy approaches (Compassion-Focused Therapy by Paul Gilbert), education, healthcare worker well-being, and organizational psychology. Over 4,000 studies have used the SCS since its publication.',
    },
    validation: {
      internalConsistency: 'Cronbach\'s alpha of .86 for the Short Form overall. The full 26-item scale shows alphas of .92–.94.',
      testRetest: '.93 over a 3-week interval for the full scale, indicating very high temporal stability. Self-compassion is trait-like but can be increased through targeted training.',
      sampleInfo: 'Originally validated with undergraduate students (N = 391). The Short Form was validated against the full scale using 415 participants. The SCS has since been validated in over 20 languages and across diverse populations including clinical, adolescent, elderly, and cross-cultural samples.',
      convergent: 'Correlates -.53 with depression, -.51 with anxiety, .58 with life satisfaction, and .62 with well-being. Self-compassion predicts psychological health above and beyond self-esteem, suggesting it captures a distinct protective resource.',
      notes: 'Debate exists about whether self-compassion is best understood as a single overarching factor or as six separate facets. Neff argues for a total score representing overall self-compassion, while some researchers prefer examining the individual components. The Short Form correlates .97 with the full scale, making it an excellent alternative when brevity matters.',
    },
    practicalApplications: [
      {
        title: 'Clinical Psychology',
        description: 'Self-compassion training reduces symptoms of depression, anxiety, and PTSD. Compassion-Focused Therapy (CFT) is specifically designed for people high in self-criticism and shame.',
      },
      {
        title: 'Healthcare Worker Well-Being',
        description: 'Self-compassion training helps doctors, nurses, and therapists manage burnout and compassion fatigue — you can\'t pour from an empty cup, and self-compassion helps refill it.',
      },
      {
        title: 'Education',
        description: 'Students with higher self-compassion show less academic procrastination, more intrinsic motivation, and greater resilience after academic setbacks.',
      },
      {
        title: 'Mindfulness Programs',
        description: 'Mindful Self-Compassion (MSC) is an 8-week program combining mindfulness meditation with self-compassion exercises, showing significant increases in self-compassion, well-being, and life satisfaction.',
      },
    ],
    keyFindings: [
      {
        finding: 'Self-compassion provides the same psychological benefits as high self-esteem (less depression, more happiness) without the downsides (narcissism, defensive reactions to failure, contingent self-worth).',
        source: 'Neff, 2011',
      },
      {
        finding: 'The 8-week Mindful Self-Compassion program increased self-compassion by 43%, with participants also showing significant decreases in depression, anxiety, and stress.',
        source: 'Neff & Germer, 2013',
      },
      {
        finding: 'Self-compassion is not self-indulgence or self-pity. Self-compassionate people take more personal responsibility for their mistakes, not less, because they can face their shortcomings without being overwhelmed by shame.',
        source: 'Leary et al., 2007',
      },
    ],
    references: [
      {
        text: 'Neff, K. D. (2003). The development and validation of a scale to measure self-compassion. Self and Identity, 2(3), 223–250.',
        isPrimary: true,
      },
      {
        text: 'Raes, F., Pommier, E., Neff, K. D., & Van Gucht, D. (2011). Construction and factorial validation of a short form of the Self-Compassion Scale. Clinical Psychology & Psychotherapy, 18(3), 250–255.',
      },
      {
        text: 'Neff, K. D., & Germer, C. K. (2013). A pilot study and randomized controlled trial of the Mindful Self-Compassion program. Journal of Clinical Psychology, 69(1), 28–44.',
      },
      {
        text: 'Zessin, U., Dickhäuser, O., & Garbade, S. (2015). The relationship between self-compassion and well-being: A meta-analysis. Applied Psychology: Health and Well-Being, 7(3), 340–364.',
      },
    ],
  },
}

export function getDeepDiveContent(id: string): DeepDiveContent | null {
  return deepDiveContent[id] || null
}
