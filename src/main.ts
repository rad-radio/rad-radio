import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'virtual:windi.css'
import './index.css'
import { VueDapp } from 'vue-dapp'
import VueCountdown from '@chenfengyuan/vue-countdown';

const app = createApp(App)

app.use(router)
app.use(VueDapp, {
  infuraId: '1c7ce1644b5b46f5a19028f13de996e4',
  appName: "rad-radio",
})
app.component(VueCountdown.name, VueCountdown);

app.mount('#app')
