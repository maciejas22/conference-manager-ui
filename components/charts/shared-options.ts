import { type EChartsOption } from 'echarts';

type ChartOptions = {
  backgroundColor?: string;
  textColor?: string;
};

export const getChartOptions = ({
  backgroundColor = '#18181a',
  textColor = '#ecedee',
}: ChartOptions): EChartsOption => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    backgroundColor,
    borderWidth: 0,
    textStyle: {
      color: textColor,
      fontSize: 16,
    },
    borderRadius: 14,
    padding: 12,
  },
  xAxis: {
    type: 'category',
    axisLabel: {
      color: textColor,
      fontSize: 16,
    },
    axisLine: {
      lineStyle: {
        color: textColor,
      },
    },
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      color: textColor,
      fontSize: 16,
    },
    axisLine: {
      lineStyle: {
        color: textColor,
      },
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
});
