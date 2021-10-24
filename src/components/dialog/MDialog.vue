<template>
  <q-dialog
    @update:model-value="$emit('update:model-value', $event)"
    v-bind="$props"
    transition-show="fade"
    transition-hide="slide-down"
    position="bottom"
    class="m-dialog"
  >
    <div class="bg-white q-pa-xs fit">
      <slot name="label">
        <div class="row items-center justify-between">
          <span class="wd-label">{{ label }}</span>
          <MBtn
            icon="close"
            flat
            text-color="black"
            v-close-popup
            @click="$emit('close')"
            :tooltip="$t('close')"
          />
        </div>
      </slot>
      <slot name="default"> </slot>
      <slot name="footer"> </slot>
    </div>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Dialog',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    label: String,
    noShake: {
      type: Boolean,
      default: true,
    },
    okLabel: {
      default: 'save',
    },
    closeLabel: {
      default: 'close',
    },
    submit: {
      type: Boolean,
      default: true,
    },
    maximized: {
      type: Boolean,
      default: true,
    },
    disable: Boolean,
  },

  setup() {
    return;
  },
});
</script>
