<template>
   <div class="Loader">
      <div class="Loader__block">
         <div class="Loader__round">
            <div class="Loader__round-border"></div>
         </div>
         <p>Загрузка</p>
      </div>
   </div>
</template>

<script>
export default {
   name: "Loader"
}
</script>

<style lang="scss" scoped>
.Loader {
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: #00000050;
   color: #fff;
   z-index: 100;

   &__block {
      width: 140px;
      margin: 0 auto;
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
   }

   &__round {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 66px;
      width: 66px;
      position: relative;
      margin-bottom: 15px;
   }

   &__round-border {
      position: absolute;
      left: 0;
      top: 0;
      height: 66px;
      width: 66px;
      border-radius: 50%;
      border: 13px solid #F2F2F2;
      animation: loader 2s linear infinite;

      &:before {
         content: '';
         display: block;
         position: absolute;
         top: -13px;
         left: 13px;
         height: 13px;
         width: 13px;
         border-radius: 50%;
         background-color: var(--mf-green);
      }
   }

   p {
      font-weight: 500;
   }

   @keyframes loader {
      from {
         transform: rotate(0);
      }

      to {
         transform: rotate(360deg);
      }
   }

}
</style>