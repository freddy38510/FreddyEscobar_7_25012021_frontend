import { api } from '../boot/axios';

export async function createComment(slug, content) {
  return api.post(`/posts/${slug}/comments`, { content });
}

export async function getComments(slug, page, pageSize) {
  return api.get(`/posts/${slug}/comments`, { params: { page, pageSize } });
}

export async function updateComment(id, data) {
  return api.patch(`/comments/${id}`, data);
}

export async function deleteComment(id) {
  return api.delete(`/comments/${id}`);
}

export default {
  getComments,
  updateComment,
  deleteComment,
  createComment,
};
