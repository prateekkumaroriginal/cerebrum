import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSuspenseWorkflows = () => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.workflows.getMany.queryOptions());
}

export const useCreateWorkflow = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(trpc.workflows.create.mutationOptions({
    onSuccess: (data) => {
      queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions());
      toast.success(`Workflow "${data.name}" created.`);
    },
    onError: (data) => {
      toast.error(`Falied to create workflow: ${data.message}`);
    }
  }));
}