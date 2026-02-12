import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Train, Plane, TrainFront, AlertTriangle, MapPin, TrendingUp, Users, Clock } from 'lucide-react';
import CyberBorder from './CyberBorder';

// 交通枢纽数据 - 仅保留4个，按压力系数排序
const transportData = [
  { name: '南京南站', enName: 'Nanjing South', today: 12.5, weekday: 8.0, unit: '万', pressure: 1.56, icon: Train, color: '#FF3333' },
  { name: '南京站', enName: 'Nanjing Stn', today: 6.8, weekday: 4.5, unit: '万', pressure: 1.51, icon: Train, color: '#FF6B6B' },
  { name: '禄口机场', enName: 'Lukou Airport', today: 4.2, weekday: 2.8, unit: '万', pressure: 1.50, icon: Plane, color: '#FFA500' },
  { name: '奥体地铁站', enName: 'Olympic Metro', today: 8.5, weekday: 3.2, unit: '万', pressure: 2.66, icon: TrainFront, color: '#FF3333' },
].sort((a, b) => b.pressure - a.pressure);

// 交通枢纽监测模块
function TransportMonitor() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3 flex-shrink-0">
        <div className="w-6 h-6 rounded bg-gradient-to-br from-cyber-blue/20 to-cyber-blue/5 flex items-center justify-center border border-cyber-blue/30">
          <AlertTriangle className="w-3 h-3 text-cyber-blue" />
        </div>
        <div>
          <h3 className="text-white font-bold text-sm">交通枢纽压力监测</h3>
          <p className="text-white/40 text-[10px]">Transport Hub Monitoring</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-cyber pr-1 space-y-2 min-h-0">
        {transportData.map((item, index) => (
          <motion.div 
            key={item.name} 
            initial={{ y: 10, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.1 + index * 0.05 }}
            className="relative p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-cyber-cyan/30 transition-colors"
          >
            <div className="absolute top-0 left-0 w-1 h-full rounded-l" style={{ background: item.pressure > 2.0 ? 'linear-gradient(to bottom, #FF3333, #FF6B6B)' : item.pressure > 1.5 ? 'linear-gradient(to bottom, #FFD700, #FFA500)' : 'linear-gradient(to bottom, #00F0FF, #1E90FF)' }} />
            
            <div className="flex items-start justify-between pl-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}15`, border: `1px solid ${item.color}40` }}>
                  <item.icon className="w-4 h-4" style={{ color: item.color }} />
                </div>
                <div>
                  <div className="text-white font-medium text-xs">{item.name}</div>
                  <div className="text-white/40 text-[9px]">{item.enName}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white/50 text-[9px]">压力系数</div>
                <div className="font-orbitron text-sm font-bold" style={{ color: item.pressure > 2.0 ? '#FF3333' : item.pressure > 1.5 ? '#FFD700' : '#00F0FF' }}>
                  <CountUp end={item.pressure} duration={1.5} decimals={2} />
                </div>
              </div>
            </div>

            <div className="mt-2 space-y-1.5 pl-2">
              <div className="flex items-center gap-2">
                <span className="text-white/50 text-[9px] w-8">今日</span>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${(item.today / 15) * 100}%` }} 
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.05 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
                <span className="font-orbitron text-white text-xs w-14 text-right">{item.today}<span className="text-[8px] text-white/50">{item.unit}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/50 text-[9px] w-8">平日</span>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-white/25" style={{ width: `${(item.weekday / 15) * 100}%` }} />
                </div>
                <span className="font-orbitron text-white/60 text-xs w-14 text-right">{item.weekday}<span className="text-[8px] text-white/40">{item.unit}</span></span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10 flex-shrink-0">
        <span className="text-white/40 text-[10px]">压力等级</span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-cyber-cyan" /><span className="text-white/50 text-[9px]">正常</span></div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-cyber-gold" /><span className="text-white/50 text-[9px]">较高</span></div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-cyber-red" /><span className="text-white/50 text-[9px]">拥堵</span></div>
        </div>
      </div>
    </div>
  );
}

// 文旅大数据分析模块
function TourismBigData() {
  // 热门打卡点TOP5
  const hotSpots = [
    { name: '夫子庙秦淮河', visitors: 28500, trend: '+156%' },
    { name: '中山陵景区', visitors: 21300, trend: '+89%' },
    { name: '新街口商圈', visitors: 19200, trend: '+67%' },
    { name: '老门东', visitors: 15600, trend: '+134%' },
    { name: '总统府', visitors: 12800, trend: '+78%' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3 flex-shrink-0">
        <div className="w-6 h-6 rounded bg-gradient-to-br from-cyber-gold/20 to-cyber-gold/5 flex items-center justify-center border border-cyber-gold/30">
          <MapPin className="w-3 h-3 text-cyber-gold" />
        </div>
        <div>
          <h3 className="text-white font-bold text-sm">文旅大数据分析</h3>
          <p className="text-white/40 text-[10px]">周五-周一 信令洞察</p>
        </div>
      </div>

      {/* 核心指标 */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-3 rounded-lg bg-gradient-to-br from-cyber-cyan/10 to-cyber-cyan/5 border border-cyber-cyan/30"
        >
          <div className="flex items-center gap-1.5 mb-1">
            <Users className="w-3.5 h-3.5 text-cyber-cyan" />
            <span className="text-white/50 text-[10px]">实时游客 (3天)</span>
          </div>
          <div className="font-orbitron text-xl font-bold text-cyber-cyan">
            <CountUp end={8.6} duration={2} decimals={1} />
            <span className="text-xs text-white/50 ml-0.5">万</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="p-3 rounded-lg bg-gradient-to-br from-cyber-gold/10 to-cyber-gold/5 border border-cyber-gold/30"
        >
          <div className="flex items-center gap-1.5 mb-1">
            <Clock className="w-3.5 h-3.5 text-cyber-gold" />
            <span className="text-white/50 text-[10px]">平均停留时长</span>
          </div>
          <div className="font-orbitron text-xl font-bold text-cyber-gold">
            <CountUp end={26.5} duration={2} decimals={1} />
            <span className="text-xs text-white/50 ml-0.5">小时</span>
          </div>
        </motion.div>
      </div>

      {/* 热门打卡点TOP5 */}
      <div className="flex-1 min-h-0">
        <div className="text-white/50 text-[10px] mb-2 flex items-center gap-1">
          <MapPin className="w-3 h-3 text-cyber-gold" />
          热门打卡点TOP5
        </div>
        <div className="space-y-1.5 overflow-y-auto scrollbar-cyber pr-1">
          {hotSpots.map((spot, index) => (
            <motion.div 
              key={spot.name}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${
                  index === 0 ? 'bg-cyber-gold text-cyber-bg' : 
                  index === 1 ? 'bg-cyber-cyan text-cyber-bg' : 
                  index === 2 ? 'bg-orange-400 text-cyber-bg' : 
                  'bg-white/10 text-white/50'
                }`}>
                  {index + 1}
                </div>
                <span className="text-white/80 text-xs">{spot.name}</span>
              </div>
              <div className="text-right flex items-center gap-3">
                <div className="font-orbitron text-sm text-cyber-cyan">
                  {(spot.visitors / 10000).toFixed(1)}<span className="text-[9px]">万</span>
                </div>
                <div className="flex items-center gap-0.5 text-[10px] text-cyber-gold">
                  <TrendingUp className="w-3 h-3" />
                  {spot.trend}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RightPanel() {
  return (
    <div className="w-[340px] flex flex-col gap-3 p-3 h-full">
      <CyberBorder delay={0.2} className="flex-1 min-h-0">
        <div className="glass-panel rounded-lg p-3 h-full overflow-hidden">
          <TransportMonitor />
        </div>
      </CyberBorder>
      
      <CyberBorder delay={0.3} className="flex-1 min-h-0">
        <div className="glass-panel rounded-lg p-3 h-full overflow-hidden">
          <TourismBigData />
        </div>
      </CyberBorder>
    </div>
  );
}
