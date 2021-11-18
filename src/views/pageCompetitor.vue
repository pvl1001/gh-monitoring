<template>
   <div class="Table page-competitors">
      <div class="Table__type-region">
         <BtnBack/>

         <div>
            <div class="Table__type" :class="table.type === 'FMC' ? '_FMC' : '_SHPD'">
               {{ table.type }}/{{ region }}
            </div>
            <div v-for="(city) of cities" :key="city" class="Table__region" ref="rowCity">
               <span>{{ city }}</span>
            </div>
         </div>
      </div>

      <div v-for="competitor of competitors" :key="competitor.name" class="Table__competitor">
         <div class="Table__competitor-head"
              :class="competitor.name === 'Ростелеком' ? '_rostelecom'
              : competitor.name === 'МТС' ? '_mts'
              : competitor.name === 'Билайн' ? '_beeline'
              : competitor.name === 'Дом.ру' ? '_domru' : ''">
            {{ competitor.title }}
         </div>
         <div class="Table__competitor-body" ref="rowCompetitor">
            <div v-for="city of cities" :key="city" class="Table__region">

               <div v-for="templ of template" :key="templ.status">
                  <div v-if="changedData(city, competitor.name, templ.status).length">
                     <tippy v-for="data of changedData( city, competitor.name, templ.status )"
                            :key="data.id"
                            :placement="tippyPlacement(competitor.name)"
                            :theme="tippyTheme(competitor.name)"
                            :delay="[300, 0]"
                            :duration="0"
                            offset="0,-13"
                            flip="false"
                            maxWidth="none"
                            arrow
                     >
                        <template v-slot:trigger>
                           <div class="icon-wrapp" @click="$modal.show('ModalMoreDetails', data)">
                              <div :class="'icon ' + templ.classStatus" :id="'disabled-wrapper' + data.id">
                                 {{ data.tarifName }}
                              </div>
                           </div>
                        </template>
                        <TableTooltip :data="data"/>
                     </tippy>

                  </div>
               </div>

            </div>
         </div>
      </div>

      <ModalMoreDetails/>
   </div>
</template>


<script>
import {mapGetters, mapMutations, mapState} from "vuex";
import BtnBack from "@/components/BtnBack";
import TableTooltip from "@/components/TableTooltip";
import ModalMoreDetails from "@/components/ModalMoreDetails";

export default {
   name: 'pageCompetitor',
   components: {
      BtnBack,
      TableTooltip,
      ModalMoreDetails
   },
   data() {
      return {
         region: null,
         dataRoute: null,
         title: null,
         competitorsData: null,
         table: null,
         template: [
            {status: 'New tariff', classStatus: '_add'},
            {status: 'Tariff closed', classStatus: '_del'},
            {status: 'Changes detected', classStatus: '_update'},
         ]
      }
   },
   computed: {
      ...mapState( 'tableData', ['competitors', 'bodyTable'] ),
      ...mapGetters( 'tableData', ['changedData', 'routeData', 'cities'] ),
      tippyPlacement() {
         return (competitor) => {
            return competitor === 'Билайн' ? 'top-center'
               : competitor === 'Дом.ру' ? 'top-end' : 'top-start'
         }
      },
      tippyTheme() {
         return (competitor) => {
            return competitor === 'Билайн' ? 'light light-3' : 'light'
         }
      },
      competitorColor() {
         return (name) => {
            if (name === 'Ростелеком') return '#5B09C0'
            if (name === 'Билайн') return '#FFDF8E'
            if (name === 'МТС') return '#CC061A'
            if (name === 'Дом.ру') return '#C32228'
         }
      },
      changedData() {
         return (city, name, status) => {
            return this.dataRoute.filter( el => {
               if (el.status === status
                  && el.isp === name
                  && el.location === city
               ) return el
            } )
         }
      }
   },
   methods: {
      ...mapMutations( 'tableData', ['SET_LOCAL_STORAGE', 'FILTER_CITIES'] ),
      setHeightRowTable() {
         let arrRowHeight = []
         this.$refs.rowCompetitor.forEach( (arrBlock) => {

            new Promise( resolve => {
               if (arrRowHeight.length) {
                  arrBlock.childNodes.forEach( (el, index) => {
                     if (el.clientHeight > arrRowHeight[index]) {
                        arrRowHeight[index] = el.clientHeight
                     }
                  } )
               } else {
                  arrBlock.childNodes.forEach( el => {
                     arrRowHeight.push( el.clientHeight )
                  } )
               }
               resolve()
            } )
               .then( () => {
                  arrBlock.childNodes.forEach( (el, index) => {
                     el.style.height = arrRowHeight[index] + 'px'
                  } )
               } )
               .then( () => { //
                  this.$refs.rowCompetitor[0].childNodes.forEach( (el, index) => {
                     this.$refs.rowCity[index].style.height = el.clientHeight + 1 + 'px'
                  } )
               } )

         } )

      },
      getData() {
         this.region = JSON.parse( localStorage.region )
         this.dataRoute = JSON.parse( localStorage.dataRoute )

         const page = this.competitors.find( el =>
            this.$route.params.block + '-' + el.name === this.$route.params.block + '-' + this.$route.params.name )
         if (page) this.competitorsData = page

         const table = this.bodyTable.find( el => el.nameEn === this.$route.params.block )
         if (table) this.table = table
      },
   },
   created() {
      this.getData()
      this.FILTER_CITIES( this.dataRoute[0] )
   },
   mounted() {
      this.setHeightRowTable()
   }

}
</script>

<style lang="scss" scoped>
$itemHeight: 57px;

.Table {
   display: flex;

   .icon {
      display: inline-flex;
      justify-content: flex-start;
      padding: 0 10px;
      margin: 0 0 0 -10px;
      height: $itemHeight;
   }

   &__type-region {
      max-width: 228px;
      width: 100%;
      font-size: 15px;
      font-weight: 500;
      line-height: $itemHeight;
      margin-right: 24px;
      margin-top: 65px;
   }

   &__type {
      background-color: #EDEDED;
      padding: 0 13px;
      height: $itemHeight - 2;
      margin: 1px 0;
   }

   &__type._FMC {
      border-left: 6px solid var(--mf-green);
      background-color: rgba(0, 185, 86, .1);
      color: #4DB955;
   }

   &__type._SHPD {
      border-left: 6px solid var(--mf-fiolet);
      background-color: rgba(115, 25, 130, .1);
      color: var(--mf-fiolet);
   }

   &__region {
      padding-left: 47px;
      border-bottom: 1px solid #EDEDED;
      min-height: $itemHeight;
      display: flex;
      flex-wrap: wrap;

      span {
         position: relative;
         z-index: -1;
      }

      &:last-child {
         border-bottom: none;
      }
   }

   &__competitor {
      flex: 0 1 285px;
      border-radius: 10px;
      overflow: hidden;
      margin-right: 16px;

      &:last-child {
         margin-right: 0;
      }
   }

   &__competitor-head {
      font-size: 20px;
      font-weight: 500;
      line-height: 64px;
      color: #fff;
      position: relative;

      &:before {
         position: absolute;
         left: 17px;
         top: 4px;
      }
   }

   &__competitor-head._rostelecom {
      background-color: #5B09C0;
      padding-left: 43px;

      &:before {
         content: url('../assets/svg/rostelecom.svg');
      }
   }

   &__competitor-head._mts {
      background-color: #CC061A;
      padding-left: 46px;

      &:before {
         content: url('../assets/svg/mts-logo.svg');
      }
   }

   &__competitor-head._beeline {
      background-color: #FFDF8E;
      color: #333333;
      padding-left: 53px;

      &:before {
         content: url('../assets/svg/beeline.svg');
      }
   }

   &__competitor-head._domru {
      background-color: #C32228;
      padding-left: 60px;

      &:before {
         content: url('../assets/svg/domru.svg');
      }
   }

   &__competitor-body &__region {
      display: block;
      justify-content: center;
      padding-left: 0;

      &:nth-child(7),
      &:nth-child(8) {
         border-bottom: none;
      }
   }

   &__competitor-body &__region.hover-row:before {
      margin: -1px -18px;
   }

   &__competitor-body {
      padding: 58px 18px 28px;
      background-color: #F6F6F6;
      position: relative;
      z-index: 0;
   }

   .hover-row {
      position: relative;

      &:before {
         content: '';
         display: block;
         top: 0;
         left: 0;
         right: 0;
         bottom: 0;
         position: absolute;
         background-color: #EDEDED;
         z-index: -1;
      }

   }

   .icon-wrap {
      display: flex;
      flex-direction: column;
   }

}

</style>