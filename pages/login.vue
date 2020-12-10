<template>
  <div class="body">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="card">
          <div class="text-center">
            <h1>D-Ops</h1>
            <hr />
            <h3>Login</h3>
            <br />
            <v-text-field v-model="form.user" label="Username"></v-text-field>
            <v-text-field v-model="form.pass" label="Password"></v-text-field>
            <br />
            <v-btn
              :disabled="loading"
              :loading="loading"
              color="secondary"
              raised
              @click="login()"
              >Login</v-btn
            >
          </div>
        </v-card></v-col
      >
      <v-snackbar v-model="snackbar">
        Invalid login or wrong password
      </v-snackbar>
    </v-row>
  </div>
</template>

<script>
import sdk from '@/plugins/api/sdk';
import { debounce, now } from 'lodash';

export default {
  data() {
    return {
      form: {
        user: '',
        pass: '',
      },
      snackbar: false,
      loading: false,
    };
  },
  methods: {
    login: debounce(async function () {
      this.loading = true;
      const { user, pass } = this.form;

      const log = await sdk.session.login(user, pass);
      if (log) {
        this.$store.commit('session/login', {
          id: log.id,
          login: log.id,
          name: log.id,
          loggedAt: new Date(now()),
        });
      } else {
        this.snackbar = true;
      }
      this.loading = false;
    }),
  },
};
</script>

<style lang="sass" scoped>

.body
  width: 100%
  height: 100%
  background-color: $primary-color

.card
  padding: 50px
</style>
