import { motion } from 'framer-motion';
import LeftPanelP3 from './LeftPanelP3';
import RightPanelP3 from './RightPanelP3';
import BattleReportCard from './components/BattleReportCard';
import PlaybackTimeline from './components/PlaybackTimeline';

export default function EvaluationView() {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden relative">
      {/* 背景图 - 城市夜景 */}
      <div 
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{ 
          backgroundImage: "url('/city_night_top_view.jpg')",
          filter: "brightness(0.4) contrast(1.1)",
        }} 
      />
      
      {/* 暗角效果 */}
      <div 
        className="absolute inset-0 pointer-events-none -z-5"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* 主布局 */}
      <div className="flex-1 flex overflow-hidden p-4 gap-4">
        <LeftPanelP3 />
        
        {/* 中心舞台 - 战报卡片 */}
        <div className="flex-1 flex items-center justify-center relative">
          <BattleReportCard />
        </div>
        
        <RightPanelP3 />
      </div>

      {/* 底部回放时间轴 */}
      <div className="h-24 px-4 pb-4">
        <PlaybackTimeline />
      </div>
    </div>
  );
}
