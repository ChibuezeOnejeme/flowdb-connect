import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Settings } from 'lucide-react';

export const EnvNode = memo(({ data, selected }) => {
  const envCount = data.variables ? Object.keys(data.variables).length : 0;

  return (
    <div
      className={`
        relative group min-w-[180px]
        bg-card/90 backdrop-blur-xl
        border-2 rounded-xl p-4
        transition-all duration-300 ease-out
        ${selected 
          ? 'border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.4)] scale-105' 
          : 'border-border hover:border-amber-500/50 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]'
        }
      `}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="absolute -top-1.5 -right-1.5 flex items-center justify-center">
        <span className="relative flex h-3 w-3">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${envCount > 0 ? 'bg-emerald-400' : 'bg-amber-400'}`} />
          <span className={`relative inline-flex rounded-full h-3 w-3 ${envCount > 0 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
        </span>
      </div>

      <div className="relative flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/30">
          <Settings className="w-5 h-5 text-amber-500" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-mono text-amber-500 uppercase tracking-wider">
            Environment
          </span>
          <span className="text-sm font-semibold text-foreground">
            {data.label || 'ENV Variables'}
          </span>
          {envCount > 0 && (
            <span className="text-xs text-muted-foreground">
              {envCount} variable{envCount !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-amber-500 !border-2 !border-background hover:!scale-125 transition-transform"
      />
    </div>
  );
});

EnvNode.displayName = 'EnvNode';
