<template  >
    <button v-if="title=='朝食'" :class="ifClick ? 'true-class' : 'false-class'" @click="changeKind()">
        <img v-if="ifClick" src="@/assets/img/icon_morning_click.png" :alt="title"></img>
        <img v-else  src="@/assets/img/icon_morning_default.png" :alt="title"></img>
    </button>
    <button v-if="title=='昼食'" :class="ifClick ? 'true-class' : 'false-class'" @click="changeKind()">
        <img v-if="ifClick" src="@/assets/img/icon_afternoon_click.png" :alt="title"></img>
        <img v-else  src="@/assets/img/icon_afternoon_default.png" :alt="title"></img>
    </button>
    <button v-if="title=='夕食'" :class="ifClick ? 'true-class' : 'false-class'" @click="changeKind()">
        <img v-if="ifClick" src="@/assets/img/icon_night_click.png" :alt="title"></img>
        <img v-else  src="@/assets/img/icon_night_default.png" :alt="title"></img>
    </button>
    <button v-if="title=='間食'" :class="ifClick ? 'true-class' : 'false-class'" @click="changeKind()">
        <img v-if="ifClick" src="@/assets/img/icon_snack_click.png" :alt="title"></img>
        <img v-else  src="@/assets/img/icon_snack_default.png" :alt="title"></img>
    </button>
</template>

<script setup lang="ts">

const props = defineProps<{
    title:string,
    ifClick: boolean,
}>()

const emit= defineEmits<{
    (e:'changeKind'):void
}>()

const changeKind = () => {
  emit('changeKind');
};
</script>

<style scoped>
/* imgタグがinline要素だから影が前に表示されない */
.true-class{
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.50) inset;
    display: inline-block;
      width: 60px;
      height: 60px;
    border-radius: 60px;
    position: relative;
    z-index: 0;
    background: none;
}
.false-class{
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    display: inline-block;
      width: 60px;
      height: 60px;
    border-radius: 60px;
    position: relative;
}
/* .div{
    display: inline-block;
      width: 60px;
      height: 60px;
    border-radius: 60px;
} */
/* .div  */
.false-class img{
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 60px;
    object-fit: cover;
}
.true-class img{
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 60px;
    object-fit: cover;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.50) inset;
}
</style>