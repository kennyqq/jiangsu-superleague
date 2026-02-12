import CyberBorder from '../../components/CyberBorder';
import PyramidChart from './components/PyramidChart';
import CapacityAgentCard from './components/CapacityAgentCard';
import TerminalRanking from './components/TerminalRanking';

export default function LeftPanelP2() {
  return (
    <div className="w-[400px] flex flex-col h-full p-4 gap-4">
      {/* 面板标题 */}
      <div className="flex items-center gap-2 px-2">
        <div className="w-1 h-6 bg-cyber-gold rounded-full" />
        <div>
          <h2 className="header-secondary text-cyber-gold">商业变现洞察</h2>
          <p className="decor-en">Monetization Intelligence</p>
        </div>
      </div>

      {/* 模块1: 用户分层结构 - 金字塔图 */}
      <CyberBorder delay={0.1}>
        <div className="glass-panel rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded bg-cyber-gold/20 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-cyber-gold" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3 className="text-white font-bold text-sm">用户分层结构</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-cyber-gold/30 to-transparent ml-2" />
          </div>
          <PyramidChart />
        </div>
      </CyberBorder>

      {/* 模块2: 放号评估智能体 - 水平分割布局 */}
      <CyberBorder delay={0.2} className="flex-1 min-h-0">
        <div className="glass-panel rounded-lg p-4 h-full flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded bg-cyber-cyan/20 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-cyber-cyan" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
              </svg>
            </div>
            <h3 className="text-white font-bold text-sm">放号评估智能体</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-cyber-cyan/30 to-transparent ml-2" />
          </div>
          <div className="flex-1 min-h-0 overflow-hidden">
            <CapacityAgentCard />
          </div>
        </div>
      </CyberBorder>

      {/* 模块3: 终端能力分析 - 带突出指标 */}
      <CyberBorder delay={0.3} className="flex-1 min-h-0">
        <div className="glass-panel rounded-lg p-4 h-full flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded bg-purple-500/20 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
              </svg>
            </div>
            <h3 className="text-white font-bold text-sm">终端能力分析</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent ml-2" />
          </div>
          <div className="flex-1 min-h-0 overflow-hidden">
            <TerminalRanking />
          </div>
        </div>
      </CyberBorder>
    </div>
  );
}
