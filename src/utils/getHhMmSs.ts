const formatTime = (number: number) => (number < 10 ? `0${number}` : `${number}`)

export const getHhMmSs = (s: number) => {
  const seconds = s % 60
  const minutes = Math.floor(s / 60) % 60
  const hours = Math.floor(s / 3600)

  return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(Number(seconds.toFixed(6)))}`
}
