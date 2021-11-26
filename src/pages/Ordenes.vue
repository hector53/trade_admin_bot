<template>
<q-page  padding >
      <div class="q-pa-md" v-if="showLoading == false">
    <q-table
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="ordId"
    >
    <template v-slot:top>
        <h1 class="text-h6" style="width:100%">Ordenes</h1>
    </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="ordId" :props="props">
            {{ props.row.ordId }}
          </q-td>
          <q-td key="side" :props="props">
            <q-badge color="green" v-if="props.row.side == 'buy'">
              {{ props.row.side }}
            </q-badge>
            <q-badge color="red" v-else>
              {{ props.row.side }}
            </q-badge>
          </q-td>
          <q-td key="avgPx" :props="props">
              {{ props.row.avgPx }}
          </q-td>
          <q-td key="accFillSz" :props="props">
              {{ props.row.accFillSz }}
          </q-td>
          <q-td key="notionalUsd" :props="props">
              {{ props.row.notionalUsd }}
          </q-td>
          <q-td key="fee" :props="props">
              {{ props.row.fee }}
          </q-td>
          <q-td key="feeCcy" :props="props">
              {{ props.row.feeCcy }}
          </q-td>
           <q-td key="cTime" :props="props">
              {{ props.row.cTime  }}
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
    name: 'ordId',
    required: true,
    label: 'Order ID',
    align: 'left',
    field: 'ordId',
    sortable: true
  },
  { name: 'side', label: 'Side', field: 'side', sortable: true, align: 'center', },
  { name: 'avgPx', align: 'center', label: 'avgPx', field: 'avgPx', sortable: true },
  { name: 'accFillSz', label: 'accFillSz', field: 'accFillSz', align: 'center', sortable: true },
  { name: 'notionalUsd', label: 'Price USD', field: 'notionalUsd', align: 'center', sortable: true},
  { name: 'fee', label: 'fee', field: 'fee' , align: 'center', sortable: true},
  { name: 'feeCcy', label: 'feeCcy', field: 'feeCcy' , align: 'center'},
  { name: 'cTime', label: 'Time', field: 'cTime' , align: 'center', sortable: true},

]
export default defineComponent({
  name: "PageIndex",
setup() {
    Loading.show();
    const showLoading = ref(null)
    const rows = ref(null)
    const $store = useStore()
    const router = useRouter();
    const route = useRoute();
    const $q = useQuasar();
    const cookieLogin = $q.cookies.get("r_auth");
    onMounted(async () => {
      if(cookieLogin){
          api.defaults.headers.authorization = `Bearer ${cookieLogin}`;
          try {
          const getOrders = await api.get("get_compras");
          console.log(getOrders)
          rows.value = getOrders.data.orders
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
    };
  },

 
});
</script>
