import { Database, GitBranch, Sparkles } from 'lucide-react';

interface HeaderProps {
  nodeCount: number;
  edgeCount: number;
}

export const Header = ({ nodeCount, edgeCount }: HeaderProps) => {
  const isConnected = edgeCount >= 1 && nodeCount >= 2;
  
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-xl flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary">
          <GitBranch className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground flex items-center gap-2">
            Infrastructure Canvas
            <Sparkles className="w-4 h-4 text-primary" />
          </h1>
          <p className="text-xs text-muted-foreground font-mono">
            Visual database connections
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border">
          <Database className="w-4 h-4 text-node-database" />
          <span className="text-xs font-mono text-muted-foreground">{nodeCount} nodes</span>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
          isConnected 
            ? 'bg-emerald-500/10 border border-emerald-500/30' 
            : 'bg-red-500/10 border border-red-500/30'
        }`}>
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isConnected ? 'bg-emerald-400' : 'bg-red-400'
            }`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${
              isConnected ? 'bg-emerald-500' : 'bg-red-500'
            }`} />
          </span>
          <span className={`text-xs font-mono ${isConnected ? 'text-emerald-400' : 'text-red-400'}`}>
            {isConnected ? 'Connected' : 'Not connected'}
          </span>
        </div>
      </div>
    </header>
  );
};
