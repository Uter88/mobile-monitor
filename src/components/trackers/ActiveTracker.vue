<template>
  <MDialog
    v-model="visible"
    position="top"
    classDialog="with-t-radius"
    transition-hide="slide-up"
    :MBtn="{ size: 'xl' }"
    content-style="max-height: 30%;"
    contentClass="q-mb-md"
  >
    <div>sdsd</div>
    <template v-slot:footer>
      <MBtn
        icon="keyboard_arrow_up"
        size="xl"
        flat
        text-color="black"
        v-close-popup
      />
    </template>
  </MDialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ActiveTracker',
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
