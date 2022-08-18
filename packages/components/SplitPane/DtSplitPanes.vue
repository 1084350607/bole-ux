<script>
import { h } from 'vue'
export default {
  provide() {
    return {
      getPaneInfo: this.getPaneInfo,
      requestUpdate: this.requestUpdate,
      // init Pane
      onPaneAdd: this.onPaneAdd,
      // Drag Events
      onPaneDragStart: this.onPaneDragStart,
      onPaneDragEnter: this.onPaneDragEnter,
      onPaneDragOver: this.showPreviewGutter,
      onPaneDragLeave: this.hidePreviewGutter
    }
  },
  props: {
    // horizontal or vertical
    vertical: { type: Boolean },
    panesMax: { type: Number },
    modelValue: { type: Object },
    rowInfo: { type: Object },
    noFooter: { type: Boolean, default: false }
  },
  data() {
    return {
      container: null,
      touch: {
        mouseDown: false,
        activeGutter: null
      },
      ready: false,
      panes: [],
      dragTarget: null
    }
  },
  computed: {
    panesCount() {
      return this.panes.length
    },
    // Indexed panes by `uid` of Pane components for fast lookup.
    // Every time a pane is destroyed this index is recomputed.
    indexedPanes() {
      return this.panes.reduce((obj, pane) => (obj[pane.id] = pane) && obj, {})
    }
  },
  watch: {
    panes: {
      // Every time a pane is updated, update the panes accordingly.
      deep: true,
      immediate: false,
      handler() {
        this.updatePaneComponents()
      }
    },
    rowInfo: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.redoGutter()
          this.bindDropEvents()
          // this.checkSplitpanesNodes()
          this.updatePaneComponents()
          this.initPaneInfo()
        })
      }
    }
  },
  methods: {
    /**
     * @desc: add event lis for the gutter
     **/
    bindXEvents() {
      document.addEventListener('mousemove', this.onMouseMove, { passive: false })
      document.addEventListener('mouseup', this.onMouseUp)
    },
    bindYEvents() {
      document.addEventListener('mousemove', this.resizeHeight)
      document.addEventListener('mouseup', this.onMouseYUp)
    },
    /**
     * @desc: remove event lis for the gutter
     **/
    unbindXEvents() {
      document.removeEventListener('mousemove', this.onMouseMove, { passive: false })
      document.removeEventListener('mouseup', this.onMouseUp)
    },
    /**
     * @desc: remove event lis for the gutter
     **/
    unbindYEvents() {
      document.removeEventListener('mousemove', this.resizeHeight, { passive: false })
      document.removeEventListener('mouseup', this.onMouseYUp)
    },
    /**
     * @desc: gutter move event
     **/
    onMouseMove(event) {
      if (this.touch.mouseDown) {
        // Prevent scrolling while touch dragging (only works with an active event, eg. passive: false).
        event.preventDefault()
        this.calculatePanesSize(this.getCurrentMouseDrag(event))
        this.$emit(
          'resize',
          this.panes.map((pane) => ({ min: pane.min, max: pane.max, size: pane.size }))
        )
      }
    },
    /**
     * @desc: Transfer size to Int, build connection with grid system
     **/
    bindPaneSizeWithGrid() {
      this.panes.forEach((pane) => {
        const paneSizeInt = pane.size.toFixed(0) * 1
        pane.size = paneSizeInt
      })
    },
    /**
     * @desc: Gutter mouseup event
     **/
    onMouseUp() {
      this.touch.mouseDown = false
      this.bindPaneSizeWithGrid()
      this.hidenPreviewItem()
      setTimeout(() => {
        this.unbindXEvents()
      }, 100)
    },
    onMouseYUp() {
      setTimeout(() => {
        this.unbindYEvents()
      }, 100)
    },
    /**
     * @desc: Drag pane start
     **/
    onPaneDragStart(event, instance) {
      window.dragPane = event.target
      window.dragPaneInstance = instance
      window.dragPaneInfo = this.panes.filter((pane) => pane.id === instance.uid)[0]
      // event.dataTransfer.effectedAllowed = 'move'
    },
    /**
     * @desc: When drop dom, insert dragTarget according to the mousePositon
     * @rule: Less 50%: insert befor, more 50% : insert after
     **/
    onDropHandle(event) {
      event.preventDefault()
      let shouldInsertBefore = this.calcPaneDirection(event.clientX, event.clientY)
      this.emitRemoveEvent(shouldInsertBefore)

      const children = Array.from(window.targetPane.parentElement.children)
      children.forEach((child) => {
        child.classList.remove('show-gutter')
      })
    },
    /**
     * @desc: Get target dom, cached with window.targetPane
     **/
    onPaneDragEnter(event, instance) {
      window.targetPane = document.getElementById(`cell-item-${instance.uid}`)
      window.targetPaneInfo = this.panes.filter((pane) => pane.id === instance.uid)[0]
    },
    showPreviewGutter(e) {
      if (!window.targetPane) return
      // const targetPane = window.targetPane
      const shouldInsertBefore = this.calcPaneDirection(e.clientX)
      const gutter =
        window.targetPane[shouldInsertBefore ? 'previousElementSibling' : 'nextElementSibling']
      if (gutter) {
        gutter.classList.add('show-gutter')
        const children = Array.from(gutter.parentElement.children)
        children.forEach((child) => {
          if (child !== gutter && child.classList.contains('show-gutter')) {
            child.classList.remove('show-gutter')
          }
        })
      }
    },
    hidePreviewGutter(event) {
      const parent = event.target.parentElement.parentElement
      const children = Array.from(parent.children)
      children.forEach((child) => {
        child.classList.remove('show-gutter')
      })
    },
    /**
     * @desc: emitRemoveEvent
     **/
    emitRemoveEvent(shouldInsertBefore) {
      const targetPane = window.targetPaneInfo
      const dragPane = window.dragPaneInfo
      this.$emit('remove', [targetPane.index, dragPane.index, shouldInsertBefore])
    },
    /**
     * @desc: Add pane to this.panes by index
     **/
    addPaneInfoByIndex(pane, index, shouldInsertBefore) {
      let beforePanes = this.panes.slice(0, index)
      let insertPos = this.panes[index]
      let afterPanes = this.panes.slice(index + 1)
      if (shouldInsertBefore) {
        this.panes = [...beforePanes, pane, insertPos, ...afterPanes]
      } else {
        this.panes = [...beforePanes, insertPos, pane, ...afterPanes]
      }
    },
    /**
     * @desc: Remove all cached varible on window
     **/
    refreshCacheInWindow() {
      window.dragPane = null
      window.targetPane = null
      window.dragPaneInfo = null
      window.dragPaneInstance = null
    },
    /**
     * @desc: Delete certain pane by index and updateContainer
     **/
    deletPanesByIndex(index) {
      this.panes.splice(index, 1)
      this.updatePaneComponents()
    },
    /**
     * @desc: Gird system: 12, calc width percentage
     **/
    calcSizeByGridCol(size) {
      return size * this.calcPreviewMargin() + (size - 1) * 20
    },
    /**
     * @desc: Gird system: 12, calc width percentage
     **/
    calcColByWidthPercentage(widthPercentage) {
      return (12 * widthPercentage) / 100
    },
    /**
     * @params: Mouse.clinetX, mouse.clientY
     * @desc: Calc pane insert position
     * @return: Less 50% or more 50%
     **/
    calcPaneDirection(mouseX) {
      const targetRect = window.targetPane.getBoundingClientRect()
      return mouseX - targetRect.x < targetRect.width / 2
    },
    /**
     * @desc: Panes changed callback, update style according this.panes new val
     **/
    updatePaneComponents() {
      this.panes.forEach((pane) => {
        pane.update({
          width: `${this.calcSizeByGridCol(pane.size)}px`
        })
      })
    },
    /**
     * @desc: Update DtPane comp attr, called by DtPane.vue
     **/
    requestUpdate({ target, ...args }) {
      const pane = this.indexedPanes[target._.uid]
      Object.entries(args).forEach(([key, value]) => (pane[key] = value))
    },
    /**
     * @desc: Calc pre panes sum size percentage
     **/
    sumPrevPanesSize(gutterIndex) {
      return this.panes.reduce((total, pane, i) => total + (i < gutterIndex ? pane.size : 0), 0)
    },
    /**s
     * @desc: Calc after panes sum size percentage
     **/
    sumNextPanesSize(gutterIndex) {
      return this.panes.reduce((total, pane, i) => total + (i > gutterIndex + 1 ? pane.size : 0), 0)
    },
    /**
     * @desc: Calc the distance of between mouse and the begin of the container when you drag gutter
     **/
    getCurrentDragPercentage(position) {
      let pos = position[this.vertical ? 'y' : 'x']
      const containerSize = this.container[this.vertical ? 'clientHeight' : 'clientWidth']

      return (pos * 100) / containerSize
    },
    calcPaneMaxSize() {
      return 12 - (this.panes.length - 1) * 3
    },
    getPaneInfo() {
      return {
        paneLength: this.panes.length
      }
    },
    onPaneAdd(pane) {
      let paneEl = pane.ctx

      // 1. Add pane to array at the same index it was inserted in the <splitpanes> tag.
      let index = -1
      Array.from(paneEl.$el.parentNode.children).some((el) => {
        if (el.className.includes('cell-item')) index++
        return el === paneEl.$el
      })

      this.panes.splice(index, 0, {
        id: paneEl._.uid,
        index: `${this.rowInfo.id}-${this.rowInfo.groupCell[index].id}`,
        min: 3,
        size: this.rowInfo.groupCell[index].width,
        givenSize: paneEl.size,
        update: paneEl.update,
        height: this.rowInfo.height
      })
    },
    /**
     * @desc: Calc before and after panes' size when you drap gutter
     **/
    calculatePanesSize(position) {
      const gutterIndex = this.touch.activeGutter
      const dragPercentage = Math.max(Math.min(this.getCurrentDragPercentage(position)))
      const gridColCount = this.calcColByWidthPercentage(dragPercentage)
      let paneBefore = this.panes[gutterIndex] || null
      let paneAfter = this.panes[gutterIndex + 1] || null

      // two gutter
      if (this.panes.length === 2) {
        paneBefore.size = Math.min(Math.max(gridColCount, paneBefore.min), paneBefore.max)
        paneAfter.size = Math.min(Math.max(12 - gridColCount, paneAfter.min), paneAfter.max)
        return
      }
      // there gutter
      if (this.panes.length === 3) {
        if (gutterIndex === 0) {
          let whichPane = 2
          // front
          if (gridColCount < paneBefore.size) {
            paneBefore.size = Math.min(Math.max(gridColCount, paneBefore.min), paneBefore.max)
            paneAfter.size = Math.min(
              Math.max(12 - Math.max(gridColCount, 3) - this.panes[2].size, paneAfter.min),
              paneAfter.max
            )
            return
          }
          // back
          if (this.panes[1].size === 3) {
            paneAfter = this.panes[2]
            whichPane = 1
          }
          paneBefore.size = Math.min(Math.max(gridColCount, paneBefore.min), paneBefore.max)
          paneAfter.size = Math.min(
            Math.max(12 - gridColCount - this.panes[whichPane].size, paneAfter.min),
            paneAfter.max
          )
        }
        if (gutterIndex === 1) {
          // back
          let whichPane = 0
          if (12 - gridColCount < paneAfter.size) {
            paneAfter.size = Math.min(Math.max(12 - gridColCount, paneAfter.min), paneAfter.max)
            paneBefore.size = Math.min(
              Math.max(12 - this.panes[0].size - paneAfter.size, paneBefore.min),
              paneBefore.max
            )
            return
          }

          // front
          if (this.panes[1].size === 3) {
            paneBefore = this.panes[0]
            whichPane = 1
          }
          paneAfter.size = Math.min(Math.max(12 - gridColCount, paneAfter.min), paneAfter.max)
          paneBefore.size = Math.min(
            Math.max(gridColCount - this.panes[whichPane].size, paneBefore.min),
            paneBefore.max
          )
        }
      }
    },
    /**
     * @desc: Calc the distance of between mouse and the begin of the container {x, y}
     **/
    getCurrentMouseDrag(event) {
      const rect = this.container.getBoundingClientRect()
      const { clientX, clientY } =
        'ontouchstart' in window && event.touches ? event.touches[0] : event
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      }
    },
    /**
     * @desc: Check if have pane or gutter, remove useless dom
     **/
    checkSplitpanesNodes() {
      const children = Array.from(this.container.children[0].children)
      children.forEach((child) => {
        const isPane = child.classList.contains('cell-item')
        const isSplitter = child.classList.contains('cell-gutter')
        const isButton = child.classList.contains('content-add-main')

        // Node is not a Pane or a splitter: remove it.
        if (!isPane && !isSplitter && !isButton) {
          child.parentNode.removeChild(child) // el.remove() doesn't work on IE11.
          console.warn(
            'Splitpanes: Only <pane> elements are allowed at the root of <splitpanes>. One of your DOM nodes was removed.'
          )
          return
        }
      })
    },
    /**
     * @desc: When panes changed, resize all by panes.length and auto updateStyle
     **/
    reCalcPanesSizing() {
      const paneSize = Math.floor(12 / this.panes.length)
      this.panes.forEach((pane) => {
        pane.size = paneSize
        pane.max = this.calcPaneMaxSize()
      })
    },
    /**
     * @desc Remove all gutters
     * @params Gutter HTMLElement
     **/
    removeGutter(node) {
      node.onmousedown = undefined
      node.onclick = undefined
      node.ondblclick = undefined
      node.parentNode.removeChild(node) // el.remove() doesn't work on IE11.
    },
    /**
     * @desc: Show resize preview grid col
     **/
    showPreviewItem() {
      this.createResizePreview()
      const [preCanReached, nextCanReached] = this.calcPaneMaxReached()
      const el = Array.from(this.container.children[0].children)
      const footerEl = this.container.lastChild
      const resizeWrapper = footerEl.getElementsByClassName('resize-preview')[0]
      const resizeItem = Array.from(resizeWrapper.children)
      this.changPreviewItem(preCanReached, nextCanReached, el, 'visible')
      this.changPreviewItem(preCanReached, nextCanReached, resizeItem, 'visible')
    },
    changPreviewItem(pre, next, el, attr) {
      for (let i = pre - 1; i < next; i++) {
        el[i].style.visibility = attr
      }
    },
    hidenAllPreviewItem(el) {
      el.forEach((ele) => {
        if (ele.style.visibility === 'visible') {
          ele.style.visibility = 'hidden'
        }
      })
    },
    /**
     * @desc: hiden resize preview grid col
     **/
    hidenPreviewItem() {
      this.removeResizePieview()
      const el = Array.from(this.container.children[0].children)
      const footerEl = this.container.lastChild
      const resizeWrapper = footerEl.getElementsByClassName('resize-preview')[0]
      const resizeItem = Array.from(resizeWrapper.children)
      this.hidenAllPreviewItem(el)
      this.hidenAllPreviewItem(resizeItem)
    },
    /**
     * @desc: Pane can reached grid col rang,  eg: [3, 6]
     **/
    calcPaneMaxReached() {
      const prePaneSize = this.sumPrevPanesSize(this.touch.activeGutter + 1)
      const nextPaneSize = this.sumNextPanesSize(this.touch.activeGutter - 1)
      const preCanReached = prePaneSize - (this.touch.activeGutter + 1) * 3
      const nextCanReached = nextPaneSize - (this.panes.length - 1 - this.touch.activeGutter) * 3
      return [prePaneSize - preCanReached, prePaneSize + nextCanReached]
    },
    /**
     * @desc: Gutter mouse down
     **/
    onMouseDown(event, gutterIndex) {
      this.bindXEvents()
      this.touch.mouseDown = true
      this.touch.activeGutter = gutterIndex

      this.showPreviewItem()
    },
    /**
     * @desc HighLight line animation
     **/
    onGutterMouseMove(e) {
      const gutterEl = e.target
      const gutterRect = gutterEl.getBoundingClientRect()
      const hightLightEl = gutterEl.children[1]
      const top = e.y - gutterRect.y - hightLightEl?.clientHeight / 2
      const animation = () => {
        if (hightLightEl) {
          hightLightEl.style.top = top + 'px'
        }
      }
      window.requestAnimationFrame && window.requestAnimationFrame(animation)
    },
    onRowGutterMousemove(e) {
      const rowWrapper = e.target
      const gutterRect = rowWrapper.getBoundingClientRect()
      const highLightEl = rowWrapper.children[0]
      const left = e.x - gutterRect.x - highLightEl.clientWidth / 2
      const animation = () => {
        highLightEl.style.left = left + 'px'
      }
      window.requestAnimationFrame && window.requestAnimationFrame(animation)
    },
    onRowGutterMousedown() {
      this.bindYEvents()
    },
    resizeHeight(e) {
      const { y } = this.getCurrentMouseDrag(e)
      this.container.children[0].style.height = y + 'px'
    },
    /**
     * @desc Remove all gutter and re-add according panes count
     **/
    redoGutter() {
      const children = Array.from(this.container.querySelector('.cell-item').parentElement.children)
      children.forEach((el) => {
        if (el.className.includes('cell-gutter-box')) this.removeGutter(el)
      })
      let paneIndex = 0
      children.forEach((el) => {
        if (el.className.includes('cell-item')) {
          if (!paneIndex) this.addGutter(paneIndex, el, true)
          if (paneIndex) this.addGutter(paneIndex, el)
          paneIndex++
        }
      })
    },
    refactorDOMStructure() {
      const children = Array.from(this.container.children)
      const mainBody = document.createElement('div')

      this.container.innerHTML = ''
      mainBody.classList.add('row-cell-items')

      children.forEach((el) => {
        if (el.className.includes('cell-gutter-box')) this.removeGutter(el)
        mainBody.appendChild(el)
      })
      this.container.appendChild(mainBody)
    },
    addFooterGutter() {
      const footer = document.createElement('div')
      footer.classList.add('row-footer')
      const template = `
        <div class="row-size-wrapper">
          <div class="row-resize-hightlighter"></div>
          <div class="row-resize-gutter action-indicator"></div>
        </div>
      `
      footer.innerHTML = template
      this.container.appendChild(footer)

      const rowGutter = footer.getElementsByClassName('row-size-wrapper')[0]
      rowGutter.addEventListener('mousemove', this.onRowGutterMousemove, true)
      rowGutter.addEventListener('mousedown', this.onRowGutterMousedown, true)
    },
    /**
     * @desc: Add gutter and bind event lis
     **/
    addGutter(paneIndex, nextPaneNode, isFirst = false) {
      const gutterIndex = paneIndex - 1
      const gutterBox = document.createElement('div')
      const gutter = document.createElement('div')
      const gutterHightLight = document.createElement('div')

      gutterBox.classList.add('cell-gutter-box')
      gutter.classList.add('cell-gutter')
      gutterHightLight.classList.add('cell-item-highlight')

      gutterBox.appendChild(gutter)
      gutterBox.appendChild(gutterHightLight)

      // gutterBox.addEventListener('mouseenter', () => {
      //   gutterBox.classList.add('cell-gutter-hover')
      // })
      // gutterBox.addEventListener('mouseleave', () => {
      //   gutterBox.classList.remove('cell-gutter-hover')
      // })

      if (!isFirst) {
        gutterBox.onmousedown = (event) => this.onMouseDown(event, gutterIndex)
        gutterBox.addEventListener('mousemove', this.onGutterMouseMove, true)
        nextPaneNode.parentNode.insertBefore(gutterBox, nextPaneNode)
      }
    },
    /**
     * @desc: Bind all events relate to drag and drop
     **/
    bindDropEvents() {
      // prevent default dragover event to make drop event available
      this.container.addEventListener('dragover', function (e) {
        e.preventDefault()
      })

      this.container.addEventListener('drop', this.onDropHandle, false)
    },
    initPaneInfo() {
      // Init height
      this.container.children[0].style.height = this.rowInfo.height + 'px'
      // Init maxSize
      this.panes.forEach((pane) => (pane.max = this.calcPaneMaxSize()))
    },
    calcPreviewMargin() {
      // 12X + 11G = this.container.clientWidth (G = 20)
      return (this.container.clientWidth - 220) / 12
    },
    createResizePreview() {
      const previewWrapper = document.createElement('div')
      previewWrapper.classList.add('resize-preview')

      const wrapper = document.createElement('div')
      wrapper.classList.add('resize-preview-item')
      wrapper.style.width = '20px'
      wrapper.style.marginLeft = this.calcPreviewMargin() + 'px'
      wrapper.style.visibility = 'hidden'

      const previewIcon = document.createElement('div')
      previewIcon.classList.add('preview-icon')
      wrapper.appendChild(previewIcon)

      for (let i = 0; i < 11; i++) {
        let node = wrapper.cloneNode(true)
        previewWrapper.appendChild(node)
      }
      const footerPreview = previewWrapper.cloneNode(true)
      this.container.insertBefore(previewWrapper, this.container.children[0])
      const footer = this.container.getElementsByClassName('row-footer')[0]
      footer.appendChild(footerPreview)
    },
    removeResizePieview() {
      const el = this.container.children[0]
      if (el.className.includes('resize-preview')) {
        this.container.removeChild(el)
      }
    }
  },
  mounted() {
    this.container = this.$refs.container
    this.bindDropEvents()
    // this.checkSplitpanesNodes()
    this.refactorDOMStructure()
    this.redoGutter()
    !this.noFooter && this.addFooterGutter()
    this.updatePaneComponents()
    this.initPaneInfo()
  },
  render() {
    return h(
      'div',
      {
        ref: 'container',
        class: ['grid-row-wrapper']
      },
      this.$slots.default()
    )
  }
}
</script>

<style lang="scss">
.grid-row-wrapper {
  display: flex;
  position: relative;
  flex-direction: column;
  .row-cell-items {
    display: flex;
    width: 100%;
    .cell-gutter-box {
      position: relative;
      margin: 0 7px;
      border-radius: 5px;
      transition: background-color 0.25s ease 0s;
      cursor: ew-resize;

      .cell-gutter {
        margin: auto;
        width: 6px;
        height: 10px;
      }
      .cell-item-highlight {
        height: 32px;
        width: 6px;
        display: none;
        position: absolute;
        border-radius: 5px;
        background-color: blue;
        pointer-events: none;
      }
      &:hover {
        .cell-item-highlight {
          display: block;
          transition: background-color 0.25s ease 0s;
        }
        background-color: paleturquoise;
      }
    }
    .show-gutter {
      background-color: paleturquoise;
    }
    .cell-item {
      background-color: white;
      box-sizing: border-box;
      border-radius: 12px;
    }
  }

  .vertical {
    flex-direction: column;
  }

  .resize-preview {
    display: flex;
    margin-bottom: 5px;
    position: absolute;
    top: -10px;
    pointer-events: none;
    .resize-preview-item {
      .preview-icon {
        width: 6px;
        height: 6px;
        // margin: auto;
        border-radius: 50%;
        margin: auto;
        opacity: 0.2;
        background-color: grey;
      }
    }
  }

  .row-footer {
    display: block;
    height: 20px;
    justify-content: center;
    position: relative;
    .resize-preview {
      top: 4px;
    }
    .row-size-wrapper {
      cursor: ns-resize;
      height: 100%;
      display: flex;
      align-items: center;
      padding-top: 2px;
      .row-resize-hightlighter {
        height: 6px;
        width: 32px;
        display: none;
        position: absolute;
        border-radius: 5px;
        background-color: blue;
        pointer-events: none;
      }
      .row-resize-gutter {
        height: 4px;
        width: 100%;
        transition: background-color 0.25s ease 0s;
        pointer-events: none;
      }
      &:hover {
        .row-resize-hightlighter {
          display: block;
          transition: background-color 0.25s ease 0s;
        }
        .action-indicator {
          background-color: paleturquoise;
        }
      }
    }
  }
}

.datalyst-row-vertical {
  flex-direction: column;
}
</style>
