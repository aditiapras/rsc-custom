import { UserButton } from "@clerk/react-router";
import { getAuth } from "@clerk/react-router/server";
import { redirect } from "react-router";
import type { Route } from "./+types/protected";

export async function loader(args: Route.LoaderArgs) {
  const { userId } = await getAuth(args);

  if (!userId) {
    return redirect("/sign-in");
  }

  return null;
}

export default function Protected() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      Protected
      <UserButton />
    </div>
  );
}
