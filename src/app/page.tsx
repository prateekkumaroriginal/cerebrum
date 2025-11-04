"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const Page = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());

  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess: () => {
      toast.success("Job queued")
    }
  }));

  const testAi = useMutation(trpc.testAi.mutationOptions());

  return (
    <div className="h-full w-full flex flex-col">
      Protected Route
      <div>
        {JSON.stringify(data)}
      </div>
      <Button
        onClick={() => create.mutate()}
        disabled={create.isPending}
      >
        Create
      </Button>
      <Button
        onClick={() => testAi.mutate()}
        disabled={testAi.isPending}
      >
        Generate
      </Button>
    </div>
  );
}

export default Page;