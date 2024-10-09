import { Skeleton } from '@nextui-org/skeleton';

export function ChartSkeleton() {
  return (
    <div className="w-full h-[500px] flex space-x-8 items-end">
      <Skeleton className="flex-1 h-1/3 rounded-lg" />
      <Skeleton className="flex-1 h-1/4 rounded-lg" />
      <Skeleton className="flex-1 h-2/3 rounded-lg" />
      <Skeleton className="flex-1 h-full rounded-lg" />
      <Skeleton className="flex-1 h-1/2 rounded-lg" />
      <Skeleton className="flex-1 h-3/4 rounded-lg" />
      <Skeleton className="flex-1 h-1/5 rounded-lg" />
      <Skeleton className="flex-1 h-3/5 rounded-lg" />
      <Skeleton className="flex-1 h-1/3 rounded-lg" />
      <Skeleton className="flex-1 h-2/3 rounded-lg" />
    </div>
  );
}
