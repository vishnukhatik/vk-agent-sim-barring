# tef-agent-sim-barring

# Import Project in Package.json

    "dependencies": {
        "@mfe/tef-agent-sim-barring": "^0.0.1" # Please select the latest version,
        "v-tooltip": "2.1.3",
    },

# create one folder with name plugins in root folder
    # create two files with name v-tooltip.js

    In v-tooltip.js put below code
>         import Vue from 'vue';
>         import VTooltip from 'v-tooltip'
>         Vue.use(VTooltip)


# In nuxt.config.js, add below build transpile and plugins

>   build: {
>        transpile: ['@mfe/tef-agent-sim-barring']
>   },
>   plugins: [
>       { src: "@/plugins/v-tooltip.js", mode: "client" },
>   ],


# Import in component 

    import ScsQrCode from '@mfe/tef-agent-sim-barring/dist/tef-agent-sim-barring.esm'
    import '@mfe/tef-agent-sim-barring/src/style.scss';

    # Calling Component in .vue file


    <scs-agent-sim-barring
     :customerId="'C-00584'"
      :aemDictURL="'https://e2e1-raitt.high-2.raitmm02-test.aws.de.pri.o2.com/content/dam/raittcore/en/contentfragments/swap-your-sim/swap-sim.tefmodel.json'"
      :occlBaseURL="'https://library.telefonica.de/2/v1.17.2'"
      :channelId="'SELF_CARE'"
      :piURL="'https://customer-portfolio-dev1.ms.high-2.raitmm02-dev.aws.de.pri.o2.com/v1/simSwapPortfolio'"
      :simMgntURL="'https://sim-management-dev1.ms.high-2.raitmm02-dev.aws.de.pri.o2.com/v1/simInformation'"
      :isSfdc="true"
    />

# Implementation for component store 
    1. Create a folder in store with name 'tefAgentSimBarring' 
    2. Create index.js in store/tefAgentSimBarring/
    3. Add the below code in store/tefAgentSimBarring/index.js

    import { state, actions, getters, mutations } from '@mfe/tef-agent-sim-barring/dist/tef-agent-sim-barring.esm'
    export { state, actions, getters, mutations }

