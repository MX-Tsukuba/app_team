<template>
  <tr :class="props.holeNumber % 2 === 0 ? 'even' : 'odd'">
    <td>{{ props.holeNumber }}</td>
    <td>{{ props.parNumber }}</td>
    <td>{{ props.golfScore }}</td>
    <td>{{ props.puttsNumber }}</td>
    <td>{{ props.formScore }}</td>
  </tr>
</template>

<script setup lang="ts">
import type { holeDetail } from '~/types/scoreDisplay';
const props = defineProps<holeDetail>();
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
