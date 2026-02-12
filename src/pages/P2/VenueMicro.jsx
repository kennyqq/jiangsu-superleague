import { useState } from 'react';
import { motion } from 'framer-motion';
import LeftPanelP2 from './LeftPanelP2';
import RightPanelP2 from './RightPanelP2';
import CenterStage from './components/CenterStage';
import TimeSlider from '../P1/TimeSlider';

export default function VenueMicro() {
  const [currentTime, setCurrentTime] = useState('20:00');
  const [timeIndex, setTimeIndex] = useState(8);

  const handleTimeChange = (time, index) => {
    setCurrentTime(time);
    setTimeIndex(index);
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* 背景效果 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] opacity-20" 
          style={{ background: 'radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 50%)' }} 
        />
        <div className="absolute inset-0 opacity-[0.015]" 
          style={{ backgroundImage: `linear-gradient(rgba(255, 215, 0, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 215, 0, 1) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} 
        />
      </div>

      {/* 主内容区 */}
      <div className="relative z-10 flex flex-col h-full">
        {/* 中部内容区 */}
        <div className="flex-1 flex overflow-hidden">
          {/* 左侧 - 商业变现洞察 */}
          <LeftPanelP2 />

          {/* C位 - 体育场内部数字孪生 */}
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
                  background: 'linear-gradient(90deg, #FFD700 0%, #FFFFFF 50%, #FFD700 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 30px rgba(255, 215, 0, 0.3)',
                }}
              >
                "网业协同，体验变现"
              </motion.div>
              <div className="text-white/40 text-xs mt-1 tracking-widest">
                Network-Business Synergy, Experience Monetization
              </div>
            </div>

            {/* 地图容器 */}
            <div className="flex-1 relative mx-3 mb-2 rounded-2xl overflow-hidden border border-cyber-gold/30" 
              style={{ boxShadow: '0 0 50px rgba(255, 215, 0, 0.1), inset 0 0 100px rgba(255, 215, 0, 0.03)' }}
            >
              {/* 四角装饰 */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyber-gold/60 z-10" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyber-gold/60 z-10" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyber-gold/60 z-10" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyber-gold/60 z-10" />
              
              {/* 中心舞台 - 体育场内部视图 */}
              <CenterStage />
            </div>
          </motion.div>

          {/* 右侧 - 体验与运维 */}
          <RightPanelP2 />
        </div>

        {/* 底部时间轴 */}
        <TimeSlider onTimeChange={handleTimeChange} currentTimeIndex={timeIndex} />
      </div>
    </div>
  );
}
