<template>
  <v-snackbar v-model="open" :color="color">
    <v-row>
      <v-col cols="11">
        <h3>
          {{ message }}
        </h3>
      </v-col>
      <v-col cols="1">
        <v-icon v-if="color === 'error'" style="float: right">
          mdi-alert-circle
        </v-icon>
        <v-icon v-if="color === 'success'" style="float: right">
          mdi-check
        </v-icon>
        <v-icon v-if="color === 'info'" style="float: right">
          mdi-information-outline
        </v-icon>
      </v-col>
    </v-row>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $emit(
      event: 'showError',
      message: string,
      type?: 'error' | 'success' | 'info',
    ): this;

    $on(
      event: 'showError',
      callback: (message: string, type: 'error' | 'success' | 'info') => any,
    ): this;
  }
}

export default Vue.extend({
  data() {
    return {
      message: '',
      color: 'error',
      open: false,
    };
  },
  mounted() {
    this.$nuxt.$on('showError', this.showError);
  },
  methods: {
    showError(error: string, type: 'error' | 'success' | 'info' = 'error') {
      this.open = false;
      setTimeout(() => {
        this.open = true;
        this.color = type;
        this.message = error;
      }, 100);
    },
  },
});
</script>

<style></style>
