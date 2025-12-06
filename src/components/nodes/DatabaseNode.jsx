import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Database } from 'lucide-react';

export const DatabaseNode = memo(({ data, selected }) => {
  const isConfigured = data.supabaseUrl && data.supabaseKey;

  return (
    <div
      className={`
        relative group
        bg-card/95 backdrop-blur-md
        border rounded px-2 py-1.5
        transition-all duration-200
        ${selected 
          ? 'border-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]' 
          : 'border-border/50 hover:border-emerald-500/40'
        }
      `}
    >
      <div className="absolute -top-0.5 -right-0.5">
        <span className={`block h-1.5 w-1.5 rounded-full ${isConfigured ? 'bg-emerald-500' : 'bg-red-500'}`} />
      </div>

      <div className="flex items-center gap-1.5">
        <div className="flex items-center justify-center w-5 h-5 rounded bg-emerald-500/15">
          <Database className="w-3 h-3 text-emerald-500" />
        </div>
        <div className="flex flex-col">
          <span className="text-[8px] font-mono text-emerald-500/70 uppercase tracking-wide leading-none">
            Database
          </span>
          <span className="text-[10px] font-medium text-foreground leading-tight">
            {data.label || 'Supabase'}
          </span>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!w-1.5 !h-1.5 !bg-emerald-500 !border-0"
      />
    </div>
  );
});

DatabaseNode.displayName = 'DatabaseNode';