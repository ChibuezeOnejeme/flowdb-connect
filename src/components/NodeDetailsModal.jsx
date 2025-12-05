import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Database, Settings, Container, Plus, Trash2 } from 'lucide-react';

export const NodeDetailsModal = ({ node, open, onClose, onSave }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (node) {
      setFormData(node.data || {});
    }
  }, [node]);

  const handleSave = () => {
    onSave(node.id, formData);
    onClose();
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addEnvVariable = () => {
    const variables = formData.variables || {};
    const newKey = `VAR_${Object.keys(variables).length + 1}`;
    updateField('variables', { ...variables, [newKey]: '' });
  };

  const updateEnvVariable = (oldKey, newKey, value) => {
    const variables = { ...formData.variables };
    if (oldKey !== newKey) {
      delete variables[oldKey];
    }
    variables[newKey] = value;
    updateField('variables', variables);
  };

  const removeEnvVariable = (key) => {
    const variables = { ...formData.variables };
    delete variables[key];
    updateField('variables', variables);
  };

  const renderEnvFields = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-amber-500">
        <Settings className="w-5 h-5" />
        <span className="font-semibold">Environment Variables</span>
      </div>
      
      <div className="space-y-2">
        <Label>Label</Label>
        <Input
          value={formData.label || ''}
          onChange={(e) => updateField('label', e.target.value)}
          placeholder="ENV Variables"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Variables</Label>
          <Button size="sm" variant="outline" onClick={addEnvVariable}>
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>
        
        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {Object.entries(formData.variables || {}).map(([key, value]) => (
            <div key={key} className="flex gap-2">
              <Input
                className="w-1/3"
                value={key}
                onChange={(e) => updateEnvVariable(key, e.target.value, value)}
                placeholder="KEY"
              />
              <Input
                className="flex-1"
                value={value}
                onChange={(e) => updateEnvVariable(key, key, e.target.value)}
                placeholder="value"
              />
              <Button size="icon" variant="ghost" onClick={() => removeEnvVariable(key)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDatabaseFields = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-emerald-500">
        <Database className="w-5 h-5" />
        <span className="font-semibold">Supabase Configuration</span>
      </div>
      
      <div className="space-y-2">
        <Label>Label</Label>
        <Input
          value={formData.label || ''}
          onChange={(e) => updateField('label', e.target.value)}
          placeholder="Supabase"
        />
      </div>

      <div className="space-y-2">
        <Label>Supabase URL</Label>
        <Input
          value={formData.supabaseUrl || ''}
          onChange={(e) => updateField('supabaseUrl', e.target.value)}
          placeholder="https://your-project.supabase.co"
        />
      </div>

      <div className="space-y-2">
        <Label>Supabase Anon Key</Label>
        <Textarea
          value={formData.supabaseKey || ''}
          onChange={(e) => updateField('supabaseKey', e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          rows={3}
        />
      </div>
    </div>
  );

  const renderWebAppFields = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-cyan-500">
        <Container className="w-5 h-5" />
        <span className="font-semibold">Docker Container Configuration</span>
      </div>
      
      <div className="space-y-2">
        <Label>Label</Label>
        <Input
          value={formData.label || ''}
          onChange={(e) => updateField('label', e.target.value)}
          placeholder="Web App"
        />
      </div>

      <div className="space-y-2">
        <Label>Container URL</Label>
        <Input
          value={formData.containerUrl || ''}
          onChange={(e) => updateField('containerUrl', e.target.value)}
          placeholder="http://localhost:3000"
        />
      </div>

      <div className="space-y-2">
        <Label>Docker Image</Label>
        <Input
          value={formData.dockerImage || ''}
          onChange={(e) => updateField('dockerImage', e.target.value)}
          placeholder="myapp:latest"
        />
      </div>

      <div className="space-y-2">
        <Label>Port</Label>
        <Input
          value={formData.port || ''}
          onChange={(e) => updateField('port', e.target.value)}
          placeholder="3000"
        />
      </div>
    </div>
  );

  const renderFields = () => {
    if (!node) return null;
    switch (node.type) {
      case 'env':
        return renderEnvFields();
      case 'database':
        return renderDatabaseFields();
      case 'webapp':
        return renderWebAppFields();
      default:
        return null;
    }
  };

  const getTitle = () => {
    if (!node) return '';
    switch (node.type) {
      case 'env':
        return 'Environment Variables';
      case 'database':
        return 'Database Configuration';
      case 'webapp':
        return 'Docker Container';
      default:
        return 'Configuration';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
        </DialogHeader>
        <div className="py-4">{renderFields()}</div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Configuration</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
