import type { RealtimeChannel } from '@supabase/supabase-js';

import { createClient } from '@supabase/supabase-js'
import type { Database } from '~/types/database.types'

// const supabase = useSupabaseClient<Database>(process.env.SUPABASE_URL,process.env.SUPABASE_KEY);
const supabase = useSupabaseClient();

export const signInWithOAuth = async () => {
  if (!supabase) {
    console.error('Supabase client is not initialized');
    return;
  }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/confirm',
      },
    })
    if (error) console.log(error)
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) console.log(error)
}

const { data:profile } = await useAsyncData('t_profile', async () =>
{
  const { data } = await supabase.from('t_profiles').select('username, ').eq('handlename', 'realname').single()
  return data
})

// let realtimeChannel: RealtimeChannel;

// //fetch collaborators
// const { data: collaborators, refresh: refreshCollaborators} = await useAsyncData('collaborators', async () => {
//   const { data } = await supabase.from('collaborators').select('username');
//   return data;
// })

//Once mounted, listen the change and refresh collaborators
//もしかして別にテーブルが必要かも?
// onMounted(() => {
//   //Real time listener
//   realtimeChannel = supabase.channel('public::collaborators').on(
//     'postgres_changes',
//     { event:'*', schema: 'public', table:'collaborators'},
//     () => refreshCollaborators()
//   )
//   realtimeChannel.subscribe();
// })

// //unsubscribe when user left the page
// onMounted(() => {
//   supabase.removeChannel(realtimeChannel);
// })