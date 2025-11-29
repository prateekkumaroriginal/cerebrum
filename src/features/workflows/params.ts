import { PAGINATION } from '@/constants';
import { createLoader, parseAsInteger, parseAsString } from 'nuqs/server';

export const workflowsSearchParams = {
  page: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),
  pageSize: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE_SIZE)
    .withOptions({ clearOnDefault: true }),
  search: parseAsString
    .withDefault("")
    .withOptions({ clearOnDefault: true }),
}

export const loaderWorkflowsParams = createLoader(workflowsSearchParams);