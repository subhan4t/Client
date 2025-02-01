import React from 'react'
import { Typography, useTheme } from '@mui/material'
import FlexBetween from '../../components/FlexBetween'
import WidgetWrapper from '../../components/WidgetWrapper'

const AdvertWidget = () => {
    const { palette} = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
    const API_URL = import.meta.env.VITE_API_URL;

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
      src={`${API_URL}assets/mojo_adv.jpg`}
      style={{ borderRadius: "0.75rem", margin: "0.75rem 0"}}/>
      <FlexBetween>
        <Typography color={main}>Mojo</Typography>
        <Typography color={medium}>www.modular.com/mojo</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">Unleash the power of Mojo – a blazing-fast programming language that outpaces Python by up to 35,000 times, making it the ultimate choice for cutting-edge AI applications and high-performance computing!</Typography>
    </WidgetWrapper>
  )
}

export default AdvertWidget
