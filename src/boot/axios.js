import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: { Accept: 'application/json' },
});

export default ({ Vue }) => {
  Vue.prototype.$axios = axios;
  Vue.prototype.$api = api;
};

export { axios, api };
