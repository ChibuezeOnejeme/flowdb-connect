import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Database } from 'lucide-react';

export const DatabaseNode = memo(({ data, selected }) => {
  const isConfigured = data.supabaseUrl && data.supabaseKey;

  return (
    <div
      className={`
        relative group min-w-[180px]
        bg-card/90 backdrop-blur-xl
        border-2 rounded-xl p-4
        transition-all duration-300 ease-out
        ${selected 
          ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-105' 
          : 'border-border hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]'
        }
      `}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="absolute -top-1.5 -right-1.5 flex items-center justify-center">
        <span className="relative flex h-3 w-3">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isConfigured ? 'bg-emerald-400' : 'bg-red-400'}`} />
          <span className={`relative inline-flex rounded-full h-3 w-3 ${isConfigured ? 'bg-emerald-500' : 'bg-red-500'}`} />
        </span>
      </div>

      <div className="relative flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
          <Database className="w-5 h-5 text-emerald-500" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-mono text-emerald-500 uppercase tracking-wider">
            Database
          </span>
          <span className="text-sm font-semibold text-foreground">
            {data.label || 'Supabase'}
          </span>
          <span className="text-xs text-muted-foreground">
            {isConfigured ? 'Connected' : 'Not configured'}
          </span>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-emerald-500 !border-2 !border-background hover:!scale-125 transition-transform"
      />
    </div>
  );
});

DatabaseNode.displayName = 'DatabaseNode';
