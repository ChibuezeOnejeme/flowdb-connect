import { BaseEdge, getSmoothStepPath, EdgeLabelRenderer, useReactFlow } from '@xyflow/react';
import { X, Database, Settings } from 'lucide-react';

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
  data,
}) => {
  const { setEdges, getNode } = useReactFlow();
  
  // Get source node to determine edge color and label
  const sourceId = id.split('-')[0] + '-' + id.split('-')[1];
  const sourceNode = getNode(sourceId);
  const sourceType = sourceNode?.type;

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

  // Determine colors based on source type
  const colors = {
    env: { stroke: 'hsl(38 92% 50%)', glow: 'hsl(38 92% 50% / 0.3)' },
    database: { stroke: 'hsl(160 84% 39%)', glow: 'hsl(160 84% 39% / 0.3)' },
    default: { stroke: 'hsl(180 100% 60%)', glow: 'hsl(180 100% 60% / 0.3)' },
  };

  const edgeColor = colors[sourceType] || colors.default;

  const EdgeIcon = sourceType === 'database' ? Database : sourceType === 'env' ? Settings : null;

  return (
    <>
      <BaseEdge
        id={`${id}-glow`}
        path={edgePath}
        style={{
          strokeWidth: 8,
          stroke: edgeColor.glow,
          filter: 'blur(4px)',
        }}
      />
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          ...style,
          strokeWidth: 2,
          stroke: edgeColor.stroke,
        }}
        markerEnd={markerEnd}
      />
      <circle r="4" fill={edgeColor.stroke}>
        <animateMotion dur="2s" repeatCount="indefinite" path={edgePath} />
      </circle>
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan flex items-center gap-1"
        >
          {EdgeIcon && (
            <div 
              className="w-6 h-6 rounded-full bg-background/90 border border-border flex items-center justify-center"
              style={{ borderColor: edgeColor.stroke }}
            >
              <EdgeIcon className="w-3 h-3" style={{ color: edgeColor.stroke }} />
            </div>
          )}
          <button
            onClick={onEdgeDelete}
            className="w-5 h-5 rounded-full bg-background/80 border border-border text-muted-foreground flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
