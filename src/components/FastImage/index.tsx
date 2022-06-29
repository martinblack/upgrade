import React, { useEffect, useRef, useState } from 'react'
import { Image, ImageProps } from 'react-native'
import * as FileSystem from 'expo-file-system'
import { getAssetExtension } from '@/utils/getAssetExtension'

const getFileName = (name: string) => {
  const queryStartIndex = name.indexOf('?')
  const fileName = name
    .substring(0, queryStartIndex - 1)
    .replace(/[^a-zA-Z]/g, '')
    .replace(/\s/g, '')
  return fileName
}

async function findImageInCache(uri: string) {
  try {
    let info = await FileSystem.getInfoAsync(uri)
    return { ...info, err: false }
  } catch (error) {
    return {
      exists: false,
      err: true,
      msg: error,
    }
  }
}

async function cacheImage(uri: string, cacheUri: string, callback: () => void) {
  try {
    const downloadImage = FileSystem.createDownloadResumable(uri, cacheUri, {}, callback)
    const downloaded = await downloadImage.downloadAsync()
    return {
      cached: true,
      err: false,
      path: downloaded!.uri,
    }
  } catch (error) {
    console.log(error)
    return {
      cached: false,
      err: true,
      msg: error,
    }
  }
}

interface Props extends ImageProps {
  source: { uri: string }
  cacheKey?: string
  style?: Object
}

const FastImage: React.FC<Props> = ({ source, cacheKey, style, ...imageProps }: Props) => {
  const isMounted = useRef(true)
  const [imgUri, setImgUri] = useState(source.uri)

  useEffect(() => {
    async function loadImg() {
      let imgXt = getAssetExtension(source.uri)

      if (!imgXt) {
        console.log(`Could not load image from cache - a.`)
        return
      }
      const cacheFileUri = `${FileSystem.cacheDirectory}${getFileName(
        cacheKey || source.uri,
      )}.${imgXt}`

      let imgXistsInCache = await findImageInCache(cacheFileUri)

      if (imgXistsInCache.exists) {
        setImgUri(cacheFileUri)
      } else {
        let cached = await cacheImage(source.uri, cacheFileUri, () => null)
        if (cached.cached) {
          setImgUri(cached.path!)
        } else {
          console.log(`Could not load image from cache - b.`)
        }
      }
    }
    loadImg()
    return () => {
      isMounted.current = false
    }
  }, [source?.uri])

  return <Image source={{ uri: imgUri }} style={style} {...imageProps} />
}

export default FastImage
