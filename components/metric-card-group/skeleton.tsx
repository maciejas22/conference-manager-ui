import { MetricCardSkeleton } from '../metric-card/skeleton';

type MetricCardGroupSkeletonProps = {
  count?: number;
};

export function MetricCardGroupSkeleton({
  count = 4,
}: MetricCardGroupSkeletonProps) {
  return (
    <div className="flex w-full space-x-4">
      {Array.from({ length: count }).map((_, index) => (
        <MetricCardSkeleton key={index} />
      ))}
    </div>
  );
}
