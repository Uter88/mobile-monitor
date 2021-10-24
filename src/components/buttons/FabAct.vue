<template>
  <q-fab-action
    @click="$emit('click')"
    :color="act_color"
    :icon="act_icon"
    :external-label="ext_label"
    :label-position="label_pos"
    :label="label"
    :label-class="label_class"
    text-color="white" 
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FabAct',
  props: {
    act_icon: {
      type: String,
      default: 'add',
    },
    act_color: {
      type: String,
      default: 'teal'
    },
    ext_label: {
      type: Boolean,
      default: true
    },
    label_pos: {
      type: String,
      default: 'left'
    },
    label: {
      type: String,
      default: 'add'
    },
    label_class: {
      type: String,
      default: 'font-12 text-bold'
    },
  },
  setup() {
    return;
  },
});
</script>
