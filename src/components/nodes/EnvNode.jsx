import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Settings } from 'lucide-react';

export const EnvNode = memo(({ data, selected }) => {
  const envCount = data.variables ? Object.keys(data.variables).length : 0;

  return (
    <div
      className={`
        relative group
        bg-card/95 backdrop-blur-md
        border rounded px-2 py-1.5
        transition-all duration-200
        ${selected 
          ? 'border-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]' 
          : 'border-border/50 hover:border-amber-500/40'
        }
      `}
    >
      <div className="absolute -top-0.5 -right-0.5">
        <span className={`block h-1.5 w-1.5 rounded-full ${envCount > 0 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
      </div>

      <div className="flex items-center gap-1.5">
        <div className="flex items-center justify-center w-5 h-5 rounded bg-amber-500/15">
          <Settings className="w-3 h-3 text-amber-500" />
        </div>
        <div className="flex flex-col">
          <span className="text-[8px] font-mono text-amber-500/70 uppercase tracking-wide leading-none">
            ENV
          </span>
          <span className="text-[10px] font-medium text-foreground leading-tight">
            {data.label || 'Variables'}
          </span>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!w-1.5 !h-1.5 !bg-amber-500 !border-0"
      />
    </div>
  );
});

EnvNode.displayName = 'EnvNode';