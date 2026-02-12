import { motion } from 'framer-motion';
import LeftPanelP2 from './LeftPanelP2';
import RightPanelP2 from './RightPanelP2';
import CenterStage from './components/CenterStage';
import TimelineUnified from '../../components/TimelineUnified';

export default function VenueMicro() {
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
      <div className="relative z-10 flex flex-col h-full pb-20">
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
              <div className="decor-en">Network-Business Synergy</div>
            </div>

            {/* 地图容器 */}
            <div className="flex-1 relative mx-3 rounded-2xl overflow-hidden border border-cyber-gold/30 corner-bracket" 
              style={{ boxShadow: '0 0 50px rgba(255, 215, 0, 0.1), inset 0 0 100px rgba(255, 215, 0, 0.03)' }}
            >
              {/* 四角装饰 */}
              <span className="absolute top-0 left-0 w-6 h-6 border-l border-t border-cyber-gold/60 z-10" />
              <span className="absolute top-0 right-0 w-6 h-6 border-r border-t border-cyber-gold/60 z-10" />
              <span className="absolute bottom-0 left-0 w-6 h-6 border-l border-b border-cyber-gold/60 z-10" />
              <span className="absolute bottom-0 right-0 w-6 h-6 border-r border-b border-cyber-gold/60 z-10" />
              
              {/* 中心舞台 - 体育场内部视图 */}
              <CenterStage />
            </div>
          </motion.div>

          {/* 右侧 - 体验与运维 */}
          <RightPanelP2 />
        </div>
      </div>

      {/* 统一全功能导航条 */}
      <TimelineUnified 
        onTimeChange={(time) => console.log('P2 Time:', time)}
        onMetricChange={(metric) => console.log('P2 Metric:', metric)}
        onDateChange={(date) => console.log('P2 Date:', date)}
      />
    </div>
  );
}
