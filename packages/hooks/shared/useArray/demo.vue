<script lang="ts" setup>
import { ref } from 'vue'
import { useArray } from '@boleux/hooks';

const demo = ref()

const { array } = useArray([1,2,3])
</script>

<template>
  <div ref="demo">hello</div>
</template>