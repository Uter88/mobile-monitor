<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="bg-white" bordered>
      <q-toolbar>
        <q-btn-group>
          <q-btn
            dense
            flat
            text-color="black"
            label="devices"
            @click="openPanel"
          />
        </q-btn-group>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';
import TrackersList from 'src/components/trackers/TrackersList.vue';

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const $q = useQuasar();

    const openPanel = () => {
      $q.dialog({ component: TrackersList });
    };
    return {
      openPanel,
    };
  },
});
</script>
