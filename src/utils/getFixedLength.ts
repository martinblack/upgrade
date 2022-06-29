export const getFixedLength = (length: string) => {
  const fixedLength = length?.split?.(':')
  const seconds = fixedLength?.[fixedLength?.length - 1]?.split?.('.')?.[0]

  return `${fixedLength[0]}:${fixedLength[1]}:${seconds}`
}
