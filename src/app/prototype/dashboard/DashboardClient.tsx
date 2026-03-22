'use client'

import { useState } from 'react'
import Link from 'next/link'

// ── Mock data ───────────────────────────────────────────────────────
const stats = {
  totalUsers: 1247,
  activeToday: 89,
  assessmentsCompleted: 4832,
  avgCompletionRate: 78,
  newUsersThisWeek: 156,
  dataConsentRate: 64,
}

const assessmentStats = [
  { name: 'PHQ-9', completions: 612, avgScore: '8.3', trend: +12 },
  { name: 'Big Five', completions: 534, avgScore: '—', trend: +8 },
  { name: 'Grit-S', completions: 489, avgScore: '3.4', trend: +5 },
  { name: 'GAD-7', completions: 445, avgScore: '6.1', trend: +15 },
  { name: 'SWLS', completions: 398, avgScore: '23.2', trend: -2 },
  { name: 'SHS', completions: 367, avgScore: '5.1', trend: +3 },
  { name: 'Rosenberg', completions: 342, avgScore: '28.4', trend: +1 },
  { name: 'DASS-21', completions: 312, avgScore: '—', trend: +7 },
  { name: 'Self-Compassion', completions: 287, avgScore: '3.2', trend: +4 },
  { name: 'PERMA', completions: 256, avgScore: '—', trend: +6 },
  { name: 'Growth Mindset', completions: 234, avgScore: '4.1', trend: +2 },
  { name: 'Hope Scale', completions: 198, avgScore: '48.3', trend: -1 },
  { name: 'WHO-5', completions: 176, avgScore: '62', trend: +9 },
  { name: 'PCL-5', completions: 112, avgScore: '22.1', trend: +3 },
  { name: 'C-SSRS', completions: 68, avgScore: '—', trend: +1 },
]

const recentActivity = [
  { time: '2 min ago', event: 'New user signed up', detail: 'j***@gmail.com' },
  { time: '5 min ago', event: 'PHQ-9 completed', detail: 'Score: 7 (Mild)' },
  { time: '8 min ago', event: 'Data consent granted', detail: 'Opted in to anonymous sharing' },
  { time: '12 min ago', event: 'Big Five completed', detail: 'Full profile generated' },
  { time: '15 min ago', event: 'New user signed up', detail: 'm***@outlook.com' },
  { time: '18 min ago', event: 'GAD-7 completed', detail: 'Score: 12 (Moderate)' },
  { time: '22 min ago', event: 'Account deleted', detail: 'User requested deletion' },
  { time: '30 min ago', event: 'SWLS completed', detail: 'Score: 28 (Satisfied)' },
]

const demographics = [
  { label: '18-24', pct: 34 },
  { label: '25-34', pct: 28 },
  { label: '35-44', pct: 18 },
  { label: '45-54', pct: 12 },
  { label: '55+', pct: 8 },
]

export default function DashboardClient({ userEmail }: { userEmail: string }) {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')

  return (
    <main className="min-h-screen bg-cream">
      {/* ── Header ── */}
      <div className="bg-brown-deep text-white">
        <div className="max-w-6xl mx-auto px-6 pt-28 pb-10">
          <div className="flex items-start justify-between">
            <div>
              <Link href="/prototype" className="text-white/50 text-sm hover:text-white/70 transition-colors">
                ← Back to Assessments
              </Link>
              <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold mt-2">
                Owner Dashboard
              </h1>
              <p className="text-white/50 text-sm mt-1">{userEmail}</p>
            </div>
            <div className="flex items-center gap-1 bg-white/10 rounded-xl p-1">
              {(['7d', '30d', '90d'] as const).map(r => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                    timeRange === r ? 'bg-white text-brown-deep' : 'text-white/50 hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats cards ── */}
      <div className="max-w-6xl mx-auto px-6 -mt-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Total Users', value: stats.totalUsers.toLocaleString(), sub: `+${stats.newUsersThisWeek} this week` },
            { label: 'Active Today', value: String(stats.activeToday), sub: 'unique sessions' },
            { label: 'Assessments', value: stats.assessmentsCompleted.toLocaleString(), sub: 'completed' },
            { label: 'Completion', value: `${stats.avgCompletionRate}%`, sub: 'started → finished' },
            { label: 'New Users', value: `+${stats.newUsersThisWeek}`, sub: 'this week' },
            { label: 'Data Consent', value: `${stats.dataConsentRate}%`, sub: 'opted in' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-brown-deep/5">
              <p className="text-text-muted text-[10px] font-semibold uppercase tracking-wider">{s.label}</p>
              <p className="text-2xl font-bold text-brown-deep mt-1">{s.value}</p>
              <p className="text-text-muted text-[10px] mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Assessment table */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-brown-deep/5 overflow-hidden">
            <div className="px-5 py-4 border-b border-brown-deep/5">
              <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-brown-deep">
                Assessment Performance
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[10px] text-text-muted uppercase tracking-wider border-b border-brown-deep/5">
                    <th className="px-5 py-2.5">#</th>
                    <th className="px-5 py-2.5">Assessment</th>
                    <th className="px-5 py-2.5 text-right">Done</th>
                    <th className="px-5 py-2.5 text-right">Avg</th>
                    <th className="px-5 py-2.5 text-right">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {assessmentStats.map((a, i) => (
                    <tr key={a.name} className="border-b border-brown-deep/3 hover:bg-cream/50 transition-colors">
                      <td className="px-5 py-2.5 text-text-muted">{i + 1}</td>
                      <td className="px-5 py-2.5 font-semibold text-brown-deep">{a.name}</td>
                      <td className="px-5 py-2.5 text-right font-mono text-brown-deep">{a.completions}</td>
                      <td className="px-5 py-2.5 text-right font-mono text-text-muted">{a.avgScore}</td>
                      <td className="px-5 py-2.5 text-right">
                        <span className={`font-semibold ${a.trend >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                          {a.trend >= 0 ? '+' : ''}{a.trend}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-brown-deep/5 overflow-hidden">
              <div className="px-5 py-4 border-b border-brown-deep/5">
                <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-brown-deep">
                  Live Activity
                </h2>
              </div>
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
            </div>

            {/* Demographics */}
            <div className="bg-white rounded-xl shadow-sm border border-brown-deep/5 overflow-hidden">
              <div className="px-5 py-4 border-b border-brown-deep/5">
                <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-brown-deep">
                  Age Distribution
                </h2>
              </div>
              <div className="px-5 py-4 space-y-2.5">
                {demographics.map(d => (
                  <div key={d.label} className="flex items-center gap-3">
                    <span className="text-xs text-text-muted w-10 text-right font-mono">{d.label}</span>
                    <div className="flex-1 bg-brown-deep/5 rounded-full h-4 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-terracotta/60"
                        style={{ width: `${d.pct}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-brown-deep w-8 text-right">{d.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="bg-white rounded-xl shadow-sm border border-brown-deep/5 p-5">
              <h2 className="font-[family-name:var(--font-heading)] text-base font-bold text-brown-deep mb-3">
                Actions
              </h2>
              <div className="space-y-2">
                <button className="w-full py-2 px-4 rounded-lg bg-cream text-brown-deep text-sm font-medium hover:bg-brown-deep/10 transition-colors cursor-pointer text-left">
                  Export Data (CSV)
                </button>
                <button className="w-full py-2 px-4 rounded-lg bg-cream text-brown-deep text-sm font-medium hover:bg-brown-deep/10 transition-colors cursor-pointer text-left">
                  Manage Assessments
                </button>
                <button className="w-full py-2 px-4 rounded-lg bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors cursor-pointer text-left">
                  Emergency: Disable Signups
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
