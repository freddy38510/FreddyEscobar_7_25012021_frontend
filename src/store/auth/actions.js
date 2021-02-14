import jwt from 'jsonwebtoken';
import { login as apiLogin, register as apiRegister } from '../../services/auth.service';

export async function logout({ commit }) {
  commit('setUser', null);
  commit('setTokenExpiredAt', null);
  commit('setToken', null);
}

export async function login({ commit }, { email, password }) {
  const { user, token } = await apiLogin({ email, password });
  const { exp } = jwt.decode(token) || null;

  commit('setToken', token);
  commit('setTokenExpiredAt', exp);
  commit('setUser', user);
}

export async function register({ commit }, { email, username, password }) {
  const { user, token } = await apiRegister({ email, username, password });
  const { exp } = jwt.decode(token) || null;

  commit('setToken', token);
  commit('setTokenExpiredAt', exp);
  commit('setUser', user);
}
