<template>
  <q-btn class="m-btn" v-bind="$props" :ripple="false" :class="class_name">
    <MTooltip v-if="tooltip" :text="tooltip" />
  </q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WdButton',
  props: {
    textColor: {
      default: 'white',
    },
    color: {
      default: 'teal',
    },
    size: {
      default: 'md',
    },
    dense: {
      type: Boolean,
      default: true,
    },
    flat: {
      type: Boolean,
      default: false,
    },
    push: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String
    },
    class_name: {
      type: String,
      default: 'text-bold text-black text-hover'
    },
    noCaps: {
      type: Boolean,
      default: true,
    },
    tooltip: String,
  },
  setup() {
    return;
  },
});
</script>
