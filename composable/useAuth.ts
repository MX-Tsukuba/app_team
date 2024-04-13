// plugins/useAuth-test.ts
import supabase from '~/plugins/supabase';
import { ref, onMounted,} from "vue";
import type { Session, SupabaseClient } from "@supabase/supabase-js";

type Provider = 'google' | 'facebook' | 'twitter' | 'github';

interface ProfileFromProvider {
  nickName: string;
  avatarUrl: string;
}

interface AuthState {
  session: Ref<Session | null>;
  error: Ref<string>;
  profileFromProvider: Ref<ProfileFromProvider>;
  signInWithProvider: () => Promise<void>;
  signOut: () => Promise<void>;
}


const useAuth = (providerName: Provider): AuthState => {
  const session = ref<Session | null>(null)
  const error = ref<string>('')
  const profileFromProvider = ref<ProfileFromProvider>({ nickName: '', avatarUrl: '' })
  const nuxtApp = useNuxtApp();
  const supabase = nuxtApp.$supabase as SupabaseClient;
  console.log("--------------------")
  console.log(nuxtApp)
  console.log("--------------------")

  const signInWithProvider = async (): Promise<void> => {
    try {
      const { error: authError } = await supabase.auth.signInWithOAuth({ 
        provider: providerName,
        options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
          },
        }, 
      })

      // if(session.value){
      //   // router.push('@/pages/logout');
      //   navigateTo('@/pages/logout')}
    // }else{
    //     navigateTo('@/pages/resister')
    // }
      console.log(session)
      if (authError) {
        error.value = authError.message
      }
      

      //await router.push('/logout'); not work
    } catch (e: any) {
      error.value = e instanceof Error ? e.message : typeof e === 'string' ? e : '{{providerName}}との連携に失敗しました。'
    }
    
  }

  const signOut = async (): Promise<void> => {
    await supabase.auth.signOut()
  }

  onMounted(() => {
    const { data: authData } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        session.user.user_metadata = session.user.user_metadata || {}
        profileFromProvider.value.nickName = session.user.user_metadata.user_name
        profileFromProvider.value.avatarUrl = session.user.user_metadata.avatar_url
        error.value = ''
      } else {
        error.value = 'ユーザーがサインアウトしました'
        profileFromProvider.value.nickName = ''
        profileFromProvider.value.avatarUrl = ''
      }
      session ? (session = session) : (session = null)
    })

    return () => authData && authData.subscription.unsubscribe()
  })

  // const supabase = useSupabaseClient()
  
  const loading = ref(true)
  const username = ref('')
  const website = ref('')
  const avatar_path = ref('')

  async function updateProfile(){
    try {
        loading.value = true
        const user = useSupabaseUser()

        const updates = {
            id: user.value.id,
            username: username.value,
            website: website.value,
            avatar_url: avatar_path.value,
            updated_at:new Date(),
        }
        const { error } = await supabase.from('profiles').upsert(updates, {
            returning: 'minimal', // Don't return the value after inserting
            })
        if (error) throw error
    } catch (error) {
        alert(error.message)
    } finally {
        loading.value = false
    }
}

async function createProfile(){
    try {
        loading.value = true
        const user = useSupabaseUser()

        const updates = {
            id: user.value.id,
            username: username.value,
            website: website.value,
            avatar_url: avatar_path.value,
            created_at:new Date(),
        }
        const { error } = await supabase.from('profiles').insert(updates, {
            returning: 'minimal', // Don't return the value after inserting
            })
        if (error) throw error
    } catch (error) {
        alert(error.message)
    } finally {
        loading.value = false
    }
}


  return {
    session,
    error,
    profileFromProvider,
    signInWithProvider,
    signOut
  }
}

export default useAuth
