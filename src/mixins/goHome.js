export default {
   methods: {
      goHome() {
         if (this.$route.path !== '/') this.$router.push( {name: 'home'} )
      }
   }
}