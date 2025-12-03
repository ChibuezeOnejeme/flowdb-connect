import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Globe, Smartphone, Monitor, Code2 } from 'lucide-react';

interface AppNodeData {
  label: string;
  type: 'web' | 'mobile' | 'desktop' | 'service';
  framework?: string;
  status?: 'running' | 'stopped' | 'deploying';
}

const iconMap = {
  web: Globe,
  mobile: Smartphone,
  desktop: Monitor,
  service: Code2,
};

export const AppNode = memo(({ data, selected }: NodeProps & { data: AppNodeData }) => {
  const Icon = iconMap[data.type] || Globe;
  const status = data.status || 'running';

  return (
    <div
      className={`
        relative group min-w-[180px]
        bg-card/90 backdrop-blur-xl
        border-2 rounded-xl p-4
        transition-all duration-300 ease-out
        ${selected 
          ? 'border-node-app shadow-glow-app scale-105' 
          : 'border-border hover:border-node-app/50 hover:shadow-glow-app/50'
        }
      `}
    >
      {/* Glow effect background */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-node-app/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Status indicator */}
      <div className="absolute -top-1.5 -right-1.5 flex items-center justify-center">
        <span className={`
          relative flex h-3 w-3
          ${status === 'running' ? 'text-emerald-400' : status === 'deploying' ? 'text-amber-400' : 'text-red-400'}
        `}>
          <span className={`
            animate-ping absolute inline-flex h-full w-full rounded-full opacity-75
            ${status === 'running' ? 'bg-emerald-400' : status === 'deploying' ? 'bg-amber-400' : 'bg-red-400'}
          `} />
          <span className={`
            relative inline-flex rounded-full h-3 w-3
            ${status === 'running' ? 'bg-emerald-500' : status === 'deploying' ? 'bg-amber-500' : 'bg-red-500'}
          `} />
        </span>
      </div>

      {/* Content */}
      <div className="relative flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-node-app/20 border border-node-app/30">
          <Icon className="w-5 h-5 text-node-app" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-mono text-node-app uppercase tracking-wider">
            {data.type} App
          </span>
          <span className="text-sm font-semibold text-foreground">
            {data.label}
          </span>
          {data.framework && (
            <span className="text-xs text-muted-foreground">
              {data.framework}
            </span>
          )}
        </div>
      </div>

      {/* Handles */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-node-app !border-2 !border-background hover:!scale-125 transition-transform"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-node-app !border-2 !border-background hover:!scale-125 transition-transform"
      />
    </div>
  );
});

AppNode.displayName = 'AppNode';
