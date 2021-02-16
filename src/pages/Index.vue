<template>
  <q-page
    class="bg-grey-4"
    :class="{ flex: !loggedIn, 'flex-center': !loggedIn }"
  >
    <div class="custom-container">
      <template v-if="loggedIn">
        <div class="row justify-center q-pa-md">
          <h1 class="text-overline text-weight-bolder border-bottom text-primary q-my-xl">
            Réseau Social Interne
          </h1>
        </div>
        <div class="row q-pa-md">
          <q-btn
            label="Créer un post"
            color="primary"
            to="submit"
          />
        </div>
        <posts-list />
      </template>
      <template v-else>
        <div class="column">
          <div class="row justify-center">
            <h1 class="text-overline text-weight-bolder text-primary q-my-md">
              Réseau Social Interne
            </h1>
          </div>
          <div class="justify-center">
            <q-card>
              <q-tabs
                indicator-color="secondary"
                class="bg-primary text-white"
                inline-label
              >
                <q-route-tab
                  default
                  name="login"
                  :to="'/login'"
                  label="Connexion"
                  icon="login"
                />
                <q-route-tab
                  name="register"
                  :to="'/register'"
                  label="Inscription"
                  icon="person_add"
                />
              </q-tabs>
              <q-tab-panels
                v-model="tab"
                animated
                keep-alive
                class="q-px-md q-py-lg bg-grey-3 text-primary"
              >
                <q-tab-panel name="login">
                  <router-view />
                </q-tab-panel>
                <q-tab-panel name="register">
                  <router-view />
                </q-tab-panel>
              </q-tab-panels>
            </q-card>
          </div>
        </div>
      </template>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import PostsList from '../components/post/PostsList';

export default {
  name: 'PageIndex',
  data() {
    return {
    };
  },
  components: {
    'posts-list': PostsList,
  },
  computed: {
    ...mapState('auth', {
      loggedIn: (state, getters) => getters.loggedIn,
    }),
    tab() {
      return this.$route.name;
    },
  },
};
</script>
<style lang="scss" scoped>
.q-card {
  margin: 0 auto;
}

@media (max-width: $breakpoint-sm-max) {
  .q-card {
    width: 95%;
  }
}
@media (min-width: $breakpoint-sm-min) {
  .q-card {
    width: 352px;
  }
}

.q-tab__indicator {
  height: 3px;
}
</style>
