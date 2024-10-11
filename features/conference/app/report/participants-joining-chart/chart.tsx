'use client';

import { parseAbsoluteToLocal } from '@internationalized/date';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { getFormattedDate } from '@/utils/formatters/date-formatter';

type ChartProps = {
  chartData: { label: string; value: number }[];
};

const xAxisTickFormatter = (value: string) =>
  getFormattedDate(parseAbsoluteToLocal(value));

function CustomTooltip({ active, payload }: any) {
  if (active && payload?.length) {
    return (
      <div className="rounded-large bg-content1 p-3">
        <p className="text-foreground">
          {getFormattedDate(parseAbsoluteToLocal(payload[0].payload.label))}
        </p>
        <p className="text-foreground-500">
          New Participants: {payload[0].payload.value}
        </p>
      </div>
    );
  }

  return null;
}

export function Chart({ chartData }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart data={chartData}>
        <XAxis
          dataKey="label"
          type="category"
          tickFormatter={xAxisTickFormatter}
          tick={{ fill: '#ecedee' }}
          axisLine={{ stroke: '#ecedee' }}
        />
        <YAxis tick={{ fill: '#ecedee' }} axisLine={{ stroke: '#ecedee' }} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#3f3f46' }} />
        <Bar dataKey="value" fill="#006fee" />
      </BarChart>
    </ResponsiveContainer>
  );
}
