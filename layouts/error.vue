<template>
  <v-app>
    <center>
      <div v-if="error.statusCode === 404" class="pa-5">
        <v-icon size="350"> mdi-emoticon-dead-outline </v-icon>
        <h1>404 - Dead end</h1>
        <h3>I'm afraid the page you're looking for is missing...</h3>
      </div>
      <div v-else>
        <v-icon size="350"> mdi-alert-circle-outline </v-icon>
        <h1>500 - Internal Error</h1>
        <h3>
          Something happened, and we're not sure what or why<br />
          Please contact an administrator or
          <a :href="githubLink">write me an issue</a>
        </h3>
      </div>

      <v-btn color="primary" class="mt-3">
        <NuxtLink class="link" to="/"> Home page </NuxtLink>
      </v-btn>
    </center>
  </v-app>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import consola from 'consola';

export default Vue.extend({
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    } as PropOptions<{ statusCode: number; message: string }>,
  },
  data() {
    return {
      githubLink: 'https://github.com/ProtoCh4os/verter',
    };
  },
  mounted() {
    consola.error(this.error.statusCode + ':' + this.error.message);
  },
  head() {
    const title =
      this.error.statusCode === 404
        ? 'Page not found'
        : 'Internal Server Error';
    return {
      title,
    };
  },
});
</script>

<style lang="sass" scoped>
h1
  font-size: 30px
  color: gray

.link
  color: white
</style>
