// plugins/useAuth-test.ts
import supabase from '~/plugins/supabase';
import { ref, onMounted,} from "vue";
import type { Session, SupabaseClient } from "@supabase/supabase-js";


interface ProfileFromGoogle {
  nickName: string;
  avatarUrl: string;
}

interface AuthState {
  session: Ref<Session | null>;
  error: Ref<string>;
  profileFromGoogle: Ref<ProfileFromGoogle>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}


const useAuthGoogle = (): AuthState => {
  const session = ref<Session | null>(null)
  const error = ref<string>('')
  const profileFromGoogle = ref<ProfileFromGoogle>({ nickName: '', avatarUrl: '' })
  const nuxtApp = useNuxtApp();
  const supabase = nuxtApp.$supabase as SupabaseClient;
  console.log("--------------------")
  console.log(nuxtApp)
  console.log("--------------------")

  const signInWithGoogle = async (): Promise<void> => {
    try {
      const { error: authError } = await supabase.auth.signInWithOAuth({ 
        provider: 'google',
        options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
          },
        }, 
      })
      console.log(session)
      if (authError) {
        error.value = authError.message
      }
    } catch (e: any) {
      error.value = e instanceof Error ? e.message : typeof e === 'string' ? e : 'Googleとの連携に失敗しました。'
    }
  }

  const signOut = async (): Promise<void> => {
    await supabase.auth.signOut()
  }

  onMounted(() => {
    const { data: authData } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        session.user.user_metadata = session.user.user_metadata || {}
        profileFromGoogle.value.nickName = session.user.user_metadata.user_name
        profileFromGoogle.value.avatarUrl = session.user.user_metadata.avatar_url
        error.value = ''
      } else {
        error.value = 'ユーザーがサインアウトしました'
        profileFromGoogle.value.nickName = ''
        profileFromGoogle.value.avatarUrl = ''
      }
      session ? (session = session) : (session = null)
    })

    return () => authData && authData.subscription.unsubscribe()
  })

  return {
    session,
    error,
    profileFromGoogle,
    signInWithGoogle,
    signOut
  }
}

export default useAuthGoogle
