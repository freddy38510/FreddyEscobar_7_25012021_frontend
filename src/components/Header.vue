<template>
  <q-header elevated>
    <q-toolbar>
      <router-link
        to="/"
        class="flex q-pa-md"
      >
        <img
          src="logo/icon-left-font-monochrome-white.svg"
          alt="Logo Groupomania"
          class="logo"
        >
      </router-link>

      <q-toolbar-title class="print-only">
        <router-link to="/">
          Groupomania
        </router-link>
      </q-toolbar-title>
      <q-space />
      <q-btn-dropdown
        unelevated
        v-model="userInfoOpen"
        no-caps
        stretch
        v-if="user"
        class="overflow-hidden"
      >
        <template #label>
          <div class="row items-center no-wrap ellipsis">
            <div class="text-center q-pa-sm ellipsis">
              {{ user.username }}
            </div>
          </div>
        </template>
        <user-info />
      </q-btn-dropdown>
    </q-toolbar>
  </q-header>
</template>
<script>
import { mapState } from 'vuex';
import UserInfo from './user/UserInfo';

export default {
  components: {
    UserInfo,
  },
  data() {
    return {
      userInfoOpen: false,
    };
  },
  computed: {
    ...mapState('auth', {
      user: (state) => state.user,
    }),
  },
};
</script>
<style>
.logo {
  height: 32px;
}
</style>
