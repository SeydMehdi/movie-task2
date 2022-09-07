import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
//import Vue3PersianDatetimePicker from 'vue3-persian-datetime-picker'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import './index.css'

loadFonts()

const app = createApp(App)
  .use(router)
  .use(store)
  .use(vuetify);
app.component('DatePicker', Datepicker);

app.mount('#app')
