<template>
  <q-infinite-scroll
    @load="onLoadPosts"
    :offset="250"
    :disable="infiniteScrollDisabled"
    :initial-index="1"
    class="q-pa-md q-col-gutter-lg"
  >
    <div
      v-for="(post, index) in posts"
      :key="index"
    >
      <q-card
        class="bg-grey-3"
        v-click-to="`/post/${post.slug}`"
      >
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
          <router-link
            :to="`/post/${post.slug}`"
            class="post-title-link"
          >
            <h2 class="text-h6 text-primary q-my-sm">
              {{ post.title }}
            </h2>
          </router-link>
          <div v-html="sanitizedContent(post.content)" />
        </q-card-section>
        <q-card-actions>
          <q-btn
            flat
            no-caps
            icon="comment"
            text-color="grey-8"
            class="text-caption text-weight-bold"
            :label="`${post.commentsCount} ${$options.filters.pluralize(
              post.commentsCount,
              'fr',
              ['Commentaire', 'Commentaires']
            )}`"
          />
        </q-card-actions>
      </q-card>
    </div>
    <template #loading>
      <div class="row justify-center q-my-md">
        <q-spinner-dots
          color="primary"
          size="40px"
        />
      </div>
    </template>
  </q-infinite-scroll>
</template>

<script>
import { getPosts } from '../../services/post.service';
import TimeAgo from '../../components/TimeAgo';

export default {
  data() {
    return {
      postsPerPage: 5,
      posts: [],
      page: 1,
      infiniteScrollDisabled: true,
    };
  },
  components: {
    'time-ago': TimeAgo,
  },
  async created() {
    const { data } = await this.getPosts({ page: 0, pageSize: this.postsPerPage });

    this.posts = data.results;

    if (this.posts.length < data.total) {
      this.infiniteScrollDisabled = false;
    }
  },
  methods: {
    getPosts,
    sanitizedContent(content) {
      return this.$sanitize(content);
    },
    async onLoadPosts(index, done) {
      setTimeout(async () => {
        const { data } = await this.getPosts({ page: this.page, pageSize: this.postsPerPage });

        this.page += 1;

        this.posts = [
          ...this.posts,
          ...data.results,
        ];

        if ((index * this.postsPerPage) >= data.total) {
          done(true);
        }

        done();
      }, index === 0 ? 0 : 1000);
    },
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
