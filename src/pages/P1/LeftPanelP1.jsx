import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Radio, Wifi, Car, Activity, Terminal, Server, Cpu, Zap } from 'lucide-react';
import CyberBorder from '../../components/CyberBorder';

// 5G-A 资源网格
function ResourceGrid() {
  const resources = [
    { label: '5G-A 站点', value: 48, unit: '个', icon: Radio, color: '#00F0FF', sub: '运行中' },
    { label: '智能板', value: 8, unit: '个', icon: Server, color: '#00F0FF', sub: '协同中' },
    { label: '3CC 载波', value: '开启', unit: '', icon: Zap, color: '#00FF88', sub: '三载波聚合', isStatus: true },
    { label: 'PRB 负载', value: 42, unit: '%', icon: Activity, color: '#00FF88', sub: '平均利用率', showBar: true },
    { label: '应急通信车', value: 2, unit: '辆', icon: Car, color: '#FFD700', sub: '在网' },
    { label: '波束赋形', value: 128, unit: '束', icon: Wifi, color: '#00F0FF', sub: '动态优化' },
  ];

  return (
    <CyberBorder delay={0.1}>
      <div>
        {/* 二级标题 */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg bg-cyber-cyan/20 flex items-center justify-center border border-cyber-cyan/30">
            <Cpu className="w-4 h-4 text-cyber-cyan" />
          </div>
          <div>
            <h3 className="header-secondary">5G-A 资源与韧性</h3>
            <p className="decor-en">Infrastructure & Resilience</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {resources.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-cyber-cyan/30 transition-colors"
            >
              <div className="flex items-center gap-1 mb-1.5">
                <item.icon className="w-3 h-3" style={{ color: item.color }} />
                <span className="text-white/50 text-[9px] truncate">{item.label}</span>
              </div>
              <div className="number-metric text-lg leading-none">
                {item.isStatus ? (
                  <span className="text-green-400">{item.value}</span>
                ) : (
                  <>
                    <CountUp end={item.value} duration={2} decimals={item.value % 1 !== 0 ? 1 : 0} />
                    <span className="text-[10px]">{item.unit}</span>
                  </>
                )}
              </div>
              {item.showBar && (
                <div className="h-1 bg-white/10 rounded-full mt-1.5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #00FF88 0%, #00F0FF 100%)' }}
                  />
                </div>
              )}
              <div className="text-white/30 text-[8px] mt-1">{item.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </CyberBorder>
  );
}

// Co-pilot 终端 - 专业Linux终端风格
function CoPilotTerminal() {
  const [logs, setLogs] = useState([
    { time: '19:42:01', type: 'info', content: '> [监控] 系统初始化完成' },
    { time: '19:42:02', type: 'info', content: '> [监控] 正在扫描网络拓扑...' },
  ]);
  const logsEndRef = useRef(null);

  const logSequences = [
    [
      { time: '19:42:03', type: 'warn', content: '> [监控] 小区04 PRB负载激增' },
      { time: '19:42:04', type: 'alert', content: '> [告警] 检测到光纤衰减(eOTDR)' },
      { time: '19:42:05', type: 'ai', content: '> [AI动作] 分析下倾角参数...' },
      { time: '19:42:06', type: 'ai', content: '> [AI动作] 计算最优路由...' },
      { time: '19:42:07', type: 'success', content: '> [AI动作] 调整下倾角并切换路由' },
      { time: '19:42:08', type: 'success', content: '> [状态] 韧性检查通过' },
    ],
    [
      { time: '19:42:15', type: 'info', content: '> [监控] 扫描所有小区状态...' },
      { time: '19:42:16', type: 'warn', content: '> [监控] 检测到小区07切换失败' },
      { time: '19:42:17', type: 'ai', content: '> [AI动作] 评估邻区覆盖...' },
      { time: '19:42:18', type: 'ai', content: '> [AI动作] 优化波束赋形...' },
      { time: '19:42:19', type: 'success', content: '> [成功] 切换已恢复 时延+3ms' },
    ],
    [
      { time: '19:42:25', type: 'info', content: '> [监控] 流量模式分析中...' },
      { time: '19:42:26', type: 'warn', content: '> [监控] 北广场拥塞指数上升' },
      { time: '19:42:27', type: 'ai', content: '> [AI动作] 预测性负载均衡...' },
      { time: '19:42:28', type: 'ai', content: '> [AI动作] 激活应急波束' },
      { time: '19:42:29', type: 'success', content: '> [成功] 负载已分配 QoS稳定' },
    ],
  ];

  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentSequence = logSequences[sequenceIndex];
      
      if (logIndex < currentSequence.length) {
        setLogs(prev => {
          const newLogs = [...prev, currentSequence[logIndex]];
          if (newLogs.length > 12) {
            return newLogs.slice(newLogs.length - 12);
          }
          return newLogs;
        });
        setLogIndex(prev => prev + 1);
      } else {
        setSequenceIndex(prev => (prev + 1) % logSequences.length);
        setLogIndex(0);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [sequenceIndex, logIndex]);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const getLogColor = (type) => {
    switch (type) {
      case 'alert': return '#FF6B6B';
      case 'warn': return '#FFA500';
      case 'ai': return '#00F0FF';
      case 'success': return '#00FF00';
      default: return '#888888';
    }
  };

  return (
    <CyberBorder delay={0.2} className="flex-1 min-h-0">
      {/* 固定高度300px，纯黑底色 */}
      <div className="h-[300px] flex flex-col bg-black rounded-lg overflow-hidden border border-white/10">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-3 py-2 bg-cyber-cyan/10 border-b border-cyber-cyan/30 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyber-cyan" />
            <span className="text-cyber-cyan font-bold text-sm">智能运维终端</span>
            <span className="decor-en">AI Resilience Ops</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-green-400 text-xs">在线</span>
          </div>
        </div>

        {/* Terminal Body - 固定高度，内部滚动 */}
        <div 
          className="flex-1 p-3 overflow-hidden"
          style={{ fontFamily: "'Courier New', monospace", fontSize: '12px', lineHeight: '1.6' }}
        >
          <div className="space-y-1">
            {logs.map((log, idx) => (
              <motion.div
                key={`${log.time}-${idx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ color: getLogColor(log.type) }}
              >
                <span style={{ color: '#555' }}>{log.time}</span>
                <span className="ml-2">{log.content}</span>
              </motion.div>
            ))}
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              style={{ color: '#00F0FF' }}
            >
              <span style={{ color: '#555' }}>_</span>
              <span className="ml-2">▊</span>
            </motion.div>
            <div ref={logsEndRef} />
          </div>
        </div>

        {/* Terminal Footer */}
        <div className="px-3 py-2 bg-white/5 border-t border-white/10 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <span className="text-white/40 text-xs">
              状态: <span className="text-green-400">自愈运行中</span>
            </span>
            <span className="text-white/30 text-xs">
              场景: {sequenceIndex + 1}/{logSequences.length}
            </span>
          </div>
          <button className="text-cyber-cyan text-xs hover:underline">查看详情 →</button>
        </div>
      </div>
    </CyberBorder>
  );
}

export default function LeftPanelP1() {
  return (
    <div className="w-[400px] flex flex-col h-full p-4 gap-4">
      <div className="flex-shrink-0">
        <ResourceGrid />
      </div>
      
      <div className="flex-1 min-h-0 overflow-hidden">
        <CoPilotTerminal />
      </div>
    </div>
  );
}
