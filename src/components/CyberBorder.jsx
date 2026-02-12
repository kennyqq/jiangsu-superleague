import { motion } from 'framer-motion';

// 赛博朋克风格科技边框组件
export default function CyberBorder({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.6 }}
      className={`relative ${className}`}
    >
      {/* 主体内容 */}
      <div className="relative z-10 h-full">
        {children}
      </div>

      {/* 四角装饰 - 外角 */}
      <div className="absolute -top-0.5 -left-0.5 w-4 h-4 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-cyber-cyan/60" />
        <div className="absolute top-0 left-0 w-0.5 h-full bg-cyber-cyan/60" />
      </div>
      <div className="absolute -top-0.5 -right-0.5 w-4 h-4 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-0.5 bg-cyber-cyan/60" />
        <div className="absolute top-0 right-0 w-0.5 h-full bg-cyber-cyan/60" />
      </div>
      <div className="absolute -bottom-0.5 -left-0.5 w-4 h-4 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cyber-cyan/60" />
        <div className="absolute bottom-0 left-0 w-0.5 h-full bg-cyber-cyan/60" />
      </div>
      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-full h-0.5 bg-cyber-cyan/60" />
        <div className="absolute bottom-0 right-0 w-0.5 h-full bg-cyber-cyan/60" />
      </div>

      {/* 四角装饰 - 内角括号 */}
      <svg className="absolute -top-1 -left-1 w-6 h-6 pointer-events-none" viewBox="0 0 24 24" fill="none">
        <path d="M8 2H2V8" stroke="#00F0FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
      </svg>
      <svg className="absolute -top-1 -right-1 w-6 h-6 pointer-events-none" viewBox="0 0 24 24" fill="none">
        <path d="M16 2H22V8" stroke="#00F0FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
      </svg>
      <svg className="absolute -bottom-1 -left-1 w-6 h-6 pointer-events-none" viewBox="0 0 24 24" fill="none">
        <path d="M8 22H2V16" stroke="#00F0FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
      </svg>
      <svg className="absolute -bottom-1 -right-1 w-6 h-6 pointer-events-none" viewBox="0 0 24 24" fill="none">
        <path d="M16 22H22V16" stroke="#00F0FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
      </svg>

      {/* 发光效果 */}
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 30px rgba(0, 240, 255, 0.05)' }} />
    </motion.div>
  );
}

// 金色变体 - 用于特殊强调
export function GoldBorder({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.6 }}
      className={`relative ${className}`}
    >
      <div className="relative z-10 h-full">
        {children}
      </div>

      <div className="absolute -top-0.5 -left-0.5 w-4 h-4 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-cyber-gold/60" />
        <div className="absolute top-0 left-0 w-0.5 h-full bg-cyber-gold/60" />
      </div>
      <div className="absolute -top-0.5 -right-0.5 w-4 h-4 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-0.5 bg-cyber-gold/60" />
        <div className="absolute top-0 right-0 w-0.5 h-full bg-cyber-gold/60" />
      </div>
      <div className="absolute -bottom-0.5 -left-0.5 w-4 h-4 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cyber-gold/60" />
        <div className="absolute bottom-0 left-0 w-0.5 h-full bg-cyber-gold/60" />
      </div>
      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-full h-0.5 bg-cyber-gold/60" />
        <div className="absolute bottom-0 right-0 w-0.5 h-full bg-cyber-gold/60" />
      </div>

      <svg className="absolute -top-1 -left-1 w-6 h-6 pointer-events-none" viewBox="0 0 24 24" fill="none">
        <path d="M8 2H2V8" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
      </svg>
      <svg className="absolute -top-1 -right-1 w-6 h-6 pointer-events-none" viewBox="0 0 24 24" fill="none">
        <path d="M16 2H22V8" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
      </svg>
      <svg className="absolute -bottom-1 -left-1 w-6 h-6 pointer-events-none" viewBox="0 0 24 24" fill="none">
        <path d="M8 22H2V16" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
      </svg>
      <svg className="absolute -bottom-1 -right-1 w-6 h-6 pointer-events-none" viewBox="0 0 24 24" fill="none">
        <path d="M16 22H22V16" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
      </svg>

      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 30px rgba(255, 215, 0, 0.05)' }} />
    </motion.div>
  );
}
