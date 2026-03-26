import { createClient as createAdminClient } from '@supabase/supabase-js'

function getAdminSupabase() {
  return createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export interface AdminUser {
  id: string
  user_id: string | null
  email: string
  role: 'owner' | 'admin'
  created_at: string
}

/**
 * Check if an email is in the admin_users table.
 * Falls back to hardcoded owner email if the table doesn't exist yet.
 */
export async function isAdmin(email: string | null | undefined): Promise<boolean> {
  if (!email) return false

  try {
    const admin = getAdminSupabase()
    const { data, error } = await admin
      .from('admin_users')
      .select('id')
      .eq('email', email)
      .limit(1)

    if (error) {
      // Table might not exist yet — fall back to hardcoded check
      return email === 'fernandez.nicholas@gmail.com'
    }

    return (data?.length ?? 0) > 0
  } catch {
    // Fallback if Supabase is unreachable
    return email === 'fernandez.nicholas@gmail.com'
  }
}

/**
 * Check if an email has the 'owner' role.
 */
export async function isOwner(email: string | null | undefined): Promise<boolean> {
  if (!email) return false

  try {
    const admin = getAdminSupabase()
    const { data, error } = await admin
      .from('admin_users')
      .select('id')
      .eq('email', email)
      .eq('role', 'owner')
      .limit(1)

    if (error) {
      return email === 'fernandez.nicholas@gmail.com'
    }

    return (data?.length ?? 0) > 0
  } catch {
    return email === 'fernandez.nicholas@gmail.com'
  }
}

/**
 * List all admin users.
 */
export async function listAdmins(): Promise<AdminUser[]> {
  const admin = getAdminSupabase()
  const { data, error } = await admin
    .from('admin_users')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) return []
  return (data as AdminUser[]) || []
}

/**
 * Add a new admin by email. Only owners can do this.
 */
export async function addAdmin(email: string, createdBy: string): Promise<{ success: boolean; error?: string }> {
  const admin = getAdminSupabase()

  // Check if already exists
  const { data: existing } = await admin
    .from('admin_users')
    .select('id')
    .eq('email', email)
    .limit(1)

  if (existing && existing.length > 0) {
    return { success: false, error: 'This email is already an admin' }
  }

  // Look up user_id from auth if they have an account
  const { data: usersData } = await admin.auth.admin.listUsers({ perPage: 1000 })
  const matchedUser = usersData?.users?.find(u => u.email === email)

  const { error } = await admin
    .from('admin_users')
    .insert({
      email,
      role: 'admin',
      user_id: matchedUser?.id || null,
      created_by: createdBy,
    })

  if (error) return { success: false, error: error.message }
  return { success: true }
}

/**
 * Remove an admin by email. Cannot remove owners.
 */
export async function removeAdmin(email: string): Promise<{ success: boolean; error?: string }> {
  const admin = getAdminSupabase()

  // Check role — can't remove owners
  const { data: existing } = await admin
    .from('admin_users')
    .select('role')
    .eq('email', email)
    .limit(1)

  if (!existing || existing.length === 0) {
    return { success: false, error: 'Admin not found' }
  }

  if (existing[0].role === 'owner') {
    return { success: false, error: 'Cannot remove an owner' }
  }

  const { error } = await admin
    .from('admin_users')
    .delete()
    .eq('email', email)

  if (error) return { success: false, error: error.message }
  return { success: true }
}
