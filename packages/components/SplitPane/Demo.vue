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
