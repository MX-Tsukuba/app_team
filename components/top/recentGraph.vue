<template>
  <div v-if="isLoading">データを読み込んでいます</div>
  <div v-else>
      <ClientOnly>
          <Line  :data="chartData" :options="chartOptions" />
      </ClientOnly>
  </div>
  <div class="noGraphDataMessage" v-if="!isShowGraph">
    <p>解析済みの動画が登録されていません。</p>
    <p>フォームを撮影してください。</p>
  </div>
</template>

<script setup lang="ts">
import type { Database } from '~/types/database.types.ts';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const supabase = useSupabaseClient<Database>();
const labels=ref<string[]>([]); //日付
const datasets=ref<number[]>([]); //フォームスコア
const isLoading = ref<boolean>(false);
const isShowGraph = ref<boolean>(true);
const chartData = computed(() => ({
  labels: labels.value,
  datasets: [{
    label: '直近のフォームスコア',
    data: datasets.value,
    borderColor: '#E2605F',
    tension: 0.1
  }]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
}

const selectDate = async() => {
  isLoading.value = true;

  // ユーザID取得処理
  const user = await supabase.auth.getSession()
    .then(({data: {session}}) => {
      if (!session) return null;
      return supabase.auth.getUser()
        .then(({data: { user }}) => user)
    })
  if(!user){
    console.error('ユーザIDが取得できません');
    return;
  }

  // データ取得処理
  const { data, error } = await supabase
    .from('t_movies')
    .select('date, result')
    .eq('user_id', user.id)
    .eq('status', 2)
    .order('date',{ascending:true})
    .limit(7);
  if(error){
    console.error(error);
    return;
  }else if(data.length === 0){
    console.log('直近のフォームスコアがありません');
    isShowGraph.value = false;
    const today = new Date();
    labels.value = Array.from({length: 7}, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }).reverse();
    isLoading.value = false;
  }else{
    console.log('直近のフォームスコア取得成功', data);
    labels.value = data.map((item:any) => item.date.slice(5).replace('-','/'));
    datasets.value = data.map((item:any) => item.result.total_score * 100);
    isLoading.value = false;
  }
}

onMounted(() => {
  selectDate();
})
</script>

<style scoped>
.noGraphDataMessage{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.noGraphDataMessage p{
  font-size: 12px;
  color: #E45D5D;
}
</style>