import { Database, Globe, Cloud, HardDrive, Plus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface FlowToolbarProps {
  onAddNode: (type: string, subtype: string) => void;
  onClear: () => void;
}

export const FlowToolbar = ({ onAddNode, onClear }: FlowToolbarProps) => {
  return (
    <div className="absolute top-4 left-4 z-10 flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-card/90 backdrop-blur-xl border-border hover:border-primary hover:bg-card gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Node
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-56 bg-card/95 backdrop-blur-xl border-border"
          align="start"
        >
          <DropdownMenuLabel className="text-muted-foreground">Databases</DropdownMenuLabel>
          <DropdownMenuItem 
            onClick={() => onAddNode('database', 'postgresql')}
            className="gap-2 cursor-pointer hover:bg-node-database/10 focus:bg-node-database/10"
          >
            <Database className="w-4 h-4 text-node-database" />
            PostgreSQL
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onAddNode('database', 'mysql')}
            className="gap-2 cursor-pointer hover:bg-node-database/10 focus:bg-node-database/10"
          >
            <Database className="w-4 h-4 text-node-database" />
            MySQL
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onAddNode('database', 'mongodb')}
            className="gap-2 cursor-pointer hover:bg-node-database/10 focus:bg-node-database/10"
          >
            <Database className="w-4 h-4 text-node-database" />
            MongoDB
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onAddNode('database', 'redis')}
            className="gap-2 cursor-pointer hover:bg-node-database/10 focus:bg-node-database/10"
          >
            <Database className="w-4 h-4 text-node-database" />
            Redis
          </DropdownMenuItem>
          
          <DropdownMenuSeparator className="bg-border" />
          <DropdownMenuLabel className="text-muted-foreground">Applications</DropdownMenuLabel>
          <DropdownMenuItem 
            onClick={() => onAddNode('app', 'web')}
            className="gap-2 cursor-pointer hover:bg-node-app/10 focus:bg-node-app/10"
          >
            <Globe className="w-4 h-4 text-node-app" />
            Web App
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onAddNode('app', 'service')}
            className="gap-2 cursor-pointer hover:bg-node-app/10 focus:bg-node-app/10"
          >
            <Globe className="w-4 h-4 text-node-app" />
            Backend Service
          </DropdownMenuItem>
          
          <DropdownMenuSeparator className="bg-border" />
          <DropdownMenuLabel className="text-muted-foreground">APIs</DropdownMenuLabel>
          <DropdownMenuItem 
            onClick={() => onAddNode('api', 'rest')}
            className="gap-2 cursor-pointer hover:bg-node-api/10 focus:bg-node-api/10"
          >
            <Cloud className="w-4 h-4 text-node-api" />
            REST API
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onAddNode('api', 'graphql')}
            className="gap-2 cursor-pointer hover:bg-node-api/10 focus:bg-node-api/10"
          >
            <Cloud className="w-4 h-4 text-node-api" />
            GraphQL API
          </DropdownMenuItem>
          
          <DropdownMenuSeparator className="bg-border" />
          <DropdownMenuLabel className="text-muted-foreground">Storage</DropdownMenuLabel>
          <DropdownMenuItem 
            onClick={() => onAddNode('storage', 's3')}
            className="gap-2 cursor-pointer hover:bg-node-storage/10 focus:bg-node-storage/10"
          >
            <HardDrive className="w-4 h-4 text-node-storage" />
            AWS S3
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onAddNode('storage', 'cdn')}
            className="gap-2 cursor-pointer hover:bg-node-storage/10 focus:bg-node-storage/10"
          >
            <HardDrive className="w-4 h-4 text-node-storage" />
            CDN
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button 
        variant="outline" 
        size="sm"
        onClick={onClear}
        className="bg-card/90 backdrop-blur-xl border-border hover:border-destructive hover:bg-destructive/10 hover:text-destructive gap-2"
      >
        <Trash2 className="w-4 h-4" />
        Clear
      </Button>
    </div>
  );
};
