import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Webhook, Cloud, Zap, Network } from 'lucide-react';

interface ApiNodeData {
  label: string;
  type: 'rest' | 'graphql' | 'webhook' | 'gateway';
  endpoint?: string;
  status?: 'active' | 'inactive' | 'error';
}

const iconMap = {
  rest: Cloud,
  graphql: Zap,
  webhook: Webhook,
  gateway: Network,
};

export const ApiNode = memo(({ data, selected }: NodeProps & { data: ApiNodeData }) => {
  const Icon = iconMap[data.type] || Cloud;
  const status = data.status || 'active';

  return (
    <div
      className={`
        relative group min-w-[180px]
        bg-card/90 backdrop-blur-xl
        border-2 rounded-xl p-4
        transition-all duration-300 ease-out
        ${selected 
          ? 'border-node-api shadow-glow-api scale-105' 
          : 'border-border hover:border-node-api/50 hover:shadow-glow-api/50'
        }
      `}
    >
      {/* Glow effect background */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-node-api/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Status indicator */}
      <div className="absolute -top-1.5 -right-1.5 flex items-center justify-center">
        <span className={`
          relative flex h-3 w-3
          ${status === 'active' ? 'text-emerald-400' : status === 'inactive' ? 'text-amber-400' : 'text-red-400'}
        `}>
          <span className={`
            animate-ping absolute inline-flex h-full w-full rounded-full opacity-75
            ${status === 'active' ? 'bg-emerald-400' : status === 'inactive' ? 'bg-amber-400' : 'bg-red-400'}
          `} />
          <span className={`
            relative inline-flex rounded-full h-3 w-3
            ${status === 'active' ? 'bg-emerald-500' : status === 'inactive' ? 'bg-amber-500' : 'bg-red-500'}
          `} />
        </span>
      </div>

      {/* Content */}
      <div className="relative flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-node-api/20 border border-node-api/30">
          <Icon className="w-5 h-5 text-node-api" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-mono text-node-api uppercase tracking-wider">
            {data.type.toUpperCase()} API
          </span>
          <span className="text-sm font-semibold text-foreground">
            {data.label}
          </span>
          {data.endpoint && (
            <span className="text-xs text-muted-foreground font-mono truncate max-w-[120px]">
              {data.endpoint}
            </span>
          )}
        </div>
      </div>

      {/* Handles */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-node-api !border-2 !border-background hover:!scale-125 transition-transform"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-node-api !border-2 !border-background hover:!scale-125 transition-transform"
      />
    </div>
  );
});

ApiNode.displayName = 'ApiNode';
