import { FlowCanvas } from '@/components/FlowCanvas';
import { Header } from '@/components/Header';

const Index = () => {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
      <Header />
      <main className="flex-1 relative">
        <FlowCanvas />
      </main>
    </div>
  );
};

export default Index;
