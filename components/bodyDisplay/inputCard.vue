<template>
    <div class="inputCard">
        <div class="inputName">{{ inputName }}</div>
        <div class="inputBody">
            <div class="input"><p style="font-size: 36px;">{{ input }}</p></div>
            <div class="unit">{{ unit }}</div>
        </div>
    </div>

</template>

<script setup lang="ts">
const props=defineProps<{
    inputName:string
    input:number
    unit:string
}>()
// console.log(props.input,"inputの中身を表示");
</script>

<style scoped >
.inputCard{
    display: flex;
width: 296px;
padding: 1px 0px;
flex-direction: column;
align-items: flex-start;
}
.inputName{
    display: flex;
padding: 8px;
align-items: flex-start;
gap: 10px;
font-size: 14px;
}
.inputBody{
    display: flex;
align-items: flex-end;
}
.input{
    display: flex;
width: 251px;
height: 48px;
padding: 0px 10px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 15px;
border: 1px solid #509A58;
}
.unit{
    color: #333;
font-family: Inter;
font-size: 24px;
font-style: normal;
font-weight: 400;
line-height: normal;
}
</style>