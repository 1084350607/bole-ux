<script setup lang="ts">
import { useArray } from '@boleux/hooks'

const { array, addItem , deleteItem } = useArray()

console.log(array)
</script>

<template>
  <div>
    <template  v-for="(item, index) in array">
      <span>item is : {{ item }}</span>
      <!-- <button @click="deleteItem(index)">Delete {{ index }}</button> -->
    </template>
    <button @click="addItem(123)">add</button>
  </div>
</template>
