<template>
  <div class="changeDate">
      <button @click="$emit('firstclick')"><img class="dateBtn reverse" src="~assets/img/right.png"></button>
      <p class="date">{{formattedDate}}</p>
      <button @click="$emit('secondclick')"><img class="dateBtn" src="~assets/img/right.png"></button>
  </div>
</template>

<script setup lang="ts">

defineEmits<{
  (e:'firstclick'):void
  (e:'secondclick'):void
}>()

defineProps<{
  formattedDate:string
}>()
</script>
<style scoped>
.changeDate{
    display: flex;
    align-items: center;
    gap: 8px;
}
.date{
    color: #777;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
.dateBtn{
    width: 11px; height: 15px;
}
.reverse{
    transform: rotate(180deg);
}</style>