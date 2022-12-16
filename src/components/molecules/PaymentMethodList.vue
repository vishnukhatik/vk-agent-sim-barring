<template>
  <div-tag class="payment-method">
    <div class="row">
      <div class="col-12">
        <div>
          <div class="card" v-for="cardDetail in cardPayMethods" :key="cardDetail.id">
            <div class="card__header">
              <div class="card__header__radio form-group-radiobutton">
                <input
                  :id="cardDetail.id"
                  type="radio"
                  name="iban"
                  :disabled="!cardDetail.showPay || disableRadioButton"
                  @click="onClickPaymentMethod(cardDetail)"
                />
                <label :for="cardDetail.id">{{ cardDetail.title }}</label>
              </div>
            </div>
          </div>
        </div>
        <div v-if="cardDetailSpliced">
          <div class="card" v-for="cardDetail in cardDetailSpliced" :key="cardDetail.id">
            <div v-if="selectedCard === 'iban' && directDebitCard" class="card-detail">
              <div class="card-detail__field form-group-input">
                <label for="iban">{{ debitCreditCardLabel }}*</label>
                <input
                  v-model="cardDetail.details.directDebit.iban"
                  :id="cardDetail.id"
                  type="text"
                  placeholder="IBAN"
                  class="
                    card-detail__form-control card-detail__form-control--disable
                  "
                  disabled
                />
              </div>
              <div class="card-detail__view-more">
                <span
                  class="card-detail__view-more__link"
                  @click="onClickMoreDetails(cardDetail)"
                >
                  {{ aemData.viewMoreDetailLabel }}
                </span>

                <div v-if="moreDetails && cardDetailsId === cardDetail.id" class="card-detail__view-more__text">
                  <div class="row">
                    <div class="col-4 offset-3">
                      <strong>{{ aemData.summaryBankNameLabel }}</strong>
                    </div>
                    <div class="col-5">
                      {{ cardDetail.details.directDebit.bankName }}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-4 offset-3">
                      <strong>{{ aemData.summaryBankAccountOwner }}</strong>
                    </div>
                    <div class="col-5">
                      {{ cardDetail.details.directDebit.bankAccountOwner }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <tef-v-modal :show="showModal" @onClose="onCloseModal" size="small">
      <div slot="header">
        <h3>Payment Method Missing</h3>
      </div>
      <div slot="body">
        <p>
          You do not have Direct Debit Payment method setup, please <br />
          <a :href="addPaymentMethodUrl">Setup Direct Debit</a> and try again
        </p>
      </div>
      <div slot="footer">
        <button
          class="button button-default--prio-warning"
          @click="onCloseModal"
        >
          Close
        </button>
      </div>
    </tef-v-modal> -->
    <div>
      <transition>
        <div class="modal" v-if="showModal">
          <div class="modal__backdrop "/>
            <div class="modal__dialog">
                <div class="modal__header">
                    <div class="header">
                      <h3>Payment Method Missing</h3>
                    </div>
                    <div class="close-container">
                        <tef-icon icon="cross" size="l" @click="onCloseModal"/>
                    </div>
                </div>

                <div class="modal__body">
                    <div class="body">
                      <p>
                        You do not have Direct Debit Payment method setup, please <br />
                        <a :href="addPaymentMethodUrl">Setup Direct Debit</a> and try again
                      </p>
                    </div>
                </div>

                <div class="modal__footer">
                    <div class="footer">
                      <button
                        class="button button-default--prio-warning"
                        @click="onCloseModal"
                      >
                        Close
                      </button>
                    </div>
                </div>
            </div>
        </div>
      </transition>
    </div>
  </div-tag>
</template>
<script>
import { mapState } from "vuex";
import { DivTag } from '../../../external/ui-kit.esm';
// import { TefVModal } from "@mfe/ui-kit";
export default {
  components: {
    DivTag,
    // SpanTag,
    // TefVModal,
  },
  data() {
    return {
      selectedCard: "iban",
      debitCreditCardLabel: "Direct Debit",
      moreDetails: false,
      cardDetailsId: '',
      directDebitCard: false,
      disablePaymentCard: true,
      paymentMethodArray: [],
      showModal: false,
      cardStaticData: [
        {
          id: 1,
          title: 'Credit/Debit Card',
          value: 'creditDebitCard'
        },
        {
          id: 2,
          title: 'PayPal',
          value: 'PayPal'
        },
        {
          id: 3,
          title: 'Direct Debit',
          value: 'DirectDebit'
        },
      ],
      cardPayMethods: [],
    };
  },
  props: {
    vData: {
      type: Array,
      default() {
        return [];
      }
    },
    showPaymentMethods: {
      type: Array,
      default() {
        return []
      }
    },
    addPaymentMethodUrl: {
      type: String,
      default() {
        return ''
      }
    },
    disableRadioButton: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  computed: {
    ...mapState('tefAgentSimBarring', ["aemData"]),
    cardDetailSpliced: function () {
      const iterateArray = this.cardStaticData.map((el) => {
        if ((el.value == 'Direct Debit') || (el.value == 'DirectDebit')) {
          el.showPay = true;
        }
        else el.showPay = false;
      })
      this.cardPayMethods = this.cardStaticData;
      if (this.vData.length > 0) {
        const emptyArray = [];
        const vDataArray = this.vData[0];
        this.paymentMethodArray = vDataArray;
        emptyArray.push(vDataArray);
        return emptyArray;
      }
      return [];
    }
  },
//   mounted() {
//     console.log('vData=>', this.vData);
//     console.log('disableRadioButton=>', this.disableRadioButton);
//     console.log('addPaymentMethodUrl=>', this.addPaymentMethodUrl);
//     console.log('showPaymentMethods=>', this.showPaymentMethods);

// },
  methods: {
    onClickMoreDetails(cardDetails) {
      this.cardDetailsId = cardDetails.id;
      this.moreDetails = !this.moreDetails;
    },
    onClickPaymentMethod(e) {
      if (this.vData.length > 0) {
        this.$emit('cardDetails', this.paymentMethodArray);
        this.directDebitCard = true;
        this.showModal = false;
        this.$emit("passValue", e)
      } else {
        this.showModal = true;
        this.directDebitCard = false;
      }
    },
    onCloseModal() {
      this.showModal = false;
    }
  },
};
</script>
<style scoped lang="scss">
// .payment-method {
//   padding: 0;
//   margin-top: 40px;
//   margin-bottom: 50px;
// }
.mar0 {
  margin: 0;
}
.card {
  &__header {
    padding: var(--layout-spacing--macro-s) var(--layout-sizing--size-m);
    background-color: var(--color-neutrals--neutral-200);
    border: 1px solid var(--color-neutrals--neutral-300);
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__icon {
      width: var(--layout-sizing--size-m);
    }
  }
}
.card-detail {
  padding: var(--layout-spacing--micro-l);
  background: var(--color-neutrals--white);
  border: 1px solid var(--color-neutrals--neutral-300);
  border-top: 0;
  &__field {
    margin-bottom: var(--layout-spacing--micro-m);
    &--noMarginBottom {
      margin-bottom: 0;
    }
  }
  &__form-control {
    width: 70%;
    display: block;
    background-color: var(--color-neutrals--white);
    border: 1px solid var(--color-neutrals--neutral-100);
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    line-height: 1.8;
    box-sizing: border-box;
    height: 44px;
    margin-top: var(--layout-spacing--micro-xxs);
    &--disable {
      color: var(--color-neutrals--neutral-300);
    }
  }
  &__view-more {
    width: 70%;
    text-align: center;
    border: 1px solid var(--color-neutrals--neutral-200);
    border-radius: 0.25rem;
    &__link {
      font-size: var(--typography-fontsize--copy-3-mobile);
      cursor: pointer;
      margin: var(--layout-spacing--micro-xs) 0;
      display: block;
    }
    &__text {
      padding: var(--layout-spacing--micro-m) 0 var(--layout-spacing--micro-l);
      text-align: left;
      font-size: var(--typography-fontsize--copy-3);
      .row {
        padding: var(--layout-spacing--micro-xxs) 0;
        .text-right {
          text-align: right;
        }
      }
    }
  }
}
.payment-summary {
  padding-bottom: var(--layout-spacing--micro-s);
  border-bottom: 1px solid var(--color-signal--text-1);
  &__title {
    margin: 0 0 var(--layout-sizing--size-m);
  }
  .row {
    padding: var(--layout-spacing--micro-xxs) 0;
  }
}
.modal {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 9999; // OCCL value for Modal, but the token is not recognized/found.
      overflow-x: hidden;
      overflow-y: auto;

      &__backdrop {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
      }
      &__dialog {
        position: absolute;
        background-color: var(--color-neutrals--white);
        margin: auto;
        display: flex;
        flex-direction: column;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 600px;
        @media screen and (max-width: 1024px) {
          width: 90%;
          top: 3%;
          left: 50%;
          transform: translate(-50%, 0%);
        }
      }
      &__close {
          width: 30px;
          height: 30px;
      }
      &__header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 20px 30px 10px;
          .close-container {
              cursor: pointer;
          }
      }
      &__body {
          padding: 10px 30px 10px;
          overflow: visible;
      }
      &__footer {
          padding: 30px 30px 20px;
      }
  }
</style>
