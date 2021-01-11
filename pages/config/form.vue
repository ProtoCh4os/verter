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
          <v-toolbar dark color="primary" @>
            <v-btn icon dark @click="close()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>New project</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark text @click="save()"> Save </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-divider></v-divider>
          <v-form>
            <v-row align-content="center" justify="center">
              <v-col cols="11">
                <v-row>
                  <v-col cols="8" md="12">
                    <v-text-field
                      v-model="form.name"
                      :counter="50"
                      label="Description"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" md="12">
                    <v-file-input
                      v-model="form.icon"
                      accept="image/*"
                      small-chips
                      show-size
                      label="Logo"
                      truncate-length="15"
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
import Vue from 'vue';
import MultipleTextInputs from '~/components/MultipleTextInputs.vue';

export default Vue.extend({
  components: { MultipleTextInputs },
  data() {
    return {
      open: true,
      form: {
        name: '',
        icon: null as File | null,
        buildCommands: [''],
        outputFolder: '',
        outputRuntime: [''],
      },
    };
  },
  computed: {
    iconPath() {
      if (!this.form.icon) return '';
      const urlCreator = window.URL || window.webkitURL;
      return urlCreator.createObjectURL(this.form.icon);
    },
  },
  methods: {
    close() {
      this.open = false;
      this.$emit('closeForm');
    },
    save() {
      console.log(this.form);
    },
  },
});
</script>

<style></style>
