<template>
  <NuxtLayout>
    <NuxtPage class="whole"/>
  </NuxtLayout>
</template>

<style>
body{
  margin: 0px;
}
p, ul, li, a{
  margin: 0;
  padding: 0;
}
li{
  list-style: none;
}
a{
  text-decoration: none;
  cursor: pointer;
}
button{
  all: unset;
  cursor: pointer;
}
.whole{
  padding: 80px 0;
  height: 100vh;
  background: #F0F0F0;
  overflow: hidden;
}
/* 共通CSS */
.circleBtn {
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background: #FFF;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, .25);
  position: fixed;
  right: 8px;
  bottom: 104px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bButton {
  width: 200px;
  height: 40px;
  border-radius: 20px;
  color: #FFF;
  background: #007be5;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, .25);
  display: flex;
  align-items: center;
  justify-content: center;
}
.bButton:active {
  background: #0058a3;
}
</style>
