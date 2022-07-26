import { MayBeRef } from './types';
import { unref } from 'vue';

/**
 * Normalize plain vale / ref / getter to `ref`
 * */
export function resolveArrayUnRef<T>(v: MayBeRef<T>[]): T[] {
  return v.map((item: MayBeRef<T>) => unref(item))
}