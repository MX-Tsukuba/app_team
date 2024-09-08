<template>
    <div class="resisterContainer">
        <h1>resister.vue</h1>
        <div class="successMessage">authentication successful</div>
        <NuxtLink class="returnLink" to="/top">
            return to index.vue
        </NuxtLink>
        <button class="logoutButton" @click="signOut">
          logout
        </button>
    </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const signOut = async () =>{
  const { error } = await supabase.auth.signOut()
  if (error) console.log(error)
}
</script>


