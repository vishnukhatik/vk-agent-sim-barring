<script>
import vue from "vue";
import ScsAgentSimBarring from "../src/scs-fragment.vue";
import '../src/plugins/v-tooltip'



export default vue.extend({
  name:'App',
  components: {
    ScsAgentSimBarring,
  },
  methods:{
  }
});
</script>
<template>
  <div id="app">
    <scs-agent-sim-barring
      :aemDictURL="'https://e2e1-raitt.high-2.raitmm02-test.aws.de.pri.o2.com/content/dam/raittcore/en/contentfragments/swap-your-sim/swap-sim.tefmodel.json'"
      :occlBaseURL="'https://library.telefonica.de/2/v1.17.2'"
      :channelId="'SELF_CARE'"
      :piURL="'https://customer-portfolio-dev1.ms.high-2.raitmm02-dev.aws.de.pri.o2.com/v1/simSwapPortfolio'"
      :simMgntURL="'https://sim-management-dev1.ms.high-2.raitmm02-dev.aws.de.pri.o2.com/v1/simInformation'"
      :isSfdc="true"
      :customerId="'C-01941'"
      :customerDetailApi="'https://customer-portfolio-ct2.ms.high-2.raitmm02-test.aws.de.pri.o2.com/v1/simSwapPortfolio'"
      :catalogDetailApi="'https://purchase-payment-ct1.ms.high-2.raitmm02-test.aws.de.pri.o2.com/v1/entities/simswap'"
      :orderApi="'https://cart-ct1.ms.high-2.raitmm02-test.aws.de.pri.o2.com/v1/composite/quoteConfigureSubmitOrder'"
      :paymentMethodAEM="'https://ortelmobile-ct1-raitt.high-2.raitmm02-test.aws.de.pri.o2.com/content/dam/ortel-mobile/de/en/content-fragments/top-up-direct-debit.tefmodel.json'"
      :msURL="'https://payment-ct1.ms.high-2.raitmm02-test.aws.de.pri.o2.com/v1/paymentMethod/details/customerId'"
      :sepaMandateUrl="'https://ct1-www.ortelmobile.de/content/ortelmobile/de/en/user/payment-methods.html'"
      :events="{'SimBarringCancel': 'SimBarringCancel', 
              'SimBarringOrderFailed': 'SimBarringOrderFailed', 'SimBarringOrderSuccess': 'SimBarringOrderSuccess'}"
      :brandName="'Blau'"
    />
  </div>
</template>
