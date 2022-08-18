# SplitPane

基于Grid布局的拖拽面板，支持调节宽度、高度、可拖拽范围高亮

## API

| Property        | Description       | needed | Type |
| ------------- |:-------------:| :-----:| :-----:|
| rowInfo      | 行信息 | required | id: string, groupCell: IGroupCell[], height: number |

## Demo

```vue
<template>
  <DtSplitPanes :rowInfo="row">
    <DtPane>
      content1
    </DtPane>
     <DtPane>
      content2
    </DtPane>
  </DtSplitPanes>
</template>

<script>
import DtSplitPanes from '@/components/DtSplitPanes.vue'
import DtPane from '@/components/splitpane/DtPane.vue'

const row = {
  id: '1',
  groupCell: [
    {
      id: '11',
      type: 2,
      width: 6
    },
    {
      id: '12',
      type: 2,
      width: 6
    }
  ],
  height: 450
},
</script>
```