<script setup lang="ts">
import { useArray } from '@boleux/hooks'

const { array, addItem , deleteItem, insertItem } = useArray([1, 2, 3])

console.log(array)
</script>

<template>
  <div>
    <template  v-for="(item, index) in array">
      <span @click="deleteItem(index)">item is : {{ item }}</span>
      <!-- <button @click="deleteItem(index)">Delete {{ index }}</button> -->
    </template>
    <button @click="addItem(123)">add</button>
    <button @click="insertItem(2, '123123123')">insert</button>
  </div>
</template>
