import { Box, useMediaQuery } from '@mui/material'
import React from 'react'
import NavBar from '../navBar/index'
import LoginPage from '../loginPage/index'
import UserWidget from "../widgets/UserWidget"
import MyPostWidget from "../widgets/MyPostWidget"
import PostsWidget from '../widgets/PostsWidget';
import PostWidget from '../widgets/PostWidget'
import AdvertWidget from '../widgets/AdvertWidget'
import FriendListWidget from '../widgets/FriendListWidget'
import Friend from '../../components/Friend'
import { useSelector } from 'react-redux'

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
  const { _id, picturePath} = useSelector((state) => state.user)
  return (
    <Box>
      <NavBar />
      <Box
       width="100%"
       padding="2rem 6%"
       display={isNonMobileScreens ? "flex" : "block"}
       gap="0.5rem"
       justifyContent="space-between">
        <Box flexBasis={isNonMobileScreens ? "26" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath}/>
        </Box>
        <Box flexBasis={isNonMobileScreens ? "42" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}>
          <MyPostWidget picturePath={picturePath}/>
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0">
              <FriendListWidget userId={_id} />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default HomePage
