<template>
   <div class="head-date">
<!--      <label v-for="(date, index) in dateArr" :key="index">-->
<!--         <input type="radio" name="date-radio"-->
<!--                :value="date"-->
<!--                v-model="datepicker">-->
<!--         <span v-if="index === 0" class="head-date__date">Текущий</span>-->
<!--         <span v-else class="head-date__date">{{ date | dateFormat('MMMM YY', dateConfig) }}</span>-->
<!--      </label>-->

<!--      <div id="datepickerMonth">-->
<!--         <div class="head-date__date other"-->
<!--              @click="openPicker"-->
<!--              :class="{'open': opened, 'select': more !== 'Ещё'}">-->
<!--            <span v-if="more === 'Ещё'">{{ more }}</span>-->
<!--            <span v-else>{{ more | dateFormat('MMMM YY', dateConfig) }}</span>-->
<!--            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6">-->
<!--               <path id="Многоугольник_1" data-name="Многоугольник 1" d="M6,0l6,6H0Z"-->
<!--                     transform="translate(12 6) rotate(180)" fill="#333"/>-->
<!--            </svg>-->
<!--         </div>-->

<!--         <datepicker input-class="head-input-datepicker"-->
<!--                     calendar-class="head-datepicker"-->
<!--                     :language="ru"-->
<!--                     monday-first-->
<!--                     :minimumView="'month'"-->
<!--                     :maximumView="'month'"-->
<!--                     format="MM yyyy"-->
<!--                     ref="datepicker"-->
<!--                     v-model="datepicker"-->
<!--                     @closed="opened = false"-->
<!--                     @selected="selected"-->
<!--         />-->
<!--      </div>-->
<!--      <TestSelect />-->
   </div>
</template>

<script>
// import Datepicker from "vuejs-datepicker";
// import {ru} from "vuejs-datepicker/dist/locale";
import {mapGetters, mapMutations} from "vuex";
// import TestSelect from "@/components/TestSelect";

export default {
   name: "headDate",
   components: {
      // Datepicker,
      // TestSelect
   },
   data() {
      return {
         selectMonth: true,
         opened: false,
         // ru: ru,
         dateConfig: {
            monthNames: [
               'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
               'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
            ]
         }
      }
   },
   computed: {
      ...mapGetters("headDate", ['dateArr']),
      more() {
         let date = this.dateArr.find( el =>
            String( el.getMonth() ) + String( el.getFullYear() ) === String( this.datepicker.getMonth() ) + String( this.datepicker.getFullYear() )
         )
         return !date ? this.datepicker : 'Ещё'
      },
      datepicker: {
         get() {
            return this.$store.getters["headDate/datepicker"]
         },
         set(value) {
            this.V_MODEL( ['datepicker', value])
         }
      }

   },
   methods: {
      ...mapMutations('headDate', [
         'V_MODEL',
         'DATE_ARR_PUSH'
      ]),
      selected() {
         this.selectMonth = false
      },
      openPicker() {
         this.opened = true
         this.$refs.datepicker.showCalendar()
      },
      close(e) {
         const el = document.querySelector( '#datepickerMonth' )
         if (!el.contains( e.target ) && this.opened) this.$refs.datepicker.showCalendar()
      }
   },
   created() {
      // динамика календаря строкой
      this.DATE_ARR_PUSH()
      // текущий месяц
      this.datepicker = this.dateArr[0]
   },
   // mounted() {
   //    window.addEventListener( 'click', this.close )
   //    // сокращенные названия месяцев
   //    this.$refs.datepicker.language._months =
   //       ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
   // },
   beforeDestroy() {
      window.removeEventListener( 'click', this.close )
   }
}
</script>

<style lang="scss">
.head-date {
   padding-top: 9px;
   display: flex;
   user-select: none;

   label {
      input {
         display: none;
      }

      input:checked + .head-date__date {
         background-color: var(--mf-green);
         color: #fff;
      }
   }

   .head-date__date {
      display: block;
      font-size: 15px;
      font-weight: 500;
      line-height: 21px;
      padding: 6px 15px;
      margin-right: 9px;
      border-radius: 17px;
      cursor: pointer;
      white-space: nowrap;
      background-color: #EDEDED ;

      &:hover {
         background-color: var(--mf-green-select);
         color: #fff;
      }

   }

   .head-inline-datepicker {
      width: auto;
      display: flex;
      flex-direction: row-reverse;
      box-shadow: none;
      background-color: transparent;
      border: 0;

      header {
         display: none !important;
      }

      .cell.month {
         font-size: 15px;
         font-weight: 500;
         padding: 0 15px;
         margin-right: 9px;
         border-radius: 17px;
         background-color: #fff;
         cursor: pointer;
         height: 32px;
         line-height: 32px;
         border: 0 !important;

         &:hover {
            background-color: var(--mf-green-select);
            color: #fff;
         }

         &:nth-last-child(-n+2) {
            display: none;
         }
      }
   }

   .head-datepicker {
      right: 18px;
      width: 236px;
      margin-top: 3px;
      font-size: 15px;
      padding: 16px 10px;

      .cell {
         height: 40px;
         line-height: 40px;
      }

      .cell.month {
         width: 25%;
         border-color: transparent !important;
      }

      header .next:after {
         border: 5px solid transparent;
         border-left: 7px solid #000;
      }

      header .prev:after {
         border: 5px solid transparent;
         border-right: 7px solid #000;
      }

   }

   .head-input-datepicker {
      display: none;
   }

   .head-date__date.other {
      background-color: transparent;
      position: relative;
      display: flex;
      align-items: center;
      margin-right: 0;

      svg {
         margin-left: 14px;
         margin-top: -2px;
      }

      &:hover {
         color: var(--mf-green);

         svg path {
            fill: var(--mf-green);
         }
      }
   }

   .head-date__date.other.open {
      color: var(--mf-green);

      svg {
         transform: rotate(180deg);

         path {
            fill: var(--mf-green);
         }
      }
   }

   .head-date__date.other.select {
      color: var(--mf-green);

      svg path {
         fill: var(--mf-green);
      }
   }
}
</style>