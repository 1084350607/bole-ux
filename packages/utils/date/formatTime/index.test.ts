import { describe, expect } from "vitest"
import { formatTime } from "./formatTime"

describe('formatTime', () => {
  let time = `${new Date().getTime()}`

  let result = formatTime(time)

  console.log(result)

})