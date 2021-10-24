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
    <q-icon
      name="img: icons/main/signal.svg"
      size="130px"
      class="animate-icon"
    />
    <div class="column q-mt-xl full-width q-px-md q-gutter-y-lg">
      <q-input
        rounded
        standout="bg-transparent text-white"
        class="full-width"
        :label="$t('Login')"
        clearable
        clear-icon="close"
        label-color="black"
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
        :label="$t('Password')"
        label-color="black"
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
      <MBtn
        color="teal-5"
        push
        rounded
        :label="$t('Enter')"
        size="lg"
        :disable="!getDisabled"
        @click="login"
      />
      <MBtn
        color="teal-5"
        push
        rounded
        :label="$t('Demo')"
        size="lg"
        type="password"
      />
      <div class="row justify-between full-width">
        <q-toggle
          :label="$t('Remember me')"
          class="text-black text-bold"
          color="deep-orange-12"
          size="md"
          v-model="form.remember_me"
        />
        <MBtn
          color="transparent"
          flat
          class_name="text-black text-bold text-hover"
          :label="$t('Need help?')"
          @click="visible = !visible"
        />
        <MDialog
          v-model="visible"
          icon="eva-arrow-ios-downward-outline"
          :MBtn="{ size: 'xl' }"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'src/store';
import { useRouter } from 'vue-router';
import { defineComponent, reactive, ref, computed } from 'vue';

export default defineComponent({
  name: 'Login',
  setup() {
    const store = useStore();
    const router = useRouter();
    const isPwd = ref(true);
    const visible = ref(false)
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

    const login = () => {
      const token = 'Basic ' + btoa(form.login + ':' + form.password);

      store
        .dispatch('main/login', token)
        .then(() => {
          if (form.remember_me) localStorage.setItem('token', token);
          sessionStorage.setItem('token', token);
          void router.push('/');
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const show = () => {
      visible.value = true;
    };

    const hide = () => {
      visible.value = false;
    };
    return {
      form,
      isPwd,
      getDisabled,
      login,
      visible,
      show,
      hide
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
