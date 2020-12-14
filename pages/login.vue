<template>
  <div class="body">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card outlined elevation="5" class="card">
          <v-card-title class="headline text-center">
            <h1 style="margin: 0 auto">D-ops</h1>
          </v-card-title>
          <v-form @submit.prevent>
            <v-text-field
              v-model="form.user"
              required
              label="Username"
            ></v-text-field>
            <v-text-field
              v-model="form.pass"
              required
              type="password"
              label="Password"
            ></v-text-field>
            <br />
            <v-btn
              :disabled="loading"
              :loading="loading"
              type="submit"
              color="secondary"
              raised
              block
              @click="login"
              >Login</v-btn
            >
          </v-form>
        </v-card></v-col
      >
      <v-snackbar v-model="snackbar">
        Invalid login or wrong password
      </v-snackbar>
    </v-row>
  </div>
</template>

<script lang="ts">
import { debounce, now } from 'lodash';
import Vue from 'vue';

export default Vue.extend({
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
    login() {
      return debounce(async () => {
        this.loading = true;
        const { user, pass } = this.form;

        const log = await this.$sdk.session.login(user, pass);
        if (log) {
          const data = {
            id: log.id,
            login: this.form.user,
            name: log.name,
            loggedAt: new Date(now()),
          };
          this.$store.commit('session/login', data);

          this.$router.replace('/');
        } else {
          this.snackbar = true;
        }
        this.loading = false;
      })();
    },
  },
});
</script>

<style lang="sass" scoped>

.body
  width: 100%
  height: 100%
  background-color: $primary-color

.card
  padding: 50px
</style>
