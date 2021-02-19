<template>
  <q-item
    :disabled="comment.isDeleted"
    :active="comment.isNew"
    active-class="bg-grey-5"
  >
    <q-item-section top>
      <q-item-label
        caption
        class="q-mb-sm"
        lines="1"
      >
        <router-link
          :to="`/user/${comment.author.username}`"
          class="text-bold q-mr-xs author text-body-2 text-black"
        >
          <span>{{ comment.author.username }}</span>
        </router-link>
        <time-ago
          :date="comment.created_at"
          tag="span"
        />
      </q-item-label>
      <q-item-label>
        <transition
          mode="out-in"
          enter-active-class="animated flipInX"
          leave-active-class="animated flipOutX"
        >
          <div
            v-if="editMode"
            key="commentEditing"
          >
            <q-editor
              :value="sanitizedContent"
              min-height="3rem"
              toolbar-rounded
              dense
              dark
              content-class="bg-grey-3 text-black"
              toolbar-bg="primary"
              toolbar-color="white"
              toolbar-text-color="white"
              toolbar-toggle-color="secondary"
              :toolbar="[
                ['left', 'center', 'right', 'justify'],
                ['bold', 'italic', 'underline', 'strike', 'link'],
                ['undo', 'redo'],
              ]"
              ref="commentEditor"
              @keyup.enter.stop
            />
            <div class="row justify-end q-pt-sm">
              <q-btn
                flat
                label="Annuler"
                color="negative"
                @click="editMode = false"
              />
              <q-btn
                flat
                label="Sauvegarder"
                class="q-ml-sm"
                @click="onUpdateComment(comment)"
              />
            </div>
          </div>
          <div
            v-else-if="!comment.isDeleted"
            key="commentReading"
            class="text-grey-10 content"
          >
            <div v-html="sanitizedContent" />
          </div>
          <div
            v-else
            key="commentDeleted"
          >
            <i class="text-caption">Commentaire supprimé</i>
          </div>
        </transition>
      </q-item-label>
    </q-item-section>
    <transition
      enter-active-class="animated flipInX"
      leave-active-class="animated flipOutX"
    >
      <q-item-section
        top
        side
        no-wrap
        class="items-end"
        v-if="!editMode && !comment.isDeleted"
      >
        <div
          class="q-gutter-xs"
          v-if="can(comment)"
        >
          <q-btn
            size="12px"
            flat
            dense
            round
            icon="delete"
            @click="onDeleteComment(comment)"
          />
          <q-btn
            size="12px"
            flat
            dense
            round
            icon="edit"
            @click="editMode = true"
          />
        </div>
      </q-item-section>
    </transition>
  </q-item>
</template>
<script>
import { mapState } from 'vuex';
import TimeAgo from '../../components/TimeAgo';
import { updateComment, deleteComment } from '../../services/comment.service';

export default {
  name: 'Comment',
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editMode: false,
    };
  },
  components: {
    'time-ago': TimeAgo,
  },
  computed: {
    ...mapState('auth', {
      user: (state) => state.user,
    }),
    sanitizedContent: (vm) => vm.$sanitize(vm.comment.content),
  },
  methods: {
    can(comment) {
      return comment.author.username === this.user.username
        || this.user.isModerator;
    },
    async onUpdateComment(comment) {
      try {
        const { data } = await updateComment(comment.id, {
          content: this.$sanitize(this.$refs.commentEditor.lastEmit),
        });

        this.$q.notify({ type: 'positive', message: 'Commentaire modifié!' });

        this.$emit('update', data);

        this.editMode = false;
      } catch (error) { /* ... */ }
    },
    async onDeleteComment(comment) {
      try {
        await deleteComment(comment.id);

        this.$q.notify({ type: 'positive', message: 'Commentaire supprimé!' });

        this.$emit('delete');
      } catch (error) { /* ... */ }
    },
  },
};
</script>
<style lang="scss" scoped>
.author {
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}

.content {
  word-break: break-word;
}

.disabled,
[disabled] {
  &.q-item {
    cursor: default !important;
    * {
      cursor: default !important;
    }
  }
}

.q-item {
  transition: background ease-in-out 1.5s;
}
</style>
