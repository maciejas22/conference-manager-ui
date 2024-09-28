import { Card, CardFooter, CardHeader } from '@nextui-org/card';

export type MetricCardProps = {
  metric: string;
  value: string;
};

export function MetricCard({ metric, value }: MetricCardProps) {
  return (
    <Card className="flex justify-between">
      <CardHeader>{metric}</CardHeader>
      <CardFooter className="text-2xl">{value}</CardFooter>
    </Card>
  );
}
