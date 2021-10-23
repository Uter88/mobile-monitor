<template>
  <q-btn class="m-btn" v-bind="$props" :ripple="false">
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
