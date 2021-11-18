<template>
   <div class="Comparison">
<!--      <DoubleDatepicker/>-->
      <TestSelect />

      <div class="Comparison__arrow"></div>

      <div class="Comparison__options">
         <div class="Comparison__options_plus">{{ allStatus | filterStatus('New tariff') }} тариф новый</div>
         <div class="Comparison__options_minus">{{allStatus | filterStatus('Tariff closed')}} тарифа закрыто</div>
         <div class="Comparison__options_update">{{allStatus | filterStatus('Changes detected')}} тарифа обновлено</div>
      </div>

      <ComparisonBtn/>

   </div>
</template>

<script>
import ComparisonBtn from "@/components/ComparisonBtn";
// import DoubleDatepicker from "@/components/DoubleDatepicker";
import {mapGetters} from "vuex";
import TestSelect from "@/components/TestSelect";

export default {
   name: "Comparison",
   components: {
      ComparisonBtn,
      // DoubleDatepicker,
      TestSelect
   },
   filters: {
      filterStatus(changes, status) {
         let arr = changes.filter((item) => item.status === status )
         return arr.length
      }
   },
   computed: {
      ...mapGetters('tableData', ['changes']),
      allStatus() {
         return this.$route.path === '/' ? this.changes : JSON.parse( localStorage.dataRoute )
      }
   }

}
</script>

<style lang="scss" scoped>
.Comparison {
   //padding: 28px 0 42px;
   padding: 0 0 42px;
   display: flex;
   align-items: center;
   position: relative;

   &__arrow {
      width: 28px;
      height: 14px;
      background: url('../assets/svg/arrow.svg') center / contain no-repeat;
      margin: 0 32px;
   }

   &__options {
      display: flex;
      align-items: center;

      > div {
         display: flex;
         align-items: center;
         margin-right: 25px;

         &:last-child {
            margin-right: 0;
         }

         &:before {
            margin-top: 6px;
            margin-right: 6px;
         }
      }
   }

   &__options_plus:before {
      content: url("../assets/svg/plus.svg");
   }

   &__options_minus:before {
      content: url("../assets/svg/minus.svg");
   }

   &__options_update:before {
      content: url("../assets/svg/update.svg");
   }

}
</style>