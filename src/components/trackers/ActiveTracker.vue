<template>
  <MDialog
    v-model="visible"
    position="top"
    class_dialog="with-t-radius"
    transition_hide="slide-up"
    :MBtn="{ size: 'xl' }"
  >
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
      hide
    };
  },
});
</script>
