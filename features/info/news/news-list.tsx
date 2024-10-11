'use client';

import { usePathname, useRouter } from 'next/navigation';

import { Pagination } from '@/components/pagination';
import { FragmentOf, readFragment } from '@/libs/graphql';

import { NewsCardGroup } from './components/news-card-group';
import { getNewsFragment } from './get-news-fragment';

type NewsListProps = {
  data: FragmentOf<typeof getNewsFragment>;
};

const getPaginationQueryString = ({
  pageNumber,
  pageSize,
}: {
  pageNumber: number;
  pageSize: number;
}) => {
  const searchParams = new URLSearchParams();
  searchParams.set('page', pageNumber.toString());
  searchParams.set('pageSize', pageSize.toString());
  return searchParams.toString();
};

export function NewsList({ data }: NewsListProps) {
  const newsData = readFragment(getNewsFragment, data);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="space-y-12">
      <NewsCardGroup news={newsData.data} />
      <Pagination
        totalItems={newsData.meta.page.totalItems}
        currentPage={newsData.meta.page.number}
        pageSize={newsData.meta.page.size}
        onPageUpdate={({ page, pageSize }) => {
          router.push(
            pathname +
              '?' +
              getPaginationQueryString({ pageNumber: page, pageSize }),
          );
        }}
      />
    </div>
  );
}
