<template>
    <div v-if = "props.holeNo % 2 ===0">
        <tr class="even"><td>{{props.holeNo}}</td><td>5</td><td>6</td><td>5</td><td>72</td></tr>
    </div>
    <div v-else>
        <tr class="odd"><td>{{props.holeNo}}</td><td>5</td><td>6</td><td>5</td><td>72</td></tr>
    </div>
</template>

<script setup lang = "ts">
const props = defineProps<{holeNo:number}>();
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