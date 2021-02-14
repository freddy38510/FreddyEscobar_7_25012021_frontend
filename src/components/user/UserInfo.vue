<template>
  <div class="q-pa-md bg-grey-3">
    <q-list style="width: 224px">
      <q-item to="/me">
        <q-item-section avatar>
          <q-icon name="settings" />
        </q-item-section>
        <q-item-section>
          <q-item-label lines="1">
            Mon Compte
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item
        clickable
        v-ripple
        v-close-popup
        @click="onLogout"
      >
        <q-item-section avatar>
          <q-icon name="logout" />
        </q-item-section>
        <q-item-section>
          <q-item-label lines="1">
            Déconnexion
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script>
import { logout } from '../../services/auth.service';

export default {
  name: 'UserInfo',
  data() {
    return {};
  },
  methods: {
    async onLogout() {
      try {
        await logout();

        await this.$store.dispatch('auth/logout');

        this.$router.push({ name: 'login' });

        this.$q.notify({ type: 'positive', message: 'Déconnecté avec succès!' });
      } catch (error) { /* ... */ }
    },
  },
};
</script>
