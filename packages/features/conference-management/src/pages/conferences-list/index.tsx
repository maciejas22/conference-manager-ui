import { MetricCardGroup } from '@repo/components';
import { Card, CardBody, CardFooter, CardHeader } from '@repo/libs/nextui';

import { getConferences } from '#services/get-conferences';

import { ConferencesTable } from './table';
import { BottomContent } from './table/bottom-content';
import { TopContent } from './table/top-content';
import {
  columnKeyToFieldMap,
  fieldToColumnKeyMap,
} from './table/utils/field-maps';
import { searchParamsSchema } from './utils/search-params';

interface ConferenceListPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

const parseSearchParams = (
  params: Record<string, string | string[] | undefined>,
) => {
  const getStringParam = (param: string | string[] | undefined) => {
    return Array.isArray(param) ? param[0] : param;
  };

  const getNumberParam = (param: string | string[] | undefined) => {
    const value = Array.isArray(param) ? param[0] : param;
    return value ? parseInt(value, 10) : undefined;
  };

  const getArrayParam = (param: string | string[] | undefined) => {
    if (Array.isArray(param)) {
      return param.flatMap((p) => p.split(',')).map((p) => p.trim());
    } else if (param) {
      return param.split(',').map((p) => p.trim());
    }

    return [];
  };

  const {
    page,
    pageSize,
    sort,
    sortDirection,
    associatedOnly,
    title,
    visibleColumns,
  } = params;

  const parsedParams = {
    page: getNumberParam(page),
    pageSize: getNumberParam(pageSize),
    sort: getStringParam(sort),
    sortDirection: getStringParam(sortDirection),
    associatedOnly: getStringParam(associatedOnly) === 'true',
    title: getStringParam(title),
    visibleColumns: getArrayParam(visibleColumns),
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
      column: columnKeyToFieldMap[prasedSearchParams.sort],
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
    <div className="cm-mt-6 cm-space-y-4">
      <MetricCardGroup
        metrics={[
          {
            metric: 'Running',
            value: '12',
          },
          {
            metric: 'Starting in less than 24h',
            value: '3',
          },
          {
            metric: 'Total conducted',
            value: '12.3K',
          },
          {
            metric: 'Total participants today',
            value: '1.2K',
          },
        ]}
      />

      <Card>
        <CardBody>
          <TopContent visibleColumns={prasedSearchParams.visibleColumns} />
        </CardBody>
      </Card>
      <Card>
        <CardBody className="p-0">
          <ConferencesTable
            conferenceData={conferencesData.conferences.data}
            visibleColumns={prasedSearchParams.visibleColumns}
          />
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <BottomContent meta={conferencesData.conferences.meta} />
        </CardBody>
      </Card>
    </div>
  );
}
