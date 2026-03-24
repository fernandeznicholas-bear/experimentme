'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface AnalyticsData {
  stats: {
    totalUsers: number
    totalAssessments: number
    newUsersThisWeek: number
    consentRate: number
  }
  assessmentStats: {
    name: string
    slug: string
    completions: number
    avgScore: string
    recentCount: number
  }[]
  recentActivity: {
    time: string
    event: string
    detail: string
  }[]
  demographics: {
    label: string
    count: number
    pct: number
  }[]
}

export default function DashboardClient({ userEmail }: { userEmail: string }) {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/admin/analytics')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch analytics')
        return res.json()
      })
      .then(setData)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-text-muted font-[family-name:var(--font-body)]">Loading analytics...</p>
      </main>
    )
  }

  if (error || !data) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-red-600">{error || 'Failed to load analytics'}</p>
      </main>
    )
  }

  const { stats, assessmentStats, recentActivity, demographics } = data

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-brown-deep text-white">
        <div className="max-w-6xl mx-auto px-6 pt-28 pb-10">
          <div className="flex items-start justify-between">
            <div>
              <Link href="/prototype" className="text-white/50 text-sm hover:text-white/70 transition-colors">
                ← Back to Assessments
              </Link>
              <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold mt-2">
                Admin Dashboard
              </h1>
              <p className="text-white/50 text-sm mt-1">{userEmail}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="max-w-6xl mx-auto px-6 -mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Total Users', value: stats.totalUsers.toLocaleString(), sub: 'registered accounts' },
            { label: 'Assessments', value: stats.totalAssessments.toLocaleString(), sub: 'completed' },
            { label: 'New Users', value: `+${stats.newUsersThisWeek}`, sub: 'this week' },
            { label: 'Data Consent', value: `${stats.consentRate}%`, sub: 'opted in' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-brown-deep/5">
              <p className="text-text-muted text-[10px] font-semibold uppercase tracking-wider">{s.label}</p>
              <p className="text-2xl font-bold text-brown-deep mt-1">{s.value}</p>
              <p className="text-text-muted text-[10px] mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Assessment table */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-brown-deep/5 overflow-hidden">
            <div className="px-5 py-4 border-b border-brown-deep/5">
              <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-brown-deep">
                Assessment Performance
              </h2>
            </div>
            {assessmentStats.length === 0 ? (
              <div className="px-5 py-8 text-center text-text-muted text-sm">
                No assessments completed yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[10px] text-text-muted uppercase tracking-wider border-b border-brown-deep/5">
                      <th className="px-5 py-2.5">#</th>
                      <th className="px-5 py-2.5">Assessment</th>
                      <th className="px-5 py-2.5 text-right">Total</th>
                      <th className="px-5 py-2.5 text-right">Avg Score</th>
                      <th className="px-5 py-2.5 text-right">Last 30d</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assessmentStats.map((a, i) => (
                      <tr key={a.slug} className="border-b border-brown-deep/3 hover:bg-cream/50 transition-colors">
                        <td className="px-5 py-2.5 text-text-muted">{i + 1}</td>
                        <td className="px-5 py-2.5 font-semibold text-brown-deep">{a.name}</td>
                        <td className="px-5 py-2.5 text-right font-mono text-brown-deep">{a.completions}</td>
                        <td className="px-5 py-2.5 text-right font-mono text-text-muted">{a.avgScore}</td>
                        <td className="px-5 py-2.5 text-right font-mono text-text-muted">{a.recentCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-brown-deep/5 overflow-hidden">
              <div className="px-5 py-4 border-b border-brown-deep/5">
                <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-brown-deep">
                  Recent Activity
                </h2>
              </div>
              {recentActivity.length === 0 ? (
                <div className="px-5 py-6 text-center text-text-muted text-sm">
                  No recent activity.
                </div>
              ) : (
                <div className="divide-y divide-brown-deep/5">
                  {recentActivity.map((item, i) => (
                    <div key={i} className="px-5 py-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-brown-deep">{item.event}</p>
                          <p className="text-xs text-text-muted">{item.detail}</p>
                        </div>
                        <span className="text-[10px] text-text-muted whitespace-nowrap">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Demographics */}
            <div className="bg-white rounded-xl shadow-sm border border-brown-deep/5 overflow-hidden">
              <div className="px-5 py-4 border-b border-brown-deep/5">
                <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-brown-deep">
                  Age Distribution
                </h2>
              </div>
              <div className="px-5 py-4 space-y-2.5">
                {demographics.every(d => d.count === 0) ? (
                  <p className="text-center text-text-muted text-sm py-2">No demographic data yet.</p>
                ) : (
                  demographics.map(d => (
                    <div key={d.label} className="flex items-center gap-3">
                      <span className="text-xs text-text-muted w-10 text-right font-mono">{d.label}</span>
                      <div className="flex-1 bg-brown-deep/5 rounded-full h-4 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-terracotta/60"
                          style={{ width: `${d.pct}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-brown-deep w-12 text-right">{d.count} ({d.pct}%)</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
