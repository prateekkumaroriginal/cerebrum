import { useQueryStates } from "nuqs";
import { workflowsSearchParams } from "../params";

export const useWorkflowsParams = () => {
  return useQueryStates(workflowsSearchParams);
}