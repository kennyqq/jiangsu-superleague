import { useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import { Play, Pause, SkipBack, SkipForward, Globe, Map as MapIcon, Info } from 'lucide-react';

// 迁徙数据
const nationalData = [
  { from: '上海', fromCoord: [121.4737, 31.2304], to: '南京', toCoord: [118.7969, 32.0603], value: 15200 },
  { from: '杭州', fromCoord: [120.1551, 30.2741], to: '南京', toCoord: [118.7969, 32.0603], value: 9100 },
  { from: '合肥', fromCoord: [117.2272, 31.8206], to: '南京', toCoord: [118.7969, 32.0603], value: 7800 },
  { from: '北京', fromCoord: [116.4074, 39.9042], to: '南京', toCoord: [118.7969, 32.0603], value: 6500 },
  { from: '深圳', fromCoord: [114.0579, 22.5431], to: '南京', toCoord: [118.7969, 32.0603], value: 4800 },
  { from: '武汉', fromCoord: [114.3054, 30.5931], to: '南京', toCoord: [118.7969, 32.0603], value: 4200 },
  { from: '成都', fromCoord: [104.0668, 30.5728], to: '南京', toCoord: [118.7969, 32.0603], value: 3600 },
  { from: '西安', fromCoord: [108.9398, 34.3416], to: '南京', toCoord: [118.7969, 32.0603], value: 3100 },
];

const jiangsuData = [
  { from: '苏州', fromCoord: [120.5853, 31.2989], to: '南京', toCoord: [118.7969, 32.0603], value: 12400 },
  { from: '无锡', fromCoord: [120.3119, 31.4912], to: '南京', toCoord: [118.7969, 32.0603], value: 8900 },
  { from: '常州', fromCoord: [119.9741, 31.8112], to: '南京', toCoord: [118.7969, 32.0603], value: 7200 },
  { from: '南通', fromCoord: [120.8943, 31.9802], to: '南京', toCoord: [118.7969, 32.0603], value: 5800 },
  { from: '徐州', fromCoord: [117.2841, 34.2058], to: '南京', toCoord: [118.7969, 32.0603], value: 4200 },
  { from: '扬州', fromCoord: [119.4210, 32.3932], to: '南京', toCoord: [118.7969, 32.0603], value: 3800 },
  { from: '盐城', fromCoord: [120.1626, 33.3474], to: '南京', toCoord: [118.7969, 32.0603], value: 2900 },
  { from: '泰州', fromCoord: [119.9239, 32.4558], to: '南京', toCoord: [118.7969, 32.0603], value: 2500 },
];

function getFlowColor(value, maxValue) {
  const ratio = value / maxValue;
  if (ratio > 0.8) return '#FF3333';
  if (ratio > 0.6) return '#FFD700';
  if (ratio > 0.4) return '#00F0FF';
  if (ratio > 0.2) return '#1E90FF';
  return '#4B5563';
}

const timeSlots = ['08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00'];

// 中国省份边界简化数据
const chinaProvinces = [
  { name: '黑龙江', coords: [[123, 53], [135, 53], [135, 43], [123, 43]] },
  { name: '吉林', coords: [[122, 46], [131, 46], [131, 41], [122, 41]] },
  { name: '辽宁', coords: [[119, 43], [125, 43], [125, 38], [119, 38]] },
  { name: '北京', coords: [[115.5, 41], [117.5, 41], [117.5, 39], [115.5, 39]] },
  { name: '天津', coords: [[116.5, 40], [118, 40], [118, 38.5], [116.5, 38.5]] },
  { name: '河北', coords: [[113, 43], [120, 43], [120, 36], [113, 36]] },
  { name: '山西', coords: [[110, 41], [115, 41], [115, 34], [110, 34]] },
  { name: '内蒙古', coords: [[97, 53], [126, 53], [126, 37], [97, 37]] },
  { name: '山东', coords: [[114, 38], [123, 38], [123, 34], [114, 34]] },
  { name: '江苏', coords: [[116, 35.5], [122, 35.5], [122, 30], [116, 30]] },
  { name: '安徽', coords: [[114, 35], [120, 35], [120, 29], [114, 29]] },
  { name: '上海', coords: [[120.5, 32], [122, 32], [122, 30.5], [120.5, 30.5]] },
  { name: '浙江', coords: [[118, 31.5], [123, 31.5], [123, 27], [118, 27]] },
  { name: '江西', coords: [[113, 30.5], [118, 30.5], [118, 24], [113, 24]] },
  { name: '福建', coords: [[116, 28.5], [121, 28.5], [121, 23], [116, 23]] },
  { name: '台湾', coords: [[119, 26], [122, 26], [122, 21], [119, 21]] },
  { name: '河南', coords: [[110, 36.5], [116.5, 36.5], [116.5, 31], [110, 31]] },
  { name: '湖北', coords: [[108, 33.5], [116, 33.5], [116, 29], [108, 29]] },
  { name: '湖南', coords: [[108, 30.5], [114, 30.5], [114, 24], [108, 24]] },
  { name: '广东', coords: [[109, 25.5], [117.5, 25.5], [117.5, 20], [109, 20]] },
  { name: '广西', coords: [[104.5, 26], [112, 26], [112, 21], [104.5, 21]] },
  { name: '海南', coords: [[108, 20.5], [111, 20.5], [111, 18], [108, 18]] },
  { name: '香港', coords: [[113.8, 22.6], [114.4, 22.6], [114.4, 22.1], [113.8, 22.1]] },
  { name: '澳门', coords: [[113.4, 22.3], [113.6, 22.3], [113.6, 22.1], [113.4, 22.1]] },
  { name: '重庆', coords: [[105, 32], [110, 32], [110, 28], [105, 28]] },
  { name: '四川', coords: [[97, 34], [110, 34], [110, 26], [97, 26]] },
  { name: '贵州', coords: [[103, 29.5], [109.5, 29.5], [109.5, 24.5], [103, 24.5]] },
  { name: '云南', coords: [[97, 29], [106.5, 29], [106.5, 21], [97, 21]] },
  { name: '西藏', coords: [[78, 36], [100, 36], [100, 26], [78, 26]] },
  { name: '陕西', coords: [[105, 39.5], [111, 39.5], [111, 31.5], [105, 31.5]] },
  { name: '甘肃', coords: [[92, 43], [109, 43], [109, 32], [92, 32]] },
  { name: '青海', coords: [[89, 39.5], [103, 39.5], [103, 31], [89, 31]] },
  { name: '宁夏', coords: [[105, 39.5], [107.5, 39.5], [107.5, 35], [105, 35]] },
  { name: '新疆', coords: [[73, 50], [97, 50], [97, 35], [73, 35]] },
];

const chinaOutline = [
  [135, 53], [123, 53], [119, 50], [115, 49], [110, 48], [108, 46], [105, 45], [100, 44], 
  [97, 42], [94, 40], [91, 38], [88, 36], [85, 34], [82, 32], [79, 30], [78, 28], [77, 26], 
  [78, 24], [80, 22], [82, 20], [85, 19], [88, 18.5], [92, 18], [96, 18.5], [100, 19], 
  [105, 20], [108, 21], [111, 22], [114, 22.5], [117, 22], [119, 21], [121, 20], [122, 21],
  [122, 23], [121, 25], [120, 26], [121, 28], [122, 30], [124, 32], [125, 34], [126, 36],
  [128, 38], [130, 40], [132, 42], [133, 45], [134, 48], [135, 50], [135, 53]
];

export default function MigrationMap() {
  const chartRef = useRef(null);
  const [mapMode, setMapMode] = useState('national');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeIndex, setCurrentTimeIndex] = useState(timeSlots.length - 1);
  const playInterval = useRef(null);

  const currentData = mapMode === 'national' ? nationalData : jiangsuData;
  const maxValue = Math.max(...currentData.map(d => d.value));

  // 构建省份边界线条
  const provinceLines = useMemo(() => {
    const lines = [];
    const provinces = mapMode === 'national' ? chinaProvinces : chinaProvinces.filter(p => 
      ['江苏', '安徽', '浙江', '上海', '山东'].includes(p.name)
    );
    provinces.forEach(province => {
      const coords = province.coords;
      for (let i = 0; i < coords.length; i++) {
        lines.push({ coords: [coords[i], coords[(i + 1) % coords.length]] });
      }
    });
    return lines;
  }, [mapMode]);

  // 构建飞线数据 - 确保正确格式
  const linesData = useMemo(() => {
    return currentData.map(item => ({
      coords: [item.fromCoord, item.toCoord],
      lineStyle: {
        color: getFlowColor(item.value, maxValue),
        width: Math.max(1, (item.value / maxValue) * 3),
        opacity: 0.8,
      }
    }));
  }, [currentData, maxValue]);

  // ECharts 配置
  const option = useMemo(() => {
    const isJiangsu = mapMode === 'jiangsu';
    const visibleProvinces = isJiangsu 
      ? chinaProvinces.filter(p => ['江苏', '安徽', '浙江', '上海', '山东'].includes(p.name))
      : chinaProvinces;

    return {
      backgroundColor: 'transparent',
      grid: { top: 40, right: 40, bottom: 80, left: 40 },
      xAxis: { type: 'value', min: isJiangsu ? 115 : 75, max: isJiangsu ? 123 : 137, show: false },
      yAxis: { type: 'value', min: isJiangsu ? 29 : 18, max: isJiangsu ? 36 : 55, show: false },
      series: [
        // 中国轮廓
        {
          type: 'lines',
          coordinateSystem: 'cartesian2d',
          silent: true,
          zlevel: 1,
          lineStyle: { color: 'rgba(0, 240, 255, 0.25)', width: 1.5 },
          data: isJiangsu ? [] : [{ coords: chinaOutline }],
        },
        // 省份边界
        {
          type: 'lines',
          coordinateSystem: 'cartesian2d',
          silent: true,
          zlevel: 1,
          lineStyle: { color: 'rgba(0, 240, 255, 0.12)', width: 0.8 },
          data: provinceLines,
        },
        // ========== 飞线 - 关键修复 ==========
        {
          type: 'lines',
          coordinateSystem: 'cartesian2d',
          zlevel: 3,
          effect: {
            show: true,
            period: 4,
            trailLength: 0.5,
            color: '#FFD700',
            symbol: 'arrow',
            symbolSize: 4,
          },
          lineStyle: {
            curveness: 0.3,
            width: 1,
            opacity: 0.6,
            color: (params) => getFlowColor(currentData[params.dataIndex]?.value || 0, maxValue),
          },
          data: linesData,
        },
        // 起点城市
        {
          type: 'effectScatter',
          coordinateSystem: 'cartesian2d',
          zlevel: 4,
          rippleEffect: { brushType: 'stroke', scale: 3, period: 3 },
          symbolSize: 10,
          label: {
            show: true,
            position: 'top',
            formatter: (params) => params.data.name,
            fontSize: 9,
            color: '#00F0FF',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: [2, 5],
            borderRadius: 3,
          },
          itemStyle: {
            color: (params) => getFlowColor(params.data.value2, maxValue),
            shadowBlur: 10,
            shadowColor: (params) => getFlowColor(params.data.value2, maxValue),
          },
          data: currentData.map(item => ({ name: item.from, value: item.fromCoord, value2: item.value })),
        },
        // 南京 - 强烈波纹效果
        {
          type: 'effectScatter',
          coordinateSystem: 'cartesian2d',
          zlevel: 5,
          rippleEffect: { brushType: 'fill', scale: isJiangsu ? 6 : 5, period: 2 },
          symbolSize: 25,
          label: {
            show: true,
            position: 'top',
            formatter: '南京',
            fontSize: 12,
            fontWeight: 'bold',
            color: '#FFD700',
            backgroundColor: 'rgba(0,0,0,0.8)',
            padding: [4, 8],
            borderRadius: 4,
            borderColor: '#FFD700',
            borderWidth: 1,
          },
          itemStyle: {
            color: '#FFD700',
            shadowBlur: 30,
            shadowColor: '#FFD700',
          },
          data: [[118.7969, 32.0603]],
        },
      ],
    };
  }, [mapMode, linesData, provinceLines, currentData, maxValue]);

  const handlePlay = () => {
    if (isPlaying) {
      clearInterval(playInterval.current);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playInterval.current = setInterval(() => {
        setCurrentTimeIndex((prev) => prev >= timeSlots.length - 1 ? 0 : prev + 1);
      }, 1000);
    }
  };

  useEffect(() => () => { if (playInterval.current) clearInterval(playInterval.current); }, []);

  return (
    <div className="relative w-full h-full">
      <ReactECharts 
        ref={chartRef} 
        option={option} 
        style={{ width: '100%', height: '100%' }} 
        notMerge={true}
        lazyUpdate={false}
      />

      {/* 地图模式切换 */}
      <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
        <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="glass-panel rounded-lg p-1 flex gap-1">
          <button onClick={() => setMapMode('national')} className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${mapMode === 'national' ? 'bg-cyber-gold text-cyber-bg' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
            <Globe className="w-3.5 h-3.5" />全国视图
          </button>
          <button onClick={() => setMapMode('jiangsu')} className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${mapMode === 'jiangsu' ? 'bg-cyber-cyan text-cyber-bg' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
            <MapIcon className="w-3.5 h-3.5" />江苏视图
          </button>
        </motion.div>

        {/* 流量图例 */}
        <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="glass-panel rounded-lg p-2.5 z-20">
          <div className="flex items-center gap-1 mb-1.5">
            <Info className="w-3 h-3 text-cyber-cyan" />
            <span className="text-white/70 text-xs">流量强度</span>
          </div>
          <div className="space-y-1">
            {[{ color: '#FF3333', label: '>12k', desc: '极高' }, { color: '#FFD700', label: '8-12k', desc: '高' }, { color: '#00F0FF', label: '5-8k', desc: '中高' }, { color: '#1E90FF', label: '3-5k', desc: '中' }, { color: '#4B5563', label: '<3k', desc: '一般' }].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <div className="w-4 h-1 rounded" style={{ backgroundColor: item.color, boxShadow: `0 0 4px ${item.color}` }} />
                <span className="text-white/60 text-[10px]">{item.label}</span>
                <span className="text-white/30 text-[9px]">·{item.desc}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 回放控制 - 固定在地图内部底部 */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ delay: 0.4 }} 
        className="absolute bottom-0 left-0 right-0 z-30 px-3 pb-3"
      >
        <div className="glass-panel rounded-lg p-3 border border-cyber-cyan/30">
          <div className="flex items-center gap-4">
            {/* 播放控制按钮 */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <button onClick={() => setCurrentTimeIndex(Math.max(0, currentTimeIndex - 1))} className="w-8 h-8 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <SkipBack className="w-4 h-4 text-white" />
              </button>
              <button onClick={handlePlay} className="w-10 h-10 rounded bg-cyber-cyan/20 hover:bg-cyber-cyan/30 border border-cyber-cyan/50 flex items-center justify-center transition-colors">
                {isPlaying ? <Pause className="w-5 h-5 text-cyber-cyan" /> : <Play className="w-5 h-5 text-cyber-cyan ml-0.5" />}
              </button>
              <button onClick={() => setCurrentTimeIndex(Math.min(timeSlots.length - 1, currentTimeIndex + 1))} className="w-8 h-8 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <SkipForward className="w-4 h-4 text-white" />
              </button>
            </div>
            
            {/* 进度条区域 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-white/60 text-xs font-medium">流向回放</span>
                <span className="font-orbitron text-cyber-cyan text-base">{timeSlots[currentTimeIndex]}</span>
              </div>
              <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                {/* 进度填充 */}
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyber-cyan to-cyber-gold rounded-full transition-all duration-300" 
                  style={{ width: `${((currentTimeIndex + 1) / timeSlots.length) * 100}%` }} 
                />
                {/* 可点击区域 */}
                <div className="absolute inset-0 flex">
                  {timeSlots.map((_, index) => (
                    <button 
                      key={index} 
                      onClick={() => setCurrentTimeIndex(index)} 
                      className="flex-1 hover:bg-white/10 transition-colors"
                    />
                  ))}
                </div>
              </div>
              {/* 时间刻度 */}
              <div className="flex justify-between mt-1">
                <span className="text-white/30 text-[10px]">08:00</span>
                <span className="text-white/30 text-[10px]">10:00</span>
                <span className="text-white/30 text-[10px]">12:00</span>
              </div>
            </div>
            
            {/* 粒度显示 */}
            <div className="text-right flex-shrink-0 pl-4 border-l border-white/10">
              <div className="text-white/40 text-[10px]">时间粒度</div>
              <div className="text-white/80 text-sm font-medium">15分钟</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
