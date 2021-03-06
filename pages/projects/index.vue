<template>
  <div>
    <title-bar title="Projects" />
    <v-row>
      <v-col cols="12" class="pa-10">
        <v-btn
          class="mt-20 floating"
          dark
          color="primary"
          fab
          @click="openForm"
        >
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
        <v-card outlined elevation="7">
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
                  <v-icon v-bind="attrs" @click="listVersions(item)" v-on="on">
                    mdi-format-list-checkbox
                  </v-icon>
                </template>
                <span>List Versions</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" @click="editProject(item)" v-on="on">
                    mdi-pencil
                  </v-icon>
                </template>
                <span>Edit</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <Form v-if="form.open" :edit-data="form.editData" @closeForm="closeForm" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ProjectFormInterface } from '~/api/interfaces/forms/project';
import { ProjectModelInterface } from '~/api/models/Project';
import Form from '~/components/ProjectForm.vue';

export default Vue.extend({
  components: {
    Form,
  },
  async fetch() {
    const { projects, count } = await this.$sdk.project.list();
    this.projects.count = count;
    this.projects.items = projects.map((project) => ({
      id: (project._id as unknown) as string,
      ...project,
      ...project.config,
    }));
    this.projects.loading = false;
  },
  data() {
    return {
      form: {
        open: false,
        editData: undefined as undefined | ProjectFormInterface,
      },
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
        items: [] as ProjectFormInterface[],
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
    openForm() {
      this.form.open = !this.form.open;
    },
    closeForm(refresh = false) {
      this.form.editData = undefined;
      setTimeout(() => {
        this.form.open = false;
        if (refresh) this.changePage(this.page);
      }, 500);
    },
    listVersions(item: ProjectModelInterface) {
      this.$router.push('/projects/' + item._id);
    },
    editProject(project: ProjectModelInterface) {
      this.form.editData = {
        id: (project._id as unknown) as string,
        ...project,
        ...project.config,
      };
      this.openForm();
    },
    async changePage(page: number) {
      this.page = page;
      this.projects.items = [];
      this.projects.loading = true;
      const { projects, count } = await this.$sdk.project.list(page);

      this.projects.count = count;
      this.projects.items = projects.map((project) => ({
        id: (project._id as unknown) as string,
        ...project,
        ...project.config,
      }));

      this.projects.loading = false;
    },
  },
  head: {
    title: 'Projects',
  },
});
</script>

<style scoped lang="sass">
.floating
  float: right
  margin-top: -70px
  position: relative
</style>
