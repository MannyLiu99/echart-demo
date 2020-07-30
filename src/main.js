import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// UI框架 element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import echarts from "echarts";
// 公共样式
import "@/styles/global.scss";

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;

Vue.use(ElementUI);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
