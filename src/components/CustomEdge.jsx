import { BaseEdge, getSmoothStepPath, EdgeLabelRenderer, useReactFlow } from '@xyflow/react';
import { X } from 'lucide-react';

export const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) => {
  const { setEdges } = useReactFlow();

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 16,
  });

  const onEdgeDelete = (event) => {
    event.stopPropagation();
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <BaseEdge
        id={`${id}-glow`}
        path={edgePath}
        style={{
          strokeWidth: 8,
          stroke: 'hsl(180 100% 60% / 0.3)',
          filter: 'blur(4px)',
        }}
      />
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          ...style,
          strokeWidth: 2,
          stroke: 'hsl(180 100% 60%)',
        }}
        markerEnd={markerEnd}
      />
      <circle r="4" fill="hsl(180 100% 60%)">
        <animateMotion dur="2s" repeatCount="indefinite" path={edgePath} />
      </circle>
      <EdgeLabelRenderer>
        <button
          onClick={onEdgeDelete}
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan w-5 h-5 rounded-full bg-background/80 border border-border text-muted-foreground flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      </EdgeLabelRenderer>
    </>
  );
};
