import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import { Smartphone, Palette, List } from 'lucide-react';

const terminals = [
  { rank: 1, name: '华为 Mate 60 Pro', tag: '不支持', color: '#FF6B6B' },
  { rank: 2, name: '苹果 iPhone 15 Pro', tag: '支持', color: '#00FF88' },
  { rank: 3, name: '荣耀 Magic 6', tag: '不支持', color: '#FF6B6B' },
  { rank: 4, name: '小米 14 Pro', tag: '支持', color: '#00FF88' },
  { rank: 5, name: 'vivo X100 Pro', tag: '支持', color: '#00FF88' },
];

export default function TerminalRanking() {
  // 仪表盘图表配置 - UE Logo支持率
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
        radius: '85%',
        center: ['50%', '55%'],
        itemStyle: {
          color: '#A855F7',
        },
        progress: {
          show: true,
          width: 10,
        },
        pointer: {
          show: true,
          length: '55%',
          width: 3,
          itemStyle: {
            color: '#A855F7',
          },
        },
        axisLine: {
          lineStyle: {
            width: 10,
            color: [
              [0.6, '#A855F7'],
              [0.8, '#EC4899'],
              [1, '#F43F5E'],
            ],
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          length: 6,
          lineStyle: {
            width: 1,
            color: 'rgba(255,255,255,0.3)',
          },
        },
        axisLabel: {
          distance: 12,
          color: 'rgba(255,255,255,0.5)',
          fontSize: 8,
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
          fontSize: 20,
          fontWeight: 'bold',
          color: '#A855F7',
          offsetCenter: [0, '55%'],
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

  return (
    <div className="h-full flex flex-row gap-4">
      {/* 左侧：UE Logo支持率 - 仪表盘 (40%) */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-[40%] flex flex-col"
      >
        <div className="flex items-center gap-2 mb-1">
          <Palette className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-white/70 text-xs">UE Logo支持率</span>
        </div>
        
        {/* 仪表盘 */}
        <div className="flex-1 min-h-0">
          <ReactECharts option={gaugeOption} style={{ width: '100%', height: '100%' }} />
        </div>
        

      </motion.div>

      {/* 分割线 */}
      <div className="w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />

      {/* 右侧：TOP终端排名列表 (60%) */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="w-[60%] flex flex-col"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <List className="w-3.5 h-3.5 text-cyber-cyan" />
            <span className="text-white/70 text-xs">TOP终端排行</span>
          </div>
          <span className="text-white/40 text-[10px]">5G-A能力</span>
        </div>
        
        {/* 表头 */}
        <div className="flex items-center text-white/40 text-[10px] px-1 pb-1 border-b border-white/10">
          <span className="w-5">#</span>
          <span className="flex-1">终端型号</span>
          <span className="w-10 text-right">状态</span>
        </div>

        {/* 列表 */}
        <div className="flex-1 overflow-y-auto scrollbar-thin space-y-0.5 pt-1">
          {terminals.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center p-1.5 rounded bg-white/5 hover:bg-white/10 transition-colors"
            >
              {/* 排名 */}
              <div className={`w-5 font-bold text-xs ${
                item.rank <= 3 ? 'text-cyber-gold' : 'text-white/50'
              }`}>
                {item.rank}
              </div>

              {/* 型号 */}
              <div className="flex-1 flex items-center gap-1.5 min-w-0">
                <Smartphone className="w-3 h-3 text-white/40 flex-shrink-0" />
                <span className="text-white/80 text-[11px] truncate">{item.name}</span>
              </div>

              {/* 5G-A能力标签 */}
              <div className="w-10 text-right">
                <span 
                  className="text-[8px] px-1.5 py-0.5 rounded-full border"
                  style={{ 
                    color: item.color,
                    borderColor: `${item.color}50`,
                    backgroundColor: `${item.color}15`,
                  }}
                >
                  {item.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
