<script setup lang="ts">
import MovieListChild from './movieListChild.vue';

interface movieList {
  Y: number;
  M: number;
  monthDatas: {
    id: number;
    date: Date;
    status: number;
    total_score: number | null;
  }[];
}

interface data {
  values: movieList[];
}
const props = defineProps<data>();
</script>

<template>
  <div class="sub_container" v-for="d in props.values">
    <div class="month">{{ d.Y }}年{{ d.M }}月</div>
    <div class="subsub_container">
      <MovieListChild
        v-for="movie in d.monthDatas"
        :id="movie.id"
        :date="movie.date"
        :status="movie.status"
        :total_score="movie.total_score"
      />
    </div>
  </div>
</template>

<style scoped>
.sub_container{
    display: flex;
    width: 100WW;
    align-self: stretch;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .subsub_container{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    align-self: stretch;
  }

  .month{
    height: 16px;
    align-self: stretch;
    color: #777777;
    font-family: Inter;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
</style>
