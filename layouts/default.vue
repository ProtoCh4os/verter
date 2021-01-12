<template>
  <v-app>
    <v-navigation-drawer v-if="logged" v-model="drawer" fixed app>
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
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main class="main">
      <nuxt />
      <messager />
    </v-main>
    <v-footer absolute app>
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
      title: 'D-ops',
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
