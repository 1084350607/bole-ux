import { ref } from 'vue'

export function useArray<T>() {
  const array = ref([1,3,4,5])

  const pushItem = (item: number) => {
    array.value.push(item)
  }

  const deleteItem = (index: number) => {
    for(let i = 0; i < array.value.length; i++) {
      if (i === index) {
        array.value.slice(i, 1)

        return
      }
    }
  }

  return {
    array,
    deleteItem,
    pushItem
  }
}
