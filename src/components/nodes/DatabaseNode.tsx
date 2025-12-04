import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Database, HardDrive, Server } from 'lucide-react';

interface DatabaseNodeData {
  label: string;
  type: 'postgresql' | 'mysql' | 'mongodb' | 'redis';
  status?: 'connected' | 'disconnected' | 'pending';
}

const iconMap = {
  postgresql: Database,
  mysql: Database,
  mongodb: HardDrive,
  redis: Server,
};

const labelMap = {
  postgresql: 'Neon Postgres',
  mysql: 'MySQL',
  mongodb: 'MongoDB',
  redis: 'Redis',
};

export const DatabaseNode = memo(({ data, selected }: NodeProps & { data: DatabaseNodeData }) => {
  const Icon = iconMap[data.type] || Database;
  const displayLabel = data.label || labelMap[data.type];
  const status = data.status || 'connected';

  return (
    <div
      className={`
        relative group min-w-[180px]
        bg-card/90 backdrop-blur-xl
        border-2 rounded-xl p-4
        transition-all duration-300 ease-out
        ${selected 
          ? 'border-node-database shadow-glow-database scale-105' 
          : 'border-border hover:border-node-database/50 hover:shadow-glow-database/50'
        }
      `}
    >
      {/* Glow effect background */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-node-database/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Status indicator */}
      <div className="absolute -top-1.5 -right-1.5 flex items-center justify-center">
        <span className={`
          relative flex h-3 w-3
          ${status === 'connected' ? 'text-emerald-400' : status === 'pending' ? 'text-amber-400' : 'text-red-400'}
        `}>
          <span className={`
            animate-ping absolute inline-flex h-full w-full rounded-full opacity-75
            ${status === 'connected' ? 'bg-emerald-400' : status === 'pending' ? 'bg-amber-400' : 'bg-red-400'}
          `} />
          <span className={`
            relative inline-flex rounded-full h-3 w-3
            ${status === 'connected' ? 'bg-emerald-500' : status === 'pending' ? 'bg-amber-500' : 'bg-red-500'}
          `} />
        </span>
      </div>

      {/* Content */}
      <div className="relative flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-node-database/20 border border-node-database/30">
          <Icon className="w-5 h-5 text-node-database" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-mono text-node-database uppercase tracking-wider">
            Database
          </span>
          <span className="text-sm font-semibold text-foreground">
            {displayLabel}
          </span>
        </div>
      </div>

      {/* Handles */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-node-database !border-2 !border-background hover:!scale-125 transition-transform"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-node-database !border-2 !border-background hover:!scale-125 transition-transform"
      />
    </div>
  );
});

DatabaseNode.displayName = 'DatabaseNode';
