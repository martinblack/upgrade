import * as FileSystem from 'expo-file-system'

export const moveFileToDocumentDirectory = async (uri: string, directory: string) => {
  let dir = FileSystem.documentDirectory + directory + '/'
  const fileName = uri?.split?.('/')?.slice(-1)
  await ensureDirExists(dir)
  await FileSystem.moveAsync({ from: uri, to: dir + fileName }).catch(err => {
    console.error(err)
  })
  return `${directory}/${fileName}`
}

export const removeFile = (uri: string) => {
  FileSystem.deleteAsync(uri).catch(err => console.error(err))
}

export const logDirectory = (directory: string) => {
  FileSystem.readDirectoryAsync(FileSystem.documentDirectory + directory).then(files => {
    console.log(files)
  })
}

export const getFileUri = (localUri: string) => {
  return FileSystem.documentDirectory + localUri
}

export const getLocalUri = (uri: string) => {
  const fileName = uri?.split?.('/')?.slice(-1)
  return `Videos/${fileName}`
}

async function ensureDirExists(dir: string) {
  const dirInfo = await FileSystem.getInfoAsync(dir)
  if (!dirInfo.exists) {
    console.log("Directory doesn't exist, creating...")
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true })
  }
}
