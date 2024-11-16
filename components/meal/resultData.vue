<template>
    <div class="data">
        <p class="title">{{ title }}</p>
        <p class="calorie">{{ calorie }}kcal</p>
    </div>
</template>

<script setup lang="ts">

const props=defineProps<{
    title:string
    calorie:number
}>()

</script>

<style scoped>
.data{
    display: flex;
    padding: 9px 165px 0px 12px;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 4px;

    background: rgba(119, 119, 119, 0.15);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
.title{
    width: 132px;
    height: 29px;

    color: #000;
    font-family: Inter;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
.calorie{
    width: 143px;
    height: 38px;

    color: #777;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
</style>