import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/pages";
import LineA from "@/pages/type-line/LineA";
import LineB from "@/pages/type-line/LineB";
import LineC from "@/pages/type-line/LineC";
import PieA from "@/pages/type-pie/PieA";
import CalendarA from "@/pages/type-calendar/CalendarA";

Vue.use(VueRouter);

// 通用路由
export const constRoutes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/line-a",
    name: "line-a",
    component: LineA,
  },
  {
    path: "/line-b",
    name: "line-b",
    component: LineB,
  },
  {
    path: "/line-c",
    name: "line-c",
    component: LineC,
  },
  {
    path: "/pie-a",
    name: "pie-a",
    component: PieA,
  },
  {
    path: "/calendar-a",
    name: "calendar-a",
    component: CalendarA,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: constRoutes,
});

export default router;
