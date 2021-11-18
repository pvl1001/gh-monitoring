<template>
   <header class="header">
      <div @click="goHome" class="header__title">
         Мониторинг конкурентов
      </div>
   </header>
</template>

<script>
import goHome from '../mixins/goHome'
export default {
   name: "Header",
   mixins: [goHome]
}
</script>

<style lang="scss" scoped>
.header {
   padding: 23px 0;

   .header__title {
      font-size: 18px;
      font-weight: 500;
      color: var(--mf-green);
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      letter-spacing: 0.36px;

      &:before {
         content: url('../assets/svg/logo.svg');
         margin-right: 12px;
         transform: translateY(2px);
      }
   }
}
</style>