<template>
  <v-card elevation="7" outlined class="ma-5 card pa-5">
    <v-skeleton-loader :loading="loading" type="card">
      <v-card-title>
        <h1>{{ title }}</h1>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn class="ml-0 mr-2 my-2" color="primary" @click="openForm">
          <v-icon class="mr-3"> mdi-cogs </v-icon>
          Edit
        </v-btn>
        <v-btn class="ml-0 mr-2 my-2" color="primary" @click="openNewVersion">
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
          <v-data-table :headers="tableHeaders" :items="versions">
            {{ /* eslint-disable-next-line */ }}
            <template v-slot:item.changelog="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" @click="openChangelog(item)" v-on="on">
                    mdi-text
                  </v-icon>
                </template>
                <span>Read changelog to {{ item.completeVersion }} </span>
              </v-tooltip>
            </template>
            {{ /* eslint-disable-next-line */ }}
            <template v-slot:item.download="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on"> mdi-download </v-icon>
                </template>
                <span>Download</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <v-dialog v-model="readChangelog.open">
        <v-card
          min-width="300px"
          min-height="100px"
          class="ma-auto pa-5"
          elevation="7"
          outlined
          @click:outside="closeChangelog"
        >
          <v-card-title>
            <h1 class="ma-5">
              {{ readChangelog.version }}
            </h1>
            <v-icon color="primary" @click="closeChangelog"> mdi-close </v-icon>
          </v-card-title>
          <v-divider class="my-2"></v-divider>
          {{ readChangelog.text }}
        </v-card>
      </v-dialog>
      <Form v-if="form.open" :edit-data="editData" @closeForm="closeForm" />
      <v-dialog v-model="versionForm.open">
        <v-card
          :loading="versionForm.loading"
          min-width="300px"
          min-height="100px"
          class="ma-auto pa-5"
          elevation="7"
          outlined
        >
          <v-card-title>
            <h1>New version</h1>
          </v-card-title>
          <v-divider />
          <v-form v-if="versions.length > 0" @submit.prevent="submitNewVersion">
            <v-card-text>
              <v-row>
                <v-col cols="6" md="12">
                  <v-subheader>What's the size of the new version?</v-subheader>
                  <v-btn-toggle v-model="versionForm.type" mandatory>
                    <v-btn>major</v-btn>
                    <v-btn>minor</v-btn>
                    <v-btn>patch</v-btn>
                  </v-btn-toggle>
                  <div v-if="versionType === 'major'">
                    <v-divider class="my-2" />
                    <v-text-field
                      v-model="versionForm.nickname"
                      label="Version nickname"
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col cols="6" md="12">
                  <v-textarea
                    v-model="versionForm.changelog"
                    outlined
                    append-icon="mdi-format-list-bulleted"
                    clearable
                    counter="3000"
                    full-width
                    label="Changelog"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="flBtn">
              <v-btn color="error" @click="closeNewVersion">
                Cancel
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-btn color="primary" type="submit">
                Submit and build
                <v-icon>mdi-send</v-icon>
              </v-btn>
            </v-card-actions>
          </v-form>
          <div v-else>
            <h2 class="my-3">This is your first version (1.0.0)</h2>
            <v-btn color="primary" @click="submitNewVersion">Confirm</v-btn>
            <v-btn color="error" @click="closeNewVersion">Close</v-btn>
          </div>
        </v-card>
      </v-dialog>
    </v-skeleton-loader>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { ProjectFormInterface } from '~/api/interfaces/forms/project';
import { ProjectModelInterface } from '~/api/models/Project';
import { VersionTypes } from '~/api/interfaces/common';
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
          text: 'Id',
          value: 'completeVersion',
        },
        {
          text: 'Nickname',
          value: 'versionId',
        },
        {
          text: 'Changelog',
          value: 'changelog',
        },
        {
          text: 'Date',
          value: 'timestamp',
        },
        {
          text: 'Download',
          value: 'download',
        },
      ],
      form: {
        open: false,
      },
      versionForm: {
        open: false,
        loading: false,
        type: 2,
        changelog: '',
        nickname: '',
      },
      readChangelog: {
        open: false,
        text: '',
        version: '',
      },
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    versionType(): VersionTypes {
      return (['major', 'minor', 'patch'] as const)[this.versionForm.type];
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
            completeVersion: [version.major, version.minor, version.patch].join(
              '.',
            ),
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
    closeForm(refresh = false) {
      setTimeout(() => {
        this.form.open = false;
        if (refresh) this.$fetch();
      }, 500);
    },
    openNewVersion() {
      this.versionForm.loading = false;
      this.versionForm.open = true;
    },
    closeNewVersion(refresh = false) {
      if (!this.versionForm.loading) {
        this.versionForm.open = false;
        if (refresh) {
          this.versionForm = {
            open: false,
            loading: false,
            type: 0,
            changelog: '',
            nickname: '',
          };
          this.$fetch();
        }
      }
    },
    openChangelog(
      item: ProjectModelInterface['versions'][number] & {
        completeVersion: string;
      },
    ) {
      this.readChangelog = {
        open: true,
        text: item.changelog,
        version: item.completeVersion,
      };
    },
    closeChangelog() {
      this.readChangelog = {
        open: false,
        text: '',
        version: '',
      };
    },
    async submitNewVersion() {
      this.versionForm.loading = true;

      if (this.versions.length === 0) {
        const res = await this.$sdk.version.add(this.id);

        if (res.success) {
          this.$nuxt.$emit('alertUser', 'Version 1.0.0 created', 'success');
          this.versionForm.loading = false;
          this.closeNewVersion(true);
        } else {
          this.versionForm.loading = false;
          this.$nuxt.$emit('alertUser', res.error[0]);
        }
        return;
      }

      const res = await this.$sdk.version.add(this.id, {
        type: this.versionType,
        changelog: this.versionForm.changelog,
        nickname: this.versionForm.nickname,
      });
      if (res.success) {
        this.$nuxt.$emit(
          'alertUser',
          `Version ${res.payload.version} created`,
          'success',
        );
        this.versionForm.loading = false;
        this.closeNewVersion(true);
      } else {
        this.versionForm.loading = false;
        this.$nuxt.$emit('alertUser', res.error[0]);
      }
    },
    getIcon(text: string): string {
      if (/(\.ts)|(ts-node( |$))/.test(text)) return 'mdi-language-typescript';
      if (/(yarn( |$))|(node( |$))|(npm( |$))|(\.js)/.test(text))
        return 'mdi-nodejs';
      if (/(php( |$))|(composer( |$))|(\.php)/.test(text))
        return 'mdi-language-php';
      if (/(ruby( |$))|(\.ru)/.test(text)) return 'mdi-language-ruby';
      if (
        /(python( |$))|(python3( |$))|(\.py)|(pip( |$))|(pip3( |$))/.test(text)
      )
        return 'mdi-language-python';
      if (/(\.md)/.test(text)) return 'mdi-language-markdown';
      if (/(java( |$))|(jre)|(\.java)|(\.jav)/.test(text))
        return 'mdi-language-java';
      if (/(\.go)|(go( |$))/.test(text)) return 'mdi-language-go';
      if (/(\.cs)/.test(text)) return 'mdi-language-csharp';
      if (/(\.cpp)/.test(text)) return 'mdi-language-cpp';
      if (/(\.c)/.test(text)) return 'mdi-language-c';
      if (/(sh)|(bash)/.test(text)) return 'mdi-bash';
      return 'mdi-console-line';
    },
  },
  head() {
    return {
      title: (this as any).title,
    };
  },
});
</script>

<style lang="sass" scoped>
.flBtn
  display: flex
  flex-wrap: nowrap
  justify-content: center
  >*
    flex: 1
</style>
