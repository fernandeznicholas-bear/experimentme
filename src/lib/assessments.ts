// Assessment type definitions and scoring logic

export interface AssessmentQuestion {
  text: string
  reverseScored?: boolean
}

export interface ScoreCategory {
  min: number
  max: number
  label: string
  emoji: string
  description: string
  insight: string
}

export interface AssessmentConfig {
  id: string
  title: string
  subtitle: string
  description: string
  citation: string
  questions: AssessmentQuestion[]
  scaleLabels: string[]
  scaleMin: number
  scaleMax: number
  scoreType: 'sum' | 'average'
  categories: ScoreCategory[]
  subscales?: {
    name: string
    questionIndices: number[] // 0-indexed
    description: string
  }[]
}

// ─── SWLS ───────────────────────────────────────────
export const swlsConfig: AssessmentConfig = {
  id: 'swls',
  title: 'Satisfaction With Life Scale',
  subtitle: 'How satisfied are you with your life as a whole?',
  description: 'The SWLS is a 5-item measure of global life satisfaction developed by Ed Diener and colleagues. It has been used in hundreds of studies worldwide.',
  citation: 'Diener, E., Emmons, R. A., Larsen, R. J., & Griffin, S. (1985). The Satisfaction With Life Scale. Journal of Personality Assessment, 49(1), 71–75.',
  questions: [
    { text: 'In most ways my life is close to my ideal.' },
    { text: 'The conditions of my life are excellent.' },
    { text: 'I am satisfied with my life.' },
    { text: 'So far I have gotten the important things I want in life.' },
    { text: 'If I could live my life over, I would change almost nothing.' },
  ],
  scaleLabels: ['Strongly Disagree', 'Disagree', 'Slightly Disagree', 'Neither', 'Slightly Agree', 'Agree', 'Strongly Agree'],
  scaleMin: 1,
  scaleMax: 7,
  scoreType: 'sum',
  categories: [
    { min: 31, max: 35, label: 'Extremely Satisfied', emoji: '🌟', description: 'You feel your life is going wonderfully.', insight: 'People in this range feel deeply fulfilled across most areas of life. You likely feel that your life matches — or even exceeds — your ideals. Research shows this level of satisfaction is associated with strong social bonds, meaningful work, and a sense of purpose.' },
    { min: 26, max: 30, label: 'Satisfied', emoji: '☀️', description: 'You feel good about your life overall.', insight: 'You are generally happy with where your life is. While no life is perfect, you feel the important things are mostly in place. People at this level tend to have good relationships, engage in fulfilling activities, and feel their daily life aligns well with their values.' },
    { min: 21, max: 25, label: 'Slightly Satisfied', emoji: '🌤️', description: 'Life is going pretty well for you.', insight: 'You see your life positively overall, though there are areas you would like to improve. This is a common and healthy range — it suggests a realistic appreciation for what is good, combined with awareness of room for growth.' },
    { min: 20, max: 20, label: 'Neutral', emoji: '⚖️', description: 'Your satisfaction is balanced.', insight: 'You feel neither particularly satisfied nor dissatisfied. This can reflect a transitional period, a balanced perspective, or a life that has both meaningful highs and significant challenges. It is worth reflecting on which areas pull your satisfaction up — and which pull it down.' },
    { min: 15, max: 19, label: 'Slightly Dissatisfied', emoji: '🌥️', description: 'Some areas of life could be better.', insight: 'You recognize that several important areas of your life are not where you would like them to be. This is a common range and does not indicate anything is wrong with you — it may reflect real circumstances that deserve attention, such as work dissatisfaction, relationship challenges, or unmet goals.' },
    { min: 10, max: 14, label: 'Dissatisfied', emoji: '☁️', description: 'Life feels unsatisfying in important ways.', insight: 'You feel that significant parts of your life are not going well. This may reflect difficult circumstances — financial stress, relationship problems, health challenges, or lack of purpose. Research suggests that focused effort on even one key area (relationships, meaningful activity, physical health) can meaningfully shift satisfaction over time.' },
    { min: 5, max: 9, label: 'Extremely Dissatisfied', emoji: '🌧️', description: 'Life feels deeply unsatisfying right now.', insight: 'You are experiencing significant dissatisfaction across most areas of life. This level of dissatisfaction is often associated with major life difficulties. If this resonates, consider reaching out — talking to a counselor, therapist, or trusted person in your life can help. You deserve support.' },
  ],
}

// ─── Rosenberg Self-Esteem ──────────────────────────
export const rosenbergConfig: AssessmentConfig = {
  id: 'rosenberg',
  title: 'Rosenberg Self-Esteem Scale',
  subtitle: 'How do you feel about yourself?',
  description: 'The Rosenberg Self-Esteem Scale is the most widely used measure of global self-worth, developed by Morris Rosenberg in 1965.',
  citation: 'Rosenberg, M. (1965). Society and the Adolescent Self-Image. Princeton University Press.',
  questions: [
    { text: 'I feel that I am a person of worth, at least on an equal plane with others.' },
    { text: 'I feel that I have a number of good qualities.' },
    { text: 'All in all, I am inclined to feel that I am a failure.', reverseScored: true },
    { text: 'I am able to do things as well as most other people.' },
    { text: 'I feel I do not have much to be proud of.', reverseScored: true },
    { text: 'I take a positive attitude toward myself.' },
    { text: 'On the whole, I am satisfied with myself.' },
    { text: 'I wish I could have more respect for myself.', reverseScored: true },
    { text: 'I certainly feel useless at times.', reverseScored: true },
    { text: 'At times I think I am no good at all.', reverseScored: true },
  ],
  scaleLabels: ['Strongly Disagree', 'Disagree', 'Agree', 'Strongly Agree'],
  scaleMin: 0,
  scaleMax: 3,
  scoreType: 'sum',
  categories: [
    { min: 25, max: 30, label: 'High Self-Esteem', emoji: '🌿', description: 'You have a strong, healthy sense of self-worth.', insight: 'You view yourself positively and feel confident in your value as a person. High self-esteem is associated with resilience, better stress management, and healthier relationships. You likely bounce back from setbacks with relative ease and maintain a stable sense of who you are.' },
    { min: 15, max: 24, label: 'Normal Self-Esteem', emoji: '🌤️', description: 'Your self-esteem is in the typical range.', insight: 'Like most people, you have a generally positive but sometimes fluctuating view of yourself. You probably have moments of self-doubt mixed with genuine self-appreciation. This is the most common range and suggests a realistic self-view.' },
    { min: 0, max: 14, label: 'Low Self-Esteem', emoji: '☁️', description: 'You may be struggling with how you see yourself.', insight: 'You tend to view yourself negatively or feel that you fall short. Low self-esteem can be influenced by past experiences, current stress, or patterns of negative self-talk. Research shows that self-esteem can be improved through therapy (especially CBT), self-compassion practices, and building competence in areas you care about. Consider talking to someone you trust.' },
  ],
}

// ─── Grit Scale ─────────────────────────────────────
export const gritConfig: AssessmentConfig = {
  id: 'grit',
  title: 'Short Grit Scale (Grit-S)',
  subtitle: 'How much perseverance and passion do you bring to your long-term goals?',
  description: 'The Short Grit Scale measures your tendency to sustain interest and effort toward long-term goals. Developed by Angela Duckworth.',
  citation: 'Duckworth, A. L., & Quinn, P. D. (2009). Development and validation of the Short Grit Scale (Grit-S). Journal of Personality Assessment, 91(2), 166–174.',
  questions: [
    { text: 'New ideas and projects sometimes distract me from previous ones.', reverseScored: true },
    { text: 'Setbacks don\'t discourage me. I don\'t give up easily.' },
    { text: 'I often set a goal but later choose to pursue a different one.', reverseScored: true },
    { text: 'I am a hard worker.' },
    { text: 'I have difficulty maintaining my focus on projects that take more than a few months to complete.', reverseScored: true },
    { text: 'I finish whatever I begin.' },
    { text: 'My interests change from year to year.', reverseScored: true },
    { text: 'I am diligent. I never give up.' },
  ],
  scaleLabels: ['Not at all like me', 'Not much like me', 'Somewhat like me', 'Mostly like me', 'Very much like me'],
  scaleMin: 1,
  scaleMax: 5,
  scoreType: 'average',
  subscales: [
    { name: 'Consistency of Interest', questionIndices: [0, 2, 4, 6], description: 'How well you maintain focus on the same goals over time.' },
    { name: 'Perseverance of Effort', questionIndices: [1, 3, 5, 7], description: 'How hard you work and how well you bounce back from setbacks.' },
  ],
  categories: [
    { min: 4.1, max: 5.0, label: 'Very Gritty', emoji: '🔥', description: 'You show exceptional perseverance and passion consistency.', insight: 'You are remarkably persistent in pursuing your long-term goals. You maintain interest in the same objectives over years and push through setbacks with determination. Research links high grit to achievement in demanding fields — from West Point military training to National Spelling Bee competitions. Your combination of sustained passion and effort is a powerful predictor of success.' },
    { min: 3.5, max: 4.09, label: 'Gritty', emoji: '💪', description: 'You show strong perseverance and goal commitment.', insight: 'You are more persistent than most people. You tend to stick with goals and work hard even when progress is slow. While you may occasionally shift directions, you generally follow through on what matters to you. This level of grit is associated with higher achievement and life satisfaction.' },
    { min: 2.5, max: 3.49, label: 'Moderate Grit', emoji: '🌤️', description: 'You show average perseverance with room to grow.', insight: 'You have a moderate level of grit — sometimes you stick with things, sometimes you move on. This is very common and does not predict failure. Research suggests grit can be developed by finding work that feels purposeful, practicing deliberate effort, and building habits of follow-through in small areas first.' },
    { min: 1.0, max: 2.49, label: 'Developing Grit', emoji: '🌱', description: 'You may find it challenging to stick with long-term goals.', insight: 'You tend to shift interests frequently or give up when things get hard. This does not mean you lack potential — it may mean you have not yet found work or goals that truly engage you. Duckworth\'s research shows that grit grows when you discover something worth being gritty about. Focus on finding your passion first, then practice perseverance.' },
  ],
}

// ─── Growth Mindset ─────────────────────────────────
export const mindsetConfig: AssessmentConfig = {
  id: 'mindset',
  title: 'Growth Mindset Scale',
  subtitle: 'Do you believe your abilities can change?',
  description: 'Based on Carol Dweck\'s Implicit Theories of Intelligence research. Measures whether you hold a growth mindset (abilities can be developed) or a fixed mindset (abilities are innate).',
  citation: 'Dweck, C. S. (1999). Self-theories: Their role in motivation, personality, and development. Psychology Press.',
  questions: [
    { text: 'You have a certain amount of intelligence, and you can\'t really do much to change it.', reverseScored: true },
    { text: 'Your intelligence is something about you that you can\'t change very much.', reverseScored: true },
    { text: 'No matter who you are, you can significantly change your intelligence level.', reverseScored: false },
    { text: 'To be honest, you can\'t really change how intelligent you are.', reverseScored: true },
    { text: 'You can always substantially change how intelligent you are.', reverseScored: false },
    { text: 'You can learn new things, but you can\'t really change your basic intelligence.', reverseScored: true },
    { text: 'No matter how much intelligence you have, you can always change it quite a bit.', reverseScored: false },
    { text: 'You can change even your basic intelligence level considerably.', reverseScored: false },
  ],
  scaleLabels: ['Strongly Disagree', 'Disagree', 'Somewhat Disagree', 'Somewhat Agree', 'Agree', 'Strongly Agree'],
  scaleMin: 1,
  scaleMax: 6,
  scoreType: 'average',
  categories: [
    { min: 5.0, max: 6.0, label: 'Strong Growth Mindset', emoji: '🌱', description: 'You strongly believe abilities can be developed.', insight: 'You firmly believe that intelligence and ability can grow through effort, learning, and persistence. Dweck\'s research shows that people with a strong growth mindset embrace challenges, persist through difficulty, learn from criticism, and find inspiration in others\' success. This belief pattern is associated with greater achievement, resilience, and willingness to take on hard things.' },
    { min: 4.0, max: 4.99, label: 'Growth Mindset', emoji: '🌿', description: 'You generally believe abilities can improve.', insight: 'You lean toward believing that people can develop their abilities. You likely see effort as a path to mastery rather than a sign of inadequacy. This mindset orientation is associated with better academic and professional outcomes, more adaptive responses to failure, and a willingness to stretch beyond your comfort zone.' },
    { min: 3.0, max: 3.99, label: 'Mixed Mindset', emoji: '⚖️', description: 'Your beliefs about ability are mixed.', insight: 'You hold a blend of growth and fixed beliefs. In some areas, you may believe effort can lead to improvement; in others, you may feel ability is mostly set. This is very common. Research suggests you can shift toward a growth orientation by paying attention to when you use fixed-mindset language ("I\'m just not a math person") and reframing it ("I haven\'t mastered this yet").' },
    { min: 1.0, max: 2.99, label: 'Fixed Mindset', emoji: '🪨', description: 'You tend to believe abilities are innate and stable.', insight: 'You tend to view intelligence and ability as largely fixed traits. This is not uncommon — many people hold this belief. However, Dweck\'s research shows that this view can lead to avoiding challenges, giving up easily, and feeling threatened by others\' success. The good news: mindset itself is changeable. Simply learning about growth mindset has been shown to shift beliefs and improve outcomes.' },
  ],
}

// ─── Big Five (IPIP-20 Mini) ────────────────────────
export const bigfiveConfig: AssessmentConfig = {
  id: 'bigfive',
  title: 'Big Five Personality (IPIP-20)',
  subtitle: 'What does your personality look like across five core dimensions?',
  description: 'The IPIP-20 is a brief measure of the Big Five personality traits from the International Personality Item Pool. It maps your personality across Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.',
  citation: 'Donnellan, M. B., Oswald, F. L., Baird, B. M., & Lucas, R. E. (2006). The Mini-IPIP Scales: Tiny-yet-effective measures of the Big Five factors of personality. Psychological Assessment, 18(2), 166–174.',
  questions: [
    // Extraversion
    { text: 'I am the life of the party.' },
    { text: 'I don\'t talk a lot.', reverseScored: true },
    { text: 'I talk to a lot of different people at parties.' },
    { text: 'I keep in the background.', reverseScored: true },
    // Agreeableness
    { text: 'I sympathize with others\' feelings.' },
    { text: 'I am not interested in other people\'s problems.', reverseScored: true },
    { text: 'I feel others\' emotions.' },
    { text: 'I am not really interested in others.', reverseScored: true },
    // Conscientiousness
    { text: 'I get chores done right away.' },
    { text: 'I often forget to put things back in their proper place.', reverseScored: true },
    { text: 'I like order.' },
    { text: 'I make a mess of things.', reverseScored: true },
    // Neuroticism
    { text: 'I have frequent mood swings.' },
    { text: 'I am relaxed most of the time.', reverseScored: true },
    { text: 'I get upset easily.' },
    { text: 'I seldom feel blue.', reverseScored: true },
    // Openness
    { text: 'I have a vivid imagination.' },
    { text: 'I am not interested in abstract ideas.', reverseScored: true },
    { text: 'I have difficulty understanding abstract ideas.', reverseScored: true },
    { text: 'I do not have a good imagination.', reverseScored: true },
  ],
  scaleLabels: ['Strongly Disagree', 'Disagree', 'Neither', 'Agree', 'Strongly Agree'],
  scaleMin: 1,
  scaleMax: 5,
  scoreType: 'average',
  subscales: [
    { name: 'Extraversion', questionIndices: [0, 1, 2, 3], description: 'How energized you are by social interaction and external stimulation.' },
    { name: 'Agreeableness', questionIndices: [4, 5, 6, 7], description: 'How much you prioritize others\' needs and maintain social harmony.' },
    { name: 'Conscientiousness', questionIndices: [8, 9, 10, 11], description: 'How organized, disciplined, and goal-directed you are.' },
    { name: 'Neuroticism', questionIndices: [12, 13, 14, 15], description: 'How much you experience negative emotions like anxiety and sadness.' },
    { name: 'Openness', questionIndices: [16, 17, 18, 19], description: 'How open you are to new ideas, experiences, and imagination.' },
  ],
  categories: [
    { min: 3.8, max: 5.0, label: 'Rich Personality Profile', emoji: '🧬', description: 'Your personality scores are notably high across dimensions.', insight: 'Your Big Five profile shows strong expression across multiple traits. The most useful insight from the Big Five is not a single score, but how your five dimensions interact. Check your subscale scores below — they paint a unique portrait of who you are. No combination is better or worse; each pattern has distinct strengths and challenges.' },
    { min: 2.5, max: 3.79, label: 'Balanced Profile', emoji: '⚖️', description: 'Your personality shows a balanced mix of traits.', insight: 'Your overall profile falls in the moderate range, which is where most people land. The real value is in the individual subscales below — you likely have some traits that are higher and others that are lower, creating a unique personality signature. Research shows that understanding your specific pattern helps with career choice, relationship dynamics, and self-awareness.' },
    { min: 1.0, max: 2.49, label: 'Reserved Profile', emoji: '🌊', description: 'Your personality tends toward the quieter, more measured end.', insight: 'Your overall scores trend lower, which may reflect introversion, emotional stability, independence, or a preference for simplicity. Again, the individual dimensions below are what matter most — this overall score is less meaningful than your unique pattern across the five traits.' },
  ],
}

// ─── PERMA Profiler ─────────────────────────────────
export const permaConfig: AssessmentConfig = {
  id: 'perma',
  title: 'PERMA Profiler',
  subtitle: 'How are you flourishing across five pillars of well-being?',
  description: 'The PERMA Profiler measures five pillars of well-being identified by Martin Seligman: Positive Emotion, Engagement, Relationships, Meaning, and Accomplishment.',
  citation: 'Butler, J., & Kern, M. L. (2016). The PERMA-Profiler: A brief multidimensional measure of flourishing. International Journal of Wellbeing, 6(3), 1–48.',
  questions: [
    // Positive Emotion (P)
    { text: 'In general, how often do you feel joyful?' },
    { text: 'How often do you feel positive?' },
    { text: 'In general, to what extent do you feel contented?' },
    // Engagement (E)
    { text: 'How often do you become absorbed in what you are doing?' },
    { text: 'In general, to what extent do you feel excited and interested in things?' },
    { text: 'How often do you lose track of time while doing something you enjoy?' },
    // Relationships (R)
    { text: 'To what extent do you receive help and support from others when you need it?' },
    { text: 'To what extent do you feel loved?' },
    { text: 'How satisfied are you with your personal relationships?' },
    // Meaning (M)
    { text: 'In general, to what extent do you lead a purposeful and meaningful life?' },
    { text: 'In general, to what extent do you feel that what you do in your life is valuable and worthwhile?' },
    { text: 'To what extent do you generally feel you have a sense of direction in your life?' },
    // Accomplishment (A)
    { text: 'How much of the time do you feel you are making progress towards accomplishing your goals?' },
    { text: 'How often do you achieve the important goals you have set for yourself?' },
    { text: 'How often are you able to handle your responsibilities?' },
  ],
  scaleLabels: ['Not at All', 'Very Rarely', 'Rarely', 'Sometimes', 'Often', 'Very Often', 'Almost Always', 'Completely/Always', 'Very Much So', 'Absolutely/Always'],
  scaleMin: 0,
  scaleMax: 10,
  scoreType: 'average',
  subscales: [
    { name: 'Positive Emotion', questionIndices: [0, 1, 2], description: 'How often you experience joy, contentment, and positive feelings.' },
    { name: 'Engagement', questionIndices: [3, 4, 5], description: 'How absorbed and interested you become in activities.' },
    { name: 'Relationships', questionIndices: [6, 7, 8], description: 'The quality and support of your social connections.' },
    { name: 'Meaning', questionIndices: [9, 10, 11], description: 'How purposeful and valuable your life feels.' },
    { name: 'Accomplishment', questionIndices: [12, 13, 14], description: 'Your sense of progress and achievement toward goals.' },
  ],
  categories: [
    { min: 8.0, max: 10.0, label: 'Flourishing', emoji: '🌻', description: 'You are thriving across the pillars of well-being.', insight: 'You report high levels of well-being across most dimensions. Seligman\'s research shows that flourishing is not about being happy all the time — it\'s about having a rich combination of positive emotion, deep engagement, strong relationships, a sense of meaning, and real accomplishment. You appear to have this combination working well in your life.' },
    { min: 6.0, max: 7.99, label: 'Doing Well', emoji: '☀️', description: 'Your well-being is solid with room to grow.', insight: 'You are doing well overall, with some pillars stronger than others. Check your subscale scores below to see where you shine and where there might be room for growth. Research shows that targeting your weakest pillar often produces the biggest gains in overall well-being.' },
    { min: 4.0, max: 5.99, label: 'Moderate Well-Being', emoji: '🌤️', description: 'Your well-being is moderate — some areas strong, others challenging.', insight: 'Your well-being is mixed, which is common and very human. Some pillars of your life may be working well while others feel lacking. The PERMA framework is useful here because it pinpoints exactly where to focus. Even small improvements in your lowest-scoring pillar can shift your overall sense of flourishing.' },
    { min: 0, max: 3.99, label: 'Struggling', emoji: '🌥️', description: 'You may be finding it hard to feel good about life right now.', insight: 'Your scores suggest you are going through a difficult period across several areas of well-being. This is not a permanent state — it is a snapshot of where you are right now. Seligman\'s research shows that well-being can be built intentionally. Consider starting with one pillar: strengthening even one relationship, finding one meaningful activity, or setting one small achievable goal.' },
  ],
}

// ─── Subjective Happiness Scale ─────────────────────
export const happinessConfig: AssessmentConfig = {
  id: 'happiness',
  title: 'Subjective Happiness Scale',
  subtitle: 'How happy are you, in your own estimation?',
  description: 'The Subjective Happiness Scale is a 4-item measure of global subjective happiness developed by Sonja Lyubomirsky. It captures your own sense of how happy you are, both in absolute terms and relative to others.',
  citation: 'Lyubomirsky, S., & Lepper, H. S. (1999). A measure of subjective happiness: Preliminary reliability and construct validation. Social Indicators Research, 46, 137–155.',
  questions: [
    { text: 'In general, I consider myself a very happy person.' },
    { text: 'Compared to most of my peers, I consider myself happier.' },
    { text: 'Some people are generally very happy. They enjoy life regardless of what is going on, getting the most out of everything. To what extent does this description apply to you?' },
    { text: 'Some people are generally not very happy. Although they are not depressed, they never seem as happy as they might be. To what extent does this description apply to you?', reverseScored: true },
  ],
  scaleLabels: ['Not at all', 'Slightly', 'Somewhat', 'Moderately', 'Quite a bit', 'Very much', 'A great deal'],
  scaleMin: 1,
  scaleMax: 7,
  scoreType: 'average',
  categories: [
    { min: 6.0, max: 7.0, label: 'Very Happy', emoji: '✨', description: 'You see yourself as a deeply happy person.', insight: 'You rate yourself as very happy, both in absolute terms and compared to others. Lyubomirsky\'s research shows that people who score this high tend to interpret life events more positively, maintain optimism during challenges, and engage in behaviors that sustain happiness — like expressing gratitude, nurturing relationships, and finding meaning in daily activities.' },
    { min: 5.0, max: 5.99, label: 'Happy', emoji: '☀️', description: 'You generally feel happy with your life.', insight: 'You consider yourself a happy person overall. This is a healthy, above-average level of subjective happiness. Research suggests you likely have good coping strategies and a generally positive outlook, even if life is not perfect. Happiness at this level is associated with better health outcomes, stronger relationships, and greater career satisfaction.' },
    { min: 4.0, max: 4.99, label: 'Moderately Happy', emoji: '🌤️', description: 'Your happiness is at a moderate, common level.', insight: 'Your happiness level is in the middle range — you feel okay, but perhaps not as happy as you would like. This is the most common range. Lyubomirsky\'s research on the "happiness pie" suggests that about 40% of happiness is within your control through intentional activities. Small daily practices — gratitude journaling, acts of kindness, savoring positive moments — have been shown to meaningfully increase happiness over time.' },
    { min: 2.5, max: 3.99, label: 'Somewhat Unhappy', emoji: '🌥️', description: 'You feel less happy than you would like.', insight: 'You see yourself as less happy than most. This may reflect genuine challenges in your life or a tendency toward self-critical evaluation. Either way, the research is encouraging: happiness is more malleable than people think. Interventions like cognitive behavioral strategies, strengthening social connections, and engaging in flow-producing activities have been shown to increase happiness even for people starting at lower levels.' },
    { min: 1.0, max: 2.49, label: 'Unhappy', emoji: '☁️', description: 'You are experiencing low happiness right now.', insight: 'You rate yourself as quite unhappy. This score reflects genuine distress or dissatisfaction. While the Subjective Happiness Scale is not a clinical tool, low scores are associated with risk for depression and reduced quality of life. Consider reaching out to a counselor or therapist — research strongly supports that professional help can make a real difference. You are not stuck where you are.' },
  ],
}

// ─── DASS-21 ────────────────────────────────────────
export const dass21Config: AssessmentConfig = {
  id: 'dass21',
  title: 'DASS-21',
  subtitle: 'How have you been feeling over the past week?',
  description: 'The DASS-21 measures three related negative emotional states: Depression, Anxiety, and Stress. It is not a diagnostic tool — it measures symptoms you have been experiencing recently. Important: If you are in crisis, please contact the 988 Suicide and Crisis Lifeline (call or text 988).',
  citation: 'Lovibond, S. H., & Lovibond, P. F. (1995). Manual for the Depression Anxiety Stress Scales (2nd ed.). Psychology Foundation of Australia.',
  questions: [
    // Depression (D)
    { text: 'I couldn\'t seem to experience any positive feeling at all.' },
    { text: 'I found it difficult to work up the initiative to do things.' },
    { text: 'I felt that I had nothing to look forward to.' },
    { text: 'I felt down-hearted and blue.' },
    { text: 'I was unable to become enthusiastic about anything.' },
    { text: 'I felt I wasn\'t worth much as a person.' },
    { text: 'I felt that life was meaningless.' },
    // Anxiety (A)
    { text: 'I was aware of dryness of my mouth.' },
    { text: 'I experienced breathing difficulty (e.g., excessively rapid breathing, breathlessness in the absence of physical exertion).' },
    { text: 'I experienced trembling (e.g., in the hands).' },
    { text: 'I was worried about situations in which I might panic and make a fool of myself.' },
    { text: 'I felt I was close to panic.' },
    { text: 'I was aware of the action of my heart in the absence of physical exertion (e.g., sense of heart rate increase, heart missing a beat).' },
    { text: 'I felt scared without any good reason.' },
    // Stress (S)
    { text: 'I found it hard to wind down.' },
    { text: 'I tended to over-react to situations.' },
    { text: 'I felt that I was using a lot of nervous energy.' },
    { text: 'I found myself getting agitated.' },
    { text: 'I found it difficult to relax.' },
    { text: 'I was intolerant of anything that kept me from getting on with what I was doing.' },
    { text: 'I felt that I was rather touchy.' },
  ],
  scaleLabels: ['Did not apply to me at all', 'Applied to me to some degree', 'Applied to me a considerable degree', 'Applied to me very much'],
  scaleMin: 0,
  scaleMax: 3,
  scoreType: 'sum',
  subscales: [
    { name: 'Depression', questionIndices: [0, 1, 2, 3, 4, 5, 6], description: 'Feelings of hopelessness, low mood, lack of interest, and self-deprecation.' },
    { name: 'Anxiety', questionIndices: [7, 8, 9, 10, 11, 12, 13], description: 'Physical arousal, panic, fear, and worry symptoms.' },
    { name: 'Stress', questionIndices: [14, 15, 16, 17, 18, 19, 20], description: 'Tension, irritability, agitation, and difficulty relaxing.' },
  ],
  categories: [
    { min: 0, max: 30, label: 'Low Symptoms', emoji: '🌿', description: 'Your symptom levels are in the normal range.', insight: 'Your combined scores across depression, anxiety, and stress are low. This suggests you have been coping well recently. Check the subscale scores below for a more nuanced picture — it is possible to be low on two and higher on one. Remember that this reflects the past week, not a permanent state.' },
    { min: 31, max: 47, label: 'Mild to Moderate Symptoms', emoji: '🌥️', description: 'You are experiencing some emotional distress.', insight: 'Your scores suggest mild to moderate levels of depression, anxiety, or stress. This is common during challenging periods. Look at your subscale scores to see which area is contributing most. Research shows that regular exercise, adequate sleep, social connection, and stress management techniques can help. If symptoms persist, consider speaking with a professional.' },
    { min: 48, max: 63, label: 'Moderate to Severe Symptoms', emoji: '☁️', description: 'You are experiencing significant emotional distress.', insight: 'Your scores indicate notable distress across one or more areas. This level of symptoms often benefits from professional support. A therapist or counselor can help you develop coping strategies tailored to what you are experiencing. Cognitive Behavioral Therapy (CBT) has strong evidence for treating depression, anxiety, and stress. Reaching out is a sign of strength, not weakness.' },
  ],
}

// ─── Hope Scale ─────────────────────────────────────
export const hopeConfig: AssessmentConfig = {
  id: 'hope',
  title: 'Adult Hope Scale',
  subtitle: 'How goal-directed and resourceful is your thinking?',
  description: 'The Adult Hope Scale measures two components of hopeful thinking: Agency (your sense that you can achieve goals) and Pathways (your ability to generate routes to those goals). Hope in this context is not wishful thinking — it is a measurable cognitive pattern.',
  citation: 'Snyder, C. R., Harris, C., Anderson, J. R., Holleran, S. A., Irving, L. M., Sigmon, S. T., ... & Harney, P. (1991). The will and the ways: Development and validation of an individual-differences measure of hope. Journal of Personality and Social Psychology, 60(4), 570–585.',
  questions: [
    { text: 'I can think of many ways to get out of a jam.' },  // Pathways
    { text: 'I energetically pursue my goals.' },  // Agency
    { text: 'I feel tired most of the time.', reverseScored: true },  // Filler (not scored)
    { text: 'There are lots of ways around any problem.' },  // Pathways
    { text: 'I am easily downed in an argument.', reverseScored: true },  // Filler (not scored)
    { text: 'I can think of many ways to get the things in life that are most important to me.' },  // Pathways
    { text: 'I worry about my health.', reverseScored: true },  // Filler (not scored)
    { text: 'Even when others get discouraged, I know I can find a way to solve the problem.' },  // Pathways
    { text: 'My past experiences have prepared me well for my future.' },  // Agency
    { text: 'I\'ve been pretty successful in life.' },  // Agency
    { text: 'I usually find myself worrying about something.', reverseScored: true },  // Filler (not scored)
    { text: 'I meet the goals that I set for myself.' },  // Agency
  ],
  scaleLabels: ['Definitely False', 'Mostly False', 'Somewhat False', 'Slightly False', 'Slightly True', 'Somewhat True', 'Mostly True', 'Definitely True'],
  scaleMin: 1,
  scaleMax: 8,
  scoreType: 'average',
  subscales: [
    { name: 'Pathways Thinking', questionIndices: [0, 3, 5, 7], description: 'Your ability to generate multiple routes toward your goals.' },
    { name: 'Agency Thinking', questionIndices: [1, 8, 9, 11], description: 'Your belief in your capacity to initiate and sustain action toward goals.' },
  ],
  categories: [
    { min: 6.5, max: 8.0, label: 'High Hope', emoji: '🌟', description: 'You have a strong, goal-directed thinking pattern.', insight: 'You score high in hope — meaning you are both good at imagining multiple paths to your goals AND confident in your ability to follow through. Snyder\'s research shows that high-hope individuals perform better academically, cope better with illness, recover faster from injury, and experience greater psychological well-being. Hope is not naivete — it is strategic, flexible thinking combined with motivational energy.' },
    { min: 5.0, max: 6.49, label: 'Moderate Hope', emoji: '🌤️', description: 'Your hope thinking is in the healthy, typical range.', insight: 'You have a solid foundation of hope. You can usually think of ways to reach your goals and feel reasonably capable of pursuing them. Check your subscale scores — if Pathways is lower, practice brainstorming multiple approaches to problems. If Agency is lower, focus on building confidence through small wins and reflecting on past successes.' },
    { min: 3.0, max: 4.99, label: 'Low-Moderate Hope', emoji: '🌥️', description: 'You may be struggling to see paths forward or feel capable of change.', insight: 'Your hope scores are below average, which may mean you are having difficulty seeing solutions to problems or feeling motivated to pursue goals. This is often temporary and linked to life circumstances. Hope can be deliberately cultivated: setting smaller, achievable goals; recalling past successes; and working with a mentor or therapist to develop problem-solving skills can all increase hope over time.' },
    { min: 1.0, max: 2.99, label: 'Low Hope', emoji: '☁️', description: 'You are finding it difficult to see ways forward right now.', insight: 'Low hope scores reflect a real struggle — either in generating solutions to problems, in believing you can follow through, or both. This does not mean you are hopeless as a person. It means your thinking patterns are currently constrained, often due to stress, trauma, or prolonged difficulty. Research shows that hope can be rebuilt through therapeutic approaches, especially those focused on goal-setting, problem-solving, and self-efficacy. Consider reaching out for support.' },
  ],
}

// ─── Self-Compassion Scale (Short Form) ─────────────
export const selfcompassionConfig: AssessmentConfig = {
  id: 'selfcompassion',
  title: 'Self-Compassion Scale (Short Form)',
  subtitle: 'How do you treat yourself when things go wrong?',
  description: 'The Self-Compassion Scale Short Form measures how kind versus critical you are toward yourself during difficult times. Developed by Kristin Neff, it captures six facets: Self-Kindness, Self-Judgment, Common Humanity, Isolation, Mindfulness, and Over-Identification.',
  citation: 'Raes, F., Pommier, E., Neff, K. D., & Van Gucht, D. (2011). Construction and factorial validation of a short form of the Self-Compassion Scale. Clinical Psychology & Psychotherapy, 18(3), 250–255.',
  questions: [
    { text: 'When I fail at something important to me, I become consumed by feelings of inadequacy.', reverseScored: true },  // Self-Judgment
    { text: 'I try to be understanding and patient towards those aspects of my personality I don\'t like.' },  // Self-Kindness
    { text: 'When something painful happens, I try to take a balanced view of the situation.' },  // Mindfulness
    { text: 'When I\'m feeling down, I tend to feel like most other people are probably happier than I am.', reverseScored: true },  // Isolation
    { text: 'I try to see my failings as part of the human condition.' },  // Common Humanity
    { text: 'When I\'m going through a very hard time, I give myself the caring and tenderness I need.' },  // Self-Kindness
    { text: 'When something upsets me, I try to keep my emotions in balance.' },  // Mindfulness
    { text: 'When I fail at something that\'s important to me, I tend to feel alone in my failure.', reverseScored: true },  // Isolation
    { text: 'When I\'m feeling down, I tend to obsess and fixate on everything that\'s wrong.', reverseScored: true },  // Over-Identification
    { text: 'When I feel inadequate in some way, I try to remind myself that feelings of inadequacy are shared by most people.' },  // Common Humanity
    { text: 'I\'m disapproving and judgmental about my own flaws and shortcomings.', reverseScored: true },  // Self-Judgment
    { text: 'When I go through very hard times, I tend to be tough on myself rather than compassionate.', reverseScored: true },  // Over-Identification (replaced to keep it a clean 12)
  ],
  scaleLabels: ['Almost Never', 'Rarely', 'Sometimes', 'Often', 'Almost Always'],
  scaleMin: 1,
  scaleMax: 5,
  scoreType: 'average',
  subscales: [
    { name: 'Self-Kindness', questionIndices: [1, 5], description: 'Being warm and understanding toward yourself rather than harshly critical.' },
    { name: 'Common Humanity', questionIndices: [4, 9], description: 'Seeing your struggles as part of the shared human experience.' },
    { name: 'Mindfulness', questionIndices: [2, 6], description: 'Holding painful thoughts and feelings in balanced awareness.' },
  ],
  categories: [
    { min: 4.0, max: 5.0, label: 'High Self-Compassion', emoji: '💛', description: 'You treat yourself with consistent warmth and understanding.', insight: 'You score high in self-compassion, meaning you tend to be kind to yourself when things go wrong, see your struggles as part of being human, and maintain a balanced perspective on negative experiences. Neff\'s research links high self-compassion to lower anxiety, less depression, greater emotional resilience, and — contrary to what many fear — higher motivation and personal standards, not lower ones.' },
    { min: 3.0, max: 3.99, label: 'Moderate Self-Compassion', emoji: '🌤️', description: 'You show some self-compassion, but are sometimes hard on yourself.', insight: 'You have a moderate level of self-compassion — you can be kind to yourself sometimes, but you also fall into self-criticism, isolation, or over-identification with negative thoughts. This is the most common range. Research shows that self-compassion is a skill that can be developed through practice. Neff\'s self-compassion exercises (like the "self-compassion break") have been shown to produce meaningful improvements in as little as a few weeks.' },
    { min: 2.0, max: 2.99, label: 'Low Self-Compassion', emoji: '🌥️', description: 'You tend to be hard on yourself when struggling.', insight: 'You are more self-critical than self-compassionate. When things go wrong, you may beat yourself up, feel isolated in your pain, or get swept up in negative thoughts. Many high-achievers score in this range — the inner critic can feel motivating, but research shows it actually undermines performance and well-being. Self-compassion training, mindfulness practices, and therapy (especially Compassion-Focused Therapy) can help you develop a healthier relationship with yourself.' },
    { min: 1.0, max: 1.99, label: 'Very Low Self-Compassion', emoji: '☁️', description: 'You are quite harsh with yourself during difficult times.', insight: 'Your scores suggest a strong pattern of self-criticism and difficulty extending kindness to yourself. This is often rooted in early experiences or perfectionism. Very low self-compassion is a significant risk factor for depression and burnout. The good news is that self-compassion is one of the most trainable psychological qualities. Kristin Neff\'s Mindful Self-Compassion (MSC) program has been shown to dramatically improve self-compassion scores. Consider exploring this or working with a therapist.' },
  ],
}

// Helper to get config by assessment ID
export function getAssessmentConfig(id: string): AssessmentConfig | null {
  const configs: Record<string, AssessmentConfig> = {
    swls: swlsConfig,
    rosenberg: rosenbergConfig,
    grit: gritConfig,
    mindset: mindsetConfig,
    bigfive: bigfiveConfig,
    perma: permaConfig,
    happiness: happinessConfig,
    dass21: dass21Config,
    hope: hopeConfig,
    selfcompassion: selfcompassionConfig,
  }
  return configs[id] || null
}

// Scoring function
export function calculateScore(
  config: AssessmentConfig,
  answers: number[] // raw answers (1-indexed scale values)
): { score: number; category: ScoreCategory; subscaleScores?: { name: string; score: number; description: string }[] } {
  // Apply reverse scoring
  const scoredAnswers = config.questions.map((q, i) => {
    const answer = answers[i]
    if (q.reverseScored) {
      return (config.scaleMax + config.scaleMin) - answer
    }
    return answer
  })

  // Calculate total/average
  const sum = scoredAnswers.reduce((a, b) => a + b, 0)
  const score = config.scoreType === 'average'
    ? Math.round((sum / scoredAnswers.length) * 100) / 100
    : sum

  // Find category
  const category = config.categories.find(c => score >= c.min && score <= c.max) || config.categories[config.categories.length - 1]

  // Calculate subscales if present
  let subscaleScores: { name: string; score: number; description: string }[] | undefined
  if (config.subscales) {
    subscaleScores = config.subscales.map(sub => {
      const subAnswers = sub.questionIndices.map(i => scoredAnswers[i])
      const subSum = subAnswers.reduce((a, b) => a + b, 0)
      const subScore = config.scoreType === 'average'
        ? Math.round((subSum / subAnswers.length) * 100) / 100
        : subSum
      return { name: sub.name, score: subScore, description: sub.description }
    })
  }

  return { score, category, subscaleScores }
}
