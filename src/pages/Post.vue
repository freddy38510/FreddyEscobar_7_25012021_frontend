<template>
  <q-page class="bg-grey-4 q-py-lg">
    <div class="custom-container">
      <div
        class="row q-pa-md q-col-gutter-lg"
        v-if="postLoaded"
      >
        <div class="col-12">
          <post
            :post="post"
            :total-comments="totalComments"
          />
        </div>
        <div
          class="col-12"
          v-show="postLoaded && totalComments > 0"
        >
          <h3 class="text-h5 text-primary border-bottom text-weight-medium">
            <span>{{ totalComments | pluralize('fr', ['Commentaire ', 'Commentaires ']) }}</span>
            <span>({{ `${totalComments}` }})</span>
          </h3>
          <div class="q-mt-lg">
            <comments
              :post-slug="post.slug"
              ref="comments"
              @delete="onDeleteComment"
            />
          </div>
        </div>
        <div class="col-12">
          <comment-form
            :content="newCommentContent"
            :post-slug="post.slug"
            @input="newCommentContent = $event"
            @save="onNewComment($event)"
            class="q-mt-lg"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { getPost } from '../services/post.service';

export default {
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      post: {},
      postLoaded: false,
      totalComments: 0,
      newCommentContent: '',
    };
  },
  components: {
    post: () => import('../components/post/Post'),
    'comment-form': () => import('../components/comment/CommentForm'),
    comments: () => import('../components/comment/Comments'),
  },
  async created() {
    const { data } = await this.getPost(this.slug);

    this.post = data;

    this.postLoaded = true;

    this.totalComments = this.post.commentsCount;
  },
  methods: {
    getPost,
    onNewComment(comment) {
      this.showCommentForm = false;

      this.$refs.comments.addComment(comment);

      this.newCommentContent = '';

      this.totalComments += 1;
    },
    onDeleteComment() {
      this.totalComments -= 1;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
