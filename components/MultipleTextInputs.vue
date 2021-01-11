<template>
  <div>
    <v-text-field
      v-for="(field, index) of data"
      :key="index"
      ref="field"
      v-model="data[index]"
      :label="`Command ${index + 1}`"
    ></v-text-field>
    <v-btn color="primary" @click="add"><v-icon>mdi-plus</v-icon></v-btn>
    <v-btn color="info" @click="remove"><v-icon>mdi-minus</v-icon></v-btn>
    <v-btn color="error" @click="clear"><v-icon>mdi-close</v-icon></v-btn>
  </div>
</template>

<script lang="ts">
import { isArray } from 'lodash';
import Vue from 'vue';

export default Vue.extend({
  props: {
    data: {
      type: Array,
      required: true,
      default: () => [''] as string[],
    },
  },
  methods: {
    add() {
      this.data.push('');
      this.focusLast();
    },
    remove() {
      if (this.data.length > 1) this.data.pop();
      this.focusLast();
    },
    clear() {
      const { length } = this.data;
      for (let i = 0; i < length; i++) {
        this.data.pop();
      }
      this.data.push('');
      this.focusLast();
    },
    focusLast() {
      const { length } = this.data;
      setTimeout(() => {
        if (isArray(this.$refs.field) && this.$refs.field[length - 1])
          (this.$refs.field[length - 1] as any).focus();
      }, 0);
    },
  },
});
</script>

<style></style>
