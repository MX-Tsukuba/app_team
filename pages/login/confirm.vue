<script setup lang="ts">
const user = useSupabaseUser()

// Get redirect path from cookies
const cookieName = useRuntimeConfig().public.supabase.cookieName
const redirectPath = useCookie(`${cookieName}-redirect-path`).value

watch(user, () => {
  if (user.value) {
      // Clear cookie
      useCookie(`${cookieName}-redirect-path`).value = null
      // Redirect to path
      console.log("redirectoooo")
      return navigateTo(redirectPath || '../');
  }
  else{
    console.log("damesooooo")
    return navigateTo('/login', {external:true});

  }
}, { immediate: true })
</script>

<template>
  <div>Waiting for login...</div>
</template>


