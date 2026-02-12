import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import MigrationMap from './components/MigrationMap';
import GlobalDefense from './pages/P1/GlobalDefense';
import VenueMicro from './pages/P2/VenueMicro';
import EvaluationView from './pages/P3/EvaluationView';

// P0 宏观溯源视图
function MacroOriginView() {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <div className="flex-1 flex overflow-hidden">
        <LeftPanel />
        
        {/* 中央地图区域 - 为底部回放条预留空间 */}
        <div className="flex-1 flex flex-col relative py-2 pb-0">
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-center mb-1 flex-shrink-0">
            <div className="text-cyber-gold text-lg font-bold tracking-[0.3em]" style={{ textShadow: '0 0 20px rgba(255, 215, 0, 0.5)' }}>
              "一张网，火一座城"
            </div>
            <div className="text-white/40 text-xs mt-0.5 tracking-wider">一场球赛，点燃一座城市的热情</div>
          </motion.div>

          {/* 地图容器 - 留出底部空间给回放条 */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex-1 relative mx-2 mb-2 min-h-0">
            <div className="absolute inset-0 rounded-xl overflow-visible border border-cyber-cyan/20" style={{ boxShadow: '0 0 40px rgba(0, 240, 255, 0.08)' }}>
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-cyber-cyan/50" />
              <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-cyber-cyan/50" />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-cyber-cyan/50" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-cyber-cyan/50" />
              <MigrationMap />
            </div>
          </motion.div>
        </div>

        <RightPanel />
      </div>
    </div>
  );
}

// 主应用组件
function AppContent() {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  // 4K响应式适配
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const designWidth = 1920;
      const designHeight = 1080;
      const newScale = Math.min(windowWidth / designWidth, windowHeight / designHeight);
      setScale(newScale);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-cyber-bg flex items-center justify-center">
      {/* 背景层 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] opacity-25" 
          style={{ background: 'radial-gradient(circle, rgba(0, 240, 255, 0.08) 0%, transparent 50%)' }} 
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-15" 
          style={{ background: 'radial-gradient(ellipse at top, rgba(0, 240, 255, 0.25) 0%, transparent 60%)' }} 
        />
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-50" 
          style={{ background: 'linear-gradient(to top, rgba(11, 15, 25, 1) 0%, transparent 100%)' }} 
        />
        <div className="absolute inset-0 opacity-[0.02]" 
          style={{ backgroundImage: `linear-gradient(rgba(0, 240, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 1) 1px, transparent 1px)`, backgroundSize: '50px 50px' }} 
        />
      </div>

      {/* 主容器 */}
      <div 
        ref={containerRef}
        className="relative origin-center"
        style={{
          width: '1920px',
          height: '1080px',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        <div className="relative z-10 flex flex-col h-full">
          <Header />
          
          <div className="flex-1 relative overflow-hidden">
            <Routes>
              <Route path="/" element={<MacroOriginView />} />
              <Route path="/p0" element={<MacroOriginView />} />
              <Route path="/p1" element={<GlobalDefense />} />
              <Route path="/p2" element={<VenueMicro />} />
              <Route path="/p3" element={<EvaluationView />} />
            </Routes>
          </div>
        </div>

        {/* 扫描线 */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-50"
          style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(0, 240, 255, 0.01) 50%)', backgroundSize: '100% 3px' }}
          animate={{ backgroundPosition: ['0px 0px', '0px 3px'] }}
          transition={{ duration: 0.4, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
