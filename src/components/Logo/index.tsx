import React from 'react'
import { LogoBasic } from '@/components/SvgIcons/LogoBasic'
import { Box } from '@/components/_essentials/Box'

interface Props {
  height?: number
}

const Logo: React.FC<Props> = ({ height }: Props) => {
  return (
    <Box alignItems="center">
      <LogoBasic height={height} />
    </Box>
  )
}

export default Logo
