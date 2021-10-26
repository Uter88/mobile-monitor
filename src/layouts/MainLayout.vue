<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="bg-white">
      <q-toolbar class="no-padding">
        <q-btn-group spread push class="fit">
          <MBtn
            v-for="(btn, i) in footer_btns"
            :key="i"
            flat
            :icon="btn.icon"
            :label="$t(btn.name)"
            text-color="black"
            @click="getBtnFunct(btn.name)"
            class_name="font-10-span btn-group-content text-bold bg-white text-capitalize"
          />
        </q-btn-group>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, computed, watch } from 'vue';
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
    const group = computed(() => store.state.main.config.group);

    const getData = () => {
      void store.dispatch('trackers/getTrackers');
    };

    const initApp = () => {
      i18n.global.locale = store.state.main.config.lang;
      store
        .dispatch('main/checkAuth')
        .then((u: User) => {
          if (u) {
            void store.dispatch('main/getGroups');
            getData();
          } else {
            void router.push('/login');
          }
        })
        .catch(() => {
          void router.push('/login');
        });
    };

    onBeforeMount(initApp);
    watch(group, getData);

    const openPanel = () => {
      $q.dialog({ component: TrackersList });
    };

    const footer_btns = computed(() => {
      const btns = [];
      btns.push(
        {
          name: 'devices',
          icon: 'eva-car-outline',
        },
        {
          name: 'events',
          icon: 'eva-email-outline',
        },
        {
          name: 'reports',
          icon: 'eva-file-text-outline',
        },
        {
          name: 'account',
          icon: 'eva-person-outline',
        },
        {
          name: 'help',
          icon: 'eva-question-mark-circle-outline',
        },
        {
          name: 'settings',
          icon: 'eva-settings-2-outline'
        },
      )
      return btns
    })
    const getBtnFunct = (btn:string) => {
      switch (btn) {
        case 'devices':
          return openPanel();
      }
    };
    return {
      openPanel,
      footer_btns,
      getBtnFunct,
    };
  },
});
</script>
