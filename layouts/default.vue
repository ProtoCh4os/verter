<template>
  <v-app>
    <v-navigation-drawer
      v-if="logged"
      v-model="drawer"
      permanent
      dark
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
    <v-app-bar v-if="logged" fixed app dark>
      <v-toolbar-title>
        <v-img
          src="/brand.png"
          alt="Verter"
          max-height="50px"
          width="127px"
          contain
        />
      </v-toolbar-title>
    </v-app-bar>
    <v-main class="main">
      <nuxt />
      <Messager />
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
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
});
</script>
