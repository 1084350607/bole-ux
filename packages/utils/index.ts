import { MayBeRef } from './types';
import { unref } from 'vue';

/**
 * Normalize plain vale / ref / getter to `ref`
 * */
export function resolveUnRef<T>(v: MayBeRef<T>): T {
  return typeof v === 'function' 
    ? (v as Function)()
    : unref(v)
}