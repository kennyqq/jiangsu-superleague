import { motion } from 'framer-motion';
import { Trophy, Users, Database, Award, Ticket } from 'lucide-react';

const coreMetrics = [
  { label: '奥体球迷峰值', value: '65,328', unit: '人', icon: Users, trend: '历史新高', color: '#FFD700' },
  { label: '峰值话务量', value: '15.8', unit: 'TB', icon: Database, color: '#00F0FF' },
  { label: '5G-A 场馆包', value: '850', unit: '份', icon: Ticket, color: '#00FF88' },
];

export default function BattleReportCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative"
    >
      {/* 外发光边框 */}
      <div 
        className="absolute -inset-1 rounded-2xl opacity-60 blur-md"
        style={{
          background: 'linear-gradient(135deg, #FFD700 0%, #00F0FF 50%, #FFD700 100%)',
        }}
      />
      
      {/* 粒子效果背景 */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-yellow-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* 主卡片 */}
      <div className="relative glass-panel rounded-2xl p-8 border-2 border-yellow-500/50 min-w-[520px]">
        {/* 顶部标题 */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-3 mb-2"
          >
            <Trophy className="w-8 h-8 text-yellow-400" />
            <h1 className="text-2xl font-bold text-white tracking-wider">
              2026 苏超联赛 · 通信保障总结战报
            </h1>
            <Trophy className="w-8 h-8 text-yellow-400" />
          </motion.div>
          <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
        </div>

        {/* 比赛信息 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-8"
        >
          <div className="text-yellow-400/80 text-sm mb-2">5月2日</div>
          <div className="flex items-center justify-center gap-6 mb-3">
            <span className="text-xl text-white font-bold">南京城市</span>
            <div className="flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-lg border border-yellow-500/30">
              <span className="text-3xl font-bold text-yellow-400 font-orbitron">2</span>
              <span className="text-white/60">:</span>
              <span className="text-3xl font-bold text-white/80 font-orbitron">1</span>
            </div>
            <span className="text-xl text-white/70 font-bold">常州队</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-green-400 text-sm font-bold">主场胜利</span>
            <span className="text-2xl">🏆</span>
          </div>
        </motion.div>

        {/* 核心指标 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {coreMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="text-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-yellow-500/30 transition-colors"
            >
              <metric.icon className="w-6 h-6 mx-auto mb-2" style={{ color: metric.color }} />
              <div className="text-white/60 text-xs mb-1">{metric.label}</div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-2xl font-bold font-orbitron" style={{ color: metric.color }}>
                  {metric.value}
                </span>
                <span className="text-white/60 text-sm">{metric.unit}</span>
              </div>
              {metric.trend && (
                <div className="text-yellow-400 text-[10px] mt-1">{metric.trend}</div>
              )}
            </motion.div>
          ))}
        </div>

        {/* 底部印章 */}
        <motion.div
          initial={{ opacity: 0, scale: 1.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: 'spring' }}
          className="flex items-center justify-center gap-2"
        >
          <div className="px-6 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-2 border-yellow-500/50">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold tracking-widest">S级保障 · 圆满完成</span>
              <Award className="w-5 h-5 text-yellow-400" />
            </div>
          </div>
        </motion.div>

        {/* 角落装饰 */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-yellow-500/50" />
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-yellow-500/50" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-yellow-500/50" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-yellow-500/50" />
      </div>
    </motion.div>
  );
}
