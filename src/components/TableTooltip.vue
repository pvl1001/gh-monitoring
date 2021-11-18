<template>
   <div class="TableTooltip">
      <div class="TableTooltip__block" v-for="(item) of tooltip" :key="item.title">
         <p class="TableTooltip__key">{{ item.title }}</p>
         <p v-if="item.value" :style="{color: colorText(item.changes)}" class="TableTooltip__value">
            {{ item.value }}
            <span v-if="item.value">{{ value( item.title, item.value ) }}</span></p>
         <p v-else :style="{color: colorText(item.changes)}" class="TableTooltip__value">—</p>
         <p v-if="item.changes && item.changes.before === ''"
            class="TableTooltip__value ModalMoreDetails__old-value">Нет</p>
         <p v-if="item.changes" class="TableTooltip__value TableTooltip__value_old">{{ item.changes.before }}
            <span v-if="item.changes.before">{{ value( item.title, item.value ) }}</span></p>
      </div>
   </div>
</template>

<script>
export default {
   name: "TableTooltip",
   props: ['data'],
   data() {
      return {
         tooltip: {}
      }
   },
   created() {
      try {
         this.tooltip = [
            {
               title: "Абон. плата",
               value: this.data.subscriptionfee,
               changes: this.data.changes.subscriptionfee
            },
            {
               title: "АП со скидкой",
               value: this.data.subscriptionfeePromo,
               changes: this.data.changes.subscriptionfeePromo
            },
            {
               title: "Скорость",
               value: this.data.wiredSpeed,
               changes: this.data.changes.wiredSpeed
            },
            {
               title: "Каналы",
               value: this.data.tvChannels,
               changes: this.data.changes.tvChannels
            },
            {
               title: "Минуты",
               value: this.data.minutes,
               changes: this.data.changes.minutes
            },
            {
               title: "Смс",
               value: this.data.sms,
               changes: this.data.changes.sms
            },
            {
               title: "Моб. инт.",
               value: this.data.mobileInternet,
               changes: this.data.changes.mobileInternet
            },
            {
               title: "Роутер",
               value: this.data.router,
               changes: this.data.changes.router
            },
            {
               title: "Приставка",
               value: this.data.tvBox,
               changes: this.data.changes.tvBox
            },
         ]
      } catch (err) {
         console.log( 'Ошибка свойства json changes \n', err )
      }
   },
   computed: {
      value() {
         return (title, value) => {
            let val = value.toString().toLowerCase()
            return title === 'Абон. плата'
            || title === 'АП со скидкой'
            || title === 'Приставка'
            || title === 'Роутер' ? ' ₽/мес' :
               title === 'Скорость' ? ' Мбит/c' :
                  title === 'Моб. инт.' && val !== 'безлимит' ? ' Гб' : ''
         }
      },
      colorText() {
         return text => {
            return text ? 'var(--mf-green)' : ''
         }
      },
   },
}
</script>

<style lang="scss">
.tooltip.b-tooltip {
   opacity: 1;
   top: 10px !important;
}

.bs-tooltip-right .arrow:before {
   border-width: .6rem .6rem .6rem 0;
   top: -2px;
}

.bs-tooltip-left .arrow:before {
   border-width: .6rem 0 .6rem .6rem;
   top: -2px;
}

.bs-tooltip-top .arrow {
   margin: 0 1.85rem !important;

   &:before {
      border-top-color: #fff !important;
      border-width: .7rem .5rem 0 !important;
   }
}

.TableTooltip {
   display: flex;

   .tooltip-inner {
      font-family: 'MegaFon Graphik LC', sans-serif;
      display: flex;
      flex-wrap: nowrap;
      max-width: none;
      text-align: left;
      padding: 13px 27px 8px;
      border-radius: 0;
      box-shadow: 0 2px 9px #00000026;
      background-color: #fff !important;
   }

   &__block {
      margin-right: 20px;
      line-height: 24px;

      &:last-child {
         margin-right: 0;
      }
   }

   &__key {
      white-space: nowrap;
      font-size: 15px;
      color: #919191;
   }

   &__value {
      font-size: 15px;
      font-weight: 500;
      color: #333;

      &_old {
         text-decoration: line-through;
      }
   }
}

</style>