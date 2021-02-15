<template>
  <q-form
    class="q-gutter-md"
    novalidate
    @submit.prevent="onLogin"
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
    <div class="row justify-center">
      <q-btn
        color="primary"
        unelevated
        class="full-width"
        label="Se Connecter"
        :loading="submitting"
        type="submit"
      />
    </div>
  </q-form>
</template>

<script>
import { isValidEmail, isValidPassword } from '../validations';

export default {
  data() {
    return {
      email: '',
      password: '',
      isPwd: true,
      submitting: false,
    };
  },
  methods: {
    async onLogin() {
      this.submitting = true;

      try {
        await this.$store.dispatch('auth/login', { email: this.email, password: this.password });

        this.$router.push('/').catch(() => { });

        this.$q.notify({ type: 'positive', message: 'Connecté avec succès!' });
      } catch (error) { /* ... */ }

      this.submitting = false;
    },
    isValidEmail,
    isValidPassword,
  },

};
</script>
