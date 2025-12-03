import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { HardDrive, Cloud, FolderOpen, Archive } from 'lucide-react';

interface StorageNodeData {
  label: string;
  type: 's3' | 'gcs' | 'local' | 'cdn';
  size?: string;
  status?: 'healthy' | 'warning' | 'error';
}

const iconMap = {
  s3: Cloud,
  gcs: Cloud,
  local: HardDrive,
  cdn: Archive,
};

const labelMap = {
  s3: 'AWS S3',
  gcs: 'Google Cloud',
  local: 'Local Storage',
  cdn: 'CDN',
};

export const StorageNode = memo(({ data, selected }: NodeProps & { data: StorageNodeData }) => {
  const Icon = iconMap[data.type] || FolderOpen;
  const displayLabel = data.label || labelMap[data.type];
  const status = data.status || 'healthy';

  return (
    <div
      className={`
        relative group min-w-[180px]
        bg-card/90 backdrop-blur-xl
        border-2 rounded-xl p-4
        transition-all duration-300 ease-out
        ${selected 
          ? 'border-node-storage shadow-glow-storage scale-105' 
          : 'border-border hover:border-node-storage/50 hover:shadow-glow-storage/50'
        }
      `}
    >
      {/* Glow effect background */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-node-storage/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Status indicator */}
      <div className="absolute -top-1.5 -right-1.5 flex items-center justify-center">
        <span className={`
          relative flex h-3 w-3
          ${status === 'healthy' ? 'text-emerald-400' : status === 'warning' ? 'text-amber-400' : 'text-red-400'}
        `}>
          <span className={`
            animate-ping absolute inline-flex h-full w-full rounded-full opacity-75
            ${status === 'healthy' ? 'bg-emerald-400' : status === 'warning' ? 'bg-amber-400' : 'bg-red-400'}
          `} />
          <span className={`
            relative inline-flex rounded-full h-3 w-3
            ${status === 'healthy' ? 'bg-emerald-500' : status === 'warning' ? 'bg-amber-500' : 'bg-red-500'}
          `} />
        </span>
      </div>

      {/* Content */}
      <div className="relative flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-node-storage/20 border border-node-storage/30">
          <Icon className="w-5 h-5 text-node-storage" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-mono text-node-storage uppercase tracking-wider">
            Storage
          </span>
          <span className="text-sm font-semibold text-foreground">
            {displayLabel}
          </span>
          {data.size && (
            <span className="text-xs text-muted-foreground">
              {data.size}
            </span>
          )}
        </div>
      </div>

      {/* Handles */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-node-storage !border-2 !border-background hover:!scale-125 transition-transform"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-node-storage !border-2 !border-background hover:!scale-125 transition-transform"
      />
    </div>
  );
});

StorageNode.displayName = 'StorageNode';
