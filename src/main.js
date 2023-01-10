import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import router from './router'

loadFonts()

createApp(App).use(router).use(Quasar, quasarUserOptions)
  .use(vuetify,{rtl:true})
  .mount('#app')
