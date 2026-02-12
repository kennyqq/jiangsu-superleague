import CyberBorder from '../../components/CyberBorder';
import RadarChart from './components/RadarChart';
import KQIGrid from './components/KQIGrid';
import RootCauseList from './components/RootCauseList';

export default function RightPanelP2() {
  return (
    <div className="w-[400px] flex flex-col h-full p-4 gap-4">
      {/* 面板标题 */}
      <div className="flex items-center gap-2 px-2">
        <div className="w-1 h-6 bg-cyber-cyan rounded-full" />
        <h2 className="text-white font-bold text-lg">体验与运维保障</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-cyber-cyan/50 to-transparent ml-2" />
      </div>

      {/* 模块1: 分层分级体验 - 雷达图(图例右上角) */}
      <CyberBorder delay={0.1} className="flex-1 min-h-0">
        <div className="glass-panel rounded-lg p-4 h-full flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded bg-cyber-cyan/20 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-cyber-cyan" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
            </div>
            <h3 className="text-white font-bold text-sm">分层分级体验</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-cyber-cyan/30 to-transparent ml-2" />
          </div>
          <div className="flex-1 min-h-0">
            <RadarChart />
          </div>
        </div>
      </CyberBorder>

      {/* 模块2: 基础业务保障 - 矩阵网格 */}
      <CyberBorder delay={0.2}>
        <div className="glass-panel rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h3 className="text-white font-bold text-sm">基础业务保障</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-green-500/30 to-transparent ml-2" />
          </div>
          <KQIGrid />
        </div>
      </CyberBorder>

      {/* 模块3: 智能根因诊断 - 列表模块 */}
      <CyberBorder delay={0.3} className="flex-1 min-h-0">
        <div className="glass-panel rounded-lg p-4 h-full flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded bg-red-500/20 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
            </div>
            <h3 className="text-white font-bold text-sm">智能根因诊断</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-red-500/30 to-transparent ml-2" />
          </div>
          <div className="flex-1 min-h-0 overflow-hidden">
            <RootCauseList />
          </div>
        </div>
      </CyberBorder>
    </div>
  );
}
