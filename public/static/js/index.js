import * as vue from "./vue/vueRuntimeEsmBorwser.js";

const appConf={
    data:()=>({
        rawHtml:"#initApp" 
    }),
};

const app=vue.createApp(appConf);
app.mount('#app');