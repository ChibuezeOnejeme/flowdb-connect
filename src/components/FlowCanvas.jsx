import { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { EnvNode } from './nodes/EnvNode';
import { DatabaseNode } from './nodes/DatabaseNode';
import { WebAppNode } from './nodes/WebAppNode';
import { CustomEdge } from './CustomEdge';
import { FlowToolbar } from './FlowToolbar';
import { NodeDetailsModal } from './NodeDetailsModal';

const nodeTypes = {
  env: EnvNode,
  database: DatabaseNode,
  webapp: WebAppNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

const STORAGE_KEY = 'infrastructure-flow-data';

const defaultNodes = [
  {
    id: 'env-1',
    type: 'env',
    position: { x: 100, y: 100 },
    data: { label: 'ENV Variables', variables: {} },
  },
  {
    id: 'database-1',
    type: 'database',
    position: { x: 100, y: 300 },
    data: { label: 'Supabase', supabaseUrl: '', supabaseKey: '' },
  },
  {
    id: 'webapp-1',
    type: 'webapp',
    position: { x: 450, y: 200 },
    data: { label: 'Web App', containerUrl: '', dockerImage: '', port: '' },
  },
];

const getInitialData = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Validate that we have valid node types
      const validTypes = ['env', 'database', 'webapp'];
      const validNodes = parsed.nodes?.filter(n => validTypes.includes(n.type)) || [];
      
      if (validNodes.length > 0) {
        return { nodes: validNodes, edges: parsed.edges || [] };
      }
    }
  } catch (e) {
    console.error('Failed to load saved data:', e);
    localStorage.removeItem(STORAGE_KEY);
  }
  
  return { nodes: defaultNodes, edges: [] };
};

export const FlowCanvas = ({ onStatsChange }) => {
  const initialData = getInitialData();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialData.edges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Save to localStorage whenever nodes or edges change
  useEffect(() => {
    const data = { nodes, edges };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    
    if (onStatsChange) {
      onStatsChange({ nodeCount: nodes.length, edgeCount: edges.length });
    }
  }, [nodes, edges, onStatsChange]);

  const onConnect = useCallback(
    (params) => {
      // Validate connections: only env and database can connect to webapp
      const sourceNode = nodes.find((n) => n.id === params.source);
      const targetNode = nodes.find((n) => n.id === params.target);
      
      if (!sourceNode || !targetNode) return;
      
      // Only allow connections TO webapp
      if (targetNode.type !== 'webapp') {
        return;
      }
      
      // Only allow connections FROM env or database
      if (sourceNode.type !== 'env' && sourceNode.type !== 'database') {
        return;
      }

      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: 'custom',
            animated: true,
          },
          eds
        )
      );
    },
    [nodes, setEdges]
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setModalOpen(true);
  }, []);

  const handleNodeSave = useCallback((nodeId, newData) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node
      )
    );
  }, [setNodes]);

  const handleAddNode = useCallback((type) => {
    const id = `${type}-${Date.now()}`;
    const position = { x: Math.random() * 300 + 100, y: Math.random() * 300 + 100 };
    
    let data = {};
    switch (type) {
      case 'env':
        data = { label: 'ENV Variables', variables: {} };
        break;
      case 'database':
        data = { label: 'Supabase', supabaseUrl: '', supabaseKey: '' };
        break;
      case 'webapp':
        data = { label: 'Web App', containerUrl: '', dockerImage: '', port: '' };
        break;
      default:
        break;
    }

    setNodes((nds) => [...nds, { id, type, position, data }]);
  }, [setNodes]);

  const handleClear = useCallback(() => {
    setNodes([]);
    setEdges([]);
    localStorage.removeItem(STORAGE_KEY);
  }, [setNodes, setEdges]);

  return (
    <div style={{ width: '100%', height: '100%' }} className="relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={{
          type: 'custom',
          animated: true,
        }}
        fitView
        fitViewOptions={{ maxZoom: 1, padding: 0.2 }}
        minZoom={0.3}
        maxZoom={2}
        className="bg-background"
      >
        <Controls className="!bg-card/80 !backdrop-blur-sm !border-border !rounded-lg [&>button]:!bg-card [&>button]:!border-border [&>button]:!text-foreground [&>button:hover]:!bg-muted" />
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="hsl(var(--muted-foreground) / 0.2)"
        />
      </ReactFlow>
      
      <FlowToolbar onAddNode={handleAddNode} onClear={handleClear} />
      
      <NodeDetailsModal
        node={selectedNode}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleNodeSave}
      />
    </div>
  );
};
