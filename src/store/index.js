import Vue from "vue";
import Vuex from "vuex";
import url from "../static/url";
Vue.use(Vuex);

// const https = require("https");
// const agent = new https.Agent({
//   rejectUnauthorized: false
// });


export const defaultStore = () => {
  return new Vuex.Store({
    strict: true,
    modules:{
      tefAgentSimBarring:{
        namespaced: true,
        state,
        getters,
        mutations,
        actions
      }
    }
  })
}

export const state = () => {
  console.log("New state")
  return {
    AemI18nData: {},
    aemData: {},
    Props: {},
    AemStaticData: {},
    PiStaticData: {},
    EpcStaticData: {},
    PIDetails: {},
    currentStep: "agentSimBarring", //"ScanQr", //"simBarring",
    gpsData: {},
    aemContext: {},
    customerID: '',
    events: {}
  }
} 

export const mutations = {
  SET_AEM_I8N: (state, data) => {
    state.AemI18nData = data;
  },
  SET_AEM_DATA: (state, data) => {
    state.aemData = data;
  },
  SET_GPS_DATA: (state, data) => {
    state.gpsData = data;
  },
  SET_PI_STATIC: (state, data) => {
    state.PiStaticData = data;
  },
  SET_STEP_DATA: (state, data) => {
    state.currentStep = data;
  },
  SET_AEM_STATIC: (state, data) => {
    state.AemStaticData = data;
  },
  SET_PROPS: (state, data) => {
    state.Props = data;
  },
  SET_AEM_CONTEXT: (state, data) => {
    state.aemContext = data;
  },
  SET_PI_DATA: (state, data) => {
    state.PIDetails = data;
  },
  SET_SELECTED_MSISDN_DATA: (state, data) => {
    state.isMsisdnSelected = data;
  },
  SET_CUSTOMER_ID: (state, data) => {
    state.customerID = data;
  },
  // SET_SIM_MNGT_DATA: (state, data) => {
  //   state.simMgmt = data;
  // },
  SET_GPS_MS_DATA: (state, data) => {
    state.gpsData = data
  },
  SET_EVENTS: (state, data) => {
    state.events = data;
  },
};

export const getters = {
  aemData: state => state.aemData,
  getStaticData: state => state.gpsData,
  getStep: state => state.currentStep,
  getAEMstatic: state => state.AemStaticData,
  // getSimMgmt: state => state.simMgmt,
  getProps: state => state.Props,
  getPiDetails: state => state.PIDetails,
  gpsMsData: state => state.gpsData,
  getAemContext: state => state.aemContext,
  getCustomerId: state => state.customerID,
};

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    const paymentMethods = await this.$axios.$get(`/api/staticMockData`);
    commit("SET_GPS_DATA", paymentMethods);
    const aemData = await this.$axios.$get(`/api/AemI18nData?lang=en`);
    commit("SET_AEM_STATIC", aemData);

  },
  setCurrentStepData({ commit }, data) {
    commit("SET_STEP_DATA", data);
  },
  setSelectedMsisdnData({ commit }, data) {
    commit("SET_SELECTED_MSISDN_DATA", data);
  },
  async getSimManagementDetails({ commit }, req) {
    const options = {
      method: "get",
    };
    // const res = await (await fetch(`${url.simManagement}?spid=${req.spid}&uiccids=${req.iccid}&requestType=All`, options)).json();
    // console.log(res);
    // if (res.SIMInformations.length > 0) {
    //   commit("SET_SIM_MANAGEMENT", res.SIMInformations[0]);
    // }
  }
};
