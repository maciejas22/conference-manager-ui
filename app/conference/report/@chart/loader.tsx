import { Card } from '@/components/card';
import { ChartSkeleton } from '@/components/chart/skeleton';

export default function Loader() {
  return (
    <div className="!my-8">
      <Card header="Popularity trend">
        <ChartSkeleton />
      </Card>
    </div>
  );
}
