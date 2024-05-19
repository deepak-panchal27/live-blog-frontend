import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Typography, Button, Box, CircularProgress } from '@mui/material';
import { getPublishedBlogs } from './services/blogService';
import io from 'socket.io-client';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, totalPages: 0, totalResults: 0 });

  const fetchBlogs = async (page) => {
    setLoading(true);
    try {
      const data = await getPublishedBlogs({ page, limit: pagination.limit });
      if (data.status === 'error') {
        setError(data.message);
      } else {
        setBlogs(data.data.results);
        setPagination((prevPagination) => ({
          ...prevPagination,
          totalPages: data.data.totalPages,
          totalResults: data.data.totalResults,
          page,
        }));
      }
    } catch (error) {
      setError('Error fetching live blogs');
      console.error('Error fetching live blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const socket = io('http://localhost:3001');
  
    socket.on('connect', () => {
      console.log('Socket.IO connection established');
    });
  
    socket.on('publishBlog', (updatedBlog) => {
      setBlogs((prevBlogs) => {
        const index = prevBlogs.findIndex(blog => blog.id === updatedBlog.id);
        if (index !== -1) {
          const updatedBlogs = [...prevBlogs];
          updatedBlogs[index] = updatedBlog;
          return updatedBlogs;
        } else {
          const updatedBlogs = [...prevBlogs, updatedBlog];
          if (updatedBlogs.length > pagination.limit * pagination.page) {
            fetchBlogs(pagination.page);
          }
          return updatedBlogs;
        }
      });
    });
  
    socket.on('deleteBlog', (deletedBlogId) => {
      setBlogs((prevBlogs) => prevBlogs.filter(blog => blog.id !== deletedBlogId));
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
  }, [pagination.page]);
  
  useEffect(() => {
    fetchBlogs(pagination.page);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination((prevPagination) => ({ ...prevPagination, page: newPage }));
      fetchBlogs(newPage);
    }
  };

  const renderPaginationButtons = () => {
    if (pagination.totalPages <= 1) return null;

    return (
      <Box display="flex" alignItems="center" justifyContent="space-between" marginTop={2}>
        <Box>
          {pagination.page > 1 && (
            <Button onClick={() => handlePageChange(pagination.page - 1)} variant="outlined">
              Previous Page
            </Button>
          )}
        </Box>
        <Typography variant="body1">
          Page {pagination.page} of {pagination.totalPages}
        </Typography>
        <Box>
          {pagination.page < pagination.totalPages && (
            <Button onClick={() => handlePageChange(pagination.page + 1)} variant="outlined">
              Next Page
            </Button>
          )}
        </Box>
      </Box>
    );
  };

  if (loading) return <Typography variant="h4"><CircularProgress /></Typography>;
  if (error) return <Typography variant="h4" color="error">{error}</Typography>;

  return (
    <div>
      <Typography variant="h4">All Live Blogs</Typography>
      <List>
        {blogs.map((blog) => (
          <ListItem
            key={blog.id}
            component={Link}
            to={`/blog/${blog.id}`}
          >
            <ListItemText primary={blog.name} />
          </ListItem>
        ))}
      </List>
      {renderPaginationButtons()}
    </div>
  );
};

export default BlogList;
