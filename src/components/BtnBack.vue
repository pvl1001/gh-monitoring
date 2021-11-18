<template>
   <div class="BtnBack">
      <div @click="$router.go(-1)">
         <svg xmlns="http://www.w3.org/2000/svg" width="29.401" height="15.36" viewBox="0 0 29.401 15.36">
            <defs></defs>
            <g transform="translate(-790.5 -156.772)">
               <path class="a" d="M0,0,7.388,6.952,0,13.9" transform="translate(811.054 157.5)"/>
               <line class="a" x2="28" transform="translate(790.5 164.5)"/>
            </g>
         </svg>
         Назад
      </div>
   </div>
</template>

<script>
export default {
   name: "BtnBack"
}
</script>

<style lang="scss" scoped>
.BtnBack {
   height: 64px;
   margin-top: -64px;
   color: var(--mf-blue);
   font-size: 18px;
   display: flex;
   align-items: center;

   > div {
      display: flex;
      align-items: center;
      cursor: pointer;

   }

   svg {
      margin-right: 13px;
      transform: rotateY(180deg);
      .a {
         fill: none;
         stroke: var(--mf-blue);
         stroke-width: 2px;
      }
   }
}
</style>