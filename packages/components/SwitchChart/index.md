# SwitchChart

基于DChart，支持类型切换

## API


| Property        | Description       | needed | Type |
| ------------- |:-------------:| :-----:| :-----:|
| currentType      | current chart type | required | ChartType |


## Type
```ts
tpye ChartType = 'pie' | 'area' | 'line' | 'bar'
```

## Demo
```vue
<template>
  <SwitchChart :current-type="currentType"/>
  <Button @click="changeChartType('pie')"></Button>
</template>

<script setup>
import { ChartType } from '@/components/charts'

const currentType = ref<ChartType>('pie')

const changeChartType = (type: ChartType) => {
  currentType.value = type
}

</script>
```

## 