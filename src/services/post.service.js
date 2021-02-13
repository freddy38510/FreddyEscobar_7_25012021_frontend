import { api } from '../boot/axios';

export async function createPost({ title, content }) {
  return api.post('/posts', { title, content });
}

export async function getPosts({ page, pageSize }) {
  return api.get('/posts', { params: { page, pageSize } });
}

export async function getPost(slug) {
  return api.get(`/posts/${slug}`);
}

export default {
  createPost,
  getPosts,
  getPost,
};
