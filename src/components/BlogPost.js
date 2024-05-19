import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, List, Divider, styled } from '@mui/material';
import TitleAndDescription from './TitleAndDescription';
import TitleAndDescriptionAndImage from './TitleAndDescriptionAndImage';
import TitleAndScrapedDataAndURL from './TitleAndScrapedDataAndURL';
import TitleAndFacebookPost from './TitleAndFacebookPost';
import TitleAndTwitterPost from './TitleAndTwitterPost';
import { getBlogDetails } from './services/blogService';
import io from 'socket.io-client';

const Container = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(3, 0),
}));

const BlogPosts = () => {
  const { blogId } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getBlogDetails(blogId);
        if (data.status === 'error') {
          setError(data.message);
        } else {
          setPosts(data.data.posts);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    const socket = io('ws://localhost:3001');

    socket.on('connect', () => {
      console.log('Socket.IO connection established');
    });

    socket.on('newPost', (newPost) => {
      if (newPost.blogId === blogId) {
        setPosts((prevPosts) => [...prevPosts, newPost]);
      }
    });

    socket.on('updatedPost', (updatedPost) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
      );
    });

    socket.on('deletedPost', (deletedPostId) => {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== deletedPostId));
    });

    socket.on('disconnect', () => {
      console.log('Socket.IO connection closed');
    });

    socket.on('error', (error) => {
      console.error('Socket.IO error:', error);
    });

    return () => {
      socket.disconnect();
    };
  }, [blogId]);

  if (loading) return <Typography variant="h4">Loading...</Typography>;
  if (error) return <Typography variant="h4" color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Posts for Blog - {blogId}
      </Typography>
      <List>
        {posts.map((post, index) => (
          <div key={post.id}>
            {index !== 0 && <StyledDivider />}
            <div>
              {post.title && post.description && !post.imageUrl && <TitleAndDescription post={post} />}
              {post.title && post.description && post.imageUrl && <TitleAndDescriptionAndImage post={post} />}
              {post.title && post.scrapedData && <TitleAndScrapedDataAndURL post={post} />}
              {post.title && post.embedCode && post.socialMediaType === "facebook" && <TitleAndFacebookPost post={post} />}
              {post.title && post.embedCode && post.socialMediaType === "twitter" && <TitleAndTwitterPost post={post} />}
            </div>
          </div>
        ))}
      </List>
    </Container>
  );
};

export default BlogPosts;
