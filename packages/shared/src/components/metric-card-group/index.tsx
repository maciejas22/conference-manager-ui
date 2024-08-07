import { cn } from '#nextui';

import { MetricCard, type MetricCardProps } from '../metric-card';

interface MetricCardGroupProps {
  metrics: MetricCardProps[];
}

export const MetricCardGroup = ({ metrics }: MetricCardGroupProps) => {
  return (
    <div className={cn('grid', 'grid-flow-col', 'auto-cols-fr', 'gap-4')}>
      {metrics.map((metric) => (
        <MetricCard key={metric.metric} {...metric} />
      ))}
    </div>
  );
};
