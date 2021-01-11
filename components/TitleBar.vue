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
  background: linear-gradient(90deg, #242F40 0%, #006494 35%, #5C5C5C 100%)
</style>
