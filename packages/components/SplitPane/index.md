# SplitPane

基于Grid布局的拖拽面板，支持调节宽度、高度、可拖拽范围高亮

## API

| Property        | Description       | needed | Type |
| ------------- |:-------------:| :-----:| :-----:|
| rowInfo      | 行信息 | required | id: string, groupCell: IGroupCell[], height: number |

## Demo


<script setup>
import Demo from './demo.vue'
</script>

<DemoContainer>
<p class="demo-source-link"><a href="${URL}/demo.vue" target="_blank">source</a></p>
<Demo/>
</DemoContainer>

```vue
<template>
  <DtSplitPanes :rowInfo="rows[0]">
    <DtPane>
      <div style="background: #e4e3fb; border-radius: 8px">123</div>
    </DtPane>
    <DtPane>
      <div style="background: #e4e3fb; border-radius: 8px">456</div>
    </DtPane>
  </DtSplitPanes>
</template>

<script setup>
import DtSplitPanes from "./DtSplitPanes.vue";
import DtPane from "./DtPane.vue";

const rows = [
  {
    id: "1",
    groupCell: [
      {
        id: "11",
        type: 2,
        width: 5,
      },
      {
        id: "11",
        type: 2,
        width: 7,
      },
    ],
  },
];
</script>
```