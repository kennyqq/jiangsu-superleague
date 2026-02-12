import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import ReactECharts from 'echarts-for-react';
import { Activity, TrendingUp, TrendingDown, MessageCircle, Smartphone, Gamepad2, Tv, BarChart3 } from 'lucide-react';
import CyberBorder from '../../components/CyberBorder';

// KPI 卡片组件
function KPICards() {
  const kpis = [
    { label: '总流量', value: 8420, unit: 'GB', trend: '+12%', up: true, color: '#00F0FF' },
    { label: '语音流量', value: 420, unit: 'Erl', trend: '+5%', up: true, color: '#00FF88' },
    { label: '平均吞吐', value: 520, unit: 'Mbps', trend: '-2%', up: false, color: '#FFD700' },
    { label: '时延', value: 12, unit: 'ms', trend: '-8%', up: true, color: '#00FF88' },
  ];

  return (
    <CyberBorder delay={0.1}>
      <div className="glass-panel rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center border border-green-500/30">
            <BarChart3 className="w-4 h-4 text-green-400" />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">关键性能指标</h3>
            <p className="text-white/40 text-[10px]">关键性能指标监控</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {kpis.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.08 }}
              className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="text-white/50 text-[10px] mb-1">{item.label}</div>
              <div className="flex items-baseline gap-1">
                <span className="font-orbitron text-xl font-bold" style={{ color: item.color }}>
                  <CountUp end={item.value} duration={2} />
                </span>
                <span className="text-white/60 text-xs">{item.unit}</span>
              </div>
              <div className={`flex items-center gap-1 mt-1 text-[10px] ${item.up ? 'text-green-400' : 'text-red-400'}`}>
                {item.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span>{item.trend}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </CyberBorder>
  );
}

// 业务质量洞察 - 4个指标全部展示
function KQIAllMetrics() {
  const kqiData = [
    { 
      app: '微信', 
      icon: MessageCircle, 
      metric: '99.9%', 
      unit: '%',
      sub: '成功率',
      status: 'green', 
      value: 99.9,
      color: '#00FF88',
      chartData: [99.1, 99.3, 99.5, 99.6, 99.7, 99.8, 99.85, 99.9]
    },
    { 
      app: '抖音', 
      icon: Smartphone, 
      metric: '8.5', 
      unit: 'Mbps',
      sub: '下行速率', 
      status: 'green', 
      value: 8.5,
      color: '#00F0FF',
      chartData: [6.2, 6.8, 7.5, 8.0, 8.3, 8.5, 8.4, 8.2]
    },
    { 
      app: '王者', 
      icon: Gamepad2, 
      metric: '24', 
      unit: 'ms',
      sub: '时延', 
      status: 'green', 
      value: 24,
      color: '#FFD700',
      chartData: [28, 26, 24, 22, 21, 20, 22, 24]
    },
    { 
      app: '咪咕', 
      icon: Tv, 
      metric: '12.3', 
      unit: 'Mbps',
      sub: '视频速率', 
      status: 'green', 
      value: 12.3,
      color: '#FF6B9D',
      chartData: [10.2, 11.0, 11.8, 12.3, 12.5, 12.3, 11.8, 11.2]
    },
  ];

  const timeLabels = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];

  // 生成迷你折线图配置
  const getMiniChartOption = (data, color) => ({
    backgroundColor: 'transparent',
    grid: { top: 2, right: 2, bottom: 2, left: 2 },
    xAxis: { type: 'category', data: timeLabels, show: false },
    yAxis: { type: 'value', show: false, min: Math.min(...data) * 0.95, max: Math.max(...data) * 1.05 },
    series: [{
      type: 'line',
      data: data,
      smooth: true,
      symbol: 'none',
      lineStyle: { color: color, width: 2 },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: `${color}60` },
            { offset: 1, color: `${color}00` },
          ],
        },
      },
    }],
  });

  return (
    <CyberBorder delay={0.2} className="flex-1 min-h-0">
      <div className="glass-panel rounded-lg p-4 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-3 flex-shrink-0">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyber-cyan/20 to-cyber-cyan/5 flex items-center justify-center border border-cyber-cyan/30">
            <Activity className="w-4 h-4 text-cyber-cyan" />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">业务质量洞察</h3>
            <p className="text-white/40 text-[10px]">实时业务质量监控</p>
          </div>
        </div>

        {/* 4个指标卡片网格 */}
        <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
          {kqiData.map((item, index) => (
            <motion.div
              key={item.app}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.08 }}
              className="p-3 rounded-xl bg-gradient-to-br from-green-500/10 to-green-900/5 border border-green-500/30 flex flex-col"
            >
              {/* 顶部：图标和名称 */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-white font-medium text-sm">{item.app}</span>
                <div className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              </div>
              
              {/* 中间：数值 */}
              <div className="mb-2">
                <div className="font-orbitron text-2xl font-bold" style={{ color: item.color }}>
                  <CountUp 
                    end={item.value} 
                    duration={2} 
                    decimals={item.value % 1 !== 0 ? 1 : 0}
                  />
                  <span className="text-sm ml-0.5">{item.unit}</span>
                </div>
                <div className="text-white/50 text-[10px]">{item.sub}</div>
              </div>

              {/* 底部：迷你趋势图 */}
              <div className="flex-1 min-h-[60px]">
                <ReactECharts 
                  option={getMiniChartOption(item.chartData, item.color)} 
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </CyberBorder>
  );
}

export default function RightPanelP1() {
  return (
    <div className="w-[400px] flex flex-col h-full p-4 gap-4">
      <div className="flex-shrink-0">
        <KPICards />
      </div>
      
      <div className="flex-1 min-h-0">
        <KQIAllMetrics />
      </div>
    </div>
  );
}
