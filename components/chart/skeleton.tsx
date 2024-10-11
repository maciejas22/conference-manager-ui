import { Skeleton } from '@nextui-org/skeleton';

export function ChartSkeleton() {
  return (
    <div className="flex h-[500px] w-full items-end space-x-8">
      <Skeleton className="h-1/3 flex-1 rounded-lg" />
      <Skeleton className="h-1/4 flex-1 rounded-lg" />
      <Skeleton className="h-2/3 flex-1 rounded-lg" />
      <Skeleton className="h-full flex-1 rounded-lg" />
      <Skeleton className="h-1/2 flex-1 rounded-lg" />
      <Skeleton className="h-3/4 flex-1 rounded-lg" />
      <Skeleton className="h-1/5 flex-1 rounded-lg" />
      <Skeleton className="h-3/5 flex-1 rounded-lg" />
      <Skeleton className="h-1/3 flex-1 rounded-lg" />
      <Skeleton className="h-2/3 flex-1 rounded-lg" />
    </div>
  );
}
