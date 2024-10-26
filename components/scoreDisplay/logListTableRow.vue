<template>
  <tr :class="props.holeNo % 2 === 0 ? 'even' : 'odd'">
    <td>{{ props.holeNo }}</td>
    <td>{{ props.par }}</td>
    <td>{{ props.result }}</td>
    <td>{{ props.putts }}</td>
    <td>{{ props.form_Score }}</td>
  </tr>
</template>

<script setup lang="ts">
interface holeDetails {
  holeNo: number;
  par: number | null;
  result: number | null;
  putts: number | null;
  form_Score: number | null;
}
const props = defineProps<holeDetails>();
</script>

<style scoped>
td {
  width: 100%;
}

tr {
  display: flex;
  align-items: center;
  gap: 5px;
  justify-items: stretch;
  min-width: 300px;
}

.odd {
  background: #f2f2f2;
}

.even {
  background: #e2e2e2;
}
</style>
