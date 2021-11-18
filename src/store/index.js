import Vue from 'vue'
import Vuex from 'vuex'
import headDate from "@/store/modules/headDate";
import tableData from "@/store/modules/tableData";

Vue.use(Vuex)

export default new Vuex.Store({
   strict: true,
   modules: {
      headDate,
      tableData
   },
})