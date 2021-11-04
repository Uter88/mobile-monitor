<template>
  <q-dialog
    @update:model-value="$emit('update:model-value', $event)"
    v-bind="$props"
    :transition-show="transition_show"
    :transition-hide="transition_hide"
    :position="position"
    class="m-dialog"
    :class="class_dialog"
  >
    <div
      class="bg-white q-pa-xs fit relative-position"
      :class="position === 'bottom' ? 'q-mt-md' : ''"
      style="max-height: 40%"
    >
      <slot name="label">
        <div class="row items-center"
          :class="label ? 'justify-between' : 'justify-center'"
          v-touch-swipe.up.down="handleSwipe"
        >
          <span class="wd-label text-uppercase text-bold q-ml-sm" v-if="label">{{ label }}</span>
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
      <slot name="footer">
        <div class="fit column justify-end self-center"> 
          <MBtn
            icon="keyboard_arrow_up"
            flat
            text-color="black"
            v-close-popup
            @click="$emit('close')"
            :tooltip="$t('close')"
            v-bind="MBtn"
            v-if="position === 'top'"
          />
        </div>
      </slot>
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
      default: '50px'
    },
    icon_class: {
      type: String
    },
    submit: {
      type: Boolean,
      default: true,
    },
    maximized: {
      type: Boolean,
      default: true,
    },
    transition_show: {
      type: String,
      default: 'fade'
    },
    transition_hide: {
      type: String,
      default: 'slide-down'
    },
    position: {
      type: String,
      default: 'bottom'
    },
    class_dialog: {
      type: String,
      default: 'with-b-radius'
    },
    disable: Boolean,
    MBtn: Object
  },

  setup(props, { emit }) {
    const handleSwipe = () => {
      emit('update:model-value', false)
    }
    return{
      handleSwipe
    }
  },
});
</script>
