import { motion } from 'framer-motion';

const pyramidData = [
  { 
    label: '场馆包用户', 
    value: 200, 
    color: '#FFD700',
    bgGradient: 'from-yellow-400 to-yellow-600',
    width: '30%',
  },
  { 
    label: '全球通金卡', 
    value: 1500, 
    color: '#C0C0C0',
    bgGradient: 'from-gray-300 to-gray-500',
    width: '55%',
  },
  { 
    label: '普通用户', 
    value: 48000, 
    color: '#0055FF',
    bgGradient: 'from-blue-400 to-blue-600',
    width: '85%',
  },
];

export default function PyramidChart() {
  return (
    <div className="h-[240px] flex flex-col items-center justify-end pb-2">
      {/* 金字塔 - 从顶到底渲染 */}
      <div className="flex flex-col items-center gap-2 w-full">
        {pyramidData.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="relative group"
            style={{ width: item.width }}
          >
            {/* 金字塔层级 */}
            <div
              className={`h-12 rounded-lg bg-gradient-to-r ${item.bgGradient} flex items-center justify-center shadow-lg cursor-pointer transition-all duration-300 group-hover:brightness-110`}
              style={{
                boxShadow: `0 4px 20px ${item.color}40`,
                clipPath: index === 0 
                  ? 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' // 顶层梯形
                  : index === 2 
                    ? 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)' // 底层更宽
                    : 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)', // 中层
              }}
            >
              <div className="text-center z-10">
                <div className="text-white font-bold text-sm drop-shadow-md">
                  {item.label}
                </div>
                <div className="text-white/90 text-xs font-mono drop-shadow-md">
                  {item.value.toLocaleString()}人
                </div>
              </div>
            </div>

            {/* 悬停提示 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none"
            >
              占比: {((item.value / 49700) * 100).toFixed(1)}%
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* 底部总数 */}
      <div className="mt-4 text-center">
        <div className="text-white/50 text-xs">总用户数</div>
        <div className="font-orbitron text-xl text-cyber-cyan font-bold">
          49,700
        </div>
      </div>
    </div>
  );
}
