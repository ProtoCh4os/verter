<template>
  <div>
    <title-bar title="Settings" />
    <v-row>
      <v-col cols="12" class="pa-10">
        <v-card elevation="7" outlined>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header>General</v-expansion-panel-header>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Users</v-expansion-panel-header>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Projects</v-expansion-panel-header>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  head: {
    title: 'Settings',
  },
});
</script>

<style></style>
