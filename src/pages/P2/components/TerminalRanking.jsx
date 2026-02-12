import { motion } from 'framer-motion';
import { Smartphone, Palette } from 'lucide-react';

// 缺口圆环组件
function ArcProgress({ value, color = '#A855F7' }) {
  const radius = 40;
  const strokeWidth = 6;
  const normalizedValue = value / 100;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - (normalizedValue * arcLength);
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 100 90">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
          strokeDasharray={arcLength}
          strokeDashoffset={circumference * 0.25}
          strokeLinecap="round"
          transform="rotate(135 50 50)"
        />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={arcLength}
          initial={{ strokeDashoffset: arcLength }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
          transform="rotate(135 50 50)"
          style={{ filter: `drop-shadow(0 0 4px ${color})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold" style={{ color, fontFamily: 'Orbitron, monospace' }}>
          {value}%
        </span>
      </div>
    </div>
  );
}

const terminals = [
  { rank: 1, name: '华为 Mate 60 Pro', supports5GA: false },
  { rank: 2, name: '苹果 iPhone 15 Pro', supports5GA: true },
  { rank: 3, name: '荣耀 Magic 6', supports5GA: false },
  { rank: 4, name: '小米 14 Pro', supports5GA: true },
  { rank: 5, name: 'vivo X100 Pro', supports5GA: true },
];

export default function TerminalRanking() {
  return (
    <div className="h-full flex flex-row gap-4">
      {/* 左侧：UE Logo支持率 - 缺口圆环 (40%) */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-[40%] flex flex-col"
      >
        <div className="flex items-center gap-2 mb-1">
          <Palette className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-white/70 text-xs">UE Logo支持率</span>
        </div>
        
        <div className="flex-1 min-h-0 py-2">
          <ArcProgress value={60} color="#A855F7" />
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
          <span className="text-white/70 text-xs">TOP终端排行</span>
        </div>
        
        {/* 表头 */}
        <div className="flex items-center text-white/40 text-[10px] px-1 pb-1 border-b border-white/10">
          <span className="w-5">#</span>
          <span className="flex-1">终端型号</span>
          <span className="w-12 text-right"></span>
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

              {/* 5G-A标签 - 只显示支持的 */}
              <div className="w-12 text-right">
                {item.supports5GA && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 font-bold">
                    5G-A
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
