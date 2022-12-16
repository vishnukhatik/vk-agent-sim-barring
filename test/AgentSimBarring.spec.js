import { shallowMount, createLocalVue } from "@vue/test-utils";
import AgentSimBarring from "../src/components/organs/AgentSimBarring.vue";
import Vuex from "vuex";

const localVue = createLocalVue();

localVue.use(Vuex);

let wrapper;
let store;
let actions;
let mutations;
let getters;
let state;

beforeEach(() => {
  jest.clearAllMocks()
  actions = {};
  mutations = {};
  state = {
    key: {},
  };
  getters = {
    gpsMsData: jest.fn(),
  };
  store = new Vuex.Store({
    strict: true,
    modules: {
      tefAgentSimBarring: {
        namespaced: true,
        state,
        getters,
        mutations,
        actions,
      },
    },
  });

  wrapper = shallowMount(AgentSimBarring, {
    propsData: {},
    store,
    localVue,
  });
});

afterEach(() => {
  wrapper.destroy();
});

describe("AgentSimBarring.vue", () => {
  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("is a instance of SimBarring", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  test("is a Vue instance", () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });
});
