<template>
<q-page  padding >
      <div class="q-pa-md" v-if="showLoading == false">
    <q-table
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="orderId"
    >
    <template v-slot:top>
        <h1 class="text-h6" style="width:100%">Ordenes abiertas</h1>
        <p style="width:100%"><b>Capital: </b> {{capital}}   </p>
        <p style="width:100%"><b>Flotante: </b> {{flotante}}   </p>
    </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="orderId" :props="props">
            {{ props.row.orderId }}
          </q-td>
          <q-td key="fillPrice" :props="props">
            <q-badge color="green" v-if="props.row.side == 'buy'">
              {{ props.row.side }}
            </q-badge>
            <q-badge color="red" v-else>
              {{ props.row.side }}
            </q-badge>
          </q-td>
          <q-td key="fillPrice" :props="props">
              {{ props.row.fillPrice }}
          </q-td>
          <q-td key="size" :props="props">
              {{ props.row.size }}
          </q-td>
          <q-td key="priceUsd" :props="props">
              {{ props.row.priceUsd }}
          </q-td>
          <q-td key="priceBtc" :props="props">
              {{ props.row.priceBtc }}
          </q-td>

          <q-td key="tpTriggerPx" :props="props">
          {{ props.row.tpTriggerPx }}
          </q-td>
          <q-td key="tpOrdPx" :props="props">
          {{ props.row.tpOrdPx }}
          </q-td>
          <q-td key="slTriggerPx" :props="props">
          {{ props.row.slTriggerPx }}
          </q-td>
          <q-td key="slOrdPx" :props="props">
          {{ props.row.slOrdPx }}
          </q-td>

          <q-td key="gain" :props="props">
            <q-badge color="green" v-if="props.row.gain > 0">
              {{ props.row.gain }}
            </q-badge>
            <q-badge color="red" v-else>
              {{ props.row.gain }}
            </q-badge>
          </q-td>
           <q-td key="date" :props="props">
          {{ props.row.date }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
  </q-page>

</template>

<script>
import { defineComponent , onMounted} from "vue";
import { Loading, useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
import { api } from "boot/axios";
import { ref } from "vue";
import { useStore } from 'vuex'

const columns = [
  {
    name: 'orderId',
    required: true,
    label: 'Order ID',
    align: 'left',
    field: 'orderId',
    sortable: true
  },
  { name: 'side', label: 'Side', field: 'side', sortable: true, align: 'center', },
  { name: 'fillPrice', align: 'center', label: 'Fill Price', field: 'fillPrice', sortable: true },
  { name: 'size', label: 'Size', field: 'size', align: 'center', sortable: true },
  { name: 'priceUsd', label: 'Price USD', field: 'priceUsd', align: 'center',},
  { name: 'priceBtc', label: 'New Btc Price', field: 'priceBtc' , align: 'center'},

  { name: 'tpTriggerPx', label: 'tpTriggerPx', field: 'tpTriggerPx' , align: 'center'},
  { name: 'tpOrdPx', label: 'tpOrdPx', field: 'tpOrdPx' , align: 'center'},
  { name: 'slTriggerPx', label: 'slTriggerPx', field: 'slTriggerPx' , align: 'center'},
  { name: 'slOrdPx', label: 'slOrdPx', field: 'slOrdPx' , align: 'center'},

  { name: 'gain', label: 'Gain', field: 'gain', align: 'center', },
  { name: 'date', label: 'date', field: 'date', align: 'center', },
]
export default defineComponent({
  name: "PageIndex",
setup() {
    Loading.show();
    const showLoading = ref(null)
    const rows = ref(null)
    const capital = ref(null)
    const disponible = ref(null)
    const totalGeneral = ref(null)
    const flotante = ref(null)
    const $store = useStore()
    const router = useRouter();
    const route = useRoute();
    const $q = useQuasar();
    const cookieLogin = $q.cookies.get("r_auth");
    onMounted(async () => {
      if(cookieLogin){
          api.defaults.headers.authorization = `Bearer ${cookieLogin}`;
          try {
          const getOrders = await api.get("get_open_orders");
          console.log(getOrders)
          rows.value = getOrders.data.orders
          capital.value =  getOrders.data.capital
          disponible.value =  getOrders.data.disponible
          totalGeneral.value =  getOrders.data.totalGeneral
          flotante.value =  getOrders.data.flotante
          $store.commit("myStore/setLogin", true)
          showLoading.value = false
          Loading.hide()
          } catch (e) {
          console.log("error ", e);
         // router.push("/")
         // Loading.hide()
          }
      }else{
        router.push("/")
        Loading.hide()
      }
     
    })
    return {
      showLoading,
      columns,
      cookieLogin,
      rows,
      capital,
      disponible,
      totalGeneral,
      flotante
    };
  },

 
});
</script>
