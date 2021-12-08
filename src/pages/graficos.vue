<template>
  <div>
   <div class="row">
      <div class="col">
       <h5>Flotante -------------Variacion: {{variacionFlotante}}</h5>
    <apexchart v-if="showLoading == false"
      width="600"
      type="line"
      :options="optionsF"
      :series="seriesF"
    ></apexchart>
      </div>
      <div class="col">
         <h5>Capital -------------Variacion: {{variacionCapital}}</h5>
    <apexchart v-if="showLoading == false"
      width="600"
      type="line"
      :options="optionsC"
      :series="seriesC"
    ></apexchart>
      </div>
     
    </div>
     
    

    
  </div>
</template>
<script>
import { defineComponent, onMounted } from "vue";
import { Loading, useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
import { api } from "boot/axios";
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    Loading.show();
    const showLoading = ref(null);
    const rows = ref(null);
    const optionsF = ref(null);
    const seriesF = ref(null);
     const optionsC = ref(null);
    const seriesC = ref(null);
    const variacionCapital = ref(0);
    const variacionFlotante = ref(0);
    const $store = useStore();
    const router = useRouter();
    const route = useRoute();
    const $q = useQuasar();
    const cookieLogin = $q.cookies.get("r_auth");
    onMounted(async () => {
      if (cookieLogin) {
        api.defaults.headers.authorization = `Bearer ${cookieLogin}`;
        try {
          const getOrders = await api.get("get_flotante_capital");
          console.log(getOrders.data);
          rows.value = getOrders.data;
          optionsF.value = {
            markers: {
              size: 5,
            },
            chart: {
              id: "vuechart-example",
            },
            xaxis: {
              categories: getOrders.data.arrayLabelsFlotante,
            },
          };

          seriesF.value = [
            {
              name: "Flotante",
              data: getOrders.data.arrayValuesFlotante,
            },
          ];

          optionsC.value = {
            markers: {
              size: 5,
            },
            chart: {
              id: "vuechart-example",
            },
            xaxis: {
              categories: getOrders.data.arrayLabelsCapital,
            },
          };

          seriesC.value = [
            {
              name: "Flotante",
              data: getOrders.data.arrayValuesCapital,
            },
          ];
          variacionCapital.value = getOrders.data.variacionCapital
          variacionFlotante.value = getOrders.data.variacionFlotante
          $store.commit("myStore/setLogin", true);
          showLoading.value = false;
          Loading.hide();
        } catch (e) {
          console.log("error ", e);
          // router.push("/")
          // Loading.hide()
        }
      } else {
        router.push("/");
        Loading.hide();
      }
    });

    return {
      showLoading,
      cookieLogin,
      rows,
      seriesF,
      optionsF,
      optionsC, 
      seriesC, variacionCapital, variacionFlotante
    };
  },
};
</script>
