<template>
  <MDialog
    v-model="visible"
    position="top"
    classDialog="with-t-radius"
    transition-hide="slide-up"
    :MBtn="{ size: 'xl' }"
    content-style="max-height: 70%;"
    contentClass="q-mb-md"
  >
     <q-card class="my-card fit" flat style="padding: 0!important">
      <img src="https://cdn.quasar.dev/img/parallax2.jpg">

      <q-list>
        <q-item clickable>
          <q-item-section avatar>
            <q-icon color="primary" name="local_bar" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Bar XYZ</q-item-label>
            <q-item-label caption>Have a drink.</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section avatar>
            <q-icon color="red" name="local_gas_station" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Gas Station</q-item-label>
            <q-item-label caption>Fill your gas tank.</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section avatar>
            <q-icon color="amber" name="local_movies" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Cinema XYZ</q-item-label>
            <q-item-label caption>Watch a movie.</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
    <template v-slot:footer>
      <MBtn
        icon="eva-arrow-ios-downward-outline"
        size="xl"
        flat
        text-color="black"
        v-close-popup
      />
    </template>
  </MDialog>
</template>

<script lang="ts">
import { Tracker } from 'src/models/tracker/tracker';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ActiveTracker',
  props: {
    tracker: {
      type: Tracker,
      required: true
    }
  },
  setup() {
    const visible = ref(false);

    const show = () => {
      visible.value = true;
    };

    const hide = () => {
      visible.value = false;
    };

    return {
      visible,
      show,
      hide,
    };
  },
});
</script>
