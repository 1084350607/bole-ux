import { Ref } from "vue";

/**
 * ref or plain value
 *
 * ```ts
 * type MayBeRef<T> = T | Ref<T>
 * ```
 */
export type MayBeRef<T> = T | Ref<T>

/**
 * ref or plain value or a getter function
 *
 * ```ts
 * type MayBeComputedRef<T> = T | Ref<T> | (() => T)
 * ```
 */
export type MayBeComputedRef<T> = T | Ref<T> | (() => T)