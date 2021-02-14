<template>
  <q-layout view="lHh Lpr lFf">
    <the-header />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import Header from '../components/Header';

export default {
  name: 'MainLayout',
  components: { 'the-header': Header },
  data() {
    return {};
  },
};
</script>
