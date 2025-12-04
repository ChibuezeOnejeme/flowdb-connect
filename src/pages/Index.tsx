import { useState } from 'react';
import { FlowCanvas } from '@/components/FlowCanvas';
import { Header } from '@/components/Header';

const Index = () => {
  const [nodeCount, setNodeCount] = useState(5);
  const [edgeCount, setEdgeCount] = useState(4);

  const handleStatsChange = (nodes: number, edges: number) => {
    setNodeCount(nodes);
    setEdgeCount(edges);
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
      <Header nodeCount={nodeCount} edgeCount={edgeCount} />
      <main className="flex-1 relative">
        <FlowCanvas onStatsChange={handleStatsChange} />
      </main>
    </div>
  );
};

export default Index;
