<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white">
      <q-toolbar class="no-padding shadow-1 row justify-center">
        <MBtn
          icon="eva-arrow-ios-downward-outline"
          size="20px"
          flat
          text-color="black"
          dense
          class="self-end justify-center"
          @click="openActiveTracker"
        />
      </q-toolbar>
    </q-header>
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
            @click="btn.handler"
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
import ReportsList from 'components/reports/ReportsList.vue';
import TrackersList from 'src/components/trackers/TrackersList.vue';
import ActiveTracker from 'src/components/trackers/ActiveTracker.vue';
import { useStore } from 'src/store';
import { useRouter } from 'vue-router';
import { User } from 'src/models/user';

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

    const openActiveTracker = () => {
      $q.dialog({ component: ActiveTracker });
    };

    const footer_btns = computed(() => {
      const btns = [];
      btns.push(
        {
          name: 'devices',
          icon: 'eva-car-outline',
          handler: () => $q.dialog({ component: TrackersList }),
        },
        {
          name: 'events',
          icon: 'send',
          handler: () => null,
        },
        {
          name: 'reports',
          icon: 'trending_up',
          handler: () => $q.dialog({ component: ReportsList }),
        },
        {
          name: 'account',
          handler: () => null,
          icon: 'perm_identity',
        },
        {
          name: 'help',
          icon: 'eva-question-mark-circle-outline',
          handler: () => null,
        },
        {
          name: 'settings',
          icon: 'manage_accounts',
          handler: () => null,
        }
      );
      return btns;
    });
    return {
      footer_btns,
      openActiveTracker,
    };
  },
});
</script>
