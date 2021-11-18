<template>
   <div class="TestSelect">
      <v-selectize ref="vSelect"
                   @input="selectChange"
                   theme="v-select"
                   label="value"
                   v-model="selectDate"
                   :options="listDate"
      />
   </div>
</template>

<script>
import {mapMutations} from "vuex";
import goHome from "@/mixins/goHome";

export default {
   name: "TestSelect",
   data() {
      return {
         listDate: [],
         selectDate: {},
         url: 'http://localhost:3000/api',
      }
   },
   mixins: [goHome],
   methods: {
      ...mapMutations( 'tableData', ['GET_CHANGE_DATA', 'LOADER'] ),
      async selectChange() {
         this.LOADER()
         await this.axios.post( `${this.url}/changes`, this.selectDate )
            .then( res => {
               this.GET_CHANGE_DATA( [res.data, this.selectDate.value] )
            } )
            .catch( err => {
               console.log( err )
            } )
         this.goHome()
         this.LOADER()
      },
      async getListDate() { // получить список дат
         await this.axios.get( `${this.url}/getlistdate` )
            .then( res => {
               this.selectDate.value = res.data[0].value
               this.listDate = res.data
               console.log( this.listDate )
            } )
            .catch( err => console.log( err ) )
      },
      selectReadonly() {
         const vSelect = document.querySelector( '.v-select input' )
         vSelect.setAttribute( 'readonly', true )
      }
   },
   async mounted() {
      this.selectReadonly()
      await this.getListDate()
      await this.selectChange()
   }
}
</script>

<style lang="scss">
.TestSelect {
   display: flex;
   align-items: center;

   .v-select {
      .selectize-input {
         cursor: pointer;
         text-transform: lowercase;
         border-color: transparent !important;
         background: none;

         .item {
            font-size: 20px !important;
            line-height: 28px;
            font-weight: 500;
            padding-right: 25px;
         }

      }

      .option {
         color: #333;
      }

      &:hover .selectize-input.items,
      .selectize-input.items.focus,
      &:focus .selectize-input.items {
         border-color: transparent !important;

         .item {
            color: var(--mf-green);
         }
      }
   }

   &:hover {
      .custom-select:not(option) {
         color: var(--mf-green);
      }

      svg path {
         fill: var(--mf-green);
      }
   }

   &:before {
      content: url("../assets/svg/datepicker.svg");
      margin-right: 10px;
      display: inline-block;
   }
}
</style>