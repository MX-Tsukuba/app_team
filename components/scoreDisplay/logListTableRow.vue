<template>
    <tr :class = "props.holeNo % 2 ===0 ? 'even' : 'odd'" ><td>{{props.holeNo}}</td><td>{{ props.par }}</td><td>{{ props.result }}</td><td>{{ props.putts }}</td><td>{{ props.form_Score }}</td></tr>
</template>

<script setup lang = "ts">
interface holeDetails{
    holeNo:number,
    par:number,
    result: number,
    putts:number,
    form_Score:number
}
const props = defineProps<holeDetails>();
</script>

<style scoped>
td{
    width:100%
}

tr{
        display: flex;
        align-items: center;
        gap: 5px;
        justify-items: stretch;
        min-width: 300px;
    }

.odd{
    background: #F2F2F2; 
}

.even{
    background: #E2E2E2;
}
</style>