import { cn } from '@nextui-org/theme';

import { MetricCard, type MetricCardProps } from '../metric-card';

type MetricCardGroupProps = {
  metrics: MetricCardProps[];
};

export function MetricCardGroup({ metrics }: MetricCardGroupProps) {
  return (
    <div className={cn('grid', 'grid-flow-col', 'auto-cols-fr', 'gap-4')}>
      {metrics.map((metric) => (
        <MetricCard key={metric.metric} {...metric} />
      ))}
    </div>
  );
}
