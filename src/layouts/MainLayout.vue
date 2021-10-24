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
            :label="$t('objects')"
            @click="openPanel"
          />
          <q-btn dense flat text-color="black" :label="$t('events')" />
        </q-btn-group>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
import { useQuasar } from 'quasar';
import TrackersList from 'src/components/trackers/TrackersList.vue';
import { useStore } from 'src/store';
import { useRouter } from 'vue-router';
import { User } from 'src/models/user';
import { i18n } from 'src/boot/i18n';

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const $q = useQuasar();
    const store = useStore();
    const router = useRouter();

    const initApp = () => {
      i18n.global.locale = store.state.main.config.lang;
      store
        .dispatch('main/checkAuth')
        .then((u: User) => {
          if (u) {
          } else {
            void router.push('/login');
          }
        })
        .catch(() => {
          void router.push('/login');
        });
    };

    onBeforeMount(initApp);

    const openPanel = () => {
      $q.dialog({ component: TrackersList });
    };
    return {
      openPanel,
    };
  },
});
</script>
