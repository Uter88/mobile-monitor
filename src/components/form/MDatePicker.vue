<template>
  <q-input
    :model-value="getValue"
    dense
    outlined
    readonly
    input-class="cursor-pointer m-date-picker"
  />
  <q-menu v-model="showPicker" target=".m-date-picker">
    <q-card>
      <q-card-section class="q-gutter-sm">
        <div class="row q-gutter-xs">
          <q-input
            outlined
            dense
            type="time"
            v-model="form.start"
            v-if="type.indexOf('time') !== -1"
          />
          <q-input
            outlined
            dense
            type="time"
            v-model="form.stop"
            v-if="['timerange', 'datetimerange'].includes(type)"
          />
        </div>
        <div class="row flex-center">
          <q-select
            v-model="form.year"
            dense
            outlined
            :options="years"
            :virtual-scroll-slice-size="100"
          >
            <template v-slot:before>
              <q-btn dense flat icon="arrow_left" @click="form.year--" />
            </template>
            <template v-slot:after>
              <q-btn dense flat icon="arrow_right" @click="form.year++" />
            </template>
          </q-select>
        </div>
      </q-card-section>
      <q-card-section>
        <q-markup-table>
          <thead>
            <q-tr>
              <q-td>Пн</q-td>
              <q-td>Вт</q-td>
            </q-tr>
          </thead>
        </q-markup-table>
      </q-card-section>
      <q-card-actions align="right">
        <MBtn :label="$t('cancel')" v-close-popup />
        <MBtn :label="$t('apply')" @click="submit" />
      </q-card-actions>
    </q-card>
  </q-menu>
</template>

<script lang="ts">
import { date } from 'quasar';
import { defineComponent, PropType, reactive, computed, ref, watch } from 'vue';
import { getRange } from '../funcs/utils';

type Dtype =
  | 'date'
  | 'time'
  | 'datetime'
  | 'daterange'
  | 'timerange'
  | 'datetimerange';

type InputType = Date | 'string' | 'number';

export default defineComponent({
  name: 'MDatePicker',
  props: {
    modelValue: null,
    type: {
      type: String as PropType<Dtype>,
      default: 'date',
    },
    format: String,
    valueFormat: String,
  },
  setup(props) {
    const showPicker = ref(false);

    const getIniDate = (
      val: InputType | InputType[] | Record<'from' | 'to', InputType>,
      dir: 'start' | 'stop'
    ): Date => {
      if (!val) return new Date();
      if (val instanceof Date) return val;

      if (Array.isArray(val)) {
        val = dir === 'start' ? val[0] : val[1];
      } else if (typeof val == 'object') {
        val = dir === 'start' ? val['from'] : val['to'];
      }
      return new Date(val);
    };

    const form = reactive({
      start: getIniDate(props.modelValue, 'start'),
      stop: getIniDate(props.modelValue, 'stop'),
      year: new Date().getFullYear(),
    });

    const years = getRange(form.year - 40, form.year + 40);

    const getFormat = () => {
      if (props.format) return props.format;
      switch (props.type) {
        case 'date':
        case 'daterange':
          return 'DD.MM.YYYY';
        case 'time':
        case 'timerange':
          return 'HH:mm';
        case 'datetime':
        case 'datetimerange':
          return 'DD.MM.YYYY HH:mm';
      }
    };

    const getValue = computed(() => {
      const format = getFormat();

      switch (props.type) {
        case 'date':
        case 'time':
        case 'datetime':
          return date.formatDate(form.start, format);
        case 'daterange':
        case 'timerange':
        case 'datetimerange':
          return [
            date.formatDate(form.start, format),
            date.formatDate(form.stop, format),
          ].join(' - ');
      }
      return '';
    });

    watch(
      props,
      ({ modelValue }) => {
        form.start = getIniDate(modelValue as InputType, 'start');
        form.stop = getIniDate(modelValue as InputType, 'stop');
      },
      { deep: true }
    );

    const submit = () => {
      showPicker.value = false;
    };

    return {
      form,
      getValue,
      showPicker,
      submit,
      years,
    };
  },
});
</script>
