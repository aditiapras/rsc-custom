import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route('sign-in/*', 'routes/auth/sign-in.tsx'),
  route('sign-up/*', 'routes/auth/sign-up.tsx'),
  route("protected", "routes/protected.tsx")
] satisfies RouteConfig;
