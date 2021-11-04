<template>
  <q-dialog
    @update:model-value="$emit('update:model-value', $event)"
    v-bind="$props"
    :transition-show="transitionShow"
    :transition-hide="transitionHide"
    :position="position"
    class="m-dialog"
    :class="classDialog"
  >
    <div
      class="bg-white q-pa-xs relative-position column"
      :class="contentClass"
      :style="contentStyle"
    >
      <slot name="label">
        <div
          class="row items-center"
          :class="label ? 'justify-between' : 'justify-center'"
          v-touch-swipe.up.down="handleSwipe"
        >
          <span
            class="wd-label text-uppercase text-bold q-ml-sm"
            v-if="label"
            >{{ label }}</span
          >
          <MBtn
            :icon="icon"
            flat
            text-color="black"
            v-close-popup
            @click="$emit('close')"
            :tooltip="$t('close')"
            v-bind="MBtn"
            v-if="position === 'bottom'"
          />
        </div>
      </slot>
      <slot name="default"> </slot>
      <div class="absolute-bottom full-width text-center">
        <slot name="footer"> </slot>
      </div>
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
    icon: {
      default: 'eva-close',
    },
    icon_size: {
      type: String,
      default: '50px',
    },
    icon_class: {
      type: String,
    },
    submit: {
      type: Boolean,
      default: true,
    },
    maximized: {
      type: Boolean,
      default: true,
    },
    transitionShow: {
      type: String,
      default: 'fade',
    },
    transitionHide: {
      type: String,
      default: 'slide-down',
    },
    position: {
      type: String,
      default: 'bottom',
    },
    classDialog: {
      type: String,
      default: 'with-b-radius',
    },
    contentClass: {
      type: String,
      default: 'q-mt-md',
    },
    contentStyle: String,
    disable: Boolean,
    MBtn: Object,
  },

  setup(props, { emit }) {
    const handleSwipe = () => {
      emit('update:model-value', false);
    };
    return {
      handleSwipe,
    };
  },
});
</script>
