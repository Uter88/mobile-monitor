<template>
  <MDialog v-model="visible" :label="$t('objects')">
    <div class="row q-gutter-md q-pa-sm">
      <q-select
        class="col"
        v-model="group"
        :options="groups"
        emit-value
        map-options
        color="deep-orange-12"
        rounded
        outlined
        dense
        :option-label="(g) => (g.default ? $t(g.label) : g.label)"
      />
      <q-select
        v-model="columns"
        :options="allColumns"
        dense
        outlined
        option-value="field"
        :option-label="(c) => $t(c.label)"
        map-options
        emit-value
        multiple
        hide-selected
        :label="$t('columns')"
        popup-content-class="q-py-sm"
      >
        <template v-slot:before-options>
          <div class="q-pa-sm">
            <q-toggle
              class="text-bold"
              dense
              size="xs"
              v-model="view"
              true-value="list"
              false-value="table"
              checked-icon="list"
              unchecked-icon="eva-grid-outline"
              color="deep-orange-12"
              :label="$t(view)"
            />
          </div>
        </template>
      </q-select>
    </div>
    <q-virtual-scroll
      :type="view"
      :items="trackers"
      style="max-height: 90vh"
      class="flex-start text-no-wrap"
      flat
    >
      <template v-slot:before>
        <thead class="thead-sticky text-left" v-if="view === 'table'">
          <q-tr>
            <q-th>
              <q-checkbox
                v-model="selectAll"
                dense
                size="sm"
                color="deep-orange-12"
              />
            </q-th>
            <q-th v-for="col in getColumns" :key="col.field">
              {{ col.label ? $t(col.label) : '' }}
            </q-th>
          </q-tr>
        </thead>
        <q-item v-else class="thead-sticky">
          <q-item-section>
            <q-toggle
              v-model="selectAll"
              dense
              size="sm"
              :label="$t('select_all')"
              class="text-bold text-no-wrap"
              color="deep-orange-12"
            />
          </q-item-section>
        </q-item>
      </template>
      <template v-slot="{ item }">
        <TrackerView
          :tracker="item"
          :columns="getColumns"
          :view="view"
          :selected="isSelected(item)"
          @select="select"
          @activate="activate"
        />
      </template>
    </q-virtual-scroll>
  </MDialog>
</template>

<script lang="ts">
import { Tracker } from 'src/models/tracker/tracker';
import { useStore } from 'src/store';
import { defineComponent, ref, computed } from 'vue';
import TrackerView from './TrackerView.vue';

export default defineComponent({
  name: 'TrackersList',
  components: { TrackerView },
  setup() {
    const visible = ref(false);
    const store = useStore();

    const view = computed({
      get: () => store.state.main.config.view,
      set: (view) => store.commit('main/updateConfig', { view }),
    });

    const group = computed({
      get: () => store.state.main.config.group,
      set: (group) => store.commit('main/updateConfig', { group }),
    });

    const groups = computed(() => store.state.main.groups);
    const trackers = computed(() => store.state.trackers.trackers);
    const selected = computed({
      get: () => store.state.main.config.trackers,
      set: (trackers) => store.commit('main/updateConfig', { trackers }),
    });

    const columns = computed({
      get: () => store.state.main.config.columns,
      set: (columns) => store.commit('main/updateConfig', { columns }),
    });

    const allColumns = [
      { label: 'icon', field: 'icon' },
      { label: 'brand', field: 'brand' },
      { label: 'model', field: 'model' },
      { label: 'state_number', field: 'state_number' },
    ];

    const getColumns = computed(() => {
      return allColumns.filter((c) => columns.value.indexOf(c.field) !== -1);
    });

    const show = () => {
      visible.value = true;
    };

    const hide = () => {
      visible.value = false;
    };

    const isSelected = (t: Tracker): boolean => {
      return selected.value.indexOf(t.device_id) !== -1;
    };

    const select = (t: Tracker) => {
      if (!t.is_active) return;
      const indx = selected.value.indexOf(t.device_id);
      let arr = [];

      if (indx === -1) {
        arr = selected.value.slice();
        arr.push(t.device_id);
      } else {
        arr = selected.value.filter((v) => v !== t.device_id);
      }
      selected.value = arr;
    };

    const activate = (e: { target: HTMLElement }, t: Tracker) => {
      if (!t.is_active) return;
      store.commit('trackers/setCurrent', t);
      store.commit('main/setCenter', t.getCoords());

      if (selected.value.indexOf(t.device_id) === -1) {
        select(t);
      }
    };

    const selectAll = computed({
      get: () => {
        if (!selected.value.length) return false;
        if (
          selected.value.length ===
          trackers.value.filter((t) => t.is_active).length
        )
          return true;
        return null;
      },
      set: (val) => {
        if (val) {
          selected.value = trackers.value
            .filter((t) => t.is_active)
            .map((t) => t.device_id);
        } else {
          selected.value = [];
        }
      },
    });

    return {
      visible,
      show,
      hide,
      isSelected,
      select,
      activate,
      group,
      groups,
      view,
      trackers,
      columns,
      getColumns,
      allColumns,
      selected,
      selectAll,
    };
  },
});
</script>
