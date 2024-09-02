<template>
    <div class="homebody">
        <div class="gragh">
            <div class="graghChart"></div><!--グラフを表示するコンポーネントやtableタグが入る-->
            <div class="changeWeeks">
                <img class="weekBtn reverse" src="~assets/img/right.png">
                <img class="weekBtn " src="~assets/img/right.png">
            </div>
        </div>
        <div class="resultCard">
            <div class="day"></div>
            <div class="dayKcal"></div>
            <div class="eachOfResult">
                <div class="kindBtn"></div>
                <div class="table">
                    <p class="kindDisplay"></p>
                    <p class="sum"></p>
                    <resultData v-for="(v,i) in myArr" :key="i" :title="myArr[i].title" :calorie="myArr[i].calorie" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import resultData from '~/components/meal/resultData.vue';
</script>

<style lang="css">
.homebody{
    display: flex;
    width: 390px;
    padding: 52px 15px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
}
.gragh{
    display: flex;
    width: 360px;
    flex-direction: column;
    align-items: center;

    border-radius: 20px;
    background: #FFF;
    box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.40);
}
.graghChart{
    width: 330px;
    height: 223.462px;
}
.changeWeeks{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    align-self: stretch;
}
.weekBtn{
    color: #777;
    text-align: center;
    font-family: "Crimson Text";
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.reverse{
    transform: rotate(180deg);
}
.resultCard{
    width: 390px;
    height: 413px;

    position: absolute;
    bottom: -400.538px;

    background: #FFF;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
}
.day{
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}
.dayKcal{
    width: 179px;
    height: 77px;
    flex-shrink: 0;
}
.eachOfResult{
    display: flex;
    width: 390px;
    flex-direction: column;
    align-items: center;
    gap: 13px;
}
.kindBtn{
    display: flex;
    height: 60px;
    padding: 0px 10px;
    justify-content: center;
    align-items: center;
    gap: 20px;
    align-self: stretch;
}
.table{
    width: 360px;
    height: 320px;
    background: #FFF;
}
.kindDisplay{
    color: #777;
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
.sum{
    color: #F28822;
    font-family: Inter;
    font-size: 36px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 0px 12px;
}





</style>