import React from 'react';
import { Typography, styled, Card, CardContent, CardMedia } from '@mui/material';

const PostContainer = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

const DataContainer = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const ScrapedDataImage = styled(CardMedia)({
  marginTop: 16,
  height: 150,
  backgroundSize: 'cover',
  borderRadius: 8,
});

const TitleAndScrapedDataAndURL = ({ post }) => {
  const scrapedData = JSON.parse(post.scrapedData);

  return (
    <PostContainer>
      <Typography variant="h6" gutterBottom>
        {post.title}
      </Typography>
      <DataContainer>
        {scrapedData.title && (
          <Typography variant="body1">Title: {scrapedData.title}</Typography>
        )}
        {scrapedData.description && (
          <Typography variant="body1">Description: {scrapedData.description}</Typography>
        )}
        {scrapedData.keywords && (
          <Typography variant="body1">Keywords: {scrapedData.keywords}</Typography>
        )}
        {scrapedData.ogTitle && (
          <Typography variant="body1">OG Title: {scrapedData.ogTitle}</Typography>
        )}
        {scrapedData.ogDescription && (
          <Typography variant="body1">OG Description: {scrapedData.ogDescription}</Typography>
        )}
        {scrapedData.ogImage && (
          <ScrapedDataImage
            component="img"
            image={scrapedData.ogImage}
            alt="OG Image"
          />
        )}
        {scrapedData.twitterTitle && (
          <Typography variant="body1">Twitter Title: {scrapedData.twitterTitle}</Typography>
        )}
        {scrapedData.twitterDescription && (
          <Typography variant="body1">Twitter Description: {scrapedData.twitterDescription}</Typography>
        )}
        {scrapedData.twitterImage && (
          <ScrapedDataImage
            component="img"
            image={scrapedData.twitterImage}
            alt="Twitter Image"
          />
        )}
        {scrapedData.canonicalUrl && (
          <Typography variant="body1">
            Canonical URL: <a href={scrapedData.canonicalUrl} target="_blank" rel="noopener noreferrer">{scrapedData.canonicalUrl}</a>
          </Typography>
        )}
        {scrapedData.author && (
          <Typography variant="body1">Author: {scrapedData.author}</Typography>
        )}
        {scrapedData.publishDate && (
          <Typography variant="body1">Publish Date: {scrapedData.publishDate}</Typography>
        )}
        {scrapedData.url && ( <Typography variant="body1">
          Redirect URL: <a href={scrapedData.url} target="_blank" rel="noopener noreferrer">{scrapedData.url}</a>
        </Typography>
      )}
      </DataContainer>
    </PostContainer>
  );
};

export default TitleAndScrapedDataAndURL;
