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
        standout="bg-teal-5"
        class="full-width"
        :label="$t('login')"
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
        standout="bg-teal-5"
        class="full-width"
        :label="$t('password')"
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
        :label="$t('enter')"
        size="lg"
        :disable="!getDisabled"
        @click="login"
        class="text-capitalize"
      />
      <MBtn
        color="teal-5"
        push
        rounded
        :label="$t('demo')"
        size="lg"
        type="password"
        class="text-capitalize"
      />
      <div class="row justify-between full-width">
        <q-toggle
          :label="$t('remember_me')"
          class="text-black text-bold"
          color="deep-orange-12"
          size="md"
          v-model="form.remember_me"
        />
        <MBtn
          color="transparent"
          flat
          class_name="text-black text-bold text-hover"
          :label="$t('need_help')"
          @click="visible = !visible"
        />
        <MDialog
          v-model="visible"
          icon="eva-arrow-ios-downward-outline"
          :MBtn="{ size: 'xl' }"
        >
          <div class="q-pa-md">
            <q-list separator class="help-select">
              <q-item v-for="(t, i) in getContacts" :key="i" clickable>
                <q-item-section>
                  <q-item-label class="font-16 text-bold">{{ t.title }}</q-item-label>
                  <a
                    :href="t.link"
                    target="_blank"
                    v-if="t.link"
                    class="font-16 text-regular text-hover"
                  >
                    <q-item-label
                      class="font-16 text-regular text-hover"
                      caption
                    >
                      {{ t.subtitle }}
                    </q-item-label>
                  </a>
                  <q-item-label caption class="font-16 text-regular" v-else>
                    {{ t.subtitle }}
                  </q-item-label>
                </q-item-section>
                <q-item-section avatar>
                  <q-icon :name="t.icon" color="teal-5" size="md" />
                </q-item-section>
              </q-item>
             </q-list>
          </div>
        </MDialog>
      </div>
      <q-select
        v-model="selectedLang"
        :options="getLangOptions"
        dense
        class="text-bold self-center text-capitalize lang-select"
        popup-content-class="text-bold text-capitalize lang-select-popup"
        emit-value
        map-options
        option-label="label"
        color="deep-orange-12"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'src/store';
import { useRouter } from 'vue-router';
import { defineComponent, reactive, ref, computed } from 'vue';
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'Login',
  setup() {
    const $q = useQuasar()
    const store = useStore();
    const router = useRouter();
    const isPwd = ref(true);
    const visible = ref(false)
    const selectedLang = ref('ru')
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
          $q.notify({
            message: e,
            html: true,
            type: 'negative',
            position: 'center',
            timeout: 1500,
            color: 'white',
            textColor: 'deep-orange-12',
            classes: 'text-bold'            
          })
        });
    };

    const show = () => {
      visible.value = true;
    };

    const hide = () => {
      visible.value = false;
    };

    const getContacts = computed(() => {
      const contacts = []
      contacts.push(
        {
          title: 'Горячая линия (бесплатно)',
          subtitle: '+7(800)333-68-83',
          link: 'tel:+78003336883',
          icon: 'support_agent'
        },
        {
          title: 'Горчая линия',
          subtitle: '+7(495)668-09-98',
          link: 'tel:+74956680998',
          icon: 'local_phone'
        },
        {
          title: 'Электронная почта',
          subtitle: 'contact@kgk-global.com',
          link: 'mailto:contact@kgk-global.com',
          icon: 'alternate_email'
        },
        {
          title: 'Почтовый адрес',
          subtitle: '117513, г. Москва, Ленинский пр-т, 137, к.1',
          icon: 'pin_drop'
        },
        {
          title: 'Сайт компании',
          subtitle: 'kgk-global.com',
          icon: 'public',
          link: 'https://www.kgk-global.com/'
        }
      )
      return contacts
    });

    const getLangOptions = computed(() => {
      const langs = []
      langs.push(
        {
          label: 'русский',
          value: 'ru'
        },
        {
          label: 'english',
          value: 'en'
        }
      )
      return langs
    });

    return {
      form,
      isPwd,
      getDisabled,
      login,
      visible,
      show,
      hide,
      selectedLang,
      getLangOptions,
      getContacts
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
  box-shadow: 0 0 0 0 rgba(245,235,245, 1)
  animation: pulse-red 5s infinite

.lang-select-popup
  & .q-item
    padding: 5px 12px!important
    font-size: 16px!important
    font-weight: 600

.lang-select
  &.q-field--standard .q-field__control:before
    border-bottom: none
    transition: none

  & .q-select__dropdown-icon
    display: none

.help-select
  & .q-item
      min-height: 70px !important

@keyframes pulse-red
  0%
    transform: scale(0.95)
    box-shadow: 0 0 0 0 rgba(245,235,245, 0.7)
    background-position: 0% 50%

  70%
    transform: scale(1)
    box-shadow: 0 0 0 10px rgba(245,235,245, 0)
    background-position: 100% 50%

  100%
    transform: scale(0.95)
    box-shadow: 0 0 0 0 rgba(245,235,245, 0)
    background-position: 0% 50%
</style>
