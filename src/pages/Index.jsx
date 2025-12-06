import { useState } from 'react';
import { FlowCanvas } from '@/components/FlowCanvas';
import { Header } from '@/components/Header';

const Index = () => {
  const [stats, setStats] = useState({ nodeCount: 0, edgeCount: 0 });

  return (
    <div className="h-screen w-screen flex flex-col bg-background overflow-hidden">
      <Header stats={stats} />
      <div style={{ width: '100%', height: 'calc(100vh - 56px)' }}>
        <FlowCanvas onStatsChange={setStats} />
      </div>
    </div>
  );
};

export default Index;
