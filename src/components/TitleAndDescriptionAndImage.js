import React from 'react';
import { Typography, CardContent, CardMedia, styled } from '@mui/material';

const StyledCard = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: '100%',
  [theme.breakpoints.down('sm')]: {
    height: 100,
  },
}));

const TitleAndDescriptionAndImage = ({ post }) => {
  return (
    <StyledCard>
      <StyledCardContent>
        <Typography variant="h6" gutterBottom>{post.title}</Typography>
        <Typography variant="body1">{post.description}</Typography>
        <StyledCardMedia
          component="img"
          alt="Post Image"
          image={post.imageUrl}
        />
      </StyledCardContent>
    </StyledCard>
  );
};

export default TitleAndDescriptionAndImage;
