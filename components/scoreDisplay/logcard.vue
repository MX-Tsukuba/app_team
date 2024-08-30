<template>
    <div class = "card_whole">
        <div class = "date">6月22日 水曜日</div>
        <div class = "button_fram" @click="toggleScoreTable">
            <div class = "arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43" fill="none">
                <g filter="url(#filter0_d_351_6002)">
                    <rect x="8" y="8" width="26.9997" height="26.9997" rx="13.4999" fill="white" shape-rendering="crispEdges"/>
                    <rect x="8.5" y="8.5" width="25.9997" height="25.9997" rx="12.9999" stroke="#777777" shape-rendering="crispEdges"/>
                    <path d="M21.1656 22.7533L21.4999 23.054L21.8342 22.7533L26.6335 18.4366L27.4643 19.1852L21.5001 24.5615L15.5349 19.1862L16.3656 18.4374L21.1656 22.7533Z" fill="#777777" stroke="#777777" />
                </g>
                <defs>
                    <filter id="filter0_d_351_6002" x="0" y="0" width="42.9998" height="43" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset/>
                    <feGaussianBlur stdDeviation="4"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_351_6002"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_351_6002" result="shape"/>
                    </filter>
                </defs>
                </svg>
            </div>
        </div>
        <div class = "tags">
            <div class = "score_tag">
                <div class = "score_text">合計スコア</div>
                <div class = "score_value">91</div>
            </div>
            <div class = "place_tag">
                <div class = "place_text">📍牛久ゴルフ場</div>
            </div>
        </div>
        <div class = "score_table" v-show = "isScoreTableVisible">
            <table>
                <thead>
                    <tr><th>ホール</th><th>パー</th><th>ホール</th><th>パッド</th><th>フォーム</th></tr>
                </thead>
                <tbody class = "t_body">
                    <tr class = "odd"><td>1</td><td>5</td><td>6</td><td>5</td><td>72</td></tr>
                    <tr class = "even"><td>2</td><td>5</td><td>6</td><td>5</td><td>72</td></tr>
                    <tr class = "odd"><td>3</td><td>5</td><td>6</td><td>5</td><td>72</td></tr>
                    <tr class = "even"><td>4</td><td>5</td><td>6</td><td>5</td><td>72</td></tr>
                    <tr class = "odd"><td>5</td><td>5</td><td>6</td><td>5</td><td>72</td></tr>
                    <tr class = "even"><td>6</td><td>5</td><td>6</td><td>5</td><td>72</td></tr>
                    <tr class = "odd"><td>7</td><td>5</td><td>6</td><td>5</td><td>72</td></tr>
                    <tr class = "even"><td>8</td><td>5</td><td>6</td><td>5</td><td>72</td></tr>
                    <tr class = "odd"><td>9</td><td>5</td><td>6</td><td>5</td><td>72</td></tr>
                    <tr class = "even"><td>10</td><td>5</td><td>6</td><td>5</td><td>72</td></tr>
                    <tr class = "odd"><td>11</td><td>5</td><td>6</td><td>5</td><td>72</td></tr>
                    <tr class = "even"><td>12</td><td>5</td><td>6</td><td>5</td><td>72</td></tr>
                    <tr class = "odd"><td>13</td><td>5</td><td>6</td><td>5</td><td>72</td></tr>
                    <tr class = "even"><td>14</td><td>5</td><td>6</td><td>5</td><td>72</td></tr>
                    <tr class = "odd"><td>15</td><td>5</td><td>6</td><td>5</td><td>72</td></tr>
                    <tr class = "even"><td>16</td><td>5</td><td>6</td><td>5</td><td>72</td></tr>
                    <tr class = "odd"><td>17</td><td>5</td><td>6</td><td>5</td><td>72</td></tr>
                    <tr class = "even"><td>18</td><td>5</td><td>6</td><td>5</td><td>72</td></tr>
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
import {ref} from 'vue';

const isScoreTableVisible = ref(false);
const  toggleScoreTable = () =>{
    isScoreTableVisible.value = !isScoreTableVisible.value
    document.querySelector(".arrow")?.classList.toggle("open");
};
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
        width: 115px;
        height: 24px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        border-radius: 18px;
        background: #EBEBEB;
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

    td, th{
        width: 100%;
    }

    thead{
        background: #90B9DC;
        color: #FFF;
        font-size: 12px;
    }
    
    .odd{
        background: #F2F2F2; 
    }

    .even{
        background: #E2E2E2;
    }
</style>