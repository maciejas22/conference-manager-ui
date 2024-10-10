import { Card } from '@nextui-org/card';
import { Skeleton } from '@nextui-org/skeleton';

export function MetricCardSkeleton() {
  return (
    <Card className="flex flex-1 space-y-10 p-3">
      <Skeleton className="h-4 w-3/5 rounded-lg" />
      <Skeleton className="h-6 w-1/5 rounded-lg" />
    </Card>
  );
}
