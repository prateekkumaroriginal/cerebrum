"use client";

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

  return (
    <div className="h-full w-full flex">
      Protected Route
      <div>
        {JSON.stringify(data)}
      </div>
      <button
        onClick={() => create.mutate()}
        disabled={create.isPending}
      >
        Create
      </button>
    </div>
  );
}

export default Page;