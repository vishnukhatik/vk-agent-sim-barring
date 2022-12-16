import Vue from "vue";
import scsFragment from "../src/scs-fragment.vue";
import { defaultStore } from '../src/store'

Vue.config.productionTip = false;

export function ScsAgentSimBarring(el, data) {
  const app = new Vue({
    store: defaultStore(),
    render: (h) =>
      h(scsFragment, {
        props: {
          ...data, ...{ isSfdc: true }
        },
      }),
    el,
  });
  return app;
}

// export createApp;
