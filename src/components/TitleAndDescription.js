import React from 'react';
import { Typography, styled } from '@mui/material';

const PostContainer = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(4),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));

const TitleAndDescription = ({ post }) => {
  return (
    <PostContainer>
      <Typography variant="h6" gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="body1">
        {post.description}
      </Typography>
    </PostContainer>
  );
};

export default TitleAndDescription;
