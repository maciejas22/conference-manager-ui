'use client';

import React, { useEffect, useRef } from 'react';

import { parseAbsoluteToLocal } from '@internationalized/date';
import * as echarts from 'echarts';
import merge from 'lodash.merge';

import { getChartOptions } from '@/components/charts/shared-options';
import { getFormattedDate } from '@/utils/formatters/date-formatter';

type ChartProps = {
  chartData: { label: string; value: number }[];
};

export function Chart({ chartData }: ChartProps) {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);

      const option = merge(getChartOptions({}), {
        tooltip: {
          axisPointer: {
            label: {
              formatter: (params: any) =>
                getFormattedDate(parseAbsoluteToLocal(params.value)),
            },
          },
        },
        xAxis: {
          data: chartData.map((item) => item.label),
          axisLabel: {
            formatter: (value: string) =>
              getFormattedDate(parseAbsoluteToLocal(value)),
          },
        },
        series: [
          {
            name: 'New Participants',
            data: chartData.map((item) => item.value),
            type: 'bar',
            itemStyle: {
              color: '#006fee',
            },
          },
        ],
      });

      chartInstance.setOption(option);

      return () => {
        chartInstance.dispose();
      };
    }
  }, [chartData]);

  return <div ref={chartRef} className="h-[500px] w-full" />;
}
