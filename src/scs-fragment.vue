<template>
 <div-tag :classes="'container-fluid'">
    <link
      v-if="brandCssLink"
      rel="stylesheet"
      :href="brandCssLink"
      type="text/css"
    />
    <script :src="occlIconComponentLink" type="module"></script>
    <script :src="occlLink" type="module"></script>
    <script :src="occlLoaderComponentLink" type="module"></script>
    <script :src="occlTooltipComponentLink" type="module"></script>
      
      
    <keep-alive>
      <component :is="currentView"></component>
    </keep-alive>
 </div-tag>
</template>


  
<script>
import vue from "vue";


import { DivTag, SpanTag, ButtonTag } from "../external/ui-kit.esm";
vue.config.ignoredElements = ["tef-article", "tef-collapsible", "tef-icon"];
import { createNamespacedHelpers, mapActions } from "vuex";
const { mapGetters, mapState } = createNamespacedHelpers("tefAgentSimBarring");
import { AgentSimBarring } from "./components/organs";
import AemI18nDataEN from "./data/aemStaticMockDataEN.json";

import './style.scss';
//import { CustomerPlan, PaymentMethods } from './components/organs';
// import Vuetify from "./plugin";
export default {
  name: 'ScsAgentSimBarring',
  components: {
    AgentSimBarring,
    DivTag,
  },
  computed: {
    brandCssLink() {
      return `${this.occlBaseURL}/components/theme/bundle.css`
    },
    occlTooltipComponentLink() {
      return `${this.occlBaseURL}/components/tooltip/bundle.js`
    },
    occlLink() {
      return `${this.occlBaseURL}/library/vendors.js`
    },
    brandId() {
      return this.brand || 2;
    },
    
    occlIconComponentLink() {
      return `${this.occlBaseURL}/components/icon/bundle.js`
    },
    occlLoaderComponentLink() {
      return `${this.occlBaseURL}/components/loader/bundle.js`
    },
    currentView() {
      if (
          typeof this.currentStep  === 'object' &&
          !Array.isArray(this.currentStep ) &&
          this.currentStep  !== null
      ) {
        return JSON.parse(JSON.stringify(this.currentStep)).currentStep;
      }
      return this.currentStep
        ? this.currentStep
        : this.currentComponent;
    },

    ...mapState(["currentStep"]),
    ...mapGetters({
      getStep: "getStep",
      aemData: "aemData"
    }),
    
  },
  mounted() {
    this.currentComponent = this.currentStep;

  },
  data: function () {
     return {
      currentComponent: "",
      aemContext: {},
    };
  },

  props: {
    aemDictURL: {
      type: String,
      default: '',
    },
    occlBaseURL: {
      type: String,
      default: '',
    },
    catalogDetailApi: {
      type: String,
      default: ''
    },
    channelId: {
      type: String,
      default: ''
    },
    customerDetailApi: {
      type: String,
      default: ''
    },
    orderApi: {
      type: String,
      default: ''
    },
    msURL: {
      type: String,
      default: '',
    },
    piURL: {
      type: String,
      default: ''
    },
    paymentMethodAEM: {
      type: String,
      default: ''
    },
    sepaMandateUrl: {
      type: String,
      default: ''
    },
    isSfdc: {
      type: Boolean,
      default: true,
    },
    customerId: {
      type: String,
      default: '',
    },
    events: {
      type: Object,
      default: {}
    }
  },
  fetchOnServer: true,
  
  async fetch() {
    const options = {
        method: 'get',
    }
    const call = await (await fetch(`${this.aemDictURL}`, options)).json()
    switch (call.status) {
      case 400:
        const msg = call.errorMessage[0];
        break;
      default:
        this.$store.commit("tefAgentSimBarring/SET_AEM_DATA", call);
        break;
    }
    const option = {
      method: 'get',
      // params: { id: Storage.getItem(Storage.KEYS.CUSTOMER_ID) },
      params: {
        customerId: this.customerId,
      },
      headers: {
        Accept: 'application/json',
        channelId: 'SELF_CARE',
        redirect: 'follow',
      },
    }
    const gpsData = await (await fetch(`${this.msURL}/?id=${option.params.customerId}`, option)).json();
    // console.log('gps', gpsData.paymentMethodDetails[0]);
    this.disableRadioButton = false;
    switch (gpsData.status) {
      case 400:
        const msg = gpsData.errorMessage[0];
        console.log(msg)
        break;
      default:
        this.$store.commit("tefAgentSimBarring/SET_GPS_MS_DATA", gpsData);
        break;
    }

  },  
  methods: {
    ...mapActions('tefAgentSimBarring', []),
    errorRule(errorMessages) {
      errorMessages.map((error) => {
        const splitValue = error.split('=')
        this.errorMessages[splitValue[0]] = splitValue[1]
        return this.errorMessages[splitValue[0]]
      })
    }
    
  },

  async created() {
    console.log("tefAgentSimBarring");
    this.$store.commit("tefAgentSimBarring/SET_CUSTOMER_ID", this.customerId);
    console.log("customerID", this.customerId);
    let aemContext = {
      'customerDetailApi': this.customerDetailApi,
      'catalogDetailApi': this.catalogDetailApi,
      'orderApi': this.orderApi,
      'sepaMandateUrl': this.sepaMandateUrl,
      'paymentMethodAEM': this.paymentMethodAEM,
      'msURL': this.msURL,
    }
    this.$store.commit("tefAgentSimBarring/SET_AEM_CONTEXT", aemContext); 
    console.log('aemContext=>',aemContext);
    console.log(1);
    if (this.isSfdc) await this.$options.fetch.call(this);
    console.log(2);
    this.$store.commit("tefAgentSimBarring/SET_AEM_STATIC", AemI18nDataEN);
    console.log(AemI18nDataEN);
    let Props = {
      "customerId": this.customerId,
      "piURL": this.piURL,
      "simMgntURL": this.simMgntURL,
      "phoneNumber": this.phoneNumber,
      
    }
    this.$store.commit("tefAgentSimBarring/SET_PROPS", Props);
    this.$store.commit("tefAgentSimBarring/SET_EVENTS", this.events);
  },

  
};

</script>
<style lang="scss" scoped>
.container-fluid {
    padding-right: 20px;
    padding-left: 20px;
    margin-right: auto;
    margin-left: auto;
}
</style>

