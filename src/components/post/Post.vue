<template>
  <q-card class="bg-grey-3 q-mx-auto">
    <q-card-section>
      <div class="text-caption text-grey-14">
        Posté par
        <router-link :to="`/user/${post.author.username}`">
          <span class="text-bold">{{ post.author.username }}</span>
        </router-link>
        <time-ago
          :date="post.created_at"
          class="text-caption"
        />
      </div>
      <h2 class="text-h6 text-primary q-my-sm">
        {{ post.title }}
      </h2>
      <div v-html="sanitizedContent" />
    </q-card-section>
    <q-card-actions>
      <div class="row items-center justify-center q-pa-sm">
        <span class="text-caption text-weight-bold text-grey-8">
          <q-icon
            left
            name="comment"
            size="1.715em"
          />
          <span>{{ `${totalComments} ` }}</span>
          <span>{{ totalComments | pluralize('fr', ['Commentaire', 'Commentaires']) }}</span>
        </span>
      </div>
    </q-card-actions>
  </q-card>
</template>
<script>
import TimeAgo from '../../components/TimeAgo';

export default {
  name: 'Post',
  props: {
    post: {
      type: Object,
      required: true,
    },
    totalComments: {
      type: Number,
      required: true,
    },
  },
  components: {
    'time-ago': TimeAgo,
  },
  computed: {
    sanitizedContent: (vm) => vm.$sanitize(vm.post.content),
  },
};
</script>
<style lang="scss" scoped>
.q-card {
  max-width: 640px;

  a {
    text-decoration: none;

    &:visited {
      color: currentColor;
    }
    &:hover:not(.post-title-link) {
      text-decoration: underline;
    }
  }
}

.post-title-link {
  display: inline-block;
  &:hover {
    text-decoration: none;
  }
}
</style>
