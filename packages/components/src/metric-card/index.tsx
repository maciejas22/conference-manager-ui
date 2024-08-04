import { Card, CardFooter, CardHeader } from '@repo/shared/nextui';

export interface MetricCardProps {
  metric: string;
  value: string;
}

export const MetricCard = ({ metric, value }: MetricCardProps) => {
  return (
    <Card className="comps-flex comps-justify-between">
      <CardHeader>{metric}</CardHeader>
      <CardFooter className="comps-text-2xl">{value}</CardFooter>
    </Card>
  );
};
