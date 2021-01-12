<template>
  <div>
    <title-bar title="Settings" />
    <v-row>
      <v-col cols="12" class="pa-10">
        <h1 style="margin: 0 auto">Projects</h1>

        <v-btn
          class="ma-10"
          dark
          absolute
          bottom
          color="primary"
          large
          fab
          right
          @click="openForm = !openForm"
        >
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
        <v-data-table
          :loading="projects.loading"
          :page="page"
          :headers="projects.headers"
          :items="projects.items"
          :server-items-length="projects.count"
          @update:page="changePage"
        >
          {{ /* eslint-disable-next-line */ }}
          <template v-slot:item.action="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on">
                  mdi-folder-plus-outline
                </v-icon>
              </template>
              <span> New version </span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on"> mdi-pencil </v-icon>
              </template>
              <span>Edit</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <Form v-if="openForm" @closeForm="closeForm()" />
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
    this.projects.count = count;
    this.projects.items = projects;
    this.projects.loading = false;
  },
  data() {
    return {
      openForm: false,
      projects: {
        headers: [
          {
            text: 'Id',
            sortable: false,
            value: '_id',
          },
          {
            text: 'Description',
            sortable: false,
            value: 'description',
          },
          {
            text: 'Actions',
            sortable: false,
            value: 'action',
          },
        ],
        items: [] as ProjectModelInterface[],
        count: 0,
        loading: true,
      },
      page: 1,
    };
  },
  mounted() {
    this.$fetch();
  },
  methods: {
    closeForm() {
      setTimeout(() => {
        this.openForm = false;
      }, 500);
    },
    async changePage(page: number) {
      this.projects.items = [];
      this.projects.loading = true;
      const { projects, count } = await this.$sdk.project.list(page);

      if (count !== this.projects.count) {
        const maxPagesRemote = Math.ceil(count / 10);
        const maxPagesLocal = Math.ceil(this.projects.count / 10);
        if (maxPagesRemote < maxPagesLocal) {
          const { projects: newP, count: newC } = await this.$sdk.project.list(
            maxPagesRemote,
          );

          this.projects.count = newC;
          this.projects.items = newP;
        }
      } else {
        this.projects.count = count;
        this.projects.items = projects;
      }

      this.projects.loading = false;
    },
  },
});
</script>

<style></style>
