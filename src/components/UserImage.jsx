import React from 'react'
import { Box } from '@mui/material'

const UserImage = ({ image, size = "60px"}) => {
  const API_URL = import.meta.env.VITE_API_URL;
  return (
    <Box>
      <img
        style={{ objectFit: "cover", borderRadius: "50%"}} 
        width={size}
        height={size}
        alt="user"
        src={`${API_URL}assets/${image}`} />
    </Box>
  )
}

export default UserImage;
