# BaseChart

基础的图表组件，基于ECharts，配置了符合Datalyst默认样式等

## API

| Property        | Description       | needed | Type | Default |
| ------------- |:-------------:| :-----:| :-----:| :----: |
| option      | ECharts Option  | true | EChartsOption \| MutiOption | None |
| type      | ECharts type  | false | ChartType | None |
| mutiType      | is mutiType  | false | Boolean | false |

when the `mutiType` is true, option type is `MutiOption`

## Type
```ts

export type ChartType = 'area' | 'pie' | 'line' | 'bar'

export type MutiOption = {
  [key in ChartType]?: EChartsOption
}

```



```vue
<template>
  <BaseChart class="chart" mutiType :type="currentType" :option="option" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChartType, MutiOption } from '@/components/charts'

const currentType = ref<ChartType>('pie')

// when the `mutiType` is true, options structure like this
const option = ref<MutiOption>({
  line: {
    tooltip: {
      show: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 600, 400],
        type: 'line',
        areaStyle: {},
        smooth: true
      }
    ]
  },
  bar: {
    toolbox: {
      feature: {
        dataZoom: {
          show: true
        }
      }
    },
    xAxis: {
      data: dataAxis,
      axisLabel: {
        inside: true,
        color: '#fff'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#999'
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        showBackground: true,
        data: data
      }
    ]
  },
  pie: {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      show: true,
      textStyle: {
        fontSize: '10px'
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>
```