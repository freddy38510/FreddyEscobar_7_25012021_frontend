<template>
  <component :is="tag">
    {{ formatted }}
    <q-tooltip>
      {{ new Date(date).toLocaleDateString('fr', {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }) }}
    </q-tooltip>
  </component>
</template>

<script>
import { format, register } from 'timeago.js';
import fr from 'timeago.js/lib/lang/fr';

register('fr', fr);

export default {
  name: 'TimeAgo',
  props: {
    tag: {
      type: String,
      default: 'small',
    },
    date: {
      type: String,
      default: () => '',
    },
  },
  data: () => ({
    formatted: '',
    refreshTimeout: -1,
  }),
  watch: {
    date() {
      this.formatted = format(this.date, 'fr');
    },
  },
  destroyed() {
    clearInterval(this.refreshTimeout);
  },
  mounted() {
    this.refresh();

    this.refreshTimeout = setInterval(this.refresh, 30000);
  },
  methods: {
    refresh() {
      if (this.date !== '') {
        this.formatted = format(this.date, 'fr').toString();
      } else {
        this.formatted = '';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.text-muted {
  text-transform: capitalize;
}
</style>
