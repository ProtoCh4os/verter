<template>
  <div>
    <title-bar title="Settings" />
    <v-row>
      <v-col cols="12" class="pa-10">
        <h1 style="margin: 0 auto">Settings</h1>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>General</v-expansion-panel-header>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>Projects</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-data-table :headers="projects.headers" :items="projects.items">
              </v-data-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <Form v-if="openForm" @closeForm="closeForm()" />
    <v-btn
      class="mx-2"
      fab
      right
      bottom
      fixed
      dark
      large
      color="primary"
      @click="openForm = !openForm"
    >
      <v-icon dark> mdi-plus </v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ProjectModelInterface } from '~/api/models/Project';
import Form from './form.vue';

export default Vue.extend({
  components: {
    Form,
  },
  async fetch() {
    const { projects, count } = await this.$sdk.project.list();

    this.pages.max = Math.ceil(count / this.pages.itemsPer);
    this.projects.items = projects;
  },
  data() {
    return {
      openForm: false,
      projects: {
        headers: [
          {
            text: 'Id',
            align: 'start',
            sortable: false,
            value: '_id',
          },
          { text: 'Description', value: 'description' },
        ],
        items: [] as ProjectModelInterface[],
      },
      pages: {
        current: 0,
        max: 0,
        itemsPer: 10,
      },
    };
  },
  methods: {
    closeForm() {
      setTimeout(() => {
        this.openForm = false;
      }, 500);
    },
  },
});
</script>

<style></style>
