<template>
   <div class="Table">
      <div class="Table__type-region">
         <div v-for="table of bodyTable" :key="table.type">
            <div class="Table__type"
                 :class="table.type === 'FMC' ? '_FMC' : '_SHPD'">
               {{ table.type }}
            </div>
            <div v-for="group of table.groups" :key="group.region"
                 class="Table__region">
               <span>{{ group.region }}</span>
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
         <div v-for="table of bodyTable" :key="table.type" class="Table__competitor-body">
            <div class="Table__region"
                 v-for="group of table.groups" :key="group.region">

               <ul class="Table__icons">
                  <li v-for="templ of template" :key="templ.status"
                      @click="goPageCompetitor('pageCompetitor',
                                  table.nameEn,
                                  competitor.name,
                                  group.region,
                                  routeData( table.type, competitor.name, group.region ))"
                  >
                     <span v-if="changedData(table.type, competitor.name, group.region, templ.status).length"
                           :class="'icon ' + templ.classStatus">
                        {{ changedData( table.type, competitor.name, group.region, templ.status ).length }}
                     </span>
                  </li>
               </ul>

            </div>
         </div>
      </div>

   </div>
</template>


<script>
import {mapGetters, mapMutations, mapState} from "vuex";

export default {
   name: 'Table',
   data() {
      return {
         template: [
            {status: 'Tariff closed', classStatus: '_del'},
            {status: 'New tariff', classStatus: '_add'},
            {status: 'Changes detected', classStatus: '_update'},
         ]
      }
   },
   computed: {
      ...mapState( 'tableData', ['competitors', 'bodyTable'] ),
      ...mapGetters( 'tableData', ['changedData', 'routeData'] ),
      competitorColor() {
         return (name) => {
            if (name === 'Ростелеком') return '#5B09C0'
            if (name === 'Билайн') return '#FFDF8E'
            if (name === 'МТС') return '#CC061A'
            if (name === 'Дом.ру') return '#C32228'
         }
      },
   },
   methods: {
      ...mapMutations( 'tableData', ['SET_LOCAL_STORAGE'] ),
      goPageCompetitor(name, block, link, region, dataRoute) {
         this.SET_LOCAL_STORAGE( {dataRoute, region} )
         this.$router.push( {name, params: {block, name: link, region, dataRoute}} )
      },
   },

}
</script>

<style lang="scss" scoped>
$itemHeight: 57px;

.Table {
   display: flex;

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
      color: #919191;
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
      height: $itemHeight;
      display: flex;
      align-items: center;

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
      display: flex;
      align-items: center;
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

      &:nth-child(2) {
         padding: 58px 18px 0;
      }
   }

   &__icons {
      display: flex;
      margin-right: -30px;

      li {
         cursor: pointer;
      }
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
}


</style>