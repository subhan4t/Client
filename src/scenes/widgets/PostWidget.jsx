import React from 'react'
import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
    DeleteOutline
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme , Menu, MenuItem} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import FlexBetween from '../../components/FlexBetween';
import WidgetWrapper from '../../components/WidgetWrapper';
import Friend from '../../components/Friend';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPost } from '../../state';

const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments
}) => {

    const [isComments, setIsComments] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const dispatch = useDispatch();
    const [anchorE1, setAnchorE1] = useState(null);
    const open = Boolean(anchorE1);
    const API_URL = import.meta.env.VITE_API_URL;
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]); 
  

    const likeCount = Object.keys(likes).length;

    const { palette} = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const patchLike = async () => {
      const response = await fetch(`${API_URL}posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId})
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost}))
    }

    const deletePost = async() => {
      try {
        const response = await fetch(`${API_URL}posts/${postId}/delete`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })

        if(!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData || "Something went wrong")
        }

        window.location.reload()
      } catch(error) {
        console.error("Error deleting post: ", error);
        alert(error.message);
      }
    }

    const handleClick = (event) => {
      setAnchorE1(event.currentTarget)
    }

    const handleClose = (event) => {
      setAnchorE1(null)
    }

  return (
    <WidgetWrapper m="2rem 0">
      <Friend 
      friendId={postUserId}
      name={name}
      subtitle={location}
      userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem"}} >{description}</Typography>
      {picturePath && (
        <img 
          width='100%'
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem"}}
        src={`${API_URL}assets/${picturePath}`} />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined  sx={{ color: primary}}/>
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton onClick={handleClick}>
          <MoreHorizIcon />
        </IconButton>

        <Menu anchorEl={anchorE1} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClose}>
            <IconButton onClick={deletePost}>
              <DeleteOutline />
              <Typography sx={{ paddingLeft: "0.5rem"}}>Delete</Typography>
            </IconButton>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <IconButton>
              <ShareOutlined />
              <Typography sx={{ paddingLeft: "0.5rem"}}>Share</Typography>
            </IconButton>
          </MenuItem>
        </Menu>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem"}}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  )
}

export default PostWidget
