import { Database, Zap } from 'lucide-react';

export const Header = ({ stats }) => {
  const isConnected = stats && stats.edgeCount >= 1 && stats.nodeCount >= 2;

  return (
    <header className="h-14 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20">
          <Database className="w-4 h-4 text-primary" />
        </div>
        <span className="font-semibold text-foreground">Infrastructure Flow</span>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Nodes:</span>
          <span className="font-mono text-foreground">{stats?.nodeCount || 0}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Connections:</span>
          <span className="font-mono text-foreground">{stats?.edgeCount || 0}</span>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
          isConnected 
            ? 'bg-emerald-500/20 text-emerald-400' 
            : 'bg-red-500/20 text-red-400'
        }`}>
          <Zap className={`w-3 h-3 ${isConnected ? 'animate-pulse' : ''}`} />
          {isConnected ? 'Connected' : 'Disconnected'}
        </div>
      </div>
    </header>
  );
};
