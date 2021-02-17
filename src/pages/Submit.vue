<template>
  <q-page class="bg-grey-4">
    <div class="custom-container">
      <div class="q-pa-md">
        <h1 class="text-overline text-weight-bolder border-bottom text-primary q-my-xl">
          Créer un post
        </h1>
        <div class="row">
          <div class="col-12">
            <q-card class="bg-grey-3">
              <q-card-section class="q-pb-xs">
                <q-input
                  v-model="title"
                  outlined
                  dense
                  bg-color="grey-3"
                  label="Titre"
                />
              </q-card-section>
              <q-card-section class="q-pt-xs q-pb-sm">
                <q-editor
                  v-model="content"
                  @keyup.enter.stop
                  toolbar-rounded
                  dense
                  dark
                  class="full-width"
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
                />
              </q-card-section>
              <q-card-section
                class="q-pt-sm"
                align="right"
              >
                <q-btn
                  label="Envoyer"
                  color="primary"
                  @click="onSubmit"
                  :disable="!canSubmit"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { createPost } from 'src/services/post.service';
import { required } from '../utils/customValidationRules';

export default {
  name: 'Submit',
  data() {
    return {
      title: '',
      content: '',
    };
  },
  components: {},
  computed: {
    sanitizedContent: (vm) => vm.$sanitize(vm.content),
    canSubmit() {
      return !!required(this.title) && !!required(this.content);
    },
  },
  methods: {
    async onSubmit() {
      try {
        const { data } = await createPost({ title: this.title, content: this.sanitizedContent });

        this.$router.push(`/post/${data.slug}`).catch(() => { });

        this.$q.notify({ type: 'positive', message: 'Post créé!' });
      } catch (error) { /* ... */ }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
