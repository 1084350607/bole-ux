type Percision = 'ms' | 'second' | ''

const percisionReversoContext = {
  ms: 100,
  second: 1000
}

/**
 * Format unix time to date string
 * @param unixTime
 * The unix time string
 *
 * @param precision
 * Time percision: ms or second
 *
 * @param options
 * Change the default options, year | month | day| hour | minute | second
 */
export function formatTime(
  unixTime: string,
  precision?: Percision,
  options?: Intl.DateTimeFormatOptions
) {
  let lang
  if (typeof window !== 'undefined') {
    lang = window.localStorage.getItem('lang')
  } else {
    lang = 'zh-CN'
  }
  const time = Number(unixTime) * (precision ? percisionReversoContext[precision] : 0)

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }

  const mergeOption = () => {
    const defaultOpt = { ...defaultOptions }

    if (options) {
      Object.keys(options).forEach((key) => {
        defaultOpt[key] && (defaultOpt[key] = options[key])
      })
    }
    return defaultOpt
  }

  const mergeOptions = mergeOption()

  const date = new Date(time).toLocaleString(lang, mergeOptions)

  return date
}