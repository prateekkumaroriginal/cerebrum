import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";

const Page = async () => {
  await requireAuth();

  const users = await caller.getUsers();

  return (
    <div className="h-full w-full flex">
      Protected Route
      {JSON.stringify(users)}
    </div>
  );
}

export default Page;