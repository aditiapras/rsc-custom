import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("sign-in/*", "routes/auth/sign-in.tsx"),
  route("sign-up/*", "routes/auth/sign-up.tsx"),
  route("protected", "routes/protected.tsx"),
  route("demo", "routes/form-demo.tsx"),
  route("editor", "routes/editor.tsx"),
  route("preview", "routes/preview.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
] satisfies RouteConfig;
