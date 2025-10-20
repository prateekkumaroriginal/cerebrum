import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Client from "./client";
import { Suspense } from "react";

const Page = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.hello.queryOptions({ name: "Prateek Barnwal" }));

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div className="h-8 w-8 bg-red-600"></div>}>
          <Client />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}

export default Page;