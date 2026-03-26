'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

interface AnalyticsData {
  stats: {
    totalUsers: number
    totalAssessments: number
    uniqueCompleters: number
    anonymousCompletions: number
    newUsersThisWeek: number
    consentRate: number
  }
  assessmentStats: {
    name: string
    slug: string
    completions: number
    uniqueUsers: number
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
  userList: {
    id: string
    email: string
    provider: string
    createdAt: string
    assessmentCount: number
  }[]
}

interface AdminUser {
  id: string
  email: string
  role: 'owner' | 'admin'
  created_at: string
}

export default function DashboardClient({ userEmail, isOwner }: { userEmail: string; isOwner: boolean }) {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'admins'>('overview')

  // Admin management state
  const [admins, setAdmins] = useState<AdminUser[]>([])
  const [newAdminEmail, setNewAdminEmail] = useState('')
  const [adminError, setAdminError] = useState('')
  const [adminSuccess, setAdminSuccess] = useState('')

  // User list state
  const [userSearch, setUserSearch] = useState('')

  const fetchAnalytics = useCallback(() => {
    fetch('/api/admin/analytics')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch analytics')
        return res.json()
      })
      .then(d => { setData(d); setLastRefresh(new Date()) })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const fetchAdmins = useCallback(() => {
    if (!isOwner) return
    fetch('/api/admin/users')
      .then(res => res.json())
      .then(d => { if (d.admins) setAdmins(d.admins) })
      .catch(() => {})
  }, [isOwner])

  useEffect(() => {
    fetchAnalytics()
    fetchAdmins()
    const interval = setInterval(fetchAnalytics, 30000)
    return () => clearInterval(interval)
  }, [fetchAnalytics, fetchAdmins])

  const handleAddAdmin = async () => {
    setAdminError('')
    setAdminSuccess('')
    const email = newAdminEmail.trim().toLowerCase()
    if (!email || !email.includes('@')) {
      setAdminError('Enter a valid email address')
      return
    }

    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    const result = await res.json()

    if (!res.ok) {
      setAdminError(result.error || 'Failed to add admin')
    } else {
      setAdminSuccess(`${email} added as admin`)
      setNewAdminEmail('')
      fetchAdmins()
    }
  }

  const handleRemoveAdmin = async (email: string) => {
    setAdminError('')
    setAdminSuccess('')

    const res = await fetch('/api/admin/users', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    const result = await res.json()

    if (!res.ok) {
      setAdminError(result.error || 'Failed to remove admin')
    } else {
      setAdminSuccess(`${email} removed`)
      fetchAdmins()
    }
  }

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

  const { stats, assessmentStats, recentActivity, demographics, userList } = data

  const filteredUsers = userSearch
    ? userList.filter(u => u.email.toLowerCase().includes(userSearch.toLowerCase()))
    : userList

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-brown-deep text-white">
        <div className="max-w-6xl mx-auto px-6 pt-28 pb-10">
          <div className="flex items-start justify-between">
            <div>
              <Link href="/#assessments" className="text-white/50 text-sm hover:text-white/70 transition-colors">
                &larr; Back to Assessments
              </Link>
              <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold mt-2">
                Admin Dashboard
              </h1>
              <p className="text-white/50 text-sm mt-1">
                {userEmail}
                {isOwner && <span className="ml-2 px-2 py-0.5 rounded-full bg-white/15 text-[10px] font-bold uppercase tracking-wider">Owner</span>}
              </p>
              {lastRefresh && (
                <p className="text-white/30 text-xs mt-1">
                  Auto-refreshes every 30s &middot; Last: {lastRefresh.toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-6">
            {(['overview', 'users', ...(isOwner ? ['admins'] : [])] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`px-4 py-2 rounded-t-lg text-sm font-semibold transition-colors cursor-pointer ${
                  activeTab === tab
                    ? 'bg-cream text-brown-deep'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                {tab === 'overview' ? 'Overview' : tab === 'users' ? 'Users' : 'Admin Access'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── OVERVIEW TAB ── */}
      {activeTab === 'overview' && (
        <>
          {/* Stats cards */}
          <div className="max-w-6xl mx-auto px-6 -mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { label: 'Total Users', value: stats.totalUsers.toLocaleString(), sub: 'registered accounts' },
                { label: 'Completers', value: stats.uniqueCompleters.toLocaleString(), sub: 'took 1+ assessment' },
                { label: 'Completions', value: stats.totalAssessments.toLocaleString(), sub: 'total results' },
                { label: 'Anonymous', value: stats.anonymousCompletions.toLocaleString(), sub: 'no account' },
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
                          <th className="px-5 py-2.5 text-right">Users</th>
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
                            <td className="px-5 py-2.5 text-right font-mono text-text-muted">{a.uniqueUsers}</td>
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
        </>
      )}

      {/* ── USERS TAB ── */}
      {activeTab === 'users' && (
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-brown-deep/5 overflow-hidden">
            <div className="px-5 py-4 border-b border-brown-deep/5 flex items-center justify-between gap-4">
              <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-brown-deep">
                Registered Users ({userList.length})
              </h2>
              <input
                type="text"
                placeholder="Search by email..."
                value={userSearch}
                onChange={e => setUserSearch(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-brown-deep/10 text-sm text-brown-deep bg-cream/50 w-64 focus:outline-none focus:border-terracotta/50"
              />
            </div>
            {filteredUsers.length === 0 ? (
              <div className="px-5 py-8 text-center text-text-muted text-sm">
                {userSearch ? 'No users match that search.' : 'No registered users yet.'}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[10px] text-text-muted uppercase tracking-wider border-b border-brown-deep/5">
                      <th className="px-5 py-2.5">#</th>
                      <th className="px-5 py-2.5">Email</th>
                      <th className="px-5 py-2.5">Provider</th>
                      <th className="px-5 py-2.5 text-right">Assessments</th>
                      <th className="px-5 py-2.5 text-right">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u, i) => (
                      <tr key={u.id} className="border-b border-brown-deep/3 hover:bg-cream/50 transition-colors">
                        <td className="px-5 py-2.5 text-text-muted">{i + 1}</td>
                        <td className="px-5 py-2.5 font-medium text-brown-deep">{u.email}</td>
                        <td className="px-5 py-2.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            u.provider === 'google' ? 'bg-blue-50 text-blue-600' : 'bg-cream text-text-muted'
                          }`}>
                            {u.provider}
                          </span>
                        </td>
                        <td className="px-5 py-2.5 text-right font-mono text-text-muted">
                          {u.assessmentCount > 0 ? u.assessmentCount : '—'}
                        </td>
                        <td className="px-5 py-2.5 text-right text-text-muted text-xs">
                          {new Date(u.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── ADMIN ACCESS TAB (owners only) ── */}
      {activeTab === 'admins' && isOwner && (
        <div className="max-w-2xl mx-auto px-6 py-8">
          {/* Add admin */}
          <div className="bg-white rounded-xl shadow-sm border border-brown-deep/5 p-6 mb-6">
            <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-brown-deep mb-1">
              Add Admin
            </h2>
            <p className="text-text-muted text-sm mb-4">
              Admins can view the dashboard and all analytics. Only owners can manage admin access.
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="email@example.com"
                value={newAdminEmail}
                onChange={e => { setNewAdminEmail(e.target.value); setAdminError(''); setAdminSuccess('') }}
                onKeyDown={e => { if (e.key === 'Enter') handleAddAdmin() }}
                className="flex-1 px-4 py-2.5 rounded-xl border border-brown-deep/10 text-sm text-brown-deep bg-cream/30 focus:outline-none focus:border-terracotta/50"
              />
              <button
                onClick={handleAddAdmin}
                className="px-5 py-2.5 rounded-xl bg-brown-deep text-white text-sm font-semibold hover:bg-brown-deep/90 transition-colors cursor-pointer"
              >
                Add
              </button>
            </div>
            {adminError && <p className="text-red-500 text-sm mt-2">{adminError}</p>}
            {adminSuccess && <p className="text-green-600 text-sm mt-2">{adminSuccess}</p>}
          </div>

          {/* Current admins */}
          <div className="bg-white rounded-xl shadow-sm border border-brown-deep/5 overflow-hidden">
            <div className="px-5 py-4 border-b border-brown-deep/5">
              <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-brown-deep">
                Current Admins
              </h2>
            </div>
            {admins.length === 0 ? (
              <div className="px-5 py-8 text-center text-text-muted text-sm">
                Loading admins...
              </div>
            ) : (
              <div className="divide-y divide-brown-deep/5">
                {admins.map(a => (
                  <div key={a.id} className="px-5 py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-brown-deep">{a.email}</p>
                      <p className="text-xs text-text-muted">
                        {a.role === 'owner' ? 'Owner' : 'Admin'} &middot; Added {new Date(a.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    {a.role === 'owner' ? (
                      <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-wider">
                        Owner
                      </span>
                    ) : (
                      <button
                        onClick={() => handleRemoveAdmin(a.email)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
