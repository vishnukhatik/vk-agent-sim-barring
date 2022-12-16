<template>
  <div-tag>
    <div-tag class="sim-barring-main">
      <div-tag class="row">
        <div-tag class="col-12 col-m-3">
          <h4 class="sim-barring-title">Full Barring</h4>
          <div-tag class="text-black">SIM Full Baring : 3.50 $</div-tag>
          <div-tag class="text-black mb-4">SIM Full Unbaring : 1.99 $</div-tag>
          <div-tag class="bar-sim-card">
            <h4 class="bar-sim-title">Bar SIM card</h4>
            <tef-switch v-model="currentState"></tef-switch>
          </div-tag>
        </div-tag>
        <div-tag class="col-12 col-m-5 border-lr">
          <table class="tef-table table-responsive">
            <thead>
              <th><h4 class="sim-barring-title">Partial Barring</h4></th>
              <th><h4 class="sim-barring-title">Bar</h4></th>
              <th><h4 class="sim-barring-title">Unbar</h4></th>
            </thead>
            <tbody>
              <tr>
                <td><span class="text-black">Data Services</span></td>
              </tr>
              <tr>
                <td class="border-b">
                  <div-tag class="switch-wrap">
                    <tef-switch
                      v-model="dataServices"
                      type="radio"
                      name="data-services"
                      value="dataServices"
                      :disabled="false"
                    ></tef-switch>
                    <span class="switch-lable">All</span>
                    <InfoIcon class="cursor-pointer"
                      width="20px"
                      height="20px"
                      :item="msg"
                    />
                  </div-tag>
                </td>
                <!-- <td class="border-b"><span class="text-black">3.50 $</span></td> -->
                <td class="border-b"><span class="text-muted">Free</span></td>
                <td class="border-b"><span class="text-muted">Free</span></td>
              </tr>
              <tr>
                <td class="border-b">
                  <div-tag class="switch-wrap">
                    <tef-switch
                      v-model="dataServices"
                      type="radio"
                      name="data-services"
                      value="dataServices1"
                      :disabled="false"
                    ></tef-switch>
                    <span class="switch-lable">All in romming</span>
                    <InfoIcon class="cursor-pointer"
                      width="20px"
                      height="20px"
                      :item="msg"
                    />
                  </div-tag>
                </td>
                <td class="border-b"><span class="text-black">3.50 $</span></td>
                <td class="border-b"><span class="text-muted">Free</span></td>
                <!-- <td class="border-b"><span class="text-muted">Free</span></td> -->
              </tr>
              <tr>
                <td class="p-y-12px">
                  <span class="text-black">Incoming Calls</span>
                </td>
              </tr>
              <tr>
                <td class="border-b">
                  <div-tag class="switch-wrap">
                    <tef-switch
                      v-model="incomingCall"
                      type="radio"
                      name="incomming-call"
                      value="incomming-call"
                      :disabled="false"
                    ></tef-switch>
                    <span class="switch-lable">All</span>
                    <InfoIcon class="cursor-pointer"
                      width="20px"
                      height="20px"
                      :item="msg"
                    />
                  </div-tag>
                </td>
                <!-- <td class="border-b"><span class="text-black">3.50 $</span></td> -->
                <td class="border-b"><span class="text-muted">Free</span></td>
                <td class="border-b"><span class="text-muted">Free</span></td>
              </tr>
              <tr>
                <td class="border-b">
                  <div-tag class="switch-wrap">
                    <tef-switch
                      v-model="incomingCall"
                      type="radio"
                      name="incomming-call"
                      value="incomming-call1"
                      :disabled="false"
                    ></tef-switch>
                    <span class="switch-lable">All in romming</span>
                    <InfoIcon class="cursor-pointer"
                      width="20px"
                      height="20px"
                      :item="msg"
                    />
                  </div-tag>
                </td>
                <!-- <td class="border-b"><span class="text-black">3.50 $</span></td> -->
                <td class="border-b"><span class="text-muted">Free</span></td>
                <td class="border-b"><span class="text-muted">Free</span></td>
              </tr>
              <tr>
                <td class="p-y-12px">
                  <span class="text-black">Outgoing Calls</span>
                </td>
              </tr>
              <tr>
                <td class="border-b">
                  <div-tag class="switch-wrap">
                    <tef-switch
                      v-model="outgoingCall"
                      type="radio"
                      name="outgoing-call"
                      value="outgoing-call2"
                      :disabled="false"
                    ></tef-switch>
                    <span class="switch-lable">All</span>
                    <InfoIcon class="cursor-pointer"
                      width="20px"
                      height="20px"
                      :item="msg"
                    />
                  </div-tag>
                </td>
                <!-- <td class="border-b"><span class="text-black">3.50 $</span></td> -->
                <td class="border-b"><span class="text-muted">Free</span></td>
                <td class="border-b"><span class="text-muted">Free</span></td>
              </tr>
              <tr>
                <td class="border-b">
                  <div-tag class="switch-wrap">
                    <tef-switch
                      v-model="outgoingCall"
                      type="radio"
                      name="outgoing-call"
                      value="outgoing-call3"
                      :disabled="false"
                    ></tef-switch>
                    <span class="switch-lable">All in romming</span>
                    <InfoIcon class="cursor-pointer"
                      width="20px"
                      height="20px"
                      :item="msg"
                    />
                  </div-tag>
                </td>
                <!-- <td class="border-b"><span class="text-black">3.50 $</span></td> -->
                <td class="border-b"><span class="text-muted">Free</span></td>
                <td class="border-b"><span class="text-muted">Free</span></td>
              </tr>
              <tr>
                <td class="border-b">
                  <div-tag class="switch-wrap">
                    <tef-switch
                      v-model="outgoingCall"
                      type="radio"
                      name="outgoing-call"
                      value="outgoing-call4"
                      :disabled="false"
                    ></tef-switch>
                    <span class="switch-lable">International(???)</span>
                    <InfoIcon class="cursor-pointer"
                      width="20px"
                      height="20px"
                      :item="msg"
                    />
                  </div-tag>
                </td>
                <!-- <td class="border-b"><span class="text-black">3.50 $</span></td> -->
                <td class="border-b"><span class="text-muted">Free</span></td>
                <td class="border-b"><span class="text-muted">Free</span></td>
              </tr>
              <tr>
                <td class="p-y-12px">
                  <span class="text-black">Special Numbers</span>
                </td>
              </tr>
              <tr>
                <td class="border-b">
                  <div-tag class="switch-wrap">
                    <tef-switch
                      v-model="specialNumber"
                      type="radio"
                      name="special-number"
                      value="special-number"
                      :disabled="false"
                    ></tef-switch>
                    <span class="switch-lable"
                      >Bar - Preminum Rate Entertainment Calls</span
                    >
                    <InfoIcon class="cursor-pointer"
                      width="20px"
                      height="20px"
                      :item="msg"
                    />
                  </div-tag>
                </td>
                <!-- <td class="border-b"><span class="text-black">3.50 $</span></td> -->
                <td class="border-b"><span class="text-muted">Free</span></td>
                <td class="border-b"><span class="text-muted">Free</span></td>
              </tr>
              <tr>
                <td class="border-b">
                  <div-tag class="switch-wrap">
                    <tef-switch
                      v-model="specialNumber"
                      type="radio"
                      value="special-number2"
                      name="special-number"
                      :disabled="false"
                    ></tef-switch>
                    <span class="switch-lable">Bar - Short Codes</span>
                    <InfoIcon class="cursor-pointer"
                      width="20px"
                      height="20px"
                      :item="msg"
                    />
                  </div-tag>
                </td>
                <!-- <td class="border-b"><span class="text-black">3.50 $</span></td> -->
                <td class="border-b"><span class="text-muted">Free</span></td>
                <td class="border-b"><span class="text-muted">Free</span></td>
              </tr>
              <tr>
                <td class="border-b">
                  <div-tag class="switch-wrap">
                    <tef-switch
                      v-model="specialNumber"
                      type="radio"
                      value="special-number3"
                      name="special-number"
                      :disabled="false"
                    ></tef-switch>
                    <span class="switch-lable"
                      >Bar - Preminum info Services</span
                    >
                    <InfoIcon class="cursor-pointer"
                      width="20px"
                      height="20px"
                      :item="msg"
                    />
                  </div-tag>
                </td>
                <!-- <td class="border-b"><span class="text-black">3.50 $</span></td> -->
                <td class="border-b"><span class="text-muted">Free</span></td>
                <td class="border-b"><span class="text-muted">Free</span></td>
              </tr>
            </tbody>
          </table>
        </div-tag>
        <div-tag class="col-12 col-m-4">
          <table class="tef-table table-responsive">
            <thead>
              <th><h4 class="sim-barring-title">3rd Party Barring</h4></th>
              <th><h4 class="sim-barring-title">Bar</h4></th>
              <th><h4 class="sim-barring-title">Unbar</h4></th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in partyBarring" :key="index">
                <td :class="index == 0 ? 'pb-30px' : 'border-b'">
                  <div-tag class="switch-wrap">
                    <tef-switch
                      v-model="item.value"
                      :value="item.value"
                      :disabled="false"
                      @input="barAll(item)"
                    ></tef-switch>
                    <span class="switch-lable">{{ item.name }}</span>
                    <InfoIcon class="cursor-pointer"
                      width="20px"
                      height="20px"
                      :item="msg"
                      outline
                    />
                  </div-tag>
                </td>
                <td :class="index == 0 ? 'pb-30px' : 'border-b'">
                  <span :class="item.bar == 'Free' ? 'text-muted' : 'text-black'">{{ item.bar }}</span>
                </td>
                <td :class="index == 0 ? 'pb-30px' : 'border-b'">
                  <span :class="item.unbar == 'Free' ? 'text-muted' : 'text-black'">{{ item.unbar }}</span>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- <h2>Active</h2>
        <div-tag class="switch-wrap">
          <tef-switch v-model="currentState"></tef-switch>
          <span class="switch-lable">All</span>
          <InfoIcon width="20px" height="20px" v-tooltip.right="msg" />
        </div-tag> -->
        </div-tag>
      </div-tag>
    </div-tag>
    <div-tag class="row border-t p-y-12px">
      <div-tag class="col-12 col-m-4 offset-m-1">
        <table class="tef-table table-responsive">
          <tbody>
            <tr v-if="false">
              <td class="border-b p-y-12px">
                <span class="text-black">Data Services - All in roaming</span>
              </td>
              <td class="border-b p-y-12px">
                <span class="text-black">Barring</span>
              </td>
              <td class="border-b p-y-12px">
                <span class="text-black">Free</span>
              </td>
            </tr>
            <tr v-if="false">
              <td class="border-b p-y-12px">
                <span class="text-black">Outgoing Calls - International</span>
              </td>
              <td class="border-b p-y-12px">
                <span class="text-black">Unbarring</span>
              </td>
              <td class="border-b p-y-12px">
                <span class="text-black">2.00 $</span>
              </td>
            </tr>
            <tr>
              <td class="border-b p-y-12px">
                <span class="text-black">ICCID : 8949226173305966505</span>
              </td>
              <td class="border-b p-y-12px p-x-15px">
                <span class="text-black">{{ currentState === true ? 'Full Barring' : 'Full Unbaring'}}</span>
              </td>
              <td class="border-b p-y-12px">
                <span class="text-black">{{ currentState === true ? 3.50 : 1.99 }} $</span>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colspan="2" class="p-y-12px">
                <span class="text-black">Total</span>
              </th>
              <th class="p-y-12px"><span class="text-black">{{ currentState === true ? 3.50 : 1.99 }} $</span></th>
            </tr>
          </tfoot>
        </table>
      </div-tag>
    </div-tag>
  </div-tag>
</template>
<script>
import { DivTag } from "../../../external/ui-kit.esm";
import TefSwitch from "./TefSwitch.vue";
import InfoIcon from "../molecules/InfoIcon.vue";

export default {
  name: 'SimBarringComponent',
  components: {
    DivTag,
    "tef-switch": TefSwitch,
    InfoIcon,
  },
  props: {},
  computed: {},
  data() {
    return {
      demoText: "hello",
      currentState: true,
      dataServices: '',
      incomingCall: '',
      outgoingCall: '',
      specialNumber: '',
      msg: "Ongoing call in roaming. Tooltip text. the box height will shift depending on your character count.",
      partyBarring: [
        {
          name: "Bar All",
          info: true,
          value: false,
          bar: "Free",
          unbar: "Free",
        },
        {
          name: "Subscriptions",
          info: true,
          value: false,
          bar: "Free",
          unbar: "Free",
        },
        {
          name: "Erotic content",
          info: true,
          value: true,
          bar: "Free",
          unbar: "Free",
        },
        {
          name: "Appstore / software",
          info: true,
          value: true,
          bar: "Free",
          unbar: "Free",
        },
        {
          name: "Entertainment",
          info: true,
          value: false,
          bar: "Free",
          unbar: "Free",
        },
      ],
      partialBarring: [
        {
          title: "Data Services",
          child: [
            {
              name: "All",
              info: true,
              value: true,
              bar: "3.50 $",
              unbar: "Free",
            },
            {
              name: "All in roaming",
              info: true,
              value: true,
              bar: "Free",
              unbar: "Free",
            },
          ],
        },
        {
          title: "Incoming Calls",
          child: [
            {
              name: "All",
              info: true,
              value: true,
              bar: "3.50 $",
              unbar: "Free",
            },
            {
              name: "All in roaming",
              info: true,
              value: true,
              bar: "Free",
              unbar: "Free",
            },
          ],
        },
        {
          title: "outgoing Calls",
          child: [
            {
              name: "All",
              info: true,
              value: true,
              bar: "3.50 $",
              unbar: "Free",
            },
            {
              name: "All in roaming",
              info: true,
              value: true,
              bar: "Free",
              unbar: "Free",
            },
            {
              name: "International(???)",
              info: true,
              value: true,
              bar: "Free",
              unbar: "Free",
            },
          ],
        },
        {
          title: "Special Numbers",
          child: [
            {
              name: "Bar - Preminum Rate Entertainment Calls",
              info: true,
              value: true,
              bar: "3.50 $",
              unbar: "Free",
            },
            {
              name: "Bar - Short Codes",
              info: true,
              value: true,
              bar: "Free",
              unbar: "Free",
            },
            {
              name: "Bar - Preminum info Services",
              info: true,
              value: true,
              bar: "Free",
              unbar: "Free",
            },
          ],
        },
      ],
    };
  },
  mounted() {},
  methods: {
    barAll(value) {
      console.log('value', value);
      this.partyBarring.filter((item, index)=> {
        if(value.name == 'Bar All') {
          // console.log('item', item);
          const data = {
            ...item,
            value: value.value ? true : false
          }
          this.$set(this.partyBarring, index, data)
        }
      })
      // console.log('this.partyBarring', this.partyBarring);
    }
  },
};
</script>
