<template>
  <v-footer fixed app dark>
    <span>&copy; {{ new Date().getFullYear() }}</span>
    <v-btn
      :disabled="!canChangeTheme"
      small
      fab
      elevation="0"
      class="ml-auto"
      @click="toggleTheme"
    >
      <v-icon> mdi-theme-light-dark </v-icon>
    </v-btn>
  </v-footer>
</template>

<script lang="ts">
import Vue from 'vue';
import { debounce } from 'lodash';

export default Vue.extend({
  data() {
    return {
      canChangeTheme: true,
    };
  },
  methods: {
    toggleTheme() {
      this.canChangeTheme = false;
      setTimeout(() => {
        this.canChangeTheme = true;
      }, 200);
      return debounce(() => {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      })();
    },
  },
});
</script>

<style></style>
