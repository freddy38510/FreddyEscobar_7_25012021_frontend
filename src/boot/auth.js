import { Notify } from 'quasar';
import { api } from './axios';

export default async ({ router, store }) => {
  router.beforeEach(async (to, from, next) => {
    if (!store.getters['auth/loggedIn'] && to.path !== '/login' && to.path !== '/register') {
      return next({ name: 'login' });
    }

    if (store.getters['auth/loggedIn'] && store.getters['auth/tokenExpired']) {
      // is token expired ?
      await store.dispatch('auth/logout');

      return next({ name: 'login' });
    }

    if (store.getters['auth/loggedIn'] && (to.path === '/login' || to.path === '/register')) {
      return next('/');
    }

    return next();
  });

  api.interceptors.request.use(
    (request) => {
      const { token } = store.state.auth;

      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }

      return request;
    },
    (error) => Promise.reject(error),
  );

  api.interceptors.response.use((response) => response, async (error) => {
    if (!error.response) {
      Notify.create({
        message: 'Erreur réseau. Veuillez vérifier votre connexion internet',
        type: 'negative',
        progress: true,
        actions: [
          { label: 'Fermer', color: 'white', handler: () => { /* ... */ } },
        ],
      });

      throw error;
    }

    if (error.response.status === 401 && store.getters['auth/loggedIn']) {
      // is token revoked or invalid ?
      await store.dispatch('auth/logout');

      router.push({ name: 'login' });
    }

    if (error.response.data) {
      Notify.create({
        type: 'negative',
        progress: true,
        actions: [
          { label: 'Fermer', color: 'white', handler: () => { /* ... */ } },
        ],
        message: error.response.data.message,
      });
    }

    throw error;
  });
};
