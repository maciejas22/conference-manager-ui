import { getConferences } from '#services/get-conferences';

import { ConferencesTable } from './table';
import { defaultSearchParams, searchParamsSchema } from './utils/search-params';

interface ConferenceListPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

const parseSearchParams = (
  params: Record<string, string | string[] | undefined>,
) => {
  const getStringParam = (
    param: string | string[] | undefined,
    defaultValue: string,
  ) => {
    return (Array.isArray(param) ? param[0] : param) ?? defaultValue;
  };

  const getNumberParam = (
    param: string | string[] | undefined,
    defaultValue: number,
  ) => {
    const value = Array.isArray(param) ? param[0] : param;
    return value ? parseInt(value, 10) : defaultValue;
  };

  const { page, pageSize, sort, sortDirection, associatedOnly, title } = params;

  const parsedParams = {
    page: getNumberParam(page, defaultSearchParams.page),
    pageSize: getNumberParam(pageSize, defaultSearchParams.pageSize),
    sort: getStringParam(sort, defaultSearchParams.sort),
    sortDirection: getStringParam(
      sortDirection,
      defaultSearchParams.sortDirection,
    ),
    associatedOnly:
      associatedOnly === 'true' || defaultSearchParams.associatedOnly,
    title: getStringParam(title, defaultSearchParams.title),
  };

  const validatedParams = searchParamsSchema.parse(parsedParams);

  return validatedParams;
};

export async function ConferenceListPage({
  searchParams,
}: ConferenceListPageProps) {
  const prasedSearchParams = parseSearchParams(searchParams);

  const conferencesData = await getConferences({
    page: {
      size: prasedSearchParams.pageSize,
      number: prasedSearchParams.page,
    },
    sort: {
      column: prasedSearchParams.sort,
      order: prasedSearchParams.sortDirection,
    },
    filters: {
      title: prasedSearchParams.title,
      associatedOnly: prasedSearchParams.associatedOnly,
    },
  });

  if (!conferencesData.conferences) {
    return null;
  }

  return (
    <ConferencesTable
      conferenceData={conferencesData.conferences.data}
      metaData={conferencesData.conferences.meta}
    />
  );
}
