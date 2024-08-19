import { Card, CardFooter, CardHeader } from '#libs/nextui/index.ts';

export type MetricCardProps = {
  metric: string;
  value: string;
};

export const MetricCard = ({ metric, value }: MetricCardProps) => {
  return (
    <Card className="flex justify-between">
      <CardHeader>{metric}</CardHeader>
      <CardFooter className="text-2xl">{value}</CardFooter>
    </Card>
  );
};
