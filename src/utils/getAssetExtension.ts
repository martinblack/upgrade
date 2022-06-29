export const getAssetExtension = (uri: string) => {
  const split = uri?.split?.('.')
  return split?.[split?.length - 1]
}
