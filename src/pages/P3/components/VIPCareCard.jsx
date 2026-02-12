import { motion } from 'framer-motion';
import { Smartphone, ChevronRight, Sparkles } from 'lucide-react';

export default function VIPCareCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="relative"
    >
      {/* 手机外框 */}
      <div className="bg-gray-800 rounded-3xl p-2 border-2 border-gray-600 shadow-2xl">
        {/* 手机屏幕 */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl p-4 min-h-[180px] relative overflow-hidden">
          {/* 状态栏 */}
          <div className="flex items-center justify-between mb-3 text-[10px] text-white/60">
            <span>22:30</span>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span>5G-A</span>
              <span>85%</span>
            </div>
          </div>

          {/* 通知卡片 */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="bg-gradient-to-r from-yellow-500/20 to-amber-500/10 rounded-xl p-3 border border-yellow-500/30 relative"
          >
            {/* 应用图标 */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-white/80 text-xs font-medium">江苏移动</span>
                  <span className="text-white/40 text-[10px]">刚刚</span>
                </div>
                
                <div className="text-white text-sm font-medium mb-1 leading-tight">
                  尊贵的钻白卡用户
                </div>
                
                <div className="text-white/70 text-xs leading-relaxed mb-2">
                  昨晚智能体为您的 <span className="text-cyan-400">微信视频/直播</span> 业务进行了专属加速 🚀
                </div>
                
                {/* 高亮标签 */}
                <div className="flex items-center gap-1 bg-yellow-500/20 rounded-lg px-2 py-1.5 w-fit">
                  <Sparkles className="w-3 h-3 text-yellow-400" />
                  <span className="text-yellow-400 text-[10px] font-bold">
                    您的体验超越了现场 99% 的用户
                  </span>
                </div>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex items-center justify-end mt-2 pt-2 border-t border-white/10">
              <button className="flex items-center gap-1 text-cyan-400 text-xs hover:text-cyan-300 transition-colors">
                查看详情
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>

          {/* 底部 home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-white/30 rounded-full" />
        </div>
      </div>

      {/* 装饰光效 */}
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400/50 rounded-full blur-md" />
    </motion.div>
  );
}
