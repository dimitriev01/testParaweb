import { createApp } from 'vue'
import App from './App'

/*import './assets/formulate.css'*/
import VueFormulate from '@braid/vue-formulate'

import VueFormGenerator from "vue-form-generator"
/*import 'vue-form-generator/dist/vfg.css'*/

let app = createApp(App);

app
// .use(VueFormulate)
// .use(VueFormGenerator)
    .mount('#app')