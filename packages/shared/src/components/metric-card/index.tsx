import { Card, CardFooter, CardHeader } from '#nextui';

export interface MetricCardProps {
  metric: string;
  value: string;
}

export const MetricCard = ({ metric, value }: MetricCardProps) => {
  return (
    <Card className="flex justify-between">
      <CardHeader>{metric}</CardHeader>
      <CardFooter className="text-2xl">{value}</CardFooter>
    </Card>
  );
};
