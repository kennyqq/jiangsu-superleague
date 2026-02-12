import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Sun } from 'lucide-react';

const navItems = [
  { path: '/p0', label: '宏观溯源' },
  { path: '/p1', label: '全局态势' },
  { path: '/p2', label: '场内微观' },
  { path: '/p3', label: '评估闭环' },
];

export default function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const location = useLocation();
  const currentPath = location.pathname || '/p0';

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const formatDate = (date) => date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="h-[70px] flex items-center justify-between px-8 relative z-50"
      style={{ background: 'linear-gradient(180deg, rgba(11, 15, 25, 0.98) 0%, rgba(11, 15, 25, 0.9) 100%)', borderBottom: '1px solid rgba(0, 240, 255, 0.15)' }}
    >
      {/* LEFT - Title (24px, 600 weight, Cyan Gradient) */}
      <motion.div 
        initial={{ x: -50, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex items-center gap-3 w-[380px]"
      >
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyber-cyan to-cyber-blue flex items-center justify-center shadow-glow-cyan">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-cyber-bg" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <h1 
          className="text-[24px] font-semibold tracking-wide"
          style={{ 
            background: 'linear-gradient(90deg, #FFFFFF 0%, #00F0FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          江苏移动苏超智能化指挥中心
        </h1>
      </motion.div>

      {/* CENTER - Navigation Only (Empty for visual focus) */}
      <div className="flex items-center justify-center flex-1">
        <nav className="flex items-center gap-1">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ y: -10, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.4 + index * 0.08, duration: 0.4 }}
            >
              <Link
                to={item.path}
                className={`relative px-5 py-2 text-sm font-medium transition-all duration-300 rounded block ${
                  currentPath === item.path ? 'text-cyber-cyan' : 'text-white/50 hover:text-white/80'
                }`}
              >
                {currentPath === item.path && (
                  <motion.div 
                    layoutId="activeTab" 
                    className="absolute inset-0 bg-cyber-cyan/10 border border-cyber-cyan/40 rounded"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 tracking-wider">{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>

      {/* RIGHT - System Info */}
      <motion.div 
        initial={{ x: 50, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex items-center gap-5 w-[380px] justify-end"
      >
        {/* Date */}
        <div className="text-right">
          <div className="text-white/80 text-sm font-medium">{formatDate(currentTime)}</div>
        </div>
        
        {/* Time */}
        <div className="text-right">
          <div className="font-orbitron text-xl font-bold text-cyber-cyan tracking-wider">{formatTime(currentTime)}</div>
        </div>

        {/* Weather */}
        <div className="flex items-center gap-2 text-white/60 px-3 py-1.5 rounded-lg bg-white/5">
          <Sun className="w-4 h-4 text-cyber-gold" />
          <span className="text-sm">24°C</span>
        </div>

        {/* Admin */}
        <div className="text-white/60 text-sm">Admin</div>
      </motion.div>

      {/* 底部装饰线 */}
      <div className="absolute bottom-0 left-0 w-full h-[1px]">
        <div className="absolute left-0 w-1/4 h-full bg-gradient-to-r from-cyber-cyan to-transparent" />
        <div className="absolute right-0 w-1/4 h-full bg-gradient-to-l from-cyber-cyan to-transparent" />
        <div className="absolute left-1/2 -translate-x-1/2 w-1/3 h-full bg-gradient-to-r from-transparent via-cyber-cyan/30 to-transparent" />
      </div>
    </motion.header>
  );
}
