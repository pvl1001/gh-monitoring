<template>
   <div id="app" class="wrapper">
      <Header />
<!--      <HeadDate />-->
      <Comparison />
      <router-view :to="{name: 'home'}" />
      <Loader v-if="loader"/>
   </div>
</template>

<script>

import Header from "@/components/Header";
// import HeadDate from "@/components/HeadDate";
import Comparison from "@/components/Comparison";
import Loader from "@/components/Loader";
import {mapGetters} from "vuex";

export default {
   name: 'App',
   components: {
      Header,
      // HeadDate,
      Comparison,
      Loader
   },
   computed: {
      ...mapGetters( "tableData", ['loader'] )
   }
}
</script>

<style lang="scss">
#app {
   padding-bottom: 77px;
}
</style>
