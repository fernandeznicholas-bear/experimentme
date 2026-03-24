'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { assessmentTagLabels, assessmentTagColors, type AssessmentTag } from '@/lib/assessments'

const assessments = [
  {
    slug: 'swls',
    name: 'Life Satisfaction',
    fullName: 'Satisfaction with Life Scale',
    tag: 'WELLBEING ASSESSMENT',
    abbr: 'SWLS',
    category: 'well-being' as AssessmentTag,
    percentileBadge: 'Most cited life satisfaction measure',
    description: 'The Satisfaction With Life Scale — measure your overall life satisfaction with 5 validated questions.',
    sampleQuestion: 'In most ways my life is close to my ideal.',
    questions: 5,
    time: '2 min',
    icon: '☀️',
    color: 'bg-amber/10 border-amber/20',
    scaleLabels: ['Strongly Disagree', '', '', '', '', '', 'Strongly Agree'],
    scaleMax: 7,
    live: true,
  },
  {
    slug: 'rosenberg',
    name: 'Self-Esteem',
    fullName: 'Rosenberg Self-Esteem Scale',
    tag: 'SELF-WORTH ASSESSMENT',
    abbr: 'RSE',
    category: 'self-perception' as AssessmentTag,
    percentileBadge: 'Most widely used self-esteem scale',
    description: 'The Rosenberg Self-Esteem Scale — the most widely used measure of global self-worth.',
    sampleQuestion: 'I feel that I am a person of worth, at least on an equal plane with others.',
    questions: 10,
    time: '2 min',
    icon: '🌿',
    color: 'bg-sage/10 border-sage/20',
    scaleLabels: ['Strongly Disagree', 'Disagree', 'Agree', 'Strongly Agree'],
    scaleMax: 4,
    live: true,
  },
  {
    slug: 'grit',
    name: 'Grit',
    fullName: 'Short Grit Scale (Grit-S)',
    tag: 'PERSEVERANCE ASSESSMENT',
    abbr: 'GRIT-S',
    category: 'resilience-growth' as AssessmentTag,
    percentileBadge: 'Angela Duckworth\'s landmark scale',
    description: 'The Short Grit Scale by Angela Duckworth — measure your perseverance and passion for long-term goals.',
    sampleQuestion: "Setbacks don't discourage me. I don't give up easily.",
    questions: 8,
    time: '3 min',
    icon: '🔥',
    color: 'bg-terracotta/10 border-terracotta/20',
    scaleLabels: ['Not at all like me', '', '', '', 'Very much like me'],
    scaleMax: 5,
    live: true,
  },
  {
    slug: 'mindset',
    name: 'Growth Mindset',
    fullName: 'Growth Mindset Scale',
    tag: 'MINDSET ASSESSMENT',
    abbr: 'GMS',
    category: 'resilience-growth' as AssessmentTag,
    percentileBadge: 'Based on Carol Dweck\'s research',
    description: "Based on Carol Dweck's research — discover whether you lean toward a growth or fixed mindset.",
    sampleQuestion: 'You can always substantially change how intelligent you are.',
    questions: 8,
    time: '3 min',
    icon: '🌱',
    color: 'bg-sage/10 border-sage/20',
    scaleLabels: ['Strongly Disagree', '', '', '', '', 'Strongly Agree'],
    scaleMax: 6,
    live: true,
  },
  {
    slug: 'bigfive',
    name: 'Big Five Personality',
    fullName: 'IPIP-20 Big Five Mini',
    tag: 'PERSONALITY ASSESSMENT',
    abbr: 'BIG 5',
    category: 'self-perception' as AssessmentTag,
    percentileBadge: '5 personality traits in 5 minutes',
    description: 'The IPIP-20 Mini — map your personality across Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.',
    sampleQuestion: 'I am the life of the party.',
    questions: 20,
    time: '5 min',
    icon: '🧬',
    color: 'bg-brown-light/10 border-brown-light/20',
    scaleLabels: ['Very Inaccurate', '', '', '', 'Very Accurate'],
    scaleMax: 5,
    live: true,
  },
  {
    slug: 'perma',
    name: 'PERMA Wellbeing',
    fullName: 'PERMA Profiler',
    tag: 'WELLBEING ASSESSMENT',
    abbr: 'PERMA',
    category: 'well-being' as AssessmentTag,
    percentileBadge: 'Seligman\'s 5 pillars of flourishing',
    description: "Seligman's five pillars of flourishing — Positive Emotion, Engagement, Relationships, Meaning, and Accomplishment — plus Negative Emotion and Health.",
    sampleQuestion: 'How often do you feel joyful?',
    questions: 23,
    time: '5 min',
    icon: '🌻',
    color: 'bg-amber/10 border-amber/20',
    scaleLabels: ['Never', '', '', '', '', '', '', '', '', '', 'Always'],
    scaleMax: 10,
    live: true,
  },
  {
    slug: 'happiness',
    name: 'Subjective Happiness',
    fullName: 'Subjective Happiness Scale',
    tag: 'HAPPINESS ASSESSMENT',
    abbr: 'SHS',
    category: 'well-being' as AssessmentTag,
    percentileBadge: 'Shortest validated happiness measure',
    description: 'Lyubomirsky\'s 4-item measure — the shortest validated happiness scale in psychology.',
    sampleQuestion: 'In general, I consider myself a very happy person.',
    questions: 4,
    time: '1 min',
    icon: '✨',
    color: 'bg-amber/10 border-amber/20',
    scaleLabels: ['Not at all', '', '', '', '', '', 'A great deal'],
    scaleMax: 7,
    live: true,
  },
  {
    slug: 'dass21',
    name: 'Depression, Anxiety & Stress',
    fullName: 'DASS-21',
    tag: 'MENTAL HEALTH SCREENING',
    abbr: 'DASS-21',
    category: 'mental-health' as AssessmentTag,
    percentileBadge: 'Screens depression, anxiety & stress',
    description: 'The DASS-21 — screens for depression, anxiety, and stress symptoms over the past week.',
    sampleQuestion: 'I found it hard to wind down.',
    questions: 21,
    time: '5 min',
    icon: '🧠',
    color: 'bg-[#6B7FBF]/10 border-[#6B7FBF]/20',
    scaleLabels: ['Did not apply', 'Some degree', 'Considerable', 'Very much'],
    scaleMax: 4,
    live: true,
  },
  {
    slug: 'hope',
    name: 'Hope',
    fullName: 'Adult Hope Scale',
    tag: 'HOPE ASSESSMENT',
    abbr: 'AHS',
    category: 'resilience-growth' as AssessmentTag,
    percentileBadge: 'Snyder\'s agency + pathways model',
    description: 'Snyder\'s Adult Hope Scale — measure your goal-directed thinking across agency and pathways.',
    sampleQuestion: 'I energetically pursue my goals.',
    questions: 12,
    time: '3 min',
    icon: '🌟',
    color: 'bg-terracotta/10 border-terracotta/20',
    scaleLabels: ['Definitely False', '', '', '', '', '', '', 'Definitely True'],
    scaleMax: 8,
    live: true,
  },
  {
    slug: 'selfcompassion',
    name: 'Self-Compassion',
    fullName: 'Self-Compassion Scale (Short Form)',
    tag: 'SELF-COMPASSION ASSESSMENT',
    abbr: 'SCS-SF',
    category: 'self-perception' as AssessmentTag,
    percentileBadge: 'Kristin Neff\'s self-kindness measure',
    description: 'Kristin Neff\'s Short Form — how kind vs. critical are you toward yourself during difficult times?',
    sampleQuestion: 'I try to be understanding and patient toward aspects of my personality I don\'t like.',
    questions: 12,
    time: '3 min',
    icon: '💛',
    color: 'bg-amber/10 border-amber/20',
    scaleLabels: ['Almost Never', '', '', '', 'Almost Always'],
    scaleMax: 5,
    live: true,
  },
  {
    slug: 'phq9',
    name: 'Depression (PHQ-9)',
    fullName: 'Patient Health Questionnaire (PHQ-9)',
    tag: 'DEPRESSION SCREENING',
    abbr: 'PHQ-9',
    category: 'mental-health' as AssessmentTag,
    percentileBadge: '#1 depression screener worldwide',
    description: 'The PHQ-9 — the most widely used depression screening tool in primary care, mapping directly onto DSM-5 criteria.',
    sampleQuestion: 'Little interest or pleasure in doing things.',
    questions: 9,
    time: '3 min',
    icon: '🩺',
    color: 'bg-[#6B7FBF]/10 border-[#6B7FBF]/20',
    scaleLabels: ['Not at all', 'Several days', 'More than half', 'Nearly every day'],
    scaleMax: 4,
    live: true,
  },
  {
    slug: 'gad7',
    name: 'Anxiety (GAD-7)',
    fullName: 'Generalized Anxiety Disorder Scale (GAD-7)',
    tag: 'ANXIETY SCREENING',
    abbr: 'GAD-7',
    category: 'mental-health' as AssessmentTag,
    percentileBadge: 'Gold-standard anxiety screener',
    description: 'The GAD-7 — a brief, validated screening tool for generalized anxiety disorder severity.',
    sampleQuestion: 'Feeling nervous, anxious, or on edge.',
    questions: 7,
    time: '2 min',
    icon: '😰',
    color: 'bg-[#6B7FBF]/10 border-[#6B7FBF]/20',
    scaleLabels: ['Not at all', 'Several days', 'More than half', 'Nearly every day'],
    scaleMax: 4,
    live: true,
  },
  {
    slug: 'pcl5',
    name: 'PTSD (PCL-5)',
    fullName: 'PTSD Checklist for DSM-5 (PCL-5)',
    tag: 'PTSD SCREENING',
    abbr: 'PCL-5',
    category: 'mental-health' as AssessmentTag,
    percentileBadge: 'Gold-standard PTSD symptom measure',
    description: 'The PCL-5 — assesses PTSD symptom severity across intrusion, avoidance, mood changes, and hyperarousal.',
    sampleQuestion: 'Repeated, disturbing, and unwanted memories of the stressful experience.',
    questions: 20,
    time: '5 min',
    icon: '🛡️',
    color: 'bg-[#6B7FBF]/10 border-[#6B7FBF]/20',
    scaleLabels: ['Not at all', '', '', '', 'Extremely'],
    scaleMax: 5,
    live: true,
  },
  {
    slug: 'who5',
    name: 'Well-Being (WHO-5)',
    fullName: 'WHO-5 Well-Being Index',
    tag: 'WELLBEING SCREENING',
    abbr: 'WHO-5',
    category: 'well-being' as AssessmentTag,
    percentileBadge: 'World Health Organization measure',
    description: 'The WHO-5 — one of the most widely used well-being questionnaires in the world. Just 5 items.',
    sampleQuestion: 'I have felt cheerful and in good spirits.',
    questions: 5,
    time: '1 min',
    icon: '🌍',
    color: 'bg-amber/10 border-amber/20',
    scaleLabels: ['At no time', '', '', '', '', 'All of the time'],
    scaleMax: 6,
    live: true,
  },
  {
    slug: 'cssrs',
    name: 'Suicide Risk Screen',
    fullName: 'Columbia-Suicide Severity Rating Scale (Screener)',
    tag: 'SAFETY SCREENING',
    abbr: 'C-SSRS',
    category: 'mental-health' as AssessmentTag,
    percentileBadge: 'FDA-approved suicide risk screener',
    description: 'The C-SSRS — the gold standard for suicide risk screening, used by the U.S. military, FDA, and CDC.',
    sampleQuestion: 'Have you wished you were dead or wished you could go to sleep and not wake up?',
    questions: 6,
    time: '2 min',
    icon: '🚨',
    color: 'bg-[#6B7FBF]/10 border-[#6B7FBF]/20',
    scaleLabels: ['No', 'Yes'],
    scaleMax: 2,
    live: true,
  },
]

// Marquee items for the scrolling bar
const marqueeItems = [
  'LIFE SATISFACTION (SWLS)',
  'ROSENBERG SELF-ESTEEM',
  'PERMA WELLBEING',
  'GRIT SCALE',
  'GROWTH MINDSET',
  'BIG FIVE PERSONALITY',
  'SUBJECTIVE HAPPINESS',
  'DASS-21',
  'HOPE SCALE',
  'SELF-COMPASSION',
  'PHQ-9 DEPRESSION',
  'GAD-7 ANXIETY',
  'PCL-5 PTSD',
  'WHO-5 WELL-BEING',
  'C-SSRS SUICIDE RISK',
]

export default function HomePage() {
  const router = useRouter()
  const [randomAssessment, setRandomAssessment] = useState(assessments[0])
  const [completedAssessments, setCompletedAssessments] = useState<Set<string>>(new Set())
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTag, setActiveTag] = useState<AssessmentTag | null>(null)

  useEffect(() => {
    const idx = Math.floor(Math.random() * assessments.length)
    setRandomAssessment(assessments[idx])

    const fetchCompleted = () => {
      const supabase = createClient()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      supabase.auth.getUser().then((result: any) => {
        const user = result?.data?.user
        if (user) {
          setIsLoggedIn(true)
          supabase
            .from('assessment_results')
            .select('assessment_type')
            .eq('user_id', user.id)
            .then(({ data }: { data: { assessment_type: string }[] | null }) => {
              if (data) {
                setCompletedAssessments(new Set(data.map((r: { assessment_type: string }) => r.assessment_type)))
              } else {
                setCompletedAssessments(new Set())
              }
            })
        }
      })
    }

    fetchCompleted()

    // Re-fetch when user navigates back (e.g. after deleting results on profile)
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') fetchCompleted()
    }
    document.addEventListener('visibilitychange', handleVisibility)
    window.addEventListener('focus', fetchCompleted)

    // Poll every 60s for cross-device sync — only if user is logged in
    // (fetchCompleted checks for auth, but we avoid unnecessary calls for anonymous visitors)
    const interval = setInterval(fetchCompleted, 60000)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
      window.removeEventListener('focus', fetchCompleted)
      clearInterval(interval)
    }
  }, [])

  // Build the scale buttons to show (max 7 visible)
  const scaleCount = randomAssessment.scaleMax
  const showScaleLabels = scaleCount <= 7

  return (
    <main className="min-h-screen">
      {/* Hero — split layout */}
      <section className="relative pt-28 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cream to-warm-white" />
        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <p className="inline-block px-4 py-1.5 rounded-full bg-terracotta/8 text-terracotta text-xs font-semibold tracking-wider uppercase mb-6">
              Science-Backed Self-Discovery
            </p>
            <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-brown-deep leading-[1.15] mb-6">
              The{' '}
              <em className="text-terracotta not-italic font-bold italic">Science</em>{' '}
              of You
            </h1>
            <p className="font-[family-name:var(--font-body)] text-lg text-text-muted max-w-lg mb-8 leading-relaxed">
              Real psychological research that gives you something back:
              evidence-based insight into who you are. Not a quiz. Science.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                href="#assessments"
                className="px-7 py-3.5 rounded-full bg-terracotta text-white font-semibold hover:bg-terracotta-dark transition-colors no-underline text-base"
              >
                Take Your First Assessment &rarr;
              </Link>
              <Link
                href="#researchers"
                className="text-text-muted font-semibold hover:text-terracotta transition-colors no-underline text-base"
              >
                I&apos;m a Researcher &darr;
              </Link>
            </div>
          </div>

          {/* Right: Assessment preview card */}
          <div className="relative flex justify-center">
            {/* Floating percentile badge — adapts to random assessment */}
            <div className="absolute -top-2 right-4 md:right-8 z-10 bg-white rounded-full px-4 py-2 shadow-lg border border-sage/20 flex items-center gap-2">
              <span className="text-lg">🔬</span>
              <span className="text-sage font-semibold text-sm">{randomAssessment.percentileBadge}</span>
            </div>

            {/* Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-[var(--border)] p-8 max-w-sm w-full">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-5 h-0.5 bg-sage rounded-full" />
                <span className="text-xs font-semibold tracking-wider text-sage uppercase">
                  {randomAssessment.tag}
                </span>
                <span className="text-xs text-text-muted">&middot;</span>
                <span className="text-xs font-semibold tracking-wider text-sage uppercase">
                  {randomAssessment.abbr}
                </span>
              </div>

              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-brown-deep mb-3">
                {randomAssessment.fullName}
              </h3>

              <p className="font-[family-name:var(--font-body)] text-text-muted italic text-sm mb-5 leading-relaxed">
                &ldquo;{randomAssessment.sampleQuestion}&rdquo;
              </p>

              {/* Scale buttons */}
              <div className="flex gap-1.5 mb-2">
                {Array.from({ length: scaleCount }, (_, i) => (
                  <button
                    key={i}
                    className="flex-1 h-12 rounded-lg border border-[var(--border)] bg-cream/40 hover:bg-terracotta/10 hover:border-terracotta/30 transition-colors flex flex-col items-center justify-center cursor-default"
                  >
                    <span className="text-sm font-semibold text-brown-deep">{i + 1}</span>
                  </button>
                ))}
              </div>
              {showScaleLabels && (
                <div className="flex justify-between text-[10px] text-text-muted mb-4 px-0.5">
                  <span>{randomAssessment.scaleLabels[0]}</span>
                  <span>{randomAssessment.scaleLabels[randomAssessment.scaleLabels.length - 1]}</span>
                </div>
              )}

              {/* Progress bar */}
              <div className="w-full bg-cream rounded-full h-1.5 mb-2 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-sage to-amber" style={{ width: '15%' }} />
              </div>
              <p className="text-xs text-text-muted text-right mb-5">
                Question 1 of {randomAssessment.questions}
              </p>

              <Link
                href={`/assess/${randomAssessment.slug}`}
                className="block w-full text-center px-6 py-3 rounded-full bg-terracotta text-white font-semibold hover:bg-terracotta-dark transition-colors no-underline text-sm"
              >
                Take the full assessment &rarr;
              </Link>
              <p className="text-center text-xs text-text-muted mt-2 flex items-center justify-center gap-1.5">
                <span>📊</span> See your percentile instantly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Marquee Bar */}
      <section className="bg-brown-deep overflow-hidden py-4">
        <div className="marquee-track flex whitespace-nowrap">
          {/* Duplicate for seamless loop */}
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 mx-4">
              <span className="text-cream/90 text-sm font-semibold tracking-widest uppercase font-[family-name:var(--font-ui)]">
                {item}
              </span>
              <span className="text-amber text-xs">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-warm-white">
        <div className="max-w-4xl mx-auto mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-0.5 bg-terracotta rounded-full" />
            <span className="text-xs font-semibold tracking-wider text-terracotta uppercase">How It Works</span>
          </div>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-brown-deep mb-4">
            Research that finally gives something back.
          </h2>
          <p className="font-[family-name:var(--font-body)] text-text-muted max-w-lg">
            Every assessment gives you something real in return. No data harvesting, no empty promises.
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Choose an Assessment', desc: 'Browse validated, peer-reviewed instruments. Not invented for clicks — published in journals.' },
            { step: '02', title: 'Answer Honestly', desc: 'Each assessment takes 2–10 minutes. Your responses are private and never shared individually.' },
            { step: '03', title: 'See Yourself Clearly', desc: 'Get your score, what it means, and what the science says about people who score like you.' },
          ].map((item) => (
            <div key={item.step} className="text-left px-4">
              <div className="w-12 h-12 rounded-full bg-terracotta/10 text-terracotta font-bold text-sm flex items-center justify-center mb-4">
                {item.step}
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-brown-deep mb-2">
                {item.title}
              </h3>
              <p className="font-[family-name:var(--font-body)] text-text-muted text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Assessments */}
      <section id="assessments" className="py-20 px-4 scroll-mt-20">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-brown-deep mb-4">
            Assessments
          </h2>
          <p className="font-[family-name:var(--font-body)] text-text-muted max-w-lg mx-auto">
            Every instrument is validated, peer-reviewed, and properly attributed to its original authors.
          </p>
          {isLoggedIn && completedAssessments.size > 0 && (
            <p className="mt-4 text-sm text-sage font-semibold">
              ✓ {completedAssessments.size} of {assessments.length} completed — {assessments.length - completedAssessments.size} remaining
            </p>
          )}

          {/* Tag filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setActiveTag(null)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTag === null
                  ? 'bg-brown-deep text-cream'
                  : 'bg-cream/60 text-text-muted hover:bg-cream'
              }`}
            >
              All
            </button>
            {(Object.keys(assessmentTagLabels) as AssessmentTag[]).map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeTag === tag
                    ? assessmentTagColors[tag]
                    : 'bg-cream/60 text-text-muted hover:bg-cream'
                }`}
              >
                {assessmentTagLabels[tag]}
              </button>
            ))}
          </div>
        </div>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {assessments.filter(a => !activeTag || a.category === activeTag).map((a) => {
            const isDone = completedAssessments.has(a.slug)
            return a.live ? (
              <Link
                key={a.slug}
                href={`/assess/${a.slug}`}
                className={`relative block rounded-2xl border p-6 ${a.color} hover:shadow-md transition-all no-underline group`}
              >
                {isDone ? (
                  <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-sage/20 text-sage text-[10px] font-bold uppercase tracking-wider border border-sage/30">
                    ✓ Completed
                  </span>
                ) : (
                  <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-sage text-white text-[10px] font-bold uppercase tracking-wider">
                    Take It Now
                  </span>
                )}
                <div className="text-3xl mb-3">{a.icon}</div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-brown-deep mb-1 group-hover:text-terracotta transition-colors">
                  {a.name}
                </h3>
                <p className="font-[family-name:var(--font-body)] text-text-muted text-sm mb-3 leading-relaxed">
                  {a.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-text-muted flex-wrap">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${assessmentTagColors[a.category]}`}>
                    {assessmentTagLabels[a.category]}
                  </span>
                  <span>{a.questions} questions</span>
                  <span>~{a.time}</span>
                  {isDone && <span className="text-sage font-semibold">Retake anytime</span>}
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push(`/learn/${a.slug}`) }}
                    className="text-terracotta font-semibold hover:underline ml-auto cursor-pointer"
                  >
                    Learn More
                  </button>
                </div>
              </Link>
            ) : (
              <div
                key={a.slug}
                className={`relative rounded-2xl border p-6 ${a.color} opacity-60`}
              >
                <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-brown-light/50 text-white text-[10px] font-bold uppercase tracking-wider">
                  Coming Soon
                </span>
                <div className="text-3xl mb-3">{a.icon}</div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-brown-deep mb-1">
                  {a.name}
                </h3>
                <p className="font-[family-name:var(--font-body)] text-text-muted text-sm mb-3 leading-relaxed">
                  {a.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-text-muted">
                  <span>{a.questions} questions</span>
                  <span>~{a.time}</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* For Researchers — Dark Brown */}
      <section id="researchers" className="py-20 px-4 bg-brown-deep scroll-mt-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-0.5 bg-terracotta rounded-full" />
              <span className="text-xs font-semibold tracking-wider text-terracotta-light uppercase">For Researchers</span>
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-cream leading-tight mb-4">
              Your best participant pool — already pre-screened.
            </h2>
            <p className="font-[family-name:var(--font-body)] text-cream/70 max-w-lg mb-8 leading-relaxed">
              Experiment Me is building a participant pool of motivated, engaged people already profiled on validated instruments.
              Get in early and help shape the platform.
            </p>
            <a
              href="mailto:fernandez.nicholas@gmail.com?subject=Researcher%20Interest%20-%20Experiment%20Me"
              className="inline-block px-7 py-3.5 rounded-full bg-terracotta text-white font-semibold hover:bg-terracotta-dark transition-colors no-underline"
            >
              Get Early Access &rarr;
            </a>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: String(assessments.length), label: 'Validated assessments live now' },
              { value: '100%', label: 'Open instruments — no paywalls' },
              { value: 'IRB', label: 'Friendly design from day one' },
              { value: 'Free', label: 'For participants, always' },
            ].map((stat) => (
              <div key={stat.label} className="bg-cream/8 backdrop-blur-sm rounded-xl p-5 border border-cream/10">
                <div className="font-[family-name:var(--font-heading)] text-3xl font-bold text-terracotta-light">
                  {stat.value}
                </div>
                <div className="text-sm text-cream/60 mt-1.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer — Dark Brown */}
      <footer className="bg-brown-deep py-12 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          <div>
            <p className="font-[family-name:var(--font-heading)] text-xl font-bold text-cream mb-1">
              Experiment Me
            </p>
            <p className="text-cream/50 text-sm font-[family-name:var(--font-body)] italic">
              The science of you.
            </p>
          </div>
          <nav className="flex items-center gap-6 text-sm text-cream/60 flex-wrap justify-center">
            <Link href="#assessments" className="hover:text-cream transition-colors no-underline">Assessments</Link>
            <Link href="#researchers" className="hover:text-cream transition-colors no-underline">For Researchers</Link>
            <Link href="/about" className="hover:text-cream transition-colors no-underline">About</Link>
            <Link href="/privacy" className="hover:text-cream transition-colors no-underline">Privacy</Link>
            <Link href="/terms" className="hover:text-cream transition-colors no-underline">Terms</Link>
          </nav>
          <p className="text-cream/40 text-xs">
            &copy; {new Date().getFullYear()} Experiment Me. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
