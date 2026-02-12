import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

// 模拟各时段数据
const timeData = [
  { time: '18:00', label: '开场前', value: 15 },
  { time: '18:30', label: '入场', value: 35 },
  { time: '19:00', label: '高峰', value: 68 },
  { time: '19:30', label: '开赛', value: 82 },
  { time: '20:00', label: '上半场', value: 95 },
  { time: '20:45', label: '进球', value: 100, highlight: true },
  { time: '21:00', label: '下半场', value: 88 },
  { time: '21:30', label: '终场', value: 45 },
  { time: '22:00', label: '散场', value: 25 },
];

export default function TimelineV2({ onTimeChange }) {
  const [currentIndex, setCurrentIndex] = useState(5);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= timeData.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          onTimeChange?.(timeData[prev + 1].time);
          return prev + 1;
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, onTimeChange]);

  const handlePlay = () => setIsPlaying(!isPlaying);
  
  const handleReset = () => {
    setCurrentIndex(0);
    setIsPlaying(false);
    onTimeChange?.(timeData[0].time);
  };

  const handleSliderChange = (e) => {
    const index = parseInt(e.target.value);
    setCurrentIndex(index);
    onTimeChange?.(timeData[index].time);
  };

  const currentData = timeData[currentIndex];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[60%] max-w-[900px] z-50">
      <div className="glass-panel rounded-xl p-4 border border-cyber-cyan/20">
        <div className="flex items-center gap-4">
          {/* 控制按钮 */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handlePlay}
              className="w-9 h-9 rounded-full bg-cyber-cyan/20 border border-cyber-cyan/50 flex items-center justify-center hover:bg-cyber-cyan/30 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-cyber-cyan" />
              ) : (
                <Play className="w-4 h-4 text-cyber-cyan ml-0.5" />
              )}
            </button>
            <button
              onClick={handleReset}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-white/60" />
            </button>
          </div>

          {/* 时间显示 */}
          <div className="flex-shrink-0 text-center min-w-[80px]">
            <div className="text-cyber-cyan text-lg font-bold font-orbitron">
              {currentData.time}
            </div>
            <div className={`text-[10px] ${currentData.highlight ? 'text-yellow-400' : 'text-white/50'}`}>
              {currentData.label}
            </div>
          </div>

          {/* 图表区域 */}
          <div className="flex-1 relative">
            {/* 背景柱状图 */}
            <div className="absolute inset-0 flex items-end justify-between px-2 pb-6 pointer-events-none">
              {timeData.map((d, i) => (
                <motion.div
                  key={i}
                  className="w-[8%] rounded-t-sm transition-all duration-300"
                  style={{
                    height: `${d.value}%`,
                    backgroundColor: i === currentIndex 
                      ? 'rgba(255, 215, 0, 0.4)' 
                      : i < currentIndex 
                        ? 'rgba(0, 240, 255, 0.25)' 
                        : 'rgba(255, 255, 255, 0.08)',
                  }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: i * 0.05 }}
                />
              ))}
            </div>

            {/* 滑块轨道 */}
            <div className="relative h-8 flex items-center">
              <input
                type="range"
                min={0}
                max={timeData.length - 1}
                step={1}
                value={currentIndex}
                onChange={handleSliderChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
              
              {/* 轨道线 */}
              <div className="w-full h-0.5 bg-white/10 rounded-full">
                <motion.div 
                  className="h-full bg-gradient-to-r from-cyber-cyan to-yellow-400 rounded-full"
                  style={{ width: `${(currentIndex / (timeData.length - 1)) * 100}%` }}
                  layoutId="timelineProgress"
                />
              </div>
              
              {/* 滑块节点 */}
              <motion.div 
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-cyber-cyan border-2 border-white shadow-[0_0_10px_rgba(0,240,255,0.8)] z-10"
                style={{ 
                  left: `${(currentIndex / (timeData.length - 1)) * 100}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                layoutId="timelineKnob"
              />
            </div>

            {/* 时间刻度 */}
            <div className="flex justify-between mt-2 px-1">
              {timeData.map((d, i) => (
                <div
                  key={i}
                  className={`text-[9px] transition-colors ${
                    i === currentIndex ? 'text-cyber-cyan font-bold' : 
                    i < currentIndex ? 'text-white/60' : 'text-white/30'
                  }`}
                  style={{ width: '11%' }}
                >
                  {d.time}
                </div>
              ))}
            </div>
          </div>

          {/* 流量强度 */}
          <div className="flex-shrink-0 text-right min-w-[100px]">
            <div className="text-white/40 text-[10px]">当前负载</div>
            <div className="flex items-center gap-2">
              <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-cyber-cyan to-yellow-400 rounded-full"
                  animate={{ width: `${currentData.value}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className="text-white/70 text-xs font-orbitron">{currentData.value}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
