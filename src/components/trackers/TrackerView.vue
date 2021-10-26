<template>
  <component
    :is="view === 'table' ? 'q-tr' : 'q-item'"
    @click="$emit('activate', $event, tracker)"
    @mouseover="$emit('hover', $event, tracker)"
    class="cursor-pointer tracker"
    clickable
    :class="tracker.getClass"
  >
    <component :is="view === 'table' ? 'q-td' : 'q-item-section'">
      <component
        v-if="tracker.is_active"
        :is="view === 'table' ? 'q-checkbox' : 'q-toggle'"
        :model-value="selected"
        @update:model-value="$emit('select', tracker)"
        dense
        size="sm"
        checked-icon="check"
      />
    </component>
    <component
      :is="view === 'table' ? 'q-td' : 'q-item-section'"
      v-for="col in columns"
      :key="col.field"
    >
      <span v-if="view === 'list'">
        {{ col.label ? $t(col.label) : '' }}
      </span>
      <q-icon
        v-if="col.field === 'icon'"
        size="16pt"
        :name="'img:/' + getValue(col.field)"
      />
      <span v-else>{{ getValue(col.field) }}</span>
    </component>
  </component>
</template>

<script lang="ts">
import { Tracker } from 'src/models/tracker/tracker';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'TrackerView',
  props: {
    tracker: {
      type: Tracker,
      required: true,
    },
    columns: {
      type: Array as PropType<Array<Record<string, string>>>,
      default: () => [],
    },
    view: {
      type: String,
      default: 'table',
    },
    selected: Boolean,
  },
  setup(props) {
    const getValue = (field: string) => {
      const t = props.tracker;
      switch (field) {
        case 'icon':
          return t.getIcon();
        case 'brand':
          return t.brand;
        case 'model':
          return t.model;
        case 'state_number':
          return t.state_number;
      }
    };
    return {
      getValue,
    };
  },
});
</script>
