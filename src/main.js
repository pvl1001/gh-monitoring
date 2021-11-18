import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import VModal from 'vue-js-modal'
import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueTippy, { TippyComponent } from "vue-tippy";
import VSelectize from '@isneezy/vue-selectize'

Vue.component('v-selectize', VSelectize)
Vue.use(VueTippy);
Vue.component("tippy", TippyComponent);
Vue.use(VueAxios, axios)
Vue.use( VueFilterDateFormat, {
   monthNames: [
      'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
      'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
   ]
} )
Vue.use( VModal )

Vue.config.productionTip = false

new Vue( {
   store,
   router,
   render: h => h( App ),
} ).$mount( '#app' )

// css
import "./assets/fonts/fonts.css"
import "./assets/scss/colors.scss"
import "./assets/scss/null.scss"
import "./assets/scss/template.scss"
import "tippy.js/themes/light.css"
import 'selectize/dist/css/selectize.default.css' // This is required, we use the same css as selectize.js
