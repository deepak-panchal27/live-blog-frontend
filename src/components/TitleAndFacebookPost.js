import React from 'react';
import { Typography, styled } from '@mui/material';

const PostContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

const FacebookEmbedContainer = styled('div')({
  marginTop: 16,
  '& iframe': {
    width: '100%',
    border: 'none',
  },
});

const TitleAndFacebookPost = ({ post }) => {
  return (
    <PostContainer>
      <Typography variant="h6" gutterBottom>{post.title}</Typography>
      <FacebookEmbedContainer dangerouslySetInnerHTML={{ __html: post.embedCode }} />
    </PostContainer>
  );
};

export default TitleAndFacebookPost;
