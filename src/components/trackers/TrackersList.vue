<template>
  <MDialog v-model="visible"> test </MDialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'TrackersList',
  setup() {
    const visible = ref(false);

    const show = () => {
      visible.value = true;
    };

    const hide = () => {
      visible.value = false;
    };
    return {
      visible,
      show,
      hide,
    };
  },
});
</script>
