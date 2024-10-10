'use client';

import { Skeleton } from '@nextui-org/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';

type TableSkeletonLoaderProps = {
  rows?: number;
  columns?: number;
};

export function TableSkeletonLoader({
  columns = 4,
  rows = 6,
}: TableSkeletonLoaderProps) {
  return (
    <Table aria-label="table skeleton loader">
      <TableHeader>
        {Array.from({ length: columns }).map((_, index) => (
          <TableColumn key={index}>{''}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }).map((_, index) => (
          <TableRow key={index}>
            {Array.from({ length: columns }).map((_, index) => (
              <TableCell key={index}>
                <Skeleton className="h-6 w-full rounded-xl" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
