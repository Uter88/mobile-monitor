<template>
  <div
    class="
      column
      fit
      login-contant
      absolute
      justify-center
      items-center
      no-wrap
    "
    v-if="form"
  >
    <q-icon name="img: icons/main/signal.svg" size="130px" class="animate-icon" />
    <div class="column q-mt-xl full-width q-px-md q-gutter-y-lg">
      <q-input
        rounded
        standout="bg-transparent text-white"
        class="full-width"
        label="Login"
        clearable
        clear-icon="close"
        autocomplete="off"
        no-error-icon
        @clear="() => (form.login = '')"
        v-model="form.login"
      >
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
      </q-input>
      <q-input
        rounded
        autocomplete="off"
        standout="bg-transparent text-white"
        class="full-width"
        label="Password"
        :type="isPwd ? 'password' : 'text'"
        no-error-icon
        v-model="form.password"
      >
        <template v-slot:prepend>
          <q-icon name="lock" />
        </template>
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            @click="isPwd = !isPwd"
          />
          <q-icon
            name="close"
            @click="form.password = ''"
            v-if="form.password"
          />
        </template>
      </q-input>
      <q-btn
        push
        rounded
        color="teal-5"
        label="Enter"
        size="lg"
        :disable="!getDisabled"
        @click="$router.push('/')"
      />
      <q-btn
        push
        rounded
        color="teal-5"
        label="Demo"
        size="lg"
        type="password"
      />
      <div class="row justify-between full-width">
        <q-toggle
          label="Remember me"
          class="text-white text-uppercase text-black"
          color="teal-5"
          size="md"
          v-model="form.remember_me"
        />
        <q-btn
          flat
          color="white"
          class="text-black text-regular"
          label="Need help?"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue';

export default defineComponent({
  name: 'Login',
  setup() {
    const isPwd = ref(true);
    const form = reactive({
      remember_me: false,
      password: '',
      login: '',
    });
    const getDisabled = computed(() => {
      if (form.login && form.password) {
        return true;
      }
      return false;
    });
    return {
      form,
      isPwd,
      getDisabled,
    };
  },
});
</script>
<style lang="sass">
.login-contant
  background: linear-gradient(#63ACB0, #A0EACF)

.animate-icon
  background: linear-gradient(#23d5ab, #63ACB0, #A0EACF)
  border-radius: 50%
  padding: 20px
  box-shadow: 0 0 0 0 rgba(42,176,174, 1)
  animation: pulse-red 5s infinite

@keyframes pulse-red 
  0% 
    transform: scale(0.95)
    box-shadow: 0 0 0 0 rgba(42,176,174, 0.7)
    background-position: 0% 50%
  
  70% 
    transform: scale(1)
    box-shadow: 0 0 0 10px rgba(42,176,174, 0)
    background-position: 100% 50%
  
  100% 
    transform: scale(0.95)
    box-shadow: 0 0 0 0 rgba(42,176,174, 0)
    background-position: 0% 50%

</style>
