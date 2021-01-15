<template>
  <v-row>
    <v-card class="card" elevation="5" width="100%" max-height="50px">
      <h1 class="text-center">{{ title }}</h1>
    </v-card></v-row
  >
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TitleBar',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
});
</script>

<style lang="sass" scoped>
.card
  background: linear-gradient(90deg, #47BCFF 0%, #4D9AE9 35%, #47BCFF 100%)
</style>
