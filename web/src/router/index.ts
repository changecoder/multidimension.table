import { createRouter, createWebHistory } from "vue-router";
import DatasheetView from "../views/datasheet-view.vue";
import DashboardView from "../views/dashboard-view.vue";
import WorkflowView from "../views/workflow-view.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/datasheet",
    },
    {
      path: "/datasheet",
      name: "datasheet",
      component: DatasheetView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/workflow",
      name: "workflow",
      component: WorkflowView,
    },
  ],
});

export default router;
