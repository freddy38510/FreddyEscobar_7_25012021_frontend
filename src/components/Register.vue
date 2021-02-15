<template>
  <q-form
    class="q-gutter-md"
    novalidate
    @submit.prevent="onRegister"
  >
    <q-input
      v-model="email"
      type="email"
      label="Email *"
      square
      filled
      color="primary"
      lazy-rules
      :rules="[isValidEmail]"
    >
      <template #prepend>
        <q-icon name="email" />
      </template>
    </q-input>
    <q-input
      v-model="username"
      label="Nom d'utilisateur *"
      square
      filled
      color="primary"
      lazy-rules
      :rules="[isValidUsername]"
    >
      <template #prepend>
        <q-icon name="person" />
      </template>
    </q-input>
    <q-input
      v-model="password"
      :type="isPwd ? 'password' : 'text'"
      label="Mot de passe *"
      square
      filled
      color="primary"
      lazy-rules
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
      :type="isPwd ? 'password' : 'text'"
      label="Confirmation de mot de passe *"
      square
      filled
      color="primary"
      lazy-rules
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
    <div class="row justify-center">
      <q-btn
        color="primary"
        unelevated
        class="full-width"
        label="S'inscrire"
        :loading="submitting"
        type="submit"
      />
    </div>
  </q-form>
</template>

<script>
import { isValidEmail, isValidUsername, isValidPassword } from '../validations';
import { required } from '../utils/customValidationRules';

export default {
  data() {
    return {
      email: '',
      username: '',
      password: '',
      passwordConfirm: '',
      isPwd: true,
      submitting: false,
    };
  },
  methods: {
    async onRegister() {
      this.submitting = true;

      try {
        await this.$store.dispatch('auth/register', { email: this.email, username: this.username, password: this.password });

        this.$router.push('/').catch(() => { });

        this.$q.notify({ type: 'positive', message: 'Inscrit avec succès!' });
      } catch (error) { /* ... */ }

      this.submitting = false;
    },
    isValidPasswordConfirm(passwordConfirm) {
      if (!required(passwordConfirm)) {
        return '* Confirmation de mot de passe requise';
      }

      if (passwordConfirm !== this.password) {
        return 'Les mots de passe ne correspondent pas';
      }

      return true;
    },
    isValidEmail,
    isValidPassword,
    isValidUsername,
  },

};
</script>
