<!--
トーストメッセージ使い方
1.使用したいトリガーが存在するコンポーネントで以下のように記述。
<script>
import { useToastStore } from '~/src/store/toast'

const toastStore = useToastStore()
</script>

2.以下の関数をscript又はtemplate内で使用。
toastStore.setSuccessToast('メッセージ') // 成功メッセージ
toastStore.setErrorToast('メッセージ') // エラーメッセージ

例：
toastStore.setSuccessToast('フォーム解析完了')
-->
<script>

import { useToastStore } from '~/src/store/toast'

const toastStore = useToastStore()
export default {
  data() {
    return { toastStore }
  }
}
</script>

<template>

  <VSnackbar
    v-model="toastStore.isActive"
    timeout="3000"
    :color="toastStore.color"
    location="top center"
    variant="flat"
    class="py-3"
    @on-vnode-unmounted="toastStore.unsetSnackbar()"
  >
    {{ toastStore.message }}
  </VSnackbar>
</template>