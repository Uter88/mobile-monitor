<template>
  <MDialog v-model="visible" :label="$t('objects')">
    <q-select />
  </MDialog>
</template>

<script lang="ts">
import { useStore } from 'src/store';
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  name: 'TrackersList',
  setup() {
    const visible = ref(false);
    const store = useStore();

    const config = computed(() => store.state.main.config);

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
