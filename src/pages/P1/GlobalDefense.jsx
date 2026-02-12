import { useState } from 'react';
import { motion } from 'framer-motion';
import DigitalTwinMap from './DigitalTwinMap';
import LeftPanelP1 from './LeftPanelP1';
import RightPanelP1 from './RightPanelP1';
import TimeSlider from './TimeSlider';
import SiteDetailModal from './components/SiteDetailModal';

export default function GlobalDefense() {
  const [currentTime, setCurrentTime] = useState('20:00');
  const [timeIndex, setTimeIndex] = useState(8);
  const [selectedStation, setSelectedStation] = useState(null);

  const handleTimeChange = (time, index) => {
    setCurrentTime(time);
    setTimeIndex(index);
  };

  const handleStationClick = (station) => {
    setSelectedStation(station);
  };

  const handleCloseModal = () => {
    setSelectedStation(null);
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* 背景效果 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] opacity-20" 
          style={{ background: 'radial-gradient(circle, rgba(0, 240, 255, 0.1) 0%, transparent 50%)' }} 
        />
        <div className="absolute inset-0 opacity-[0.015]" 
          style={{ backgroundImage: `linear-gradient(rgba(0, 240, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 1) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} 
        />
      </div>

      {/* 主内容区 */}
      <div className="relative z-10 flex flex-col h-full">
        {/* 中部内容区 */}
        <div className="flex-1 flex overflow-hidden">
          {/* 左侧 - 5G-A 资源与韧性 */}
          <LeftPanelP1 />

          {/* C位数字孪生地图 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex-1 flex flex-col relative"
          >
            {/* 顶部标语 */}
            <div className="text-center py-3">
              <motion.div 
                className="text-transparent text-xl font-bold tracking-[0.4em]"
                style={{ 
                  background: 'linear-gradient(90deg, #00F0FF 0%, #FFFFFF 50%, #00F0FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 30px rgba(0, 240, 255, 0.3)',
                }}
              >
                "看得清态势，防得住隐患"
              </motion.div>
              <div className="text-white/40 text-xs mt-1 tracking-widest">
                态势感知 · 风险防控
              </div>
            </div>

            {/* 地图容器 */}
            <div className="flex-1 relative mx-3 mb-2 rounded-2xl overflow-hidden border border-cyber-cyan/20" 
              style={{ boxShadow: '0 0 50px rgba(0, 240, 255, 0.1), inset 0 0 100px rgba(0, 240, 255, 0.03)' }}
            >
              {/* 四角装饰 */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyber-cyan/60 z-10" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyber-cyan/60 z-10" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyber-cyan/60 z-10" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyber-cyan/60 z-10" />
              
              {/* 数字孪生地图 - 传递点击回调 */}
              <DigitalTwinMap 
                currentTime={currentTime} 
                timeIndex={timeIndex}
                onStationClick={handleStationClick}
              />
            </div>
          </motion.div>

          {/* 右侧 - 业务质量洞察 */}
          <RightPanelP1 />
        </div>

        {/* 底部集成趋势时间线 */}
        <TimeSlider onTimeChange={handleTimeChange} currentTimeIndex={timeIndex} />
      </div>

      {/* 站点详情模态框 */}
      <SiteDetailModal 
        station={selectedStation} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}
