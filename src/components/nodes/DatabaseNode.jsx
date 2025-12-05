import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Database, Link, Key } from 'lucide-react';

export const DatabaseNode = memo(({ data, selected }) => {
  const isConfigured = data.supabaseUrl && data.supabaseKey;
  const urlPreview = data.supabaseUrl ? new URL(data.supabaseUrl).hostname : null;

  return (
    <div
      className={`
        relative group min-w-[220px]
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

      <div className="relative flex items-center gap-3 mb-3">
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
        </div>
      </div>

      <div className="relative space-y-1.5 pt-2 border-t border-border/50">
        <div className="flex items-center gap-2 text-xs">
          <Link className="w-3 h-3 text-emerald-500/70" />
          <span className="font-mono text-muted-foreground">URL:</span>
          <span className="font-mono text-foreground/70 truncate max-w-[120px]">
            {urlPreview || <span className="text-red-400">Not set</span>}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Key className="w-3 h-3 text-emerald-500/70" />
          <span className="font-mono text-muted-foreground">Key:</span>
          <span className="font-mono text-foreground/70">
            {data.supabaseKey ? '••••••••••••' : <span className="text-red-400">Not set</span>}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs mt-1">
          <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${isConfigured ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
            {isConfigured ? 'CONNECTED' : 'DISCONNECTED'}
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
