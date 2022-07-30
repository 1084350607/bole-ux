# formatTime

format unix time

## Usage

Automatically format time according to local time zone


```ts
import { formatTime } from 'bole-ux/utils'

let unixTime = new Date().getTime() // 1659149145722

// local time zone : cn

let formatTime = formatTime(unixTime)

// local time zone : en

```


## params

| params        | desc           | type  |
| ------------- |:-------------: | :-----:|
| unixTime      | unix time | string |
| precision      | 时间精度     | 'ms','second' |
| options | 覆盖默认配置  | DateTimeFormatOptions |