import React from 'react'
import { Typography, useTheme } from '@mui/material'
import FlexBetween from '../../components/FlexBetween'
import WidgetWrapper from '../../components/WidgetWrapper'

const AdvertWidget = () => {
    const { palette} = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant='h5' fontWeight="500">Sponsored</Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img 
        width="100%"
        height="auto"
        alt="advert"
      src="https://devix-backend.onrender.com/assets/mojo_adv.jpeg"
      style={{ borderRadius: "0.75rem", margin: "0.75rem 0"}}/>
      <FlexBetween>
        <Typography color={main}>Mojo</Typography>
        <Typography color={medium}>Unleash the power of Mojo – 35,000x faster than Python, perfect for AI and high-performance computing!"</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">Your</Typography>
    </WidgetWrapper>
  )
}

export default AdvertWidget
