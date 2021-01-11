<template>
  <div>
    <title-bar title="Settings" />
    <v-row>
      <v-col cols="12">
        <h1 style="margin: 0 auto">Config</h1>
        <br />
      </v-col>
    </v-row>
    <Form v-if="openForm" @closeForm="closeForm()" />
    <v-btn
      class="mx-2"
      fab
      right
      bottom
      fixed
      dark
      large
      color="primary"
      @click="openForm = !openForm"
    >
      <v-icon dark> mdi-plus </v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Form from './form.vue';

export default Vue.extend({
  components: {
    Form,
  },
  data() {
    return {
      openForm: false,
    };
  },
  methods: {
    closeForm() {
      setTimeout(() => {
        this.openForm = false;
      }, 500);
    },
  },
});
</script>

<style></style>
