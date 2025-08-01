import { index, layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("layouts/App/App.tsx", [
    index("routes/Home/Home.tsx"),
    route("contact", "routes/Contact/Contact.tsx"),
  ]),
] satisfies RouteConfig;
