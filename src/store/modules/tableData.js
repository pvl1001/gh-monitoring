export default {
   namespaced: true,

   state: {
      loader: false,
      selectDate: '',
      changes: [],
      cities: [],
      competitors: [
         {
            name: 'Ростелеком',
            title: 'Ростелеком',
            img: 'RGB_RT_logo-horizontal_main_ru.svg',
            cities: [
               'Дмитров',
               'Дубна',
               'Железнодорожный',
               'Зеленоград',
               'Клин',
               'Королев',
               'Лобня',
               'Люберцы',
               'Москва',
               'Раменское',
               'Серпухов',
               'Тверь',
            ]
         },
         {
            name: 'МТС',
            title: 'МТС',
            img: 'mts-logo.svg',
            cities: [
               'Белоярский',
               'Екатеринбург',
               'Новый Уренгой',
               'Нягань',
               'Сургут',
               'Ханты-Мансийск',
               'Югорск',
            ]
         },
         {
            name: 'Билайн',
            title: 'Билайн',
            img: 'beeline.svg',
            cities: [
               'Дмитров',
               'Дубна',
               'Железнодорожный',
               'Зеленоград',
               'Клин',
               'Королев',
               'Лобня',
               'Люберцы',
               'Москва',
               'Раменское',
               'Серпухов',
               'Тверь',
            ]
         },
         {
            name: 'Дом.ру',
            title: 'ДОМ.RU',
            img: 'domru.svg',
            cities: ['Находка']
         },
      ],
      bodyTable: [
         {
            type: 'FMC',
            nameEn: 'FMC',
            groups: [
               {region: 'УФО'},
               {region: 'ЦФО'},
               {region: 'ПФО'},
               {region: 'ДВФО'},
               {region: 'МиМО'},
               {region: 'СЗФО'},
               {region: 'ЮФО'},
            ],
         },
         {
            type: 'ШПД',
            nameEn: 'SHPD',
            groups: [
               {region: 'УФО'},
               {region: 'ЦФО'},
               {region: 'ПФО'},
               {region: 'ДВФО'},
               {region: 'МиМО'},
               {region: 'СЗФО'},
               {region: 'ЮФО'},
            ],
         },

      ]
   },
   getters: {
      loader(state) {
         return state.loader
      },
      selectDate(state) {
         return state.selectDate
      },
      changes(state) {
         return state.changes
      },
      cities(state) {
         return state.cities
      },
      changedData(state) { // данные на домашней странице
         return (type, competitor, region, status) => {

            return state.changes.filter( (el ) => {

               let serviceType = el.serviceType.split( ' + ' )
               if (el.isp === competitor
                  && el.regionNbn === region
                  && el.status === status
                  && (
                     serviceType[serviceType.length - 1] === 'Мобильная связь' && type === 'FMC'
                     || serviceType[serviceType.length - 1] !== 'Мобильная связь' && type !== 'FMC'
                  )
               ) return el

            } )

         }
      },
      routeData(state) { // данные на подробной странице
         return (type, competitor, region) => {

            return state.changes.filter( el => {

               let serviceType = el.serviceType.split( ' + ' )
               if (el.regionNbn === region
                  && (
                     serviceType[serviceType.length - 1] === 'Мобильная связь' && type === 'FMC'
                     || serviceType[serviceType.length - 1] !== 'Мобильная связь' && type !== 'FMC'
                  )
               ) return el

            } )
         }
      }

   },
   mutations: {
      LOADER(state) {
         state.loader = !state.loader
      },
      GET_CHANGE_DATA(state, [changes, selectDate]) {
         changes.map(el => {
            if(el.regionNbn !== 'МиМО') el.regionNbn = el.regionNbn.toUpperCase()
         })
         state.changes = changes
         state.selectDate = selectDate
      },
      FILTER_CITIES(state, data) {
         let cities = []
         state.changes.forEach( el => {
            if (el.regionNbn === data.regionNbn
            ) cities.push( el.location )
         } )
         state.cities = [...new Set( cities )]
      },
      SET_LOCAL_STORAGE(state, {dataRoute, region}) {
         localStorage.dataRoute = JSON.stringify(dataRoute)
         localStorage.region = JSON.stringify(region)
      },
   }
}