<template>
  <q-list
    class="scroll"
    style="max-height: 350px;"
    ref="scroll"
  >
    <q-infinite-scroll
      @load="onLoadComments"
      :offset="100"
      class="q-list--separator"
      reverse
      ref="infinite"
    >
      <template slot="loading">
        <div class="row justify-center q-my-md">
          <q-spinner
            color="primary"
            name="dots"
            size="40px"
          />
        </div>
      </template>
      <div
        v-for="(comment, index) in comments"
        :key="index"
      >
        <comment
          :comment="comment"
          :tabindex="index"
          @update="onUpdateComment(index, comment, $event)"
          @delete="onDeleteComment(comment)"
          class="q-py-md q-item-type"
          :ref="comment.id"
        />
        <q-separator
          v-if="index !== comments.length - 1"
          inset
        />
      </div>
    </q-infinite-scroll>
  </q-list>
</template>
<script>
import { scroll, dom } from 'quasar';
import { getComments } from '../../services/comment.service';

const { height } = dom;
const { setScrollPosition } = scroll;

export default {
  name: 'Comments',
  props: {
    postSlug: {
      type: String,
      required: true,
    },
  },
  components: {
    comment: () => import('./Comment'),
  },
  data() {
    return {
      page: 0,
      comments: [],
      commentsPerPage: 10,
      totalComments: 0,
    };
  },
  async created() {
    const { data } = await this.getComments(this.postSlug, this.page, this.commentsPerPage);

    this.comments = data.results.reverse();

    this.totalComments = data.total;
  },
  methods: {
    getComments,
    scrollToBottom() {
      const target = this.$refs.scroll.$el;
      setScrollPosition(target, height(this.$refs.infinite.$el), 300);
    },
    async onLoadComments(index, done) {
      // first page already loaded
      if (index > 1) {
        this.page += 1;

        const { data } = await this.getComments(this.postSlug, this.page, this.commentsPerPage);

        this.comments = [
          ...data.results.reverse(),
          ...this.comments,
        ];

        if ((index * this.commentsPerPage) >= this.totalComments) {
          return done(true);
        }

        return done();
      }

      return setTimeout(() => done(), 200);
    },
    onUpdateComment(index, comment, updatedComment) {
      this.$set(this.comments, index, { author: comment.author, ...updatedComment });
    },
    onDeleteComment(comment) {
      this.$set(comment, 'isDeleted', true);

      this.totalComments -= 1; // Prevent not found error

      this.$emit('delete', comment);
    },
    addComment(comment) {
      comment.isNew = true;

      this.comments.push(comment);

      this.totalComments += 1;

      setTimeout(() => this.scrollToBottom(), 200);

      // highlight comment for 4s
      setTimeout(() => { this.comments[this.comments.length - 1].isNew = false; }, 200);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
