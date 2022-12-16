<template>
  <div-tag>
    <div class="sim-barring">
                <div class="header">
                  <span class="text-black modal__title">SIM barring</span
                  ><span class="text-black p-x-15px">MSISDN: 491795970587</span>
                </div>
                <div-tag class="p-y-12px" v-if="gpsMsData && isPayment">
                  <payment-method-list
                    :vData="gpsMsData.paymentMethodDetails"
                    :showPaymentMethods="['Direct Debit']"
                    @cardDetails="onCardDetailClick"
                    @passValue="onCheckedButton"
                    :addPaymentMethodUrl="getAemContext.sepaMandateUrl"
                    :disableRadioButton="disableRadioButton"
                  />
                </div-tag>
                <div-tag v-else>
                  <sim-barring />
                </div-tag>
                <div class="u--text-right">
                  <button
                    class="button button-border u--mr-micro-xs u--ml-micro-xs"
                  >
                    Cancel
                  </button>
                  <button
                  v-if="isPayment"
                  @click="isPayment = false"
                    class="button button-border u--mr-micro-xs u--ml-micro-xs"
                  >
                    <!-- {{isPayment ? 'Back' : 'Reset' }} -->
                    Reset
                  </button>
                  <button
                  @click="isPayment = true"
                    class="button button-default u--mr-micro-xs u--ml-micro-xs"
                  >
                    Proceed
                  </button>
                </div>
      <!-- <authenticate @authError="authError" @togglePopup="togglePopup" /> -->
    </div>
  </div-tag>
</template>

<script>
import { DivTag } from "../../../external/ui-kit.esm";
import { SimBarring } from "../molecules";
import { createNamespacedHelpers, mapActions, mapState } from "vuex"; 
const { mapGetters } = createNamespacedHelpers('tefAgentSimBarring')

import { PaymentMethodList } from "../molecules";

export default {
  components: {
    DivTag,
    SimBarring,
    PaymentMethodList
  },
  data() {
    return {
     showModal: false,
     aemStaticData: {},
     disableRadioButton: false,
     isPayment: false
    };
  },
  props: {},
  computed: {
    ...mapState(["AemStaticData","gpsData","customerID","events",]),
    ...mapGetters([
      // 'getPaymentMethods',
      'gpsMsData',
      'getAEMData',
      'getAemContext'
    ]),
  },
  mounted() {},
  created() {},
  methods: {
    ...mapActions('tefAgentSimBarring', [
      'setCurrentStepData',
      'onCardDetailClick',
    ]),

    async submitOrder() {

      //DRC Call
      const systemDate = new Date()

      const requestParams = {
        url: this.getAemContext.drcMsUrl,
        payload: {
          msisdn: this.getPhoneNumber, // this.msisdnValues[0].value,
          paymentMethodReference: this.getPaymentMethod.id,
          amount: this.getSelectedReason.rate,
          currency: 'EUR',
          paymentDate: systemDate,
          paymentUseCase: 'ON_DEMAND',
        },
      }
      
      await this.getDrcMsData(requestParams)
       if (this.drcData.data.status === 400 || this.drcData.data.errorMessage) {
          //this.errorMessages = this.drcData.data.errorMessage
           this.$store.commit("SET_API_ERROR_MSG", 'Unfortunately, your SIM swap request was unsuccessful, we are working on it. We will keep you updated.');
          //  this.$store.dispatch("setCurrentStepData", {
          //   currentStep: "apiFail"
          // });
          this.dispatchEvent(this.events.SimSwapOrderFailed, {});


          
      } else if (this.drcData.data) { 
       
          if(await this.$store.dispatch("submitOrder", this.getAemContext) ){
              this.showModal = true;
              setTimeout(() => {
                  this.showModal = false;
                  this.dispatchEvent(this.events.SimSwapOrderSuccess, {});
              }, 2000);
          }
          else{
             this.$store.commit("SET_API_ERROR_MSG", ' Unfortunately, your SIM swap request was unsuccessful, there is issue in order submission, we are working on it. We will keep you updated.');
            //  this.$store.dispatch("setCurrentStepData", {
            //   currentStep: "apiFail"
            // });
            this.dispatchEvent(this.events.SimSwapOrderFailed, {});
          } 
      }
    },


    onCardDetailClick(payload) {
      this.$emit('onCardDetails', payload);
    },
    onCheckedButton(e) {
      this.$emit('checkInputValue', e);
    }

  },
};
</script>

<style scoped lang="scss"></style>
