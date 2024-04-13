import { ref, onMounted,} from "vue";
import type { Session, SupabaseClient } from "@supabase/supabase-js";

const supabase = useSupabaseClient()

const loading = ref(true)
const username = ref('')
const website = ref('')
const avatar_path = ref('')

loading.value = true
const user = useSupabaseUser()

const { data } = await supabase 
    .from('profiles')
    .select('username, website, avatar_url')
    .eq('id', user.value.id)
    .single()

if (data) {
    username.value = data.username
    website.value = data.website
    avatar_path.value = data.avatar_url
}

loading.value = false

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

async function signOut() {
    try {
        loading.value = true
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        user.value = null
    } catch (error) {
        alert(error.message)
    } finally {
        loading.value = false
    }
}
