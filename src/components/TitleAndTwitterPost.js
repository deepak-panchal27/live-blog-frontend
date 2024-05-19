import React from 'react';
import { Typography, Card, CardContent, styled } from '@mui/material';

const PostContainer = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

const TwitterEmbedContainer = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
  '& .twitter-post': {
    maxWidth: '100%',
    overflow: 'hidden',
  },
}));

const TitleAndTwitterPost = ({ post }) => {
  return (
    <PostContainer>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {post.title}
        </Typography>
        <TwitterEmbedContainer>
          <div
            className="twitter-post"
            dangerouslySetInnerHTML={{ __html: post.embedCode }}
          />
        </TwitterEmbedContainer>
      </CardContent>
    </PostContainer>
  );
};

export default TitleAndTwitterPost;
