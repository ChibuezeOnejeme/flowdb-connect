import { useCallback, useState, useEffect } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  BackgroundVariant,
  type Node,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { DatabaseNode, AppNode, ApiNode, StorageNode } from './nodes';
import { CustomEdge } from './CustomEdge';
import { FlowToolbar } from './FlowToolbar';
import { toast } from 'sonner';

const nodeTypes = {
  database: DatabaseNode,
  app: AppNode,
  api: ApiNode,
  storage: StorageNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

const initialNodes: Node[] = [
  {
    id: 'db-1',
    type: 'database',
    position: { x: 100, y: 200 },
    data: { label: 'Production DB', type: 'postgresql', status: 'connected' },
  },
  {
    id: 'app-1',
    type: 'app',
    position: { x: 400, y: 100 },
    data: { label: 'Frontend', type: 'web', framework: 'React', status: 'running' },
  },
  {
    id: 'app-2',
    type: 'app',
    position: { x: 400, y: 300 },
    data: { label: 'Backend', type: 'service', framework: 'Node.js', status: 'running' },
  },
  {
    id: 'api-1',
    type: 'api',
    position: { x: 700, y: 200 },
    data: { label: 'Public API', type: 'rest', endpoint: '/api/v1', status: 'active' },
  },
  {
    id: 'storage-1',
    type: 'storage',
    position: { x: 100, y: 400 },
    data: { label: 'Media Storage', type: 's3', size: '250 GB', status: 'healthy' },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1',
    source: 'db-1',
    target: 'app-2',
    type: 'custom',
    animated: true,
  },
  {
    id: 'e2',
    source: 'app-2',
    target: 'app-1',
    type: 'custom',
    animated: true,
  },
  {
    id: 'e3',
    source: 'app-2',
    target: 'api-1',
    type: 'custom',
    animated: true,
  },
  {
    id: 'e4',
    source: 'storage-1',
    target: 'app-2',
    type: 'custom',
    animated: true,
  },
];

interface FlowCanvasProps {
  onStatsChange?: (nodeCount: number, edgeCount: number) => void;
}

export const FlowCanvas = ({ onStatsChange }: FlowCanvasProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeId, setNodeId] = useState(10);

  useEffect(() => {
    onStatsChange?.(nodes.length, edges.length);
  }, [nodes.length, edges.length, onStatsChange]);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge({ ...params, type: 'custom', animated: true }, eds)
      );
      toast.success('Connection created');
    },
    [setEdges]
  );

  const handleAddNode = useCallback(
    (type: string, subtype: string) => {
      const newNode: Node = {
        id: `${type}-${nodeId}`,
        type,
        position: { 
          x: Math.random() * 400 + 200, 
          y: Math.random() * 300 + 100 
        },
        data: getNodeData(type, subtype),
      };
      setNodes((nds) => [...nds, newNode]);
      setNodeId((id) => id + 1);
      toast.success(`${subtype} node added`);
    },
    [nodeId, setNodes]
  );

  const handleClear = useCallback(() => {
    setNodes([]);
    setEdges([]);
    toast.success('Canvas cleared');
  }, [setNodes, setEdges]);

  return (
    <div className="w-full h-full relative">
      <FlowToolbar onAddNode={handleAddNode} onClear={handleClear} />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={{
          type: 'custom',
          animated: true,
        }}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        className="bg-background"
        proOptions={{ hideAttribution: true }}
      >
        <Controls 
          className="!bottom-4 !left-4"
          showInteractive={false}
        />
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={24} 
          size={1}
          color="hsl(220 15% 25%)"
        />
      </ReactFlow>
    </div>
  );
};

function getNodeData(type: string, subtype: string) {
  switch (type) {
    case 'database':
      return { 
        label: subtype === 'postgresql' ? 'Neon Postgres' : 
               subtype === 'mysql' ? 'MySQL' : 
               subtype === 'mongodb' ? 'MongoDB' : 'Redis',
        type: subtype,
        status: 'connected' 
      };
    case 'app':
      return { 
        label: subtype === 'web' ? 'Web Application' : 'Backend Service',
        type: subtype,
        framework: subtype === 'web' ? 'React' : 'Node.js',
        status: 'running' 
      };
    case 'api':
      return { 
        label: subtype === 'rest' ? 'REST API' : 'GraphQL API',
        type: subtype,
        endpoint: subtype === 'rest' ? '/api/v1' : '/graphql',
        status: 'active' 
      };
    case 'storage':
      return { 
        label: subtype === 's3' ? 'AWS S3' : 'CDN',
        type: subtype,
        size: '0 GB',
        status: 'healthy' 
      };
    default:
      return { label: 'Unknown', type: subtype };
  }
}
