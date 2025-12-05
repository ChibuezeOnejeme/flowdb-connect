import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, Trash2, Settings, Database, Container } from 'lucide-react';

export const FlowToolbar = ({ onAddNode, onClear }) => {
  return (
    <div className="absolute top-4 left-4 z-10 flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 bg-card/80 backdrop-blur-sm border-border hover:bg-card">
            <Plus className="w-4 h-4" />
            Add Node
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-card border-border">
          <DropdownMenuItem onClick={() => onAddNode('env')} className="gap-2 cursor-pointer">
            <Settings className="w-4 h-4 text-amber-500" />
            <span>Environment Variables</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAddNode('database')} className="gap-2 cursor-pointer">
            <Database className="w-4 h-4 text-emerald-500" />
            <span>Database (Supabase)</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAddNode('webapp')} className="gap-2 cursor-pointer">
            <Container className="w-4 h-4 text-cyan-500" />
            <span>Docker Container</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="outline"
        onClick={onClear}
        className="gap-2 bg-card/80 backdrop-blur-sm border-border hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
      >
        <Trash2 className="w-4 h-4" />
        Clear
      </Button>
    </div>
  );
};
