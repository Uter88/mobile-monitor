/* eslint-disable vue/valid-v-model */
<template>
  <MDialog v-model="visible" :label="$t('reports')">
    <div class="q-gutter-sm">
      <MDatePicker
        type="datetimerange"
        v-model="form.dates"
        :disabled-dates="form.type.getDisabledDates"
      />
      <q-select
        v-model="form.type"
        :options="types"
        dense
        outlined
        :option-label="(t) => $t(t.kind)"
        @update:model-value="initDates"
      />
      <q-select
        v-model="form.trackers"
        :options="trackers"
        dense
        outlined
        :multiple="form.type.multiple"
        use-input
        :display-value="getDisplayValue"
        @filter="filterFn"
      />
      <MBtn :label="$t('start')" @click="getReport" :dense="false" />
    </div>
  </MDialog>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { ReportParams } from 'src/models/reports/common';
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
    const filter = ref('');

    const form = reactive({
      dates: { from: new Date(), to: new Date() },
      trackers: [] as Tracker[] | Tracker,
      type: store.state.reports.type,
    });

    const types = computed(() => store.state.reports.types);

    const show = () => {
      initDates();
      visible.value = true;
    };
    const hide = () => (visible.value = false);

    const initDates = () => {
      if (form.type.multiple) {
        form.trackers = selected.value.slice();
      } else {
        form.trackers = current.value as Tracker;
      }
      form.dates = form.type.getDates();
      form.dates.from.setHours(0, 0, 0, 0);
      form.dates.to.setHours(23, 59, 59, 0);
    };

    const current = computed(() => store.state.trackers.current);
    const trackers = computed(() => {
      const t = store.getters['trackers/getActive'] as Tracker[];

      if (filter.value && filter.value.length >= 2) {
        const reg = new RegExp(filter.value, 'i');
        return t.filter((tr) => reg.test(tr.label));
      }
      return t;
    });

    const selected = computed(
      () => store.getters['trackers/getSelected'] as Tracker[]
    );

    const getParams = (): ReportParams => {
      let device_id: number | number[] = [];
      const event_types = [] as string[];

      switch (form.type.kind) {
        case 'detail_route':
        case 'detail_fuel':
        case 'temp':
          if (current.value) device_id = current.value.device_id;
          break;
        case 'summary_route':
        case 'summary_fuel':
        case 'speed':
          device_id = selected.value.map((t) => t.device_id);
          break;
      }

      const params: ReportParams = {
        device_id,
        event_types,
        stop_time: 180,
        ts_start: Math.round(form.dates.from.getTime() / 1000),
        ts_stop: Math.round(form.dates.to.getTime() / 1000),
        token: store.state.main.user?.getToken() as string,
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

    const getDisplayValue = computed(() => {
      if (Array.isArray(form.trackers)) {
        if (form.trackers.length) {
          let label = form.trackers[0].label;
          if (form.trackers.length > 1) {
            label += ` +${form.trackers.length - 1}`;
          }
          return label;
        }
      } else if (form.trackers) {
        return form.trackers.label;
      }
      return '';
    });

    const filterFn = (val: string, update: CallableFunction) => {
      filter.value = val;
      update();
    };

    return {
      visible,
      form,
      types,
      show,
      hide,
      getReport,
      initDates,
      filterFn,
      trackers,
      getDisplayValue,
    };
  },
});
</script>
