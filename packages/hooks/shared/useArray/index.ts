import { MayBeComputedRef, MayBeRef } from './../../../utils/types';
import { Ref, ref } from 'vue'
import { resolveArrayUnRef } from '@boleux/utils';

export function useArray<T>(
  list: MayBeRef<T>[]
) {
  const array = ref(resolveArrayUnRef(list))

  const addItem = (item: T) => {
    array.value.push(item)
    console.log(array)
  }

  const deleteItem = (index: number) => {
    array.value.splice(index, 1)
  }

  const insertItem = (index: number, item: T) => {
    array.value.splice(index, 0, item)
  }

  return {
    array,
    deleteItem,
    addItem,
    insertItem
  }
}
