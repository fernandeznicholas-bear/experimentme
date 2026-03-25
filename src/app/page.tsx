'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef, useCallback } from 'react'
import { createClient } from '@/lib/supabase-browser'

// ── Album data — all 15 assessments (album-cover style) ──────────────
const albums = [
  {
    slug: 'swls',
    discoveryName: 'The Life Check',
    researchName: 'Satisfaction With Life Scale',
    researchCitation: 'Diener et al., 1985',
    tagline: 'Five questions. How full is your cup?',
    researchTagline: 'Global cognitive evaluation of life satisfaction',
    category: 'Well-Being',
    questions: 5,
    time: '2 min',
    image: '/assessments/swls.jpg',
    facts: [
      'Created by Ed Diener, the "Dr. Happiness" of psychology',
      'Translated into dozens of languages worldwide',
      'Takes less than 2 minutes to complete',
      'Measures cognitive, not emotional, well-being',
    ],
  },
  {
    slug: 'rosenberg',
    discoveryName: 'The Mirror',
    researchName: 'Rosenberg Self-Esteem Scale',
    researchCitation: 'Rosenberg, 1965',
    tagline: 'How do you really see yourself?',
    researchTagline: 'Global self-worth and self-acceptance',
    category: 'Self-Perception',
    questions: 10,
    time: '3 min',
    image: '/assessments/rosenberg.jpg',
    facts: [
      'The most widely used self-esteem measure in history',
      'Originally developed for adolescents in the 1960s',
      'Only 10 items but remarkably reliable',
      'Cited in over 50,000 research papers',
    ],
  },
  {
    slug: 'grit',
    discoveryName: 'The Long Game',
    researchName: 'Short Grit Scale (Grit-S)',
    researchCitation: 'Duckworth & Quinn, 2009',
    tagline: 'How far will your passion carry you?',
    researchTagline: 'Perseverance and passion for long-term goals',
    category: 'Resilience & Growth',
    questions: 8,
    time: '3 min',
    image: '/assessments/grit.jpg',
    facts: [
      'Angela Duckworth\'s TED talk has 30M+ views',
      'Grit predicts success beyond IQ or talent',
      'West Point cadets with high grit were less likely to drop out',
      'Measures both consistency of interests and perseverance of effort',
    ],
  },
  {
    slug: 'mindset',
    discoveryName: 'The Growth Edge',
    researchName: 'Growth Mindset Scale',
    researchCitation: 'Dweck, 2006',
    tagline: 'Do you believe you can change?',
    researchTagline: 'Implicit theories of intelligence — fixed vs. growth',
    category: 'Resilience & Growth',
    questions: 8,
    time: '3 min',
    image: '/assessments/mindset.jpg',
    facts: [
      'Carol Dweck spent 30+ years researching this concept',
      'Students praised for effort outperform those praised for talent',
      '"Not yet" is more powerful than "I can\'t"',
      'Mindset can be shifted with targeted interventions',
    ],
  },
  {
    slug: 'bigfive',
    discoveryName: 'Your Five Colors',
    researchName: 'IPIP-20 Big Five Mini',
    researchCitation: 'Donnellan et al., 2006',
    tagline: 'Five dimensions. One you.',
    researchTagline: 'Openness · Conscientiousness · Extraversion · Agreeableness · Neuroticism',
    category: 'Personality',
    questions: 20,
    time: '5 min',
    image: '/assessments/bigfive.jpg',
    facts: [
      'The Big Five model emerged from analyzing every personality word in the dictionary',
      'These five traits appear across every culture studied',
      'Personality is roughly 50% heritable',
      'Conscientiousness is the best personality predictor of job performance',
    ],
  },
  {
    slug: 'perma',
    discoveryName: 'The Full Spectrum',
    researchName: 'PERMA Profiler',
    researchCitation: 'Butler & Kern, 2016',
    tagline: 'Five pillars of a life well-lived.',
    researchTagline: 'Positive emotion, Engagement, Relationships, Meaning, Accomplishment',
    category: 'Well-Being',
    questions: 23,
    time: '5 min',
    image: '/assessments/perma.jpg',
    facts: [
      'Created by Martin Seligman, the father of positive psychology',
      'Goes beyond happiness to measure flourishing',
      'Used by governments to measure national well-being',
      'PERMA theory replaced Seligman\'s earlier "authentic happiness" model',
    ],
  },
  {
    slug: 'happiness',
    discoveryName: 'The Joy Read',
    researchName: 'Subjective Happiness Scale',
    researchCitation: 'Lyubomirsky & Lepper, 1999',
    tagline: 'Four questions. No hiding.',
    researchTagline: 'Global subjective assessment of happiness',
    category: 'Well-Being',
    questions: 4,
    time: '1 min',
    image: '/assessments/happiness.jpg',
    facts: [
      'Only 4 questions — the shortest validated happiness measure',
      'Sonja Lyubomirsky is one of the world\'s leading happiness researchers',
      'Happy people aren\'t just lucky — they think differently',
      'About 40% of happiness is within your control',
    ],
  },
  {
    slug: 'selfcompassion',
    discoveryName: 'The Inner Voice',
    researchName: 'Self-Compassion Scale (Short Form)',
    researchCitation: 'Raes et al., 2011',
    tagline: "What do you say when no one's listening?",
    researchTagline: 'Self-kindness vs. self-judgment under difficulty',
    category: 'Self-Perception',
    questions: 12,
    time: '3 min',
    image: '/assessments/selfcompassion.jpg',
    facts: [
      'Kristin Neff pioneered the scientific study of self-compassion',
      'Self-compassion is more stable than self-esteem',
      'Being kind to yourself isn\'t weak — it builds resilience',
      'Three components: self-kindness, common humanity, mindfulness',
    ],
  },
  {
    slug: 'hope',
    discoveryName: 'The Pathway Finder',
    researchName: 'Adult Hope Scale',
    researchCitation: 'Snyder et al., 1991',
    tagline: 'Can you see a way forward?',
    researchTagline: 'Agency thinking and pathways thinking toward goals',
    category: 'Resilience & Growth',
    questions: 12,
    time: '3 min',
    image: '/assessments/hope.jpg',
    facts: [
      'Hope has two components: willpower AND waypower',
      'Hopeful people don\'t just wish — they plan alternative routes',
      'C.R. Snyder showed hope predicts academic and athletic success',
      'Hope can be taught and strengthened with practice',
    ],
  },
  {
    slug: 'dass21',
    discoveryName: 'The Weather Report',
    researchName: 'DASS-21',
    researchCitation: 'Lovibond & Lovibond, 1995',
    tagline: 'Depression. Anxiety. Stress. All in one.',
    researchTagline: 'Three-factor emotional distress: depression, anxiety, stress',
    category: 'Clinical Screening',
    questions: 21,
    time: '5 min',
    image: '/assessments/dass21.jpg',
    facts: [
      'Separates depression, anxiety, and stress — most scales blend them',
      'Developed in Australia, now used in 50+ countries',
      'The 21-item version is just as reliable as the full 42-item DASS',
      'Free to use, unlike many clinical tools',
    ],
  },
  {
    slug: 'phq9',
    discoveryName: 'The Mood Map',
    researchName: 'Patient Health Questionnaire (PHQ-9)',
    researchCitation: 'Kroenke, Spitzer & Williams, 2001',
    tagline: 'An honest check-in with yourself.',
    researchTagline: 'DSM-5 major depression criteria severity measure',
    category: 'Clinical Screening',
    questions: 9,
    time: '3 min',
    image: '/assessments/phq9.jpg',
    facts: [
      'Used in more clinical settings than any other depression screener',
      'Maps directly onto the 9 DSM-5 criteria for major depression',
      'A score of 10+ suggests clinical significance',
      'Developed by Pfizer but released free for public use',
    ],
  },
  {
    slug: 'gad7',
    discoveryName: 'The Pulse Check',
    researchName: 'Generalized Anxiety Disorder Scale (GAD-7)',
    researchCitation: 'Spitzer et al., 2006',
    tagline: "When worry won't let go.",
    researchTagline: 'Generalized anxiety disorder severity screening',
    category: 'Clinical Screening',
    questions: 7,
    time: '2 min',
    image: '/assessments/gad7.jpg',
    facts: [
      'The most widely used anxiety screener in primary care',
      'Created by the same team behind the PHQ-9',
      'Anxiety disorders affect 284 million people globally',
      'Often paired with PHQ-9 for a complete mental health screen',
    ],
  },
  {
    slug: 'pcl5',
    discoveryName: 'The Echo',
    researchName: 'PTSD Checklist (PCL-5)',
    researchCitation: 'Weathers et al., 2013',
    tagline: "When the past won't stay past.",
    researchTagline: 'DSM-5 PTSD symptom severity assessment',
    category: 'Clinical Screening',
    questions: 20,
    time: '5 min',
    image: '/assessments/pcl5.jpg',
    facts: [
      'Updated to align with DSM-5 PTSD criteria',
      'Developed by the National Center for PTSD',
      'PTSD affects roughly 6% of the US population at some point',
      'A score of 33+ suggests a probable PTSD diagnosis',
    ],
  },
  {
    slug: 'who5',
    discoveryName: 'The Well Check',
    researchName: 'WHO-5 Well-Being Index',
    researchCitation: 'WHO, 1998',
    tagline: 'How have the last two weeks felt?',
    researchTagline: 'Subjective psychological well-being over 14 days',
    category: 'Well-Being',
    questions: 5,
    time: '1 min',
    image: '/assessments/who5.jpg',
    facts: [
      'Created by the World Health Organization',
      'Used in 30+ languages across the globe',
      'Only 5 positively worded items — no trick questions',
      'Also used as a screening tool for depression',
    ],
  },
  {
    slug: 'cssrs',
    discoveryName: 'The Safety Net',
    researchName: 'Columbia Suicide Severity Rating Scale',
    researchCitation: 'Posner et al., 2011',
    tagline: 'Because asking matters.',
    researchTagline: 'Suicidal ideation and behavior severity classification',
    category: 'Clinical Screening',
    questions: 6,
    time: '2 min',
    image: '/assessments/cssrs.jpg',
    facts: [
      'Required by the FDA for all drug trials since 2012',
      'Asking about suicide does NOT increase risk — research confirms this',
      'Used in ERs, schools, military, and crisis centers worldwide',
      'Developed at Columbia University with NIH funding',
    ],
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

const CARD_W = 280
const CARD_GAP = 24

export default function HomePage() {
  const router = useRouter()
  const [completedAssessments, setCompletedAssessments] = useState<Set<string>>(new Set())
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Carousel state — per-card research mode
  const [researchCards, setResearchCards] = useState<Set<number>>(new Set())
  const [activeIndex, setActiveIndex] = useState(0)
  const [factIndex, setFactIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const scrollStartX = useRef(0)
  const preventClick = useRef(false)

  useEffect(() => {
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

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') fetchCompleted()
    }
    document.addEventListener('visibilitychange', handleVisibility)
    window.addEventListener('focus', fetchCompleted)
    const interval = setInterval(fetchCompleted, 60000)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
      window.removeEventListener('focus', fetchCompleted)
      clearInterval(interval)
    }
  }, [])

  // Rotate facts ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setFactIndex(prev => prev + 1)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  // Reset fact index when active card changes
  useEffect(() => {
    setFactIndex(0)
  }, [activeIndex])

  const handleScroll = useCallback(() => {
    if (!scrollRef.current || isDragging.current) return
    const scrollLeft = scrollRef.current.scrollLeft
    const idx = Math.round(scrollLeft / (CARD_W + CARD_GAP))
    setActiveIndex(Math.max(0, Math.min(idx, albums.length - 1)))
  }, [])

  const scrollToIndex = useCallback((idx: number) => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTo({ left: idx * (CARD_W + CARD_GAP), behavior: 'smooth' })
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    preventClick.current = false
    dragStartX.current = e.clientX
    scrollStartX.current = scrollRef.current?.scrollLeft || 0
  }
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return
    const dx = dragStartX.current - e.clientX
    if (Math.abs(dx) > 5) preventClick.current = true
    scrollRef.current.scrollLeft = scrollStartX.current + dx
  }
  const handleMouseUp = () => {
    if (!isDragging.current) return
    isDragging.current = false
    handleScroll()
    setTimeout(() => {
      if (scrollRef.current) {
        const idx = Math.round(scrollRef.current.scrollLeft / (CARD_W + CARD_GAP))
        scrollToIndex(idx)
      }
    }, 10)
  }

  const goTo = (idx: number) => {
    setActiveIndex(idx)
    scrollToIndex(idx)
  }

  const activeAlbum = albums[activeIndex] || null
  const currentFact = activeAlbum ? activeAlbum.facts[factIndex % activeAlbum.facts.length] : null

  return (
    <main className="min-h-screen">
      {/* Hero — split layout */}
      <section className="relative pt-28 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cream to-warm-white" />
        <div className="relative max-w-5xl mx-auto text-center">
          <p className="inline-block px-4 py-1.5 rounded-full bg-terracotta/8 text-terracotta text-xs font-semibold tracking-wider uppercase mb-6">
            Science-Backed Self-Discovery
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-brown-deep leading-[1.15] mb-6">
            The{' '}
            <em className="text-terracotta not-italic font-bold italic">Science</em>{' '}
            of You
          </h1>
          <p className="font-[family-name:var(--font-body)] text-lg text-text-muted max-w-lg mx-auto mb-8 leading-relaxed">
            Real psychological research that gives you something back:
            evidence-based insight into who you are. Not a quiz. Science.
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
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
          {isLoggedIn && completedAssessments.size > 0 && (
            <p className="mt-6 text-sm text-sage font-semibold">
              {completedAssessments.size} of {albums.length} completed — {albums.length - completedAssessments.size} remaining
            </p>
          )}
        </div>
      </section>

      {/* Scrolling Marquee Bar */}
      <section className="bg-brown-deep overflow-hidden py-4">
        <div className="marquee-track flex whitespace-nowrap">
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

      {/* Album-Cover Carousel */}
      <section id="assessments" className="py-12 scroll-mt-20 overflow-x-hidden">
        <div className="max-w-5xl mx-auto px-6 mb-4">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-brown-deep">
            Explore Assessments
          </h2>
          <p className="font-[family-name:var(--font-body)] text-text-muted text-sm mt-1">
            15 validated, peer-reviewed instruments. Swipe to explore.
          </p>
        </div>

        <div className="relative mt-2">
          {/* Navigation arrows — large touch targets */}
          {activeIndex > 0 && (
            <button
              onClick={() => goTo(activeIndex - 1)}
              className="absolute left-0 top-0 bottom-0 z-30 w-16 sm:w-24 flex items-center justify-center cursor-pointer group"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 shadow-xl flex items-center justify-center text-brown-deep group-hover:bg-white group-hover:scale-110 transition-all">
                <svg width="24" height="24" viewBox="0 0 20 20" fill="none"><path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </button>
          )}
          {activeIndex < albums.length - 1 && (
            <button
              onClick={() => goTo(activeIndex + 1)}
              className="absolute right-0 top-0 bottom-0 z-30 w-16 sm:w-24 flex items-center justify-center cursor-pointer group"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 shadow-xl flex items-center justify-center text-brown-deep group-hover:bg-white group-hover:scale-110 transition-all">
                <svg width="24" height="24" viewBox="0 0 20 20" fill="none"><path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </button>
          )}

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="flex gap-6 overflow-x-auto py-6 no-scrollbar select-none"
            style={{
              cursor: isDragging.current ? 'grabbing' : 'grab',
              paddingLeft: 'calc(50vw - 140px)',
              paddingRight: 'calc(50vw - 140px)',
              scrollSnapType: 'x mandatory',
            }}
          >
            {albums.map((album, idx) => {
              const dist = Math.abs(idx - activeIndex)
              const scale = dist === 0 ? 1 : dist === 1 ? 0.85 : 0.72
              const opacity = dist === 0 ? 1 : dist === 1 ? 0.6 : 0.35
              const rotateY = idx < activeIndex ? 40 : idx > activeIndex ? -40 : 0
              const zIndex = 20 - dist
              const isDone = completedAssessments.has(album.slug)
              const isResearch = researchCards.has(idx)

              return (
                <div
                  key={album.slug}
                  className="shrink-0 snap-center"
                  style={{ width: CARD_W, zIndex }}
                  onClick={() => {
                    if (preventClick.current) return
                    if (idx !== activeIndex) goTo(idx)
                  }}
                >
                  <div
                    className="transition-all duration-500 ease-out will-change-transform"
                    style={{
                      transform: `perspective(800px) scale(${scale}) rotateY(${rotateY}deg)`,
                      opacity,
                    }}
                  >
                    {/* Album Cover — photo background */}
                    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl" style={{ height: 380, aspectRatio: '3/4' }}>
                      {/* Photo background */}
                      <img
                        src={album.image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                        draggable={false}
                      />
                      {/* Dark overlay for text readability */}
                      <div className="absolute inset-0 bg-black/30" />

                      {/* Top badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
                        <span className="px-2.5 py-1 rounded-full bg-black/30 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                          {album.category}
                        </span>
                        <div className="flex gap-1.5">
                          {isDone && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/80 text-white text-[10px] font-bold backdrop-blur-md">
                              Done
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded-full bg-black/30 text-white text-[10px] font-medium backdrop-blur-md">
                            {album.questions}q
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-black/30 text-white text-[10px] font-medium backdrop-blur-md">
                            {album.time}
                          </span>
                        </div>
                      </div>

                      {/* Per-card Discovery/Research toggle — on the cover */}
                      {dist === 0 && (
                        <div className="absolute top-12 left-4 z-10">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setResearchCards(prev => {
                                const next = new Set(prev)
                                if (next.has(idx)) next.delete(idx)
                                else next.add(idx)
                                return next
                              })
                            }}
                            className="px-2.5 py-1 rounded-full bg-white/15 text-white text-[10px] font-semibold backdrop-blur-md hover:bg-white/25 transition-colors cursor-pointer border border-white/20"
                          >
                            {isResearch ? '🔬 Research' : '🧭 Discovery'}
                          </button>
                        </div>
                      )}

                      {/* Bottom content overlay */}
                      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 via-black/50 to-transparent pt-20 pb-5 px-5">
                        <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-white leading-tight drop-shadow-lg">
                          {isResearch ? album.researchName : album.discoveryName}
                        </h3>
                        {isResearch && (
                          <p className="text-white/50 text-[10px] font-mono mt-0.5">{album.researchCitation}</p>
                        )}
                        <p className="text-white/85 text-sm mt-1.5 leading-snug">
                          {isResearch ? album.researchTagline : album.tagline}
                        </p>

                        {/* Facts ticker — on active card */}
                        {dist === 0 && currentFact && (
                          <div className="mt-2.5 pt-2.5 border-t border-white/15">
                            <p
                              key={factIndex}
                              className="text-white/70 text-xs leading-relaxed animate-[fadeIn_0.5s_ease-out]"
                            >
                              {currentFact}
                            </p>
                          </div>
                        )}

                        {/* Action buttons — only on active card */}
                        {dist === 0 && (
                          <div className="flex items-center gap-2 mt-3">
                            <Link
                              href={`/assess/${album.slug}`}
                              onClick={e => { if (preventClick.current) e.preventDefault() }}
                              className="inline-block px-6 py-2.5 rounded-xl bg-white/20 backdrop-blur-md text-white text-sm font-semibold hover:bg-white/30 transition-colors border border-white/20"
                            >
                              {isDone ? 'Retake' : (isResearch ? 'Begin Assessment' : 'Begin Discovery')}
                            </Link>
                            <button
                              onClick={(e) => { e.stopPropagation(); router.push(`/learn/${album.slug}`) }}
                              className="px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md text-white/70 text-sm font-medium hover:bg-white/20 transition-colors border border-white/10 cursor-pointer"
                            >
                              Learn More
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-1.5 mt-2 pb-2">
            {albums.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex
                    ? 'w-7 h-2.5 bg-brown-deep'
                    : 'w-2.5 h-2.5 bg-brown-deep/20 hover:bg-brown-deep/40'
                }`}
              />
            ))}
          </div>
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
            { step: '02', title: 'Answer Honestly', desc: 'Each assessment takes 2-10 minutes. Your responses are private and never shared individually.' },
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
              { value: String(albums.length), label: 'Validated assessments live now' },
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

      {/* fadeIn animation */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  )
}
