import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import { Gauge, TrendingUp } from 'lucide-react';

export default function CapacityAgentCard() {
  // 仪表盘图表配置
  const gaugeOption = {
    backgroundColor: 'transparent',
    series: [
      {
        type: 'gauge',
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 100,
        splitNumber: 5,
        radius: '90%',
        center: ['50%', '55%'],
        itemStyle: {
          color: '#00FF00',
        },
        progress: {
          show: true,
          width: 12,
        },
        pointer: {
          show: true,
          length: '60%',
          width: 4,
          itemStyle: {
            color: '#00FF00',
          },
        },
        axisLine: {
          lineStyle: {
            width: 12,
            color: [
              [0.6, '#00FF00'],
              [0.8, '#FFD700'],
              [1, '#FF6B6B'],
            ],
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          length: 8,
          lineStyle: {
            width: 2,
            color: 'rgba(255,255,255,0.3)',
          },
        },
        axisLabel: {
          distance: 15,
          color: 'rgba(255,255,255,0.5)',
          fontSize: 9,
          formatter: (value) => {
            if (value === 0 || value === 100) return value;
            return '';
          },
        },
        anchor: {
          show: false,
        },
        title: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          fontSize: 24,
          fontWeight: 'bold',
          color: '#00FF00',
          offsetCenter: [0, '60%'],
          formatter: '{value}%',
        },
        data: [
          {
            value: 60,
          },
        ],
      },
    ],
  };

  // 迷你折线图配置 - 用户发展预测
  const lineChartOption = {
    backgroundColor: 'transparent',
    grid: { top: 20, right: 10, bottom: 25, left: 35 },
    xAxis: {
      type: 'category',
      data: ['10分', '20分', '30分', '40分', '50分', '60分'],
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } },
      axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 9 },
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      axisLine: { show: false },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
      axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 9 },
    },
    series: [
      {
        type: 'line',
        data: [60, 65, 72, 78, 85, 92],
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          color: '#FFD700',
          width: 2,
          type: 'dashed',
        },
        itemStyle: {
          color: '#FFD700',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(255, 215, 0, 0.3)' },
              { offset: 1, color: 'rgba(255, 215, 0, 0)' },
            ],
          },
        },
      },
    ],
  };

  return (
    <div className="h-full flex flex-row gap-4">
      {/* 左侧：当前空间 - 仪表盘 (40%) */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-[40%] flex flex-col"
      >
        <div className="flex items-center gap-2 mb-1">
          <Gauge className="w-3.5 h-3.5 text-cyber-cyan" />
          <span className="text-white/70 text-xs">当前空间</span>
        </div>
        
        {/* 仪表盘 */}
        <div className="flex-1 min-h-0">
          <ReactECharts option={gaugeOption} style={{ width: '100%', height: '100%' }} />
        </div>
        
        {/* 状态标签 */}
        <div className="flex justify-center">
          <div className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/50">
            <span className="text-green-400 text-xs font-bold">绿区 (建议推广)</span>
          </div>
        </div>
      </motion.div>

      {/* 分割线 */}
      <div className="w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />

      {/* 右侧：未来1h预测 - 折线图 (60%) */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="w-[60%] flex flex-col"
      >
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-cyber-gold" />
            <span className="text-white/70 text-xs">未来1h预测</span>
          </div>
          <span className="text-white/40 text-[10px]">趋势上升</span>
        </div>
        
        {/* 迷你折线图 */}
        <div className="flex-1 min-h-0">
          <ReactECharts option={lineChartOption} style={{ width: '100%', height: '100%' }} />
        </div>
        
        {/* 预测总结 */}
        <div className="flex items-center justify-between px-1">
          <span className="text-white/50 text-xs">预测峰值</span>
          <span className="font-orbitron text-cyber-gold font-bold text-lg">92%</span>
        </div>
      </motion.div>
    </div>
  );
}
