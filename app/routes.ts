import { layout, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  layout("routes/main/layout.tsx", [
    route("", "routes/main/home.tsx"),
    route("protected", "routes/protected.tsx"),
    route("demo", "routes/form-demo.tsx"),
    route("editor", "routes/editor.tsx"),
    route("preview", "routes/preview.tsx"),
  ]),

  layout("routes/auth/layout.tsx", [
    route("sign-in/*", "routes/auth/sign-in.tsx"),
    route("sign-up/*", "routes/auth/sign-up.tsx"),
  ]),
  layout("routes/portal/layout.tsx", [
    route("portal", "routes/portal/index.tsx"),
  ]),
] satisfies RouteConfig;
