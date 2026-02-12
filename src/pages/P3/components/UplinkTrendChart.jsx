import ReactECharts from 'echarts-for-react';

export default function UplinkTrendChart() {
  const option = {
    backgroundColor: 'transparent',
    grid: {
      top: 15,
      right: 10,
      bottom: 25,
      left: 50,
    },
    xAxis: {
      type: 'category',
      data: ['18:00', '19:00', '20:00', '20:45', '21:00', '22:00'],
      axisLine: {
        lineStyle: { color: 'rgba(255,255,255,0.2)' },
      },
      axisLabel: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 9,
      },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 5,
      axisLine: { show: false },
      splitLine: {
        lineStyle: { color: 'rgba(255,255,255,0.1)' },
      },
      axisLabel: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 9,
        formatter: '{value} Gbps',
      },
    },
    series: [
      {
        type: 'line',
        data: [0.8, 2.1, 3.5, 4.2, 3.8, 2.5],
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          color: '#00F0FF',
          width: 2,
        },
        itemStyle: {
          color: '#00F0FF',
          borderColor: '#fff',
          borderWidth: 1,
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(0,240,255,0.5)' },
              { offset: 1, color: 'rgba(0,240,255,0)' },
            ],
          },
        },
        markPoint: {
          data: [
            {
              coord: ['20:45', 4.2],
              value: '峰值\n4.2Gbps',
              itemStyle: { color: '#FFD700' },
              label: {
                color: '#FFD700',
                fontSize: 9,
                offset: [0, -15],
              },
            },
          ],
          symbol: 'pin',
          symbolSize: 35,
        },
      },
    ],
  };

  return (
    <div className="w-full h-full">
      <ReactECharts option={option} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
