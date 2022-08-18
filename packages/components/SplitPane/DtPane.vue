<template>
  <div
    class="cell-item"
    :draggable="draggable"
    @dragstart="handleDragStart($event, ctx)"
    @dragenter="handleDragenter($event, ctx)"
    @dragover="handlePaneDragOver($event, ctx)"
    @dragleave="handlePaneDragLeave($event, ctx)"
    :style="style"
    :id="`cell-item-${ctx.uid}`"
  >
    <slot />
  </div>
</template>

<script setup>
import {
  defineProps,
  onMounted,
  inject,
  getCurrentInstance,
  watch,
  computed,
  ref,
  provide
} from 'vue'
const ctx = getCurrentInstance()

const onPaneAdd = inject('onPaneAdd')
const requestUpdate = inject('requestUpdate')
const onPaneDragStart = inject('onPaneDragStart')
const onPaneDragEnter = inject('onPaneDragEnter')
const handlePaneDragOver = inject('onPaneDragOver')
const handlePaneDragLeave = inject('onPaneDragLeave')

const handleDragStart = (event, ctx) => {
  onPaneDragStart(event, ctx)
}

const draggable = ref(false)

const changeDraggable = () => {
  draggable.value = !draggable.value
}

const handleDragenter = (event, ctx) => {
  onPaneDragEnter(event, ctx)
}

const style = ref({})

const props = defineProps({
  size: { type: [Number, String], default: null },
  minSize: { type: [Number, String], default: 0 },
  maxSize: { type: [Number, String], default: 100 }
})

onMounted(() => onPaneAdd(ctx))

const sizeNumber = computed(() => {
  return props.size || props.size === 0 ? parseFloat(this.size) : null
})
const minSizeNumber = computed(() => {
  return parseFloat(props.minSize)
})
const maxSizeNumber = computed(() => {
  return parseFloat(props.maxSize)
})

const update = (updatedStyle) => {
  style.value = updatedStyle
}
ctx.ctx.update = update

provide('changeDraggable', changeDraggable)

watch(
  () => sizeNumber,
  (size) => {
    requestUpdate({ target: ctx, size })
  }
)
watch(
  () => minSizeNumber,
  (min) => {
    requestUpdate({ target: ctx, min })
  }
)
watch(
  () => maxSizeNumber,
  (max) => {
    requestUpdate({ target: ctx, max })
  }
)
</script>
