import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Container } from 'lucide-react';

export const WebAppNode = memo(({ data, selected }) => {
  const isConfigured = data.containerUrl;

  return (
    <div
      className={`
        relative group min-w-[200px]
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
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isConfigured ? 'bg-emerald-400' : 'bg-red-400'}`} />
          <span className={`relative inline-flex rounded-full h-3 w-3 ${isConfigured ? 'bg-emerald-500' : 'bg-red-500'}`} />
        </span>
      </div>

      <div className="relative flex items-center gap-3">
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
          <span className="text-xs text-muted-foreground">
            {isConfigured ? 'Running' : 'Not configured'}
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
