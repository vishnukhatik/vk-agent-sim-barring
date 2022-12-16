import Vue from 'vue';
import normalComponent from './serve.vue';
// import sfComponent from './serveSf.vue';
import { defaultStore } from '../src/store'
Vue.config.productionTip = false;

new Vue({
  render: (h) => {
    const uri = window.location.search.substring(1);
    const params = new URLSearchParams(uri);
    const mode = params.get("mode")
    // if (mode && mode.toLocaleLowerCase() === 'sf')
    //   return h(sfComponent);
    return h(normalComponent)
  },
  store: defaultStore()
}).$mount('#app');
