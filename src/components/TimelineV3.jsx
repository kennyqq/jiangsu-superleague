import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Calendar, ChevronLeft, ChevronRight, Users, Wifi, Smartphone } from 'lucide-react';

// 模拟数据生成器
const generateData = (baseValue, variance, length) => {
  return Array.from({ length }, (_, i) => {
    const hour = 18 + Math.floor(i / 4);
    const minute = (i % 4) * 15;
    const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    const value = baseValue + Math.sin(i / 3) * variance + Math.random() * variance * 0.3;
    return { time, value: Math.max(0, Math.round(value)), label: i === 10 ? '进球' : '' };
  });
};

// 指标配置
const metricsConfig = {
  crowd: {
    id: 'crowd',
    label: '人流',
    enLabel: 'Crowd Flow',
    icon: Users,
    color: '#00F0FF',
    unit: '万人',
    data: generateData(5, 3, 17), // 18:00-22:00, 15分钟粒度
  },
  traffic: {
    id: 'traffic',
    label: '话务',
    enLabel: 'Traffic',
    icon: Wifi,
    color: '#FFD700',
    unit: 'TB',
    data: generateData(8, 4, 17),
  },
  fiveGA: {
    id: 'fiveGA',
    label: '5G-A',
    enLabel: '5G-A Ultra',
    icon: Smartphone,
    color: '#FF6B9D',
    unit: 'Gbps',
    data: generateData(2, 1.5, 17),
  },
};

// 历史日期数据
const historyDates = [
  { date: '2026-05-02', label: '5月2日', match: '南京 2:1 常州' },
  { date: '2026-04-26', label: '4月26日', match: '南京 1:0 苏州' },
  { date: '2026-04-19', label: '4月19日', match: '南京 3:2 无锡' },
];

export default function TimelineV3({ 
  pageType = 'p0', // p0, p1, p2, p3
  defaultMetric = 'crowd',
  onTimeChange 
}) {
  const [currentDateIndex, setCurrentDateIndex] = useState(0);
  const [currentMetric, setCurrentMetric] = useState(defaultMetric);
  const [currentIndex, setCurrentIndex] = useState(10); // 默认在20:45
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const metric = metricsConfig[currentMetric];
  const timeData = metric.data;
  const currentData = timeData[currentIndex];
  const currentDate = historyDates[currentDateIndex];

  // 根据页面类型限制可选指标
  const availableMetrics = {
    p0: ['crowd'],
    p1: ['traffic'],
    p2: ['traffic'],
    p3: ['crowd', 'traffic', 'fiveGA'],
  }[pageType] || ['crowd'];

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
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeData, onTimeChange]);

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

  const handleDateChange = (index) => {
    setCurrentDateIndex(index);
    setShowDatePicker(false);
    setCurrentIndex(0);
  };

  const handleMetricChange = (metricId) => {
    setCurrentMetric(metricId);
    setCurrentIndex(0);
  };

  const maxValue = Math.max(...timeData.map(d => d.value));

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[70%] max-w-[1000px] z-50">
      <div className="glass-panel rounded-xl p-3 border border-cyber-cyan/20">
        <div className="flex items-center gap-3">
          {/* 日期选择器 */}
          <div className="relative">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-cyber-cyan/50 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-cyber-cyan" />
              <span className="text-white text-xs">{currentDate.label}</span>
              <ChevronLeft className="w-3 h-3 text-white/40 rotate-90" />
            </button>
            
            <AnimatePresence>
              {showDatePicker && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full left-0 mb-2 w-48 glass-panel rounded-lg border border-cyber-cyan/30 overflow-hidden"
                >
                  {historyDates.map((d, i) => (
                    <button
                      key={d.date}
                      onClick={() => handleDateChange(i)}
                      className={`w-full px-3 py-2 text-left text-xs transition-colors ${
                        i === currentDateIndex 
                          ? 'bg-cyber-cyan/20 text-cyber-cyan' 
                          : 'text-white/70 hover:bg-white/5'
                      }`}
                    >
                      <div className="font-medium">{d.label}</div>
                      <div className="text-white/40 text-[10px]">{d.match}</div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 指标切换按钮 (仅在P3显示，或根据配置) */}
          {availableMetrics.length > 1 && (
            <div className="flex items-center gap-1 bg-white/5 rounded-lg p-0.5">
              {availableMetrics.map((metricId) => {
                const m = metricsConfig[metricId];
                const Icon = m.icon;
                return (
                  <button
                    key={metricId}
                    onClick={() => handleMetricChange(metricId)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs transition-all ${
                      currentMetric === metricId
                        ? 'bg-cyber-cyan/20 text-cyber-cyan'
                        : 'text-white/50 hover:text-white/70'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* 播放控制 */}
          <div className="flex items-center gap-1">
            <button
              onClick={handlePlay}
              className="w-8 h-8 rounded-full bg-cyber-cyan/20 border border-cyber-cyan/50 flex items-center justify-center hover:bg-cyber-cyan/30 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 text-cyber-cyan" />
              ) : (
                <Play className="w-3.5 h-3.5 text-cyber-cyan ml-0.5" />
              )}
            </button>
            <button
              onClick={handleReset}
              className="w-8 h-8 rounded-full bg-white/5 border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <RotateCcw className="w-3 h-3 text-white/60" />
            </button>
          </div>

          {/* 时间显示 */}
          <div className="flex-shrink-0 text-center min-w-[70px]">
            <div className="text-xl font-bold font-orbitron" style={{ color: metric.color }}>
              {currentData.time}
            </div>
            {currentData.label && (
              <div className="text-[10px] text-yellow-400">{currentData.label}</div>
            )}
          </div>

          {/* 图表区域 */}
          <div className="flex-1 relative h-14">
            {/* 背景柱状图 */}
            <div className="absolute inset-0 flex items-end justify-between px-1">
              {timeData.map((d, i) => (
                <motion.div
                  key={i}
                  className="w-[5%] rounded-t-sm transition-all duration-300"
                  style={{
                    height: `${(d.value / maxValue) * 100}%`,
                    backgroundColor: i === currentIndex 
                      ? metric.color
                      : i < currentIndex 
                        ? `${metric.color}40`
                        : 'rgba(255,255,255,0.08)',
                  }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: i * 0.02 }}
                />
              ))}
            </div>

            {/* 滑块轨道 */}
            <div className="absolute inset-0 flex items-center">
              <input
                type="range"
                min={0}
                max={timeData.length - 1}
                step={1}
                value={currentIndex}
                onChange={handleSliderChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
              
              {/* 进度线 */}
              <div className="w-full h-0.5 bg-white/10 rounded-full">
                <motion.div 
                  className="h-full rounded-full"
                  style={{ 
                    width: `${(currentIndex / (timeData.length - 1)) * 100}%`,
                    backgroundColor: metric.color
                  }}
                />
              </div>
              
              {/* 滑块 */}
              <motion.div 
                className="absolute top-1/2 w-4 h-4 rounded-full border-2 border-white shadow-lg z-10"
                style={{ 
                  left: `${(currentIndex / (timeData.length - 1)) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: metric.color,
                  boxShadow: `0 0 10px ${metric.color}`
                }}
              />
            </div>

            {/* 时间刻度 */}
            <div className="absolute -bottom-1 left-0 right-0 flex justify-between px-1">
              {timeData.filter((_, i) => i % 4 === 0).map((d, i) => (
                <span key={i} className="text-[9px] text-white/40">
                  {d.time}
                </span>
              ))}
            </div>
          </div>

          {/* 当前数值 */}
          <div className="flex-shrink-0 text-right min-w-[80px]">
            <div className="text-white/40 text-[10px]">当前{metric.label}</div>
            <div className="flex items-baseline gap-1 justify-end">
              <span className="text-lg font-bold font-orbitron" style={{ color: metric.color }}>
                {currentData.value}
              </span>
              <span className="text-white/50 text-xs">{metric.unit}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
