<template>
  <q-fab
    :icon="fab_icon"
    :direction="fab_direction"
    :color="fab_color"
    text-color="white"
  >
    <slot/>
  </q-fab>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Fab',
  props: {
    fab_icon: {
      type: String,
      default: 'add',
    },
    fab_direction: {
      type: String,
      default: 'up',
    },
    fab_color: {
      type: String,
      default: 'deep-orange-12',
    },
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
    }
  },
  setup() {
    return;
  },
});
</script>
