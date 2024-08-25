import { serverSupabaseServiceRole } from '#supabase/server'

export default eventHandler(async (event) => {
  const client = serverSupabaseServiceRole(event)

  const { data } = await client.from('rls-protected-table').select()

  return { sensitiveData: data }
})
