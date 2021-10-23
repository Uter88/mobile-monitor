<template>
  <q-tooltip v-bind="$props" :delay="1000" class="tooltip">
    <slot name="default">{{ text }}</slot>
  </q-tooltip>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WdTooltip',
  props: {
    text: String,
    noParentEvent: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {};
  },
});
</script>
