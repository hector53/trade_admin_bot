<template>
<q-page  padding >
      <div class="q-pa-md" v-if="showLoading == false">
    <q-table
      title="Ordenes Cerradas"
      :rows="rows"
      :columns="columns"
      :rows-per-page-options="[10]"
    >
    <template v-slot:top>
        <h1 class="text-h6" style="width:100%">Ordenes Cerradas</h1>
        <p style="width:100%"><b>Ordenes Ganadas: </b> {{ordenesGanadas}} ----Total: {{totalOrdenesGanadas}}  </p>
        <p style="width:100%"><b>Ordenes Perdidas: </b> {{ordenesPerdidas}}  ----Total: {{totalOrdenesPerdidas}} </p>
    </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="openTime" :props="props">
            {{ props.row.openTime }}
          </q-td>
          <q-td key="avgOpenPrice" :props="props">
            {{ props.row.avgOpenPrice }}
          </q-td>
          <q-td key="closeTime" :props="props">
              {{ props.row.closeTime }}
          </q-td>
          <q-td key="avgClosePrice" :props="props">
              {{ props.row.avgClosePrice }}
          </q-td>
          <q-td key="size" :props="props">
              {{ props.row.size }}
          </q-td>
          <q-td key="ratio" :props="props">
              {{ props.row.ratio }} %
          </q-td>
          <q-td key="ganancia" :props="props">
            <q-badge color="green" v-if="props.row.ganancia > 0">
              {{ props.row.ganancia }}
            </q-badge>
            <q-badge color="red" v-else>
              {{ props.row.ganancia }}
            </q-badge>
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
    name: 'openTime',
    label: 'openTime',
    align: 'left',
    field: 'openTime',
    sortable: true
  },
  { name: 'avgOpenPrice', label: 'avgOpenPrice', field: 'avgOpenPrice', sortable: true, align: 'center', },
  { name: 'closeTime', align: 'center', label: 'closeTime', field: 'closeTime', sortable: true },
  { name: 'avgClosePrice', label: 'avgClosePrice', field: 'avgClosePrice', align: 'center', sortable: true },
  { name: 'size', label: 'size', field: 'size', align: 'center', sortable: true},
  { name: 'ratio', label: 'ratio', field: 'ratio' , align: 'center', sortable: true},
  { name: 'ganancia', label: 'ganancia', field: 'ganancia' , align: 'center'},
]
export default defineComponent({
  name: "PageIndex",
setup() {
    Loading.show();
    const showLoading = ref(null)
    const rows = ref(null)
    const ordenesGanadas = ref(null)
    const ordenesPerdidas = ref(null)
    const totalOrdenesGanadas = ref(null)
    const totalOrdenesPerdidas = ref(null)
    const $store = useStore()
    const router = useRouter();
    const route = useRoute();
    const $q = useQuasar();
    const cookieLogin = $q.cookies.get("r_auth");
    onMounted(async () => {
      if(cookieLogin){
          api.defaults.headers.authorization = `Bearer ${cookieLogin}`;
          try {
          const getOrders = await api.get("get_close_orders");
          console.log(getOrders)
          rows.value = getOrders.data.orders
          ordenesGanadas.value = getOrders.data.ordenesGanadas
          ordenesPerdidas.value = getOrders.data.ordenesPerdidas
          totalOrdenesGanadas.value = getOrders.data.totalOrdenesGanadas
          totalOrdenesPerdidas.value = getOrders.data.totalOrdenesPerdidas
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
      rows, ordenesPerdidas, ordenesGanadas, totalOrdenesPerdidas, totalOrdenesGanadas
    };
  },

 
});
</script>
