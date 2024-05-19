import { get, post, deleteRequest } from './api';

const getPublishedBlogs = async (pagination) => {
  const { page, limit } = pagination;
  return get(`/blogs/published?page=${page}&limit=${limit}`);
};

const createBlog = async (blogData) => {
  return post('/blogs', blogData);
};

const getBlogDetails = async (blogId) => {
    return get(`/blogs/${blogId}`);
}

const deleteBlog = async (blogId) => {
    return deleteRequest(`/blogs/${blogId}`);
};

const publishBlog = async (blogId) => {
  return post(`/blogs/${blogId}/publish`);
};

export { getPublishedBlogs, createBlog, getBlogDetails, deleteBlog, publishBlog };
