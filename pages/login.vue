<template>
  <div class="body">
    <v-row justify="center" align="center" style="height: 100%">
      <v-col cols="10" sm="6" md="4" lg="4" xl="4">
        <v-card outlined elevation="5" class="card">
          <v-card-title class="headline text-center">
            <v-img
              src="/images/brand.png"
              alt="Verter"
              contain
              max-height="150px"
            />
          </v-card-title>
          <v-form @submit.prevent>
            <v-text-field
              id="user"
              v-model="form.user"
              name="user"
              required
              label="Username"
            ></v-text-field>
            <v-text-field
              id="pass"
              v-model="form.pass"
              required
              name="pass"
              type="password"
              label="Password"
            ></v-text-field>
            <br />
            <v-btn
              :disabled="loading"
              :loading="loading"
              type="submit"
              color="primary"
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
import { getModule } from 'vuex-module-decorators';
import session from '~/store/session';

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
        const sessionStore = getModule(session, this.$store);

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
          sessionStore.login(data);

          this.$router.replace('/');
        } else {
          this.snackbar = true;
        }
        this.loading = false;
      })();
    },
  },
  head: {
    title: 'Login',
  },
});
</script>

<style lang="sass" scoped>

.body
  width: 100%
  height: 100%
  background: linear-gradient(0, #242F40 0%, #006494 35%, #5C5C5C 100%)

.card
  padding: 50px
</style>
