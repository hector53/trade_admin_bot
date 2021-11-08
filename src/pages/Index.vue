<template>
  <q-page class="flex flex-center">
    <q-card class="my-card" style="width: 600px">
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            filled
            v-model="name"
            label="Username *"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            type="password"
            v-model="password"
            label="Your password *"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') || 'Please type your password',
              (val) => val.length >= 6 || 'min 6 caracteres',
            ]"
          />

          <div>
            <q-btn label="Submit" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { api } from "boot/axios";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const $store = useStore();
    console.log("login", $store.state.myStore.login);
    const router = useRouter();
    const $q = useQuasar();
    const name = ref(null);
    const password = ref(null);
    const cookieLogin = $q.cookies.get("r_auth");
    if (cookieLogin) {
      api.defaults.headers.authorization = `Bearer ${cookieLogin}`;
      try {
        const response = api.get("getSession");
        $store.commit("myStore/setLogin", true);
        router.push("/home");
      } catch (e) {
        console.log("error ", e);
      }
    }
    return {
      name,
      password,
      async onSubmit() {
        await api
          .post("login", {
            user: name.value,
            password: password.value,
          })
          .then((response) => {
            console.log(response);
            $q.cookies.set("r_auth", response.data.token, {
              path: "/",
              maxAge: 60 * 60 * 24 * 7,
            });
            router.push("/home");
          })
          .catch(({ response }) => {
            console.log("error", response);
          });
      },

      onReset() {
        name.value = null;
        age.value = null;
        accept.value = false;
      },
    };
  },
};
</script>
