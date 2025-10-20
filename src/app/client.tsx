"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

const Client = () => {
  const trpc = useTRPC();
  const greeting = useSuspenseQuery(trpc.hello.queryOptions({name: "Prateek Barnwal"}));

  return (
    <div>
      Client component: {greeting.data.greeting}
    </div>
  );
}

export default Client;