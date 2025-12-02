import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useWorkflowsParams } from "./use-workflows-params";

/**
 * Hook to fetch all workflows using suspense
 */
export const useSuspenseWorkflows = () => {
  const trpc = useTRPC();
  const [params] = useWorkflowsParams();

  return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params));
}

/**
 * Hook to create a workflow
 */
export const useCreateWorkflow = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(trpc.workflows.create.mutationOptions({
    onSuccess: (data) => {
      queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
      toast.success(`Workflow "${data.name}" created.`);
    },
    onError: (data) => {
      toast.error(`Falied to create workflow: ${data.message}`);
    }
  }));
}

/**
 * Hook to delete a workflow
 */
export const useDeleteWorkflow = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(trpc.workflows.delete.mutationOptions({
    onSuccess: (data) => {
      queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
      toast.success(`Workflow "${data.name}" deleted.`);
    },
    onError: (data) => {
      toast.error(`Failed to delete workflow: ${data.message}`);
    }
  }));
}

/**
 * Hook to get a single workflow
 */
export const useSuspenseWorkflow = (id: string) => {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.workflows.getOne.queryOptions({ id }));
}

/**
 * Hook to update a workflow's name
 */
export const useUpdateWorkflowName = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(trpc.workflows.updateName.mutationOptions({
    onSuccess: (data) => {
      queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
      queryClient.invalidateQueries(trpc.workflows.getOne.queryOptions({ id: data.id }));
      toast.success(`Workflow "${data.name}" updated.`);
    },
    onError: (data) => {
      toast.error(`Failed to update workflow: ${data.message}`);
    }
  }))
}