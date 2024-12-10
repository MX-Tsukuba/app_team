<script setup lang="ts">
import LogListTableRow from './logListTableRow.vue';
import type { holeDetail } from '~/types/scoreDisplay';
const props = defineProps<{ holeDetails: holeDetail[] }>();
</script>

<template>
  <div class="score_table">
    <table>
      <thead>
        <tr>
          <th>ホール</th>
          <th>パー</th>
          <th>スコア</th>
          <th>パッド</th>
          <th>フォーム</th>
        </tr>
      </thead>
      <tbody class="t_body">
        <LogListTableRow v-for="i in 18" v-bind="props.holeDetails[i - 1]" />
      </tbody>
    </table>
  </div>
</template>

<style>
.score_table {
  align-items: center;

  margin: auto;
  margin-bottom: 10px;
  text-align: center;
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

table {
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

tr {
  display: flex;
  align-items: center;
  gap: 5px;
  justify-items: stretch;
  min-width: 300px;
}

th {
  width: 100%;
}

thead {
  background: #90b9dc;
  color: #fff;
  font-size: 12px;
}
</style>
