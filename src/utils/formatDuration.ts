import intervalToDuration from 'date-fns/intervalToDuration'

export const toTwoDigits = (value: number | undefined) => {
  if (!value && value !== 0) {
    return ''
  }
  return value < 10 ? `0${value}` : value
}

export const formatDurationInMs = (time: number) => {
  const { hours, minutes, seconds } = intervalToDuration({
    start: 0,
    end: time,
  })

  return [toTwoDigits(hours) || undefined, toTwoDigits(minutes), toTwoDigits(seconds)]
    .filter(value => value !== undefined)
    .join(':')
}
