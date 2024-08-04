import { cn } from '@repo/shared/nextui';

import { MetricCard, type MetricCardProps } from '../metric-card';

interface MetricCardGroupProps {
  metrics: MetricCardProps[];
}

export const MetricCardGroup = ({ metrics }: MetricCardGroupProps) => {
  return (
    <div
      className={cn(
        'comps-grid',
        'comps-grid-flow-col',
        'comps-auto-cols-fr',
        'comps-gap-4',
      )}
    >
      {metrics.map((metric) => (
        <MetricCard key={metric.metric} {...metric} />
      ))}
    </div>
  );
};
