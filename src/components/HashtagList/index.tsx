import React from 'react'
import { HashtagContainer, HashtagText, Wrapper } from './styled'

interface Props {
  hashtags: Array<string>
}

const HashtagList: React.FC<Props> = ({ hashtags }: Props) => {
  return (
    <Wrapper>
      {React.Children.toArray(
        hashtags.map(item => (
          <HashtagContainer>
            <HashtagText>#{item}</HashtagText>
          </HashtagContainer>
        )),
      )}
    </Wrapper>
  )
}

export default HashtagList
