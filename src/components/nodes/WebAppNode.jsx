import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Container, Globe, Box, Plug } from 'lucide-react';

export const WebAppNode = memo(({ data, selected }) => {
  const isConfigured = data.containerUrl;
  const connectedEnvs = data.connectedEnvs || 0;
  const connectedDbs = data.connectedDbs || 0;
  const totalConnections = connectedEnvs + connectedDbs;

  return (
    <div
      className={`
        relative group min-w-[240px]
        bg-card/90 backdrop-blur-xl
        border-2 rounded-xl p-4
        transition-all duration-300 ease-out
        ${selected 
          ? 'border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105' 
          : 'border-border hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]'
        }
      `}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="absolute -top-1.5 -right-1.5 flex items-center justify-center">
        <span className="relative flex h-3 w-3">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isConfigured && totalConnections > 0 ? 'bg-emerald-400' : 'bg-red-400'}`} />
          <span className={`relative inline-flex rounded-full h-3 w-3 ${isConfigured && totalConnections > 0 ? 'bg-emerald-500' : 'bg-red-500'}`} />
        </span>
      </div>

      <div className="relative flex items-center gap-3 mb-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
          <Container className="w-5 h-5 text-cyan-500" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-mono text-cyan-500 uppercase tracking-wider">
            Docker Container
          </span>
          <span className="text-sm font-semibold text-foreground">
            {data.label || 'Web App'}
          </span>
        </div>
      </div>

      <div className="relative space-y-1.5 pt-2 border-t border-border/50">
        <div className="flex items-center gap-2 text-xs">
          <Globe className="w-3 h-3 text-cyan-500/70" />
          <span className="font-mono text-muted-foreground">URL:</span>
          <span className="font-mono text-foreground/70 truncate max-w-[130px]">
            {data.containerUrl || <span className="text-red-400">Not set</span>}
          </span>
        </div>
        {data.dockerImage && (
          <div className="flex items-center gap-2 text-xs">
            <Box className="w-3 h-3 text-cyan-500/70" />
            <span className="font-mono text-muted-foreground">Image:</span>
            <span className="font-mono text-foreground/70 truncate max-w-[130px]">
              {data.dockerImage}
            </span>
          </div>
        )}
        {data.port && (
          <div className="flex items-center gap-2 text-xs">
            <Plug className="w-3 h-3 text-cyan-500/70" />
            <span className="font-mono text-muted-foreground">Port:</span>
            <span className="font-mono text-foreground/70">{data.port}</span>
          </div>
        )}
        
        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/30">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Connections:</span>
          <div className="flex gap-1">
            {connectedEnvs > 0 && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-400">
                {connectedEnvs} ENV
              </span>
            )}
            {connectedDbs > 0 && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400">
                {connectedDbs} DB
              </span>
            )}
            {totalConnections === 0 && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-red-500/20 text-red-400">
                No inputs
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs mt-1">
          <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${isConfigured && totalConnections > 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
            {isConfigured && totalConnections > 0 ? 'PRODUCTION READY' : 'NOT READY'}
          </span>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-cyan-500 !border-2 !border-background hover:!scale-125 transition-transform"
      />
    </div>
  );
});

WebAppNode.displayName = 'WebAppNode';
