// Population norms from published research
// Used to estimate percentiles via normal distribution approximation
// Each norm includes the source study so users know what they're being compared to

export interface PopulationNorm {
  mean: number
  sd: number
  sampleDescription: string
  sampleSize: number
  source: string // Short APA-style citation
  higherIsBetter: boolean // false for DASS-21 where higher = worse
}

export interface SubscaleNorm {
  name: string
  mean: number
  sd: number
}

export interface AssessmentNorms {
  overall: PopulationNorm
  subscales?: SubscaleNorm[]
}

// Standard normal CDF approximation (Abramowitz & Stegun)
// Returns probability that a standard normal variable is <= z
function normalCDF(z: number): number {
  if (z < -6) return 0
  if (z > 6) return 1

  const a1 = 0.254829592
  const a2 = -0.284496736
  const a3 = 1.421413741
  const a4 = -1.453152027
  const a5 = 1.061405429
  const p = 0.3275911

  const sign = z < 0 ? -1 : 1
  const x = Math.abs(z) / Math.sqrt(2)
  const t = 1.0 / (1.0 + p * x)
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)

  return 0.5 * (1.0 + sign * y)
}

/**
 * Calculate estimated percentile rank given a score and population norms.
 * Returns a number 0–100 representing the percentage of the reference
 * population that scored at or below this score.
 */
export function calculatePercentile(score: number, norm: PopulationNorm): number {
  const z = (score - norm.mean) / norm.sd
  const percentile = normalCDF(z) * 100
  // Clamp to 1–99 to avoid misleading "0th" or "100th" percentile claims
  return Math.max(1, Math.min(99, Math.round(percentile)))
}

/**
 * Get a human-readable percentile description.
 * Accounts for whether higher scores are better or worse.
 */
export function getPercentileDescription(score: number, norm: PopulationNorm): {
  percentile: number
  description: string
} {
  const percentile = calculatePercentile(score, norm)

  if (norm.higherIsBetter) {
    return {
      percentile,
      description: `Your score is higher than approximately ${percentile}% of the reference population.`,
    }
  } else {
    // For scales where higher = worse (DASS-21), flip the framing
    const lowerThan = 100 - percentile
    return {
      percentile,
      description: `Approximately ${lowerThan}% of the reference population scored lower than you (closer to symptom-free).`,
    }
  }
}

// ─── Published Norms ──────────────────────────────────────────

export const populationNorms: Record<string, AssessmentNorms> = {
  swls: {
    overall: {
      mean: 23.5,
      sd: 6.43,
      sampleDescription: 'U.S. adults (general population)',
      sampleSize: 13006,
      source: 'Pavot & Diener, 2008',
      higherIsBetter: true,
    },
  },

  rosenberg: {
    overall: {
      mean: 22.0,
      sd: 5.01,
      sampleDescription: 'U.S. adults (general population)',
      sampleSize: 16998,
      source: 'Schmitt & Allik, 2005',
      higherIsBetter: true,
    },
  },

  grit: {
    overall: {
      mean: 3.65,
      sd: 0.73,
      sampleDescription: 'U.S. adults (25+ years old)',
      sampleSize: 1554,
      source: 'Duckworth & Quinn, 2009',
      higherIsBetter: true,
    },
    subscales: [
      { name: 'Consistency of Interest', mean: 3.41, sd: 0.84 },
      { name: 'Perseverance of Effort', mean: 3.90, sd: 0.67 },
    ],
  },

  mindset: {
    overall: {
      mean: 4.02,
      sd: 0.98,
      sampleDescription: 'U.S. college students',
      sampleSize: 628,
      source: 'Dweck, 1999',
      higherIsBetter: true,
    },
  },

  bigfive: {
    overall: {
      mean: 3.20,
      sd: 0.45,
      sampleDescription: 'U.S. adults (IPIP norms)',
      sampleSize: 20000,
      source: 'Goldberg et al., 2006',
      higherIsBetter: true,
    },
    subscales: [
      { name: 'Extraversion', mean: 3.25, sd: 0.90 },
      { name: 'Agreeableness', mean: 3.64, sd: 0.72 },
      { name: 'Conscientiousness', mean: 3.44, sd: 0.85 },
      { name: 'Neuroticism', mean: 2.93, sd: 0.87 },
      { name: 'Openness', mean: 3.60, sd: 0.72 },
    ],
  },

  perma: {
    overall: {
      mean: 7.06,
      sd: 1.78,
      sampleDescription: 'International adults (cross-cultural sample)',
      sampleSize: 31966,
      source: 'Butler & Kern, 2016',
      higherIsBetter: true,
    },
    subscales: [
      { name: 'Positive Emotion', mean: 6.69, sd: 2.09 },
      { name: 'Engagement', mean: 7.25, sd: 1.72 },
      { name: 'Relationships', mean: 6.88, sd: 2.25 },
      { name: 'Meaning', mean: 6.90, sd: 2.25 },
      { name: 'Accomplishment', mean: 7.21, sd: 1.80 },
    ],
  },

  happiness: {
    overall: {
      mean: 4.88,
      sd: 1.12,
      sampleDescription: 'U.S. adults (general population)',
      sampleSize: 2732,
      source: 'Lyubomirsky & Lepper, 1999',
      higherIsBetter: true,
    },
  },

  dass21: {
    overall: {
      // Total DASS-21 score (sum of all 21 items × 2)
      mean: 17.46,
      sd: 14.82,
      sampleDescription: 'U.K. adults (general population)',
      sampleSize: 1794,
      source: 'Henry & Crawford, 2005',
      higherIsBetter: false, // Lower is better (less distress)
    },
    subscales: [
      { name: 'Depression', mean: 5.66, sd: 7.74 },
      { name: 'Anxiety', mean: 3.76, sd: 5.90 },
      { name: 'Stress', mean: 8.04, sd: 8.04 },
    ],
  },

  hope: {
    overall: {
      // Average of 8 scored items (scale 1-8)
      mean: 6.09,
      sd: 0.99,
      sampleDescription: 'U.S. college students',
      sampleSize: 3007,
      source: 'Snyder et al., 1991',
      higherIsBetter: true,
    },
    subscales: [
      { name: 'Pathways Thinking', mean: 6.08, sd: 1.09 },
      { name: 'Agency Thinking', mean: 6.10, sd: 1.05 },
    ],
  },

  selfcompassion: {
    overall: {
      mean: 3.12,
      sd: 0.67,
      sampleDescription: 'U.S. adults (general population)',
      sampleSize: 415,
      source: 'Raes et al., 2011',
      higherIsBetter: true,
    },
  },
}

export function getAssessmentNorms(id: string): AssessmentNorms | null {
  return populationNorms[id] || null
}
