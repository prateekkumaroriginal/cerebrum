import {
  WorkflowsContainer,
  WorkflowsError,
  WorkflowsList,
  WorkflowsLoading
} from '@/features/workflows/components/workflows';
import { prefetchWorkFlows } from '@/features/workflows/server/prefetch';
import { requireAuth } from '@/lib/auth-utils';
import { HydrateClient } from '@/trpc/server';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import type { SearchParams } from "nuqs/server";
import { loaderWorkflowsParams } from '@/features/workflows/params';

type PageProps = {
  searchParams: Promise<SearchParams>
}

const Page = async ({ searchParams }: PageProps) => {
  await requireAuth();

  const params = await loaderWorkflowsParams(searchParams);
  prefetchWorkFlows(params);

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<WorkflowsError />}>
        <Suspense fallback={<WorkflowsLoading />}>
          <WorkflowsContainer>
            <WorkflowsList />
          </WorkflowsContainer>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}

export default Page;