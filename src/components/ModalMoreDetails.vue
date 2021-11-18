<template>
   <modal name="ModalMoreDetails"
          classes="ModalMoreDetails"
          @before-open="beforeOpen"
          @before-close="beforeClose"
          width="100%"
          height="820"
          transition="none"
          overlayTransition="none"
   >
      <button class="close" @click="$modal.hide('ModalMoreDetails')"></button>

      <div class="ModalMoreDetails__container">
         <div class="ModalMoreDetails__logo"
              :class="data.isp === 'Ростелеком' ? '_rostelecom'
              : data.isp === 'МТС' ? '_mts'
              : data.isp === 'Билайн' ? '_beeline'
              : data.isp === 'Дом.ру' ? '_domru' : ''"
         >
            <span v-if="data.isp !== 'Дом.ру'">{{ data.isp }}</span>
            <span v-else>ДОМ.RU</span>
         </div>

         <div class="ModalMoreDetails__tariff-name"
              :class="{update: checkHasTarifName}">
            {{ data.tarifName }}
            <p v-if="checkHasTarifName"
               class="ModalMoreDetails__tariff-name ModalMoreDetails__tariff-name_change">
               {{data.changes.tarifName.before}}
            </p>
         </div>

         <div class="ModalMoreDetails__tariff-data">
            <div v-for="(item) of dataTariff"
                 :key="item.title"
                 :class="{update: item.changes}"
                 class="ModalMoreDetails__tariff-data-row"
            >
               <div class="ModalMoreDetails__tariff-data-key">{{ item.title }}</div>
               <div class="ModalMoreDetails__tariff-data-value">
               <span v-if="item.changes" class="ModalMoreDetails__old-value">
                  {{ item.changes.before }}
                  <span v-if="item.changes.before">{{ value( item.title, item.value ) }}</span></span>
                  <span v-if="item.changes && item.changes.before === ''" class="ModalMoreDetails__old-value">Нет</span>
                  <span :style="{color: colorText(item.changes)}">{{ item.value }}
                  <span v-if="item.value">{{ value( item.title, item.value ) }}</span></span>
               </div>
            </div>
         </div>
      </div>

   </modal>
</template>

<script>
export default {
   name: "ModalMoreDetails",
   data() {
      return {
         data: {},
         dataTariff: {}
      }
   },
   computed: {
      checkHasTarifName() {
         if(typeof this.data.changes === 'object') {
            // eslint-disable-next-line no-prototype-builtins
            return this.data.changes.hasOwnProperty( 'tarifName' )
         }
         return false
      },
      value() {
         return (title, value) => {
            let val = value.toString().toLowerCase()
            return title === 'Абонентская плата'
            || title === 'АП со скидкой'
            || title === 'Приставка'
            || title === 'Роутер' ? ' ₽/мес' :
               title === 'Скорость проводного интернета' ? ' Мбит/c' :
                  title === 'Мобильный интернет' && val !== 'безлимит' ? ' Гб' : ''
         }
      },
      colorText() {
         return (text) => {
            return text ? 'var(--mf-green)' : ''
         }
      },
   },
   methods: {
      beforeOpen(event) {
         document.querySelector('body').classList.add('modal-open')
         this.data = event.params
         this.dataTariff = [
            {title: "Дата", value: this.data.date, changes: this.data.changes.date},
            {title: "Регион NBN", value: this.data.regionNbn, changes: this.data.changes.regionNbn},
            {title: "Филиал МФ", value: this.data.regionMf, changes: this.data.changes.regionMf},
            {title: "Регион МФ", value: this.data.branchMf, changes: this.data.changes.branchMf},
            {title: "Локация", value: this.data.location, changes: this.data.changes.location},
            {title: "Тип услуг", value: this.data.serviceType, changes: this.data.changes.serviceType},
            {title: "Тип тарифа", value: this.data.tarifType, changes: this.data.changes.tarifType},
            {title: "Абонентская плата", value: this.data.subscriptionfee, changes: this.data.changes.subscriptionfee},
            {
               title: "АП со скидкой",
               value: this.data.subscriptionfeePromo,
               changes: this.data.changes.subscriptionfeePromo
            },
            {title: "Условия акции", value: this.data.termsPromo, changes: this.data.changes.termsPromo},
            {title: "Скорость проводного интернета", value: this.data.wiredSpeed, changes: this.data.changes.wiredSpeed},
            {title: "Каналы", value: this.data.tvChannels, changes: this.data.changes.tvChannels},
            {title: "Минуты", value: this.data.minutes, changes: this.data.changes.minutes},
            {title: "Смс", value: this.data.sms, changes: this.data.changes.sms},
            {title: "Мобильный интернет", value: this.data.mobileInternet, changes: this.data.changes.mobileInternet},
            {title: "Роутер", value: this.data.router, changes: this.data.changes.router},
            {title: "Приставка", value: this.data.tvBox, changes: this.data.changes.tvBox},
            {title: "ID", value: this.data.id, changes: this.data.changes.id},
            {title: "Технология подключения", value: this.data.technologyType, changes: this.data.changes.technologyType},
            {title: "Тип телевидения", value: this.data.tvType, changes: this.data.changes.tvType},
         ]

      },
      beforeClose() {
         document.querySelector('body').classList.remove('modal-open')
      }
   }
}
</script>

<style lang="scss">
.ModalMoreDetails {
   padding: 60px 115px;
   max-width: 1130px;
   margin: 0 auto;
   position: relative;

   .update:before {
      content: url('../assets/svg/update.svg');
      position: absolute;
      margin: 5px 0 0 -31px;
   }

   button.close {
         position: absolute;
         right: 26px;
         top: 23px;
         font-size: 0;
         padding: 0;
         margin: 0;
         width: 20px;
         height: 20px;
         background: url('../assets/svg/close.svg') 0 / contain no-repeat;
         opacity: 1;

         &:hover {
            opacity: 1;
         }
      }

   &__container {
      padding: 0 0 0 32px;
      margin-left: -32px;
      overflow: auto;
      height: 100%;
      position: relative;

      // firefox
      scrollbar-color: #DDDDDD #EDEDED; /* «цвет ползунка» «цвет полосы скроллбара»*/
      scrollbar-width: thin; /* толщина */

      &::-webkit-scrollbar {
         width: 6px; /* ширина для вертикального скролла */
         background-color: #EDEDED;
         margin-right: -15px;
         position: absolute;
         right: 0;
      }

      /* ползунок скроллбара */
      &::-webkit-scrollbar-thumb {
         background-color: #DDDDDD;
         height: 350px;
         width: 6px;
         margin-right: -15px;
      }

      &::-webkit-scrollbar-thumb:hover {
         background-color: #333333;
      }
   }

   &__logo {
      width: 173px;
      height: 44px;
      font-size: 20px;
      line-height: 28px;
      color: #fff;
      display: flex;
      align-items: center;
      margin-bottom: 35px;
      font-weight: 500;

      &:before {
         padding: 8px 8px 0 17px;
      }
   }

   &__logo._rostelecom {
      background-color: #5B09C0;

      &:before {
         content: url('../assets/svg/rostelecom.svg');
      }
   }

   &__logo._mts {
      background-color: #CC061A;

      &:before {
         content: url('../assets/svg/mts-logo.svg');
      }
   }

   &__logo._beeline {
      background-color: #FFDF8E;
      color: #333333;

      &:before {
         content: url('../assets/svg/beeline.svg');
      }
   }

   &__logo._domru {
      background-color: #C32228;

      &:before {
         content: url('../assets/svg/domru.svg');
      }
   }

   &__tariff-name {
      font-size: 32px;
      line-height: 40px;
      font-weight: 700;
      margin-bottom: 17px;

      &.update:before {
         margin: 0 0 0 -31px;
      }

      &_change {
         font-size: 20px;
         text-decoration: line-through;
      }
   }

   &__tariff-data-row {
      display: flex;
      justify-content: space-between;
      font-size: 15px;
      line-height: 56px;
      font-weight: 500;
      border-bottom: 1px solid #EDEDED;

      &:last-child {
         border: 0;
      }
   }

   &__tariff-data {
      padding-right: 44px;
   }

   &__tariff-data-value {
      font-size: 18px;
   }

   &__old-value {
      text-decoration: line-through;
      margin-right: 15px;
   }
}
</style>