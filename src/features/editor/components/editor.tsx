"use client";

import { ErrorView, LoadingView } from "@/components/entity-components";
import { useSuspenseWorkflow } from "@/features/workflows/hooks/use-workflows";

export const EditorLoading = () => (
  <LoadingView message="Loading Workflow ..." />
);

export const EditorError = () => (
  <ErrorView message="Error Loading Workflow!" />
);

const Editor = ({ workflowId }: { workflowId: string }) => {
  const { data } = useSuspenseWorkflow(workflowId);

  return (
    <div>
      {JSON.stringify(data, null, 2)}
    </div>
  );
}

export default Editor;