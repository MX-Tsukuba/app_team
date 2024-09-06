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
      return navigateTo(redirectPath || '/resister');
  }
  else return navigateTo('http://localhost:3000/login', {external:true});
}, { immediate: true })
</script>

<template>
  <div>Waiting for login...</div>
</template>



<!-- http://localhost:3000/confirm?error=server_error&error_description=ERROR%3A+permission+denied+for+table+t_profiles+%28SQLSTATE+42501%29#error=server_error&error_description=ERROR%253A+permission+denied+for+table+t_profiles+%2528SQLSTATE+42501%2529 -->