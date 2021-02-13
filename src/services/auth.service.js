import { api } from '../boot/axios';

export async function login({ email, password }) {
  const res = await api.post('/auth/login', { email, password });

  return { user: res.data.user, token: res.data.token };
}

export async function logout() {
  return api.post('/auth/logout');
}

export async function register({ email, username, password }) {
  const res = await api.post('/auth/register', { email, username, password });

  return { user: res.data.user, token: res.data.token };
}

export async function getMe() {
  return api.get('/auth/me');
}

export default {
  getMe,
  login,
  logout,
  register,
};
