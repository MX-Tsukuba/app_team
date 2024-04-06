// plugins/useAuth.ts
import supabase from '~/plugins/supabase';
import { ref, onMounted,} from "vue";
import type { Session, SupabaseClient } from "@supabase/supabase-js";


interface ProfileFromGithub {
  nickName: string;
  avatarUrl: string;
}

interface AuthState {
  session: Ref<Session | null>;
  error: Ref<string>;
  profileFromGithub: Ref<ProfileFromGithub>;
  signInWithGithub: () => Promise<void>;
  signOut: () => Promise<void>;
}


const useAuth = (): AuthState => {
  const session = ref<Session | null>(null)
  const error = ref<string>('')
  const profileFromGithub = ref<ProfileFromGithub>({ nickName: '', avatarUrl: '' })
  const nuxtApp = useNuxtApp();
  const supabase = nuxtApp.$supabase as SupabaseClient;
  console.log("--------------------")
  console.log(nuxtApp)
  console.log("--------------------")

  const signInWithGithub = async (): Promise<void> => {
    try {
      const { error: authError } = await supabase.auth.signInWithOAuth({ provider: 'github' })
      console.log(session)
      if (authError) {
        error.value = authError.message
      }
    } catch (e: any) {
      error.value = e instanceof Error ? e.message : typeof e === 'string' ? e : 'GitHubとの連携に失敗しました。'
    }
  }

  const signOut = async (): Promise<void> => {
    await supabase.auth.signOut()
  }

  onMounted(() => {
    const { data: authData } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        session.user.user_metadata = session.user.user_metadata || {}
        profileFromGithub.value.nickName = session.user.user_metadata.user_name
        profileFromGithub.value.avatarUrl = session.user.user_metadata.avatar_url
        error.value = ''
      } else {
        error.value = 'ユーザーがサインアウトしました'
        profileFromGithub.value.nickName = ''
        profileFromGithub.value.avatarUrl = ''
      }
      session ? (session = session) : (session = null)
    })

    return () => authData && authData.subscription.unsubscribe()
  })

  return {
    session,
    error,
    profileFromGithub,
    signInWithGithub,
    signOut
  }
}

export default useAuth
