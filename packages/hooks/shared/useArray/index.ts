import { MayBeComputedRef, MayBeRef } from './../../../utils/types';
import { Ref, ref } from 'vue'
import { resolveUnRef } from '@boleux/utils';

export function useArray<T>(
  list: MayBeRef<T>[]
) {
  const array = ref<Ref<T>[]>(resolveUnRef(list))

  const addItem = (item: T) => {
    array.value.push(item)
  }

  const deleteItem = (index: number) => {
    console.log('deleteItem')
  }

  const insertItem = (index: number) => {
    console.log('insertItem')
  }

  return {
    array,
    deleteItem,
    addItem,
  }
}
