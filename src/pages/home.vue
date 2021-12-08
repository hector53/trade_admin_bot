<template>
<q-page  padding >
      <div class="q-pa-md" v-if="showLoading == false">
        <div style="display: flex;    justify-content: flex-end;    margin-bottom: 20px;">
          <q-btn  color="negative"  label="Panic Button"  @click="confirm = true"  />
           <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="cancel" color="negative" text-color="white" />
          <span class="q-ml-sm">Estas seguro de activar el boton de panico?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="negative" v-close-popup />
          <q-btn flat label="Si seguro" color="primary" @click="panicBtn"  />
        </q-card-actions>
      </q-card>
    </q-dialog>
        </div>
        
    <q-table
      title="Treats"
      :rows-per-page-options="[10]"
      :rows="rows"
      :columns="columns"
      row-key="orderId"
    >
    <template v-slot:top>
        <h1 class="text-h6" style="width:100%">Ordenes abiertas</h1>

      <div class="row" style="width:100%">
        <div class="col-6">
        <p style="width:100%"><b>Capital Inicial: </b> {{capital}}   </p>
        <p style="width:100%"><b>Capital Disponible: </b> {{disponible}}   </p>
        <p style="width:100%"><b>Flotante: </b> {{flotante}}   </p>
        <p style="width:100%"><b>Total General: </b> {{totalGeneral}}   </p>
        </div>
        <div class="col-6">
        <p style="width:100%"><b>ROI: </b> {{totalGeneral/capital}}   </p>
        <p style="width:100%"><b>Costo Oportunidad Hold: </b> {{costoOportunidad}}   </p>
        
        </div>
      </div>
        
        
    </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="orderId" :props="props">
            {{ props.row.orderId }}
          </q-td>
          <q-td key="side" :props="props">
            <q-badge color="green" v-if="props.row.side == 'buy'">
              {{ props.row.side }}
            </q-badge>
            <q-badge color="red" v-else>
              {{ props.row.side }}
            </q-badge>
          </q-td>
          <q-td key="AvgPrice" :props="props">
              {{ props.row.AvgPrice }}
          </q-td>
          <q-td key="size" :props="props">
              {{ props.row.size }}
          </q-td>
          <q-td key="fee" :props="props">
              {{ props.row.fee }}
          </q-td>
          <q-td key="priceUsd" :props="props">
              {{ props.row.priceUsd }}
          </q-td>
           <q-td key="notionalUsd" :props="props">
              {{ props.row.notionalUsd }}
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
  { name: 'AvgPrice', align: 'center', label: 'AvgPrice', field: 'AvgPrice', sortable: true },
  { name: 'size', label: 'Size', field: 'size', align: 'center', sortable: true },
    { name: 'fee', label: 'Fee', field: 'fee' , align: 'center'},
  { name: 'priceUsd', label: 'Price USDT', field: 'priceUsd', align: 'center',},
  { name: 'notionalUsd', label: 'notionalUsd', field: 'notionalUsd', align: 'center',},
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
    const costoOportunidad = ref(null)
    
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
          totalGeneral.value =  getOrders.data.capitalTotal
          flotante.value =  getOrders.data.flotante
          costoOportunidad.value = getOrders.data.costoOportunidad
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
      flotante, costoOportunidad,
       confirm: ref(false),
    };
  },
  methods: {
 async   panicBtn(){ 
   this.confirm = false
   Loading.show();
   console.log("panic button")
        try {
          const getOrders = await api.post("close_open_orders_btn_panic",{
            pass: 123456
          });
          console.log(getOrders)
          Loading.hide()
          alert("todo ha cerrado con exito")
          location.reload
          
          } catch (e) {
          console.log("error ", e);
          Loading.hide()
          }
    }
  },

 
});
</script>
