import React, { useEffect, useState } from 'react'
import { RedMark, TimeContainer, Wrapper } from './styled'
import { formatDurationInMs } from '@/utils/formatDuration'
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds'

interface Props {
  startedAt: Date | null
  isRecording: boolean
  isLandscape: boolean
}

const Time = ({ startedAt, isRecording, isLandscape }: Props) => {
  const [time, setTime] = useState<null | string>(null)

  useEffect(() => {
    let interval: any

    if (!isRecording) {
      setTime(null)
    }

    interval =
      startedAt &&
      isRecording &&
      setInterval(() => {
        setTime(formatDurationInMs(differenceInMilliseconds(new Date(), startedAt)))
      }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [startedAt, isRecording])

  return (
    <Wrapper isLandscape={isLandscape}>
      {isRecording && startedAt && time && (
        <>
          <RedMark />
          <TimeContainer>{time}</TimeContainer>
        </>
      )}
    </Wrapper>
  )
}

export default Time
