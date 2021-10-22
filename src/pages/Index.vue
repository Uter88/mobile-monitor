<template>
  <q-page class="flex">
    <Map />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Map from 'components/map/Map.vue';

export default defineComponent({
  name: 'PageIndex',
  components: {
    Map,
  },
  setup() {
    return {};
  },
});
</script>
