<template>
  <div class="footer">
    <NuxtLink to="/top"><img src="~assets/img/home.png"></NuxtLink>
    <img src="~assets/img/food.png">
    <img src="~assets/img/body.png">
    <NuxtLink to="/scoreDisplay"><img src="~assets/img/golf.png"></NuxtLink>
  </div>
</template>

<style scoped>
.footer{
  display: flex;
width: 100%;
height: 90px;
justify-content: center;
align-items: center;
gap: 72px;
flex-shrink: 0;
background: #FFF;
box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);
position: fixed;
bottom: 0;
left: 0;
}
</style>