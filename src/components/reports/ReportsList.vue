<template>
  <MDialog v-model="visible" :label="$t('reports')">
    <div class="q-gutter-sm">
      <MDatePicker type="datetimerange" v-model="form.dates" />
      <MBtn :label="$t('start')" @click="getReport" :dense="false" />
    </div>
  </MDialog>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { Tracker } from 'src/models/tracker/tracker';
import { useStore } from 'src/store';
import { defineComponent, ref, reactive, computed } from 'vue';
import DetailReport from './DetailReport.vue';

export default defineComponent({
  name: 'ReportsList',
  setup() {
    const store = useStore();
    const $q = useQuasar();
    const visible = ref(false);
    const form = reactive({
      dates: { from: new Date(), to: new Date() },
    });
    const show = () => {
      initDates();
      visible.value = true;
    };
    const hide = () => (visible.value = false);

    const initDates = () => {
      form.dates.from.setHours(0, 0, 0, 0);
      form.dates.to.setHours(23, 59, 59, 0);
    };

    const current = computed(() => store.state.trackers.current);
    const selected = computed(
      () => store.getters['trackers/getSelected'] as Tracker[]
    );

    const getParams = () => {
      const params = {
        device_id: current.value?.device_id,
        ts_start: Math.round(form.dates.from.getTime() / 1000),
        ts_stop: Math.round(form.dates.to.getTime() / 1000),
        token: store.state.main.user?.getToken(),
        offset_utc: -new Date().getTimezoneOffset() / 60,
        path: 'reports/route/detail',
      };
      return params;
    };

    const getReport = () => {
      hide();
      const props = {
        from: form.dates.from,
        to: form.dates.to,
        params: getParams(),
      };
      $q.dialog({ component: DetailReport, componentProps: props });
    };

    return {
      visible,
      form,
      show,
      hide,
      getReport,
    };
  },
});
</script>
