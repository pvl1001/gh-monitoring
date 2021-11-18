<template>
   <div class="comparison-calendar">
      <div class="comparison__calendar"
           :class="{'open': showPicker, 'disabled': String(datepicker) !== String(dateArr[0])}"
           @click="showPicker = !showPicker">
         {{dateFrom | dateFormat('DD MMMM YYYY')}} к {{dateTo | dateFormat('DD MMMM YYYY')}}
         <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6">
            <path id="Многоугольник_1" data-name="Многоугольник 1" d="M6,0l6,6H0Z"
                  transform="translate(12 6) rotate(180)" fill="#333"/>
         </svg>
      </div>
      <div v-if="showPicker" class="double-datepicker">
         <div class="double-datepicker__header"></div>
         <div class="double-datepicker__datepickers">
            <div v-for="(item, index) in datepickers" :key="index" class="double-datepicker__datepicker">
               <div :class="'datepicker__header datepicker__header_' + index">{{ item.title }}</div>
               <datepicker input-class="d-none"
                           :calendar-class="'datepicker-' + index"
                           :language="ru"
                           monday-first
                           full-month-name
                           inline
                           v-model="dateModel[index]"
               />
            </div>
         </div>
         <div class="double-datepicker__btn btn" @click="compare">Сравнить</div>
      </div>
   </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import {ru} from "vuejs-datepicker/dist/locale";
import {mapGetters} from "vuex";

export default {
   name: "DoubleDatepicker",
   components: {
      Datepicker,
   },
   data() {
      return {
         dateFrom: new Date(),
         dateTo: new Date(),
         dateModel: [],
         showPicker: false,
         ru: ru,
         datepickers: [
            {title: 'Данные на:'},
            {title: 'Сравнение с:'},
         ]
      }
   },
   computed: {
      ...mapGetters('headDate', [
         'datepicker',
         'dateArr'
      ])
   },
   methods: {
      compare() {
         this.dateFrom = this.dateModel[0]
         this.dateTo = this.dateModel[1]
         this.showPicker = false
      },
      close(e) {
         const el = document.querySelector( '.comparison-calendar' )
         if(!el.contains(e.target)) this.showPicker = false
      }
   },
   mounted() {
      window.addEventListener( "click", this.close )
   },
   beforeDestroy() {
      window.removeEventListener( 'click', this.close )
   }
}
</script>

<style lang="scss">

.comparison-calendar {

   .comparison__calendar {
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      cursor: pointer;
      text-transform: lowercase;

      svg {
         margin-left: 7px;
         margin-top: -6px;
      }

      &:hover:not(.double-datepicker__datepicker) {
         color: var(--mf-green);

         svg path {
            fill: var(--mf-green);
         }
      }

      &:before {
         content: url("../assets/svg/datepicker.svg");
         margin-right: 10px;
         display: inline-block;
         transform: translateY(6px);
      }

   }

   .comparison__calendar.disabled {
      pointer-events: none;

      svg {
         visibility: hidden;
      }
   }

   .comparison__calendar.open:not(.double-datepicker__datepicker) {
      color: var(--mf-green);

      svg {
         transform: rotate(180deg);

         path {
            fill: var(--mf-green);
         }
      }
   }

   .double-datepicker {
      position: absolute;
      top: 76px;
      left: 36px;
      box-shadow: 0 3px 15px #00000045;
      background-color: #fff;
      padding-bottom: 29px;
      z-index: 10;
      user-select: none;

      .vdp-datepicker {
         padding: 0 6px;

         .cell.day,
         .cell.day-header {
            font-size: 13px;
         }

         header .next:after {
            border: 5px solid transparent;
            border-left: 7px solid #000;
         }

         header .prev:after {
            border: 5px solid transparent;
            border-right: 7px solid #000;
         }

         header .up {
            font-size: 15px;
         }
      }

      .datepicker-1 {
         .cell.day.selected {
            background-color: var(--mf-fiolet) !important;
         }
      }

      .double-datepicker__datepickers {
         display: flex;
         margin-bottom: 11px;
      }

      .vdp-datepicker__calendar {
         box-shadow: none;
         border: 0;
      }

      .datepicker__header {
         height: 32px;
         display: flex;
         align-items: center;
         justify-content: center;
         color: #fff;
         font-size: 15px;
         font-weight: 500;
         margin-bottom: 15px;
      }

      .datepicker__header_0 {
         background-color: var(--mf-green);
      }

      .datepicker__header_1 {
         background-color: var(--mf-fiolet);
      }

      .double-datepicker__btn {
         margin-left: 22px;
      }
   }

   .datepicker-1 {
      .cell:not(.blank):not(.disabled).day:hover {
         background-color: var(--mf-fiolet-select);
      }
   }
}

</style>