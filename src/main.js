import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import { pinia } from "./store";
import toast from "./helpers/toast.js";
import constant from "./config/constant.js";


// import "./assets/styles/css/bootstrap-select.min.css"
import "./assets/styles/css/bootstrap.min.css"
import "./assets/styles/css/common_template.css"
import "./assets/styles/css/style.css"


import "./assets/styles/js/bootstrap.min.js"
// import "./assets/styles/js/bootstrap-select.min.js"
import "./assets/styles/js/jquery.min.js"
import "./assets/styles/js/custom.js"

const isLoading = ref(false);

createApp(App)
  .provide("$constant", constant)
  .provide("$toast", toast)
  .provide('isLoading', isLoading)
  .use(router)
  .use(pinia)
  .mount('#app')
