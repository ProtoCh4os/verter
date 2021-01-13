<template>
  <div>
    <v-skeleton-loader :loading="loading" class="ma-5 card" type="card">
      <v-card elevation="7" outlined class="pa-5">
        <v-card-title>
          <h1>{{ title }}</h1>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" @click="openForm">
            <v-icon class="mr-3"> mdi-cogs </v-icon>
            Edit
          </v-btn>
          <v-btn color="primary">
            <v-icon class="mr-3"> mdi-folder-plus-outline </v-icon>
            New version
          </v-btn>
        </v-card-actions>
        <v-row>
          <v-col cols="12" md="6">
            <v-expansion-panels tile accordion>
              <v-expansion-panel>
                <v-expansion-panel-header>Build path</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-text-field
                    disabled
                    :value="buildPath"
                  ></v-text-field> </v-expansion-panel-content
              ></v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header
                  >Build commands</v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  <v-list>
                    <v-list-item
                      v-for="(command, index) in buildCommands"
                      :key="index"
                    >
                      <v-list-item-icon>
                        <v-icon> {{ getIcon(command) }} </v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title v-text="command"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header
                  >Output runtime</v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  <v-list>
                    <v-list-item
                      v-for="(command, index) in outputRuntime"
                      :key="index"
                    >
                      <v-list-item-icon>
                        <v-icon> {{ getIcon(command) }} </v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title v-text="command"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
          <v-col cols="12" md="6">
            <h3>Versions</h3>
            <v-data-table
              :headers="tableHeaders"
              :items="versions"
            ></v-data-table>
          </v-col>
        </v-row>
      </v-card>
    </v-skeleton-loader>
    <Form v-if="form.open" :edit-data="editData" @closeForm="closeForm()" />
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
    this.loading = true;
    const data = await this.$sdk.project.details(this.id);

    if (data) {
      this.project = data.project;
      this.loading = false;
      return;
    }
    this.$router.push('/projects');
  },
  data() {
    return {
      loading: true,
      project: null as ProjectModelInterface | null,
      tableHeaders: [
        {
          text: 'id',
          value: 'completeVersion',
        },
        {
          text: 'nickname',
          value: 'versionId',
        },
        {
          text: 'changelog',
          value: 'changelog',
        },
        {
          text: 'date',
          value: 'timestamp',
        },
      ],
      form: {
        open: false,
      },
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    icon(): string {
      return this.project ? this.project.icon || '' : '';
    },
    title(): string {
      return this.project ? this.project.description : '';
    },
    buildCommands(): string[] {
      return this.project ? this.project.config.buildCommands : [];
    },
    outputRuntime(): string[] {
      return this.project ? this.project.config.outputRuntime : [];
    },
    buildPath(): string {
      return this.project ? this.project.config.outputFolder : '';
    },
    versions(): {
      completeVersion: string;
      versionId: string;
      changelog: string;
      timestamp: string;
    }[] {
      return this.project
        ? this.project.versions.map((version) => ({
            completeVersion: `${version.major}.${version.minor}.${version.patch}`,
            versionId: version.versionId,
            changelog: version.changelog,
            timestamp: new Date(version.timestamp).toLocaleString('pt-br'),
          }))
        : [];
    },
    editData(): ProjectFormInterface | void {
      if (!this.project) return;

      return {
        id: (this.project._id as unknown) as string,
        ...this.project,
        ...this.project.config,
      };
    },
  },
  mounted() {
    this.$fetch();
  },
  methods: {
    openForm() {
      this.form.open = true;
    },
    closeForm() {
      setTimeout(() => {
        this.form.open = false;
        this.$fetch();
      }, 500);
    },
    getIcon(text: string): string {
      if (/(yarn)|(node)|(npm)/.test(text)) return 'mdi-nodejs';
      if (/(php)|(composer)/.test(text)) return 'mdi-language-php';
      if (/(sh)|(bash)/.test(text)) return 'mdi-bash';
      return 'mdi-console-line';
    },
  },
});
</script>

<style></style>
