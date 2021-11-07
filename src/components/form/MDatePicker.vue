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
      <q-card-section>
        <q-date range />
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
import { defineComponent, PropType, reactive, computed, ref } from 'vue';

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
    });

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

    const submit = () => {
      showPicker.value = false;
    };

    return {
      form,
      getValue,
      showPicker,
      submit,
    };
  },
});
</script>
