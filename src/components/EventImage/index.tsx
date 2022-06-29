import React from 'react'
import { ImageContainer } from './styled'
import FastImage from '@/components/FastImage'
import { Image } from 'react-native'
import Layout from '@/constants/Layout'

interface Props {
  imageUrl: string
  sizeDividedBy?: number
}

const EventImage: React.FC<Props> = ({ imageUrl, sizeDividedBy = 1 }) => {
  const [imageHeight, setImageHeight] = React.useState(0)

  Image.getSize(imageUrl, (width, height) => {
    const ratio = Layout.window.width / width
    setImageHeight(height * ratio)
  })

  return (
    <ImageContainer sizeDividedBy={sizeDividedBy} height={imageHeight}>
      {imageUrl && (
        <FastImage
          resizeMethod="scale"
          resizeMode="cover"
          source={{
            uri: imageUrl,
          }}
          style={{ width: '100%', height: '100%', alignSelf: 'center' }}
        />
      )}
    </ImageContainer>
  )
}

export default EventImage
