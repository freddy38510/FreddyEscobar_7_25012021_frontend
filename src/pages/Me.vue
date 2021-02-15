<template>
  <q-page class="bg-grey-4 row justify-center q-py-md">
    <h1 class="col-12 text-h5 text-weight-bold text-primary text-center q-my-lg">
      Mon compte
    </h1>
    <q-card
      class="bg-grey-4 col-12 col-lg-4 col-md-6 col-sm-8 col-xl-3"
      flat
    >
      <q-card-section>
        <div class="text-h6 text-primary border-bottom">
          Profil
        </div>
      </q-card-section>
      <q-card-section>
        <q-form
          novalidate
          @submit.prevent="onUpdateUser"
        >
          <q-input
            v-model="email"
            type="email"
            label="Email *"
            color="primary"
            :loading="loading"
            lazy-rules="ondemand"
            :rules="[isValidEmail]"
          >
            <template #before>
              <q-icon name="email" />
            </template>
          </q-input>
          <q-input
            v-model="username"
            label="Nom d'utilisateur *"
            color="primary"
            :loading="loading"
            lazy-rules="ondemand"
            :rules="[isValidUsername]"
          >
            <template #before>
              <q-icon name="person" />
            </template>
          </q-input>
          <div class="justify-end q-gutter-sm q-mt-sm row">
            <q-btn
              color="primary"
              label="Modifier"
              :loading="updatingProfile"
              type="submit"
            />
          </div>
        </q-form>
      </q-card-section>

      <q-card-section>
        <div class="text-h6 text-primary border-bottom">
          Sécurité
        </div>
      </q-card-section>
      <q-card-section>
        <q-form
          class="q-gutter-md"
          novalidate
          @submit.prevent="onChangePassword"
        >
          <q-input
            v-model="currentPassword"
            label="Mot de passe actuel *"
            :type="isPwd ? 'password' : 'text'"
            color="primary"
            lazy-rules="ondemand"
            :rules="[isRequired('* Mot de passe requis')]"
          >
            <template #prepend>
              <q-icon name="lock_open" />
            </template>
            <template #append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-input
            v-model="password"
            label="Nouveau Mot de Passe *"
            :type="isPwd ? 'password' : 'text'"
            color="primary"
            lazy-rules="ondemand"
            :rules="[isValidPassword]"
          >
            <template #prepend>
              <q-icon name="lock" />
            </template>
            <template #append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-input
            v-model="passwordConfirm"
            label="Confirmation Mot de Passe *"
            :type="isPwd ? 'password' : 'text'"
            color="primary"
            lazy-rules="ondemand"
            :rules="[isValidPasswordConfirm]"
          >
            <template #prepend>
              <q-icon name="lock" />
            </template>
            <template #append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div class="justify-end q-gutter-sm q-mt-sm row">
            <q-btn
              color="primary"
              label="Modifier"
              :loading="updatingPassword"
              type="submit"
            />
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions>
        <q-btn
          label="Supprimer Compte"
          flat
          color="negative"
          icon="delete"
          @click="confirmDelete=true"
        />
      </q-card-actions>
    </q-card>
    <q-dialog v-model="confirmDelete">
      <q-card class="bg-grey-3">
        <q-card-section>
          <div class="text-h6">
            <q-icon
              name="warning"
              class="text-negative"
              size="md"
            />
            <span class="q-ml-sm">Suppression de compte</span>
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          Etes-vous certain? Votre compte et
          vos données personnelles seront définitivement supprimés.
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Annuler"
            v-close-popup
          />
          <q-btn
            flat
            label="Supprimer"
            color="negative"
            v-close-popup
            :loading="deletingAccount"
            @click="deleteAccount"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import {
  isRequired, isValidEmail, isValidPassword, isValidUsername,
} from '../validations';
import { required } from '../utils/customValidationRules';
import { getMe } from '../services/auth.service';
import { updateUser, deleteUser } from '../services/user.service';

export default {
  name: 'Me',
  data() {
    return {
      email: '',
      username: '',
      currentPassword: '',
      password: '',
      passwordConfirm: '',
      isPwd: true,
      updatingProfile: false,
      updatingPassword: false,
      deletingAccount: false,
      submitting: false,
      loading: false,
      confirmDelete: false,
    };
  },
  async mounted() {
    await this.fetchUser();
  },
  methods: {
    async fetchUser() {
      this.loading = true;

      try {
        const { data } = await getMe();

        this.email = data.user.email;
        this.username = data.user.username;
      } catch (error) { /* ... */ }

      this.loading = false;
    },
    async onUpdateUser() {
      this.updatingProfile = true;

      try {
        const { data } = await updateUser(this.$store.state.auth.user.username, {
          username: this.username,
          email: this.email,
        });

        this.$store.commit('auth/setUser', data.user);

        this.$q.notify({ type: 'positive', message: 'Profil mis à jour!' });
      } catch (error) { /* ... */ }

      this.updatingProfile = false;
    },
    async onChangePassword() {
      this.updatingPassword = true;

      try {
        await updateUser(this.$store.state.auth.user.username, {
          currentPassword: this.currentPassword,
          password: this.password,
        });

        this.$q.notify({ type: 'positive', message: 'Mot de passe mis à jour!' });
      } catch (error) { /* ... */ }

      this.updatingPassword = false;
    },
    async deleteAccount() {
      this.deletingAccount = true;

      try {
        await deleteUser(this.$store.state.auth.user.username);

        await this.$store.dispatch('auth/logout');

        this.$router.push('/login').catch(() => { });

        this.$q.notify({ type: 'positive', message: 'Compte supprimé avec succès!' });
      } catch (error) { /* ... */ }

      this.deletingAccount = false;
    },
    isRequired,
    isValidEmail,
    isValidUsername,
    isValidPassword,
    isValidPasswordConfirm(passwordConfirm) {
      if (!required(passwordConfirm)) {
        return '* Confirmation de mot de passe requise';
      }

      if (passwordConfirm !== this.password) {
        return 'Les mots de passe ne correspondent pas';
      }

      return true;
    },
  },
};
</script>
