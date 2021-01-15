<template>
  <v-app>
    <v-navigation-drawer
      v-if="logged"
      v-model="drawer"
      permanent
      expand-on-hover
      fixed
      app
    >
      <v-list-item>
        <v-list-item-action>
          <v-avatar color="primary" size="25">
            <v-icon> mdi-account </v-icon>
          </v-avatar>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="title">
            Welcome {{ username }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="(item, index) in sidebar"
          :key="index"
          router
          :to="item.route"
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }} </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> {{ item.name }} </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item exact @click="logout">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> Logout </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar v-if="logged" fixed app>
      <v-toolbar-title>
        <v-img
          src="/images/brand.png"
          alt="Verter"
          max-height="50px"
          width="127px"
          contain
        />
      </v-toolbar-title>
    </v-app-bar>
    <v-main class="main">
      <nuxt />
      <messager />
    </v-main>
    <v-footer fixed app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import messager from './messager.vue';

export default {
  components: { messager },
  data() {
    return {
      drawer: false,
      sidebar: [
        {
          name: 'Dashboard',
          icon: 'mdi-view-dashboard',
          route: '/',
        },
        {
          name: 'Projects',
          icon: 'mdi-format-list-text',
          route: '/projects',
        },
        {
          name: 'Settings',
          icon: 'mdi-cog',
          route: '/config',
        },
      ],
    };
  },
  computed: {
    logged() {
      return this.$store.state.session.loggedIn;
    },
    username() {
      return this.$store.state.session?.user?.login || 'User';
    },
  },
  methods: {
    logout() {
      this.$store.commit('session/logout');
      this.$router.replace('/login');
    },
  },
};
</script>

<style lang="sass">
@import '~/assets/base.sass'
</style>
