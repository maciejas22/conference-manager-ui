'use client';

import { useEffect, useState } from 'react';

import { Spinner } from '@nextui-org/spinner';
import { useQuery } from '@tanstack/react-query';

import { Pagination } from '@/components/pagination';

import { NewsCardGroup } from './components/news-card-group';
import { getNewsQueryOptions, newsConfig } from './get-news-query';

export function NewsList() {
  const [page, setPage] = useState({
    pageNumber: newsConfig.initialPageNumber,
    pageSize: newsConfig.initialPageSize,
  });
  const [totalItems, setTotalItems] = useState(0);
  const { data, isPending } = useQuery(
    getNewsQueryOptions(page.pageNumber, page.pageSize),
  );

  useEffect(() => {
    if (data) {
      setTotalItems(data.news.meta.page.totalItems);
    }
  }, [data]);

  return (
    <div className="space-y-12">
      {isPending ? (
        <Spinner color="primary" label="Loading..." className="w-full" />
      ) : (
        <NewsCardGroup news={data?.news.data ?? []} />
      )}
      <Pagination
        totalItems={totalItems}
        currentPage={page.pageNumber}
        pageSize={page.pageSize}
        onPageUpdate={({ page, pageSize }) => {
          setPage({ pageNumber: page, pageSize });
        }}
      />
    </div>
  );
}
