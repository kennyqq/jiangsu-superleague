import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { TrendingUp, MapPin, Users, Info, Timer } from 'lucide-react';
import CyberBorder from './CyberBorder';

// 顶部倒计时组件 - 只显示天和小时
function CountdownCard() {
  const targetDate = new Date('2026-04-11T19:30:00');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const diff = targetDate - now;
      if (diff <= 0) return { days: 0, hours: 0 };
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      };
    };
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 60000); // 每分钟更新一次
    return () => clearInterval(timer);
  }, []);

  return (
    <CyberBorder delay={0.1}>
      <div className="glass-panel rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded bg-cyber-gold/10 flex items-center justify-center border border-cyber-gold/30">
            <Timer className="w-3 h-3 text-cyber-gold" />
          </div>
          <span className="text-white/60 text-xs">距离苏超开幕</span>
          <span className="text-white/40 text-[10px]">OPENING IN</span>
        </div>
        
        <div className="flex items-baseline gap-1">
          <span className="font-orbitron text-2xl font-bold text-cyber-gold tabular-nums">
            <CountUp end={timeLeft.days} duration={2} />
          </span>
          <span className="text-white/50 text-sm">天</span>
          <span className="font-orbitron text-2xl font-bold text-cyber-gold tabular-nums ml-2">
            <CountUp end={timeLeft.hours} duration={2} />
          </span>
          <span className="text-white/50 text-sm">小时</span>
        </div>
      </div>
    </CyberBorder>
  );
}

const jiangsuCities = [
  { rank: 1, city: '苏州', enName: 'Suzhou', value: 12400, percent: 100 },
  { rank: 2, city: '无锡', enName: 'Wuxi', value: 8900, percent: 85 },
  { rank: 3, city: '常州', enName: 'Changzhou', value: 7200, percent: 70 },
  { rank: 4, city: '南通', enName: 'Nantong', value: 5800, percent: 55 },
  { rank: 5, city: '徐州', enName: 'Xuzhou', value: 4200, percent: 40 },
  { rank: 6, city: '扬州', enName: 'Yangzhou', value: 3800, percent: 35 },
  { rank: 7, city: '盐城', enName: 'Yancheng', value: 2900, percent: 28 },
  { rank: 8, city: '泰州', enName: 'Taizhou', value: 2500, percent: 24 },
];

const nationalCities = [
  { rank: 1, city: '上海', enName: 'Shanghai', value: 15200, percent: 100 },
  { rank: 2, city: '杭州', enName: 'Hangzhou', value: 9100, percent: 75 },
  { rank: 3, city: '合肥', enName: 'Hefei', value: 7800, percent: 65 },
  { rank: 4, city: '北京', enName: 'Beijing', value: 6500, percent: 55 },
  { rank: 5, city: '深圳', enName: 'Shenzhen', value: 4800, percent: 40 },
  { rank: 6, city: '武汉', enName: 'Wuhan', value: 4200, percent: 35 },
  { rank: 7, city: '成都', enName: 'Chengdu', value: 3600, percent: 30 },
  { rank: 8, city: '西安', enName: 'Xi\'an', value: 3100, percent: 26 },
];

function FormulaTooltip() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="p-1 rounded bg-white/5 hover:bg-white/10 transition-colors">
        <Info className="w-3 h-3 text-cyber-cyan" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full right-0 mt-2 w-56 p-3 glass-panel rounded-lg z-50">
            <div className="text-cyber-gold text-xs font-bold mb-1.5">引流指数公式</div>
            <div className="text-white/70 text-[10px] space-y-1">
              <p><span className="text-cyber-cyan">指数</span> = 当日访客 ÷ 平日基准 × 100</p>
              <div className="border-t border-white/10 pt-1 mt-1">
                <p className="text-white/50 text-[9px]">• <span className="text-cyber-gold">当日访客</span>：信令识别的非南京用户</p>
                <p className="text-white/50 text-[9px]">• <span className="text-cyber-gold">平日基准</span>：赛前30天同期均值</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TourismIndexCard() {
  return (
    <CyberBorder delay={0.2}>
      <div className="glass-panel rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-gradient-to-br from-cyber-cyan/20 to-cyber-cyan/5 flex items-center justify-center border border-cyber-cyan/30">
              <Users className="w-3.5 h-3.5 text-cyber-cyan" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">城市文旅引流指数</h3>
              <p className="text-white/40 text-[9px]">Tourism Attraction Index</p>
            </div>
          </div>
          <FormulaTooltip />
        </div>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="font-orbitron text-3xl font-bold text-white lcd-number">
            <CountUp end={35241} duration={2.5} separator="," />
          </span>
          <span className="text-white/50 text-sm">人</span>
        </div>

        <div className="text-[9px] text-white/40 bg-white/5 rounded px-2 py-1 mb-2">
          <span className="text-cyber-cyan">公式：</span>当日外地访客 ÷ 平日基准 × 100
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-cyber-red/15 px-2 py-1 rounded border border-cyber-red/30">
            <TrendingUp className="w-3 h-3 text-cyber-red" />
            <span className="text-cyber-red font-bold text-xs">+120%</span>
          </div>
          <span className="text-white/40 text-xs">较平日均值</span>
        </div>
      </div>
    </CyberBorder>
  );
}

function RankingBar({ item, index }) {
  const colors = ['from-cyber-gold to-yellow-400', 'from-yellow-400 to-cyber-cyan', 'from-cyber-cyan to-cyan-400', 'from-cyan-400 to-blue-400', 'from-blue-400 to-indigo-400', 'from-indigo-400 to-purple-400', 'from-purple-400 to-pink-400', 'from-pink-400 to-rose-400'];

  return (
    <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4, delay: index * 0.05 }}>
      <div className="flex items-center gap-2 mb-1">
        <div className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${item.rank <= 3 ? 'bg-gradient-to-br from-cyber-gold to-yellow-600 text-cyber-bg' : 'bg-white/10 text-white/50'}`}>
          {item.rank}
        </div>
        <div className="flex-1 flex items-center gap-1 min-w-0">
          <span className="text-white text-xs truncate">{item.city}</span>
          <span className="text-white/30 text-[9px] truncate">{item.enName}</span>
        </div>
        <div className="font-orbitron text-cyber-cyan text-xs">
          <CountUp end={item.value} duration={1.5} separator="," />
        </div>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden ml-7">
        <motion.div initial={{ width: 0 }} animate={{ width: `${item.percent}%` }} transition={{ duration: 1, delay: 0.3 + index * 0.05 }} className={`h-full rounded-full bg-gradient-to-r ${colors[index]} progress-shimmer`} />
      </div>
    </motion.div>
  );
}

function TopCitiesList() {
  const [activeTab, setActiveTab] = useState('national');
  const currentData = activeTab === 'national' ? nationalCities : jiangsuCities;

  return (
    <CyberBorder delay={0.3} className="flex-1 min-h-0">
      <div className="glass-panel rounded-lg p-4 h-full flex flex-col">
        <div className="flex items-center justify-between mb-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-gradient-to-br from-cyber-gold/20 to-cyber-gold/5 flex items-center justify-center border border-cyber-gold/30">
              <MapPin className="w-3.5 h-3.5 text-cyber-gold" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">球迷来源地 TOP8</h3>
              <p className="text-white/40 text-[9px]">Visitor Origins Ranking</p>
            </div>
          </div>

          <div className="flex bg-white/5 rounded p-0.5">
            {['national', 'jiangsu'].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-2.5 py-1 text-[10px] font-medium rounded transition-all ${activeTab === tab ? tab === 'national' ? 'bg-cyber-gold text-cyber-bg' : 'bg-cyber-cyan text-cyber-bg' : 'text-white/50 hover:text-white'}`}>
                {tab === 'national' ? '全国' : '省内'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3 flex-shrink-0">
          <div className={`text-[10px] px-2 py-0.5 rounded border ${activeTab === 'national' ? 'border-cyber-gold/30 text-cyber-gold bg-cyber-gold/10' : 'border-cyber-cyan/30 text-cyber-cyan bg-cyber-cyan/10'}`}>
            {activeTab === 'national' ? '全国流入' : '省内流动'}
          </div>
          <span className="text-white/30 text-[9px]">{activeTab === 'national' ? '信令跨省识别' : '省内信令聚合'}</span>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-cyber pr-1 min-h-0">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.15 }} className="space-y-2">
              {currentData.map((item, index) => (<RankingBar key={item.city} item={item} index={index} />))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </CyberBorder>
  );
}

export default function LeftPanel() {
  return (
    <div className="w-[320px] flex flex-col h-full p-3 gap-5">
      {/* 模块1：倒计时卡片（顶部，紧凑高度） */}
      <CountdownCard />
      
      {/* 模块2：文旅引流指数（中间，紧凑高度） */}
      <TourismIndexCard />
      
      {/* 模块3：球迷来源地（底部，flex:1填满剩余空间） */}
      <TopCitiesList />
    </div>
  );
}
