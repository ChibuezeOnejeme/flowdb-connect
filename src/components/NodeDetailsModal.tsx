import { useEffect, useState } from 'react';
import { type Node } from '@xyflow/react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Database, Globe, Server, HardDrive } from 'lucide-react';

interface NodeDetailsModalProps {
  node: Node | null;
  open: boolean;
  onClose: () => void;
  onSave: (nodeId: string, data: Record<string, unknown>) => void;
}

export const NodeDetailsModal = ({ node, open, onClose, onSave }: NodeDetailsModalProps) => {
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  useEffect(() => {
    if (node) {
      setFormData(node.data as Record<string, unknown>);
    }
  }, [node]);

  const handleSave = () => {
    if (node) {
      onSave(node.id, formData);
      onClose();
    }
  };

  const updateField = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!node) return null;

  const renderDatabaseFields = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-node-database">
        <Database className="w-5 h-5" />
        <span className="font-semibold">Database Configuration</span>
      </div>
      <div className="space-y-2">
        <Label htmlFor="label">Display Name</Label>
        <Input
          id="label"
          value={(formData.label as string) || ''}
          onChange={(e) => updateField('label', e.target.value)}
          placeholder="e.g., Production Database"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="connectionString">Connection String</Label>
        <Input
          id="connectionString"
          value={(formData.connectionString as string) || ''}
          onChange={(e) => updateField('connectionString', e.target.value)}
          placeholder="postgresql://user:pass@host:5432/db"
          type="password"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="host">Host</Label>
        <Input
          id="host"
          value={(formData.host as string) || ''}
          onChange={(e) => updateField('host', e.target.value)}
          placeholder="db.neon.tech"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="port">Port</Label>
          <Input
            id="port"
            value={(formData.port as string) || ''}
            onChange={(e) => updateField('port', e.target.value)}
            placeholder="5432"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="database">Database Name</Label>
          <Input
            id="database"
            value={(formData.database as string) || ''}
            onChange={(e) => updateField('database', e.target.value)}
            placeholder="myapp_production"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={(formData.status as string) || 'connected'}
          onValueChange={(value) => updateField('status', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="connected">Connected</SelectItem>
            <SelectItem value="disconnected">Disconnected</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderAppFields = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-node-app">
        <Globe className="w-5 h-5" />
        <span className="font-semibold">Application Configuration</span>
      </div>
      <div className="space-y-2">
        <Label htmlFor="label">Display Name</Label>
        <Input
          id="label"
          value={(formData.label as string) || ''}
          onChange={(e) => updateField('label', e.target.value)}
          placeholder="e.g., Frontend App"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="url">Application URL</Label>
        <Input
          id="url"
          value={(formData.url as string) || ''}
          onChange={(e) => updateField('url', e.target.value)}
          placeholder="https://myapp.vercel.app"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="dockerImage">Docker Image (optional)</Label>
        <Input
          id="dockerImage"
          value={(formData.dockerImage as string) || ''}
          onChange={(e) => updateField('dockerImage', e.target.value)}
          placeholder="myapp/frontend:latest"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="dockerPort">Container Port</Label>
        <Input
          id="dockerPort"
          value={(formData.dockerPort as string) || ''}
          onChange={(e) => updateField('dockerPort', e.target.value)}
          placeholder="3000"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="framework">Framework</Label>
          <Input
            id="framework"
            value={(formData.framework as string) || ''}
            onChange={(e) => updateField('framework', e.target.value)}
            placeholder="React, Next.js, etc."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={(formData.status as string) || 'running'}
            onValueChange={(value) => updateField('status', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="running">Running</SelectItem>
              <SelectItem value="stopped">Stopped</SelectItem>
              <SelectItem value="deploying">Deploying</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="envVars">Environment Variables</Label>
        <Input
          id="envVars"
          value={(formData.envVars as string) || ''}
          onChange={(e) => updateField('envVars', e.target.value)}
          placeholder="DATABASE_URL, API_KEY (comma separated)"
        />
      </div>
    </div>
  );

  const renderApiFields = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-node-api">
        <Server className="w-5 h-5" />
        <span className="font-semibold">API Configuration</span>
      </div>
      <div className="space-y-2">
        <Label htmlFor="label">Display Name</Label>
        <Input
          id="label"
          value={(formData.label as string) || ''}
          onChange={(e) => updateField('label', e.target.value)}
          placeholder="e.g., Public REST API"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="endpoint">Base Endpoint</Label>
        <Input
          id="endpoint"
          value={(formData.endpoint as string) || ''}
          onChange={(e) => updateField('endpoint', e.target.value)}
          placeholder="https://api.example.com/v1"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="apiKey">API Key</Label>
        <Input
          id="apiKey"
          value={(formData.apiKey as string) || ''}
          onChange={(e) => updateField('apiKey', e.target.value)}
          placeholder="sk_live_xxxxx"
          type="password"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">API Type</Label>
          <Select
            value={(formData.type as string) || 'rest'}
            onValueChange={(value) => updateField('type', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rest">REST</SelectItem>
              <SelectItem value="graphql">GraphQL</SelectItem>
              <SelectItem value="webhook">Webhook</SelectItem>
              <SelectItem value="gateway">API Gateway</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={(formData.status as string) || 'active'}
            onValueChange={(value) => updateField('status', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="rate-limited">Rate Limited</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="rateLimit">Rate Limit (req/min)</Label>
        <Input
          id="rateLimit"
          value={(formData.rateLimit as string) || ''}
          onChange={(e) => updateField('rateLimit', e.target.value)}
          placeholder="1000"
        />
      </div>
    </div>
  );

  const renderStorageFields = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-node-storage">
        <HardDrive className="w-5 h-5" />
        <span className="font-semibold">Storage Configuration</span>
      </div>
      <div className="space-y-2">
        <Label htmlFor="label">Display Name</Label>
        <Input
          id="label"
          value={(formData.label as string) || ''}
          onChange={(e) => updateField('label', e.target.value)}
          placeholder="e.g., Media Storage"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bucket">Bucket Name</Label>
        <Input
          id="bucket"
          value={(formData.bucket as string) || ''}
          onChange={(e) => updateField('bucket', e.target.value)}
          placeholder="my-app-media"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="accessKey">Access Key ID</Label>
        <Input
          id="accessKey"
          value={(formData.accessKey as string) || ''}
          onChange={(e) => updateField('accessKey', e.target.value)}
          placeholder="AKIAIOSFODNN7EXAMPLE"
          type="password"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="secretKey">Secret Access Key</Label>
        <Input
          id="secretKey"
          value={(formData.secretKey as string) || ''}
          onChange={(e) => updateField('secretKey', e.target.value)}
          placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
          type="password"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="region">Region</Label>
          <Input
            id="region"
            value={(formData.region as string) || ''}
            onChange={(e) => updateField('region', e.target.value)}
            placeholder="us-east-1"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={(formData.status as string) || 'healthy'}
            onValueChange={(value) => updateField('status', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="healthy">Healthy</SelectItem>
              <SelectItem value="degraded">Degraded</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="cdnUrl">CDN URL (optional)</Label>
        <Input
          id="cdnUrl"
          value={(formData.cdnUrl as string) || ''}
          onChange={(e) => updateField('cdnUrl', e.target.value)}
          placeholder="https://cdn.example.com"
        />
      </div>
    </div>
  );

  const renderFields = () => {
    switch (node.type) {
      case 'database':
        return renderDatabaseFields();
      case 'app':
        return renderAppFields();
      case 'api':
        return renderApiFields();
      case 'storage':
        return renderStorageFields();
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Configure {node.type?.charAt(0).toUpperCase()}{node.type?.slice(1)} Node</DialogTitle>
        </DialogHeader>
        <div className="py-4 max-h-[60vh] overflow-y-auto">
          {renderFields()}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            Save Configuration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
