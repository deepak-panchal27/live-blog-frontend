import { post, put, deleteRequest } from './api';

const createPost = async (blogId, postData) => {
  return post(`/posts/${blogId}`, postData);
};

const updatePost = async (postId) => {
    return put(`/posts/${postId}`);
}

const deletePost = async (postId) => {
    return deleteRequest(`/posts/${postId}`);
};

export { createPost, updatePost, deletePost };
