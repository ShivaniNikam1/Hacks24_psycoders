import Dashboard from "./views/Dashboard";
import CheckProfile from "./views/CheckProfile";
import LocateUs from "./views/LocateUs";
import Tasks from "./views/Tasks";
var routes = [
  {
    path: "/dashboard",
    name: "Insights",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/tasks",
    name: "Tasks",
    icon: "nc-icon nc-diamond",
    component: Tasks ,
    layout: "/admin",
  },
  {
    path: "/locate-us",
    name: "Locate Us",
    icon: "nc-icon nc-pin-3",
    component: LocateUs ,
    layout: "/admin",
  },
  {
    path: "/check-profile",
    name: "Check Profile",
    icon: "nc-icon nc-pin-3",
    component: CheckProfile ,
    layout: "/admin",
  },
];
export default routes;
