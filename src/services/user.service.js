import { api } from '../boot/axios';

export async function getByUsername(username) {
  return api.get(`/users/${username}`);
}

export async function updateUser(username, data) {
  return api.patch(`/users/${username}`, data);
}

export async function deleteUser(username) {
  return api.delete(`/users/${username}`);
}

export default {
  getByUsername,
  updateUser,
  deleteUser,
};
