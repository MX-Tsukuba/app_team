export default defineNuxtRouteMiddleware((to, from) => {
    return navigateTo('/logout')
    // return navigateTo({ path: '/' })
  })