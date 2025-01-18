import { useTheme } from '@emotion/react'
import React from 'react'
import { TailSpin } from 'react-loader-spinner'

const Loader = () => {
    const { palette} = useTheme()
  return (
    <div>
      <TailSpin 
       height="80"
       width="80"
       color={palette.primary.main}
       ariaLabel="loading"/>
    </div>
  )
}

export default Loader
