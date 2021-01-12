<template>
  <div>
    <v-row justify="center">
      <v-dialog
        v-model="open"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-form @submit.prevent="save">
            <v-toolbar dark color="primary" @>
              <v-btn icon dark @click="close()">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>{{ title }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn type="submit" dark text> Save </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-divider></v-divider>
            <v-row align-content="center" justify="center">
              <v-col cols="11">
                <v-row>
                  <v-col cols="8" md="12">
                    <v-text-field
                      v-model="form.description"
                      label="Description"
                      :counter="50"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" md="12">
                    <v-file-input
                      v-model="form.iconCan"
                      accept="image/*"
                      small-chips
                      show-size
                      label="Logo"
                      truncate-length="15"
                      @change="upload"
                    >
                      <div slot="prepend-inner">
                        <v-img
                          v-if="form.icon"
                          max-height="50px"
                          max-width="50px"
                          :src="iconPath"
                        ></v-img>
                      </div>
                    </v-file-input> </v-col
                ></v-row>
                <v-row>
                  <v-col cols="6" md="12">
                    <v-card outlined elevation="7" class="pa-2">
                      <v-card-title>Build commands</v-card-title>
                      <multiple-text-inputs :data.sync="form.buildCommands" />
                    </v-card>
                  </v-col>
                  <v-col cols="6" md="12">
                    <v-card outlined elevation="7" class="pa-2">
                      <v-card-title>Built runtime</v-card-title>
                      <multiple-text-inputs :data.sync="form.outputRuntime" />
                    </v-card>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="form.outputFolder"
                      label="Path to built project folder"
                    />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import MultipleTextInputs from '~/components/MultipleTextInputs.vue';
import { ProjectFormInterface } from '~/api/interfaces/forms/project';
import { debounce } from 'lodash';

export default Vue.extend({
  components: { MultipleTextInputs },
  props: {
    editData: {
      type: Object,
      required: false,
      default: () => ({
        id: '',
        description: '',
        icon: null,
        buildCommands: [''],
        outputFolder: '',
        outputRuntime: [''],
      }),
    } as PropOptions<ProjectFormInterface>,
  },
  data() {
    return {
      open: true,
      form: {
        ...this.editData,
        iconCan: null,
      },
      saving: false,
    };
  },
  computed: {
    iconPath(): string {
      if (!this.form.icon) return '';
      if (typeof this.form.icon === 'string') return this.form.icon;
      try {
        const urlCreator = window.URL || window.webkitURL;
        return urlCreator.createObjectURL(this.form.icon);
      } catch (err) {
        return '';
      }
    },
    title(): string {
      return this.form.description || 'New project';
    },
  },
  methods: {
    upload(data?: File) {
      if (data) {
        this.form.icon = data;
      }
    },
    close() {
      this.open = false;
      this.$emit('closeForm');
    },
    save() {
      return debounce(async () => {
        this.saving = true;

        const icon =
          typeof this.form.icon === 'string'
            ? this.form.icon
            : this.form.icon?.name;
        const body = {
          ...this.form,
          icon,
        };

        if (this.form.id) {
          const ins = await this.$sdk.project.edit(this.form.id, body);

          if (ins) {
            this.$nuxt.$emit(
              'showError',
              `Project ${this.form.id} updated`,
              'success',
            );

            this.saving = false;
            this.close();
            return;
          }
        } else {
          const ins = await this.$sdk.project.add(body);

          if (ins) {
            this.form.id = ins.id;
            this.$nuxt.$emit('showError', `Project ${ins.id} added`, 'success');

            this.saving = false;
            this.close();
            return;
          }
        }

        this.$nuxt.$emit('showError', `Saving failed`);
      })();
    },
  },
});
</script>

<style></style>
