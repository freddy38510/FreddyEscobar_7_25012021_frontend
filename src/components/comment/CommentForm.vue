<template>
  <div>
    <q-editor
      :value="unescape(content)"
      @input="$emit('input', $event)"
      @keyup.enter.stop
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
      min-height="5rem"
    />
    <div class="row justify-end q-mt-md">
      <q-btn
        label="Commenter"
        color="primary"
        @click="save"
      />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { createComment } from '../../services/comment.service';

export default {
  props: {
    content: {
      type: String,
      required: true,
    },
    postSlug: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState('auth', {
      user: (state) => state.user,
    }),
    sanitizedContent: (vm) => vm.$sanitize(vm.content),
  },
  methods: {
    unescape,
    createComment,
    async save() {
      try {
        const { data } = await createComment(this.postSlug, this.sanitizedContent);

        this.$q.notify({ type: 'positive', message: 'Commentaire ajouté!' });

        this.$emit('save', { ...data, author: { username: this.user.username } });
      } catch (error) { /* ... */ }
    },
  },
};
</script>
