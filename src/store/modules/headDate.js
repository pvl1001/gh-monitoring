export default {
   namespaced: true,

   state: {
      datepicker: '',
      dateArr: [],
   },
   getters: {
      datepicker(state) {
         return state.datepicker
      },
      dateArr(state) {
         return state.dateArr
      },
   },
   mutations: {
      V_MODEL(state, [el, value]) {
         state[el] = value
      },
      DATE_ARR_PUSH(state) {
         // динамика календаря строкой
         if(!state.dateArr.length) {
            let yearNow = new Date().getFullYear()
            let monthNow = new Date().getMonth() + 1
            for (let i = 0; i < 9; i++) {
               monthNow -= 1
               state.dateArr.push( new Date( yearNow, monthNow ) )
            }
         }

      }
   }
}