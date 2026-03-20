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
}

export function getDeepDiveContent(id: string): DeepDiveContent | null {
  return deepDiveContent[id] || null
}
