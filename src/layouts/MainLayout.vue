<template>
  <div class="q-pa-md">
   
    <q-layout view="hHh Lpr lff"  >
      <q-header elevated class="indigo-9">
        <q-toolbar >
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Dashboard Trade Bot</q-toolbar-title>
          <div>Dark Mode <q-toggle v-model="darkMode"  color="yellow"  /></div>
          <div>v 1.0</div>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        :width="200"
        :breakpoint="500"
        bordered
        class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          <q-list>

           

              <q-item clickable 
              :active="'Home' == $route.name " 
              v-ripple
              @click="menuClick('/')"
              >
                <q-item-section avatar>
                  <q-icon name="home" />
                </q-item-section>
                <q-item-section>
                  Home
                </q-item-section>
              </q-item>

              <q-item clickable 
              :active="'Ordenes' == $route.name " 
              v-ripple
              @click="menuClick('/ordenes')"
              >
                <q-item-section avatar>
                  <q-icon name="home" />
                </q-item-section>
                <q-item-section>
                  Ordenes
                </q-item-section>
              </q-item>


              <q-separator   />

              <q-item clickable 
              v-if="$store.state.myStore.login"
              v-ripple
              @click="salir"
              >
                <q-item-section avatar>
                  <q-icon name="close" />
                </q-item-section>
                <q-item-section>
                  Log out
                </q-item-section>
              </q-item>
        

          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
      <q-breadcrumbs class="text-brown">
        <template v-slot:separator>
        <q-icon
        size="1.5em"
        name="chevron_right"
        color="primary"
        />
        </template>
        <q-breadcrumbs-el label="Home" icon="home" to="/" />
        <q-breadcrumbs-el label="Orders" icon="widgets" v-if="$route.name == 'Home'" />
      </q-breadcrumbs>
        <router-view></router-view>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Cookies } from 'quasar'
import { Dark, useQuasar, LocalStorage } from 'quasar'
export default {
  setup () {
     const $q = useQuasar()
     const darkMode = ref(null)
     console.log($q.dark.isActive) // true, false
    
    var darkModeLocal = $q.localStorage.getItem("darkMode")
    console.log("dark mode local", darkModeLocal)
    if(darkModeLocal){
          darkMode.value = darkModeLocal
    }else{
          $q.localStorage.set("darkMode", $q.dark.isActive)
          darkModeLocal = $q.dark.isActive
    }
    $q.dark.set(darkModeLocal)
    return {
      drawer: ref(false),
      visibleLoading: ref(true),
      darkMode
    }
  },
  watch:{
    darkMode(val) {
      if(val){
        Dark.set(true)
        LocalStorage.set("darkMode", true)
      }else{
        Dark.set(false)
        LocalStorage.set("darkMode", false)
      }
    }
  },

  methods: {
    activarDarkMode(val){
      console.log(val)
    },
    salir(){
      Cookies.remove("r_auth");
      this.$store.commit("myStore/setLogin", false)
      this.$router.push("/")
    },
    menuClick(to){
        this.$router.push(to)
      }
  },
}
</script>