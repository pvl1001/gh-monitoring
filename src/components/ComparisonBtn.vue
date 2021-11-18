<template>
   <div class="comparison__btn"
        @click="showWin = !showWin"
        :class="{'select': showWin}"
   >
      <svg xmlns="http://www.w3.org/2000/svg" width="19.896" height="19.307" viewBox="0 0 19.896 19.307">
         <g transform="translate(0.25 0.354)">
            <path class="a"
                  d="M7.385,22v6.235A.693.693,0,0,0,8,28.922l.081,0h15.24a.693.693,0,0,0,.688-.612l0-.081V22H25.4v6.235a2.078,2.078,0,0,1-1.956,2.075l-.122,0H8.078A2.078,2.078,0,0,1,6,28.356l0-.122V22Z"
                  transform="translate(-6 -11.609)"/>
            <g transform="translate(3.82 0)">
               <path class="b" d="M19,8h1.385V21.162H19Z" transform="translate(-13.815 -7.307)"/>
               <path class="b" d="M23.271,12.878l-.98.98-4.9-4.9-4.9,4.9-.98-.98L17.393,7Z"
                     transform="translate(-11.515 -7)"/>
            </g>
         </g>
      </svg>

      <div class="comparison__btn-window" :class="{'d-block': showWin}">
         <p>Экспорт в Excel</p>
         <a :href="'/uploads/changes/' + linkDate + '.xlsx'">Тарифы конкурентов</a>
         <a href="/uploads/mf/megafon_tariffs.xlsx">Тарифы МегаФон</a>
      </div>
   </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
   name: "ComparisonBtn",
   data() {
      return {
         showWin: false,
      }
   },
   methods: {
      close(e) {
         const btn = document.querySelector( '.comparison__btn' )
         if (!btn.contains( e.target )) this.showWin = false
      }
   },
   computed: {
      ...mapGetters("tableData", ['selectDate']),
      linkDate() {
         return this.selectDate.split('.').join('_')
      }
   },
   filters: {
      linkDate(val) {
         console.log(val)
         return val
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

<style lang="scss" scoped>
.comparison__btn {
   user-select: none;
   width: 48px;
   height: 48px;
   border-radius: 50%;
   cursor: pointer;
   background-color: #EDEDED;
   display: flex;
   align-items: center;
   justify-content: center;
   margin-left: auto;
   position: relative;
   z-index: 10;

   &:hover {
      background-color: var(--mf-green-select);

      svg path {
         fill: #fff
      }
   }

   .comparison__btn-window {
      display: none;
      width: 254px;
      padding: 23px 17px 24px;
      position: absolute;
      top: 62px;
      right: 0;
      background-color: #fff;
      box-shadow: 0 3px 15px #00000045;
      cursor: default;

      p {
         font-weight: 500;
         margin-bottom: 18px;
      }

      a {
         display: inline-block;
         margin-bottom: 18px;

         &:last-child {
            margin-bottom: 0;
         }
      }
   }
}

.select {
   background-color: var(--mf-green-select);

   svg path {
      fill: #fff;
   }
}
</style>