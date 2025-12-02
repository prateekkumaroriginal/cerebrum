import { prefetch, trpc } from "@/trpc/server";
import { inferInput } from "@trpc/tanstack-react-query";

type Input = inferInput<typeof trpc.workflows.getMany>
/**
 * Prefetch all workflows
 */
export const prefetchWorkFlows = (params: Input) => {
  return prefetch(trpc.workflows.getMany.queryOptions(params));
}

/**
 * Prefetch a single workflow
 */
export const prefetchWorkFlow = (id: string) => {
  return prefetch(trpc.workflows.getOne.queryOptions({ id }));
}
