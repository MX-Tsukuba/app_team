<template>
    <div class = "card_whole">
        <div class = "date">{{ props.date }}</div>
        <div class = "button_fram" @click="toggleScoreTable">
            <div v-if="isScoreTableVisible" class='arrow open'>
                <LogListArrow/>
            </div>
            <div v-if="!isScoreTableVisible" class='arrow'>
                <LogListArrow/>
            </div>
        </div>
        <div class = "tags">
            <div class = "score_tag">
                <div class = "score_text">合計スコア</div>
                <div class = "score_value">{{ calculate(props.holedetails) }}</div>
            </div>
            <div class = "place_tag">
                <div class = "place_text">📍{{ props.golfPlaceName }}</div>
            </div>
        </div>
        <div class = "score_table" v-show = "isScoreTableVisible">
            <table>
                <thead>
                    <tr><th>ホール</th><th>パー</th><th>スコア</th><th>パッド</th><th>フォーム</th></tr>
                </thead>
                <tbody class = "t_body">
                    <LogListTableRow v-for="item in props.holedetails" :holeNo="item.holeNo" :par="item.par" :result="item.result" :puts="item.pats" :form_Score="item.form_Score"/>
                </tbody>
            </table>
        </div>
        <div v-show = "isScoreTableVisible" class = "analytics_link">
            <a href = "~/../formAnalytics">
                <div class = "text">フォームの分析を見る ></div>
            </a>
        </div>
    </div>
</template>

<script setup lang = "ts">
import LogListTableRow from './logListTableRow.vue';
import LogListArrow from './logListArrow.vue';
import {ref} from 'vue';

const isScoreTableVisible = ref(false);
const  toggleScoreTable = () =>{
    isScoreTableVisible.value = !isScoreTableVisible.value
};

interface holeDetail{
    holeNo:number,
    par:number,
    result: number,
    pats:number,
    form_Score:number
}

interface scoreDetas{
    date: string;
    golfPlaceName: string;
    holedetails: holeDetail[];
}

function calculate(holedetails:holeDetail[]){
    let result = 0;
    holedetails.forEach(element => {
        result += element.result;
    });
    return result;
}

// class scoreDetails implements scoreDetas{
//     // ?totalScore:number;
//     date: string;
//     golfPlaceName:string;
//     holedetails: holeDetails[];

//     constructor(date: string, golfPlaceName: string, details: holeDetails[]){
//         // this.totalScore = 0;
//         this.date = date;
//         this.golfPlaceName = golfPlaceName;
//         this.holedetails = details;
//     }
    
//     calculate(){
//         let tmp = 0;
//         for (let detail of this.holedetails){
//             tmp += detail.result;
//         }
//         // this.totalScore = tmp;
//         console.log("date: ",this.date)
//         console.log("golfPlaceName: ",this.golfPlaceName)
//         console.log("Props:", props); // 追加
//         return tmp
//     }
// }

const props = defineProps<scoreDetas>();

// const sampleData = new scoreDetails(props.date, props.golfPlaceName, props.holedetails);

</script>

<style scoped>
    .card_whole{
        display: flex;
        padding: 16px 16px 16px 16px;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        align-self: stretch;
        border-radius: 16px;
        background: #FFF;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        position: relative;
    }

    .date{
        color: #777;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal; 
    }

    .tags{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 11px;
    }

    .score_tag{
        display: flex;
        width: 110px;
        height: 24px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        border-radius: 18px;
        background: #EBEBEB;
    }

    .score_text{
        color: #007BE5;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    .score_value{
        color: #000;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    .place_tag{
        display: flex;
        height: 24px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        border-radius: 18px;
        background: #EBEBEB;
        padding-right: 10px;
    }

    .place_text{
        color: #007BE5;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    .button_fram{
        display: flex;
        padding: 6px 9px;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 0px;
        top: 0px;
    }

    .arrow{
        height: 43px;
        width: 43px;
    }


    .button_fram .open{
        transform: rotate(180deg);
    }

    .analytics_link{
        display: inline-flex;
        padding: 5px 10px;
        align-items: flex-start;
        gap: 5px;
        position: absolute;
        right: 0pt;
        bottom: 0pt;
    }

    .analytics_link .text{
        color: #007BE5;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    .score_table{
        align-items: center;

        margin: auto;
        margin-bottom: 10px;
        text-align: center;
        max-width: 100%;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }

    table{
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    tr{
        display: flex;
        align-items: center;
        gap: 5px;
        justify-items: stretch;
        min-width: 300px;
    }

    th{
        width: 100%;
    }

    thead{
        background: #90B9DC;
        color: #FFF;
        font-size: 12px;
    }
</style>