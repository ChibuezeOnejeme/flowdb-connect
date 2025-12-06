import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Container } from 'lucide-react';

export const WebAppNode = memo(({ data, selected }) => {
  const isConfigured = data.containerUrl;

  return (
    <div
      className={`
        relative group
        bg-card/95 backdrop-blur-md
        border rounded px-2 py-1.5
        transition-all duration-200
        ${selected 
          ? 'border-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.3)]' 
          : 'border-border/50 hover:border-cyan-500/40'
        }
      `}
    >
      <div className="absolute -top-0.5 -right-0.5">
        <span className={`block h-1.5 w-1.5 rounded-full ${isConfigured ? 'bg-emerald-500' : 'bg-red-500'}`} />
      </div>

      <div className="flex items-center gap-1.5">
        <div className="flex items-center justify-center w-5 h-5 rounded bg-cyan-500/15">
          <Container className="w-3 h-3 text-cyan-500" />
        </div>
        <div className="flex flex-col">
          <span className="text-[8px] font-mono text-cyan-500/70 uppercase tracking-wide leading-none">
            Docker
          </span>
          <span className="text-[10px] font-medium text-foreground leading-tight">
            {data.label || 'Web App'}
          </span>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className="!w-1.5 !h-1.5 !bg-cyan-500 !border-0"
      />
    </div>
  );
});

WebAppNode.displayName = 'WebAppNode';