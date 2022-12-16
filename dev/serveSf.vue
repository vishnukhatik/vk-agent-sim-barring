<script>
import Vue from "vue";
import { ScsAddPayment } from "../dist/scs-addpayment-sf.esm";

export default Vue.extend({
  mounted() {
    ScsAddPayment(this.$el);
  },
});
</script>

<template>
  <div id="app"></div>
</template>
