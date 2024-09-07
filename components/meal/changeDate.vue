<template>

</template>

<script setup lang="ts">



// 現在の日付を保持するref
const selectedDate = ref<Date>(new Date());

// 日付を指定のフォーマットに変換する関数
const formatDateToString = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// フォーマットされた日付を計算するcomputed
const formattedDate = computed<string>(() => formatDateToString(selectedDate.value))

// 日付を指定した日数分移動する関数
const moveDate = (days: number): void => {
  const newDate = new Date(selectedDate.value)
  newDate.setDate(newDate.getDate() + days)
  selectedDate.value = newDate
}

// 前日に移動する関数
const moveToPreviousDay = (): void => moveDate(-1)

// 翌日に移動する関数
const moveToNextDay = (): void => moveDate(1)
</script>