import { BaseEdge, EdgeProps, getSmoothStepPath, EdgeLabelRenderer, useReactFlow } from '@xyflow/react';
import { X } from 'lucide-react';
import { useState } from 'react';

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
}: EdgeProps) => {
  const { setEdges } = useReactFlow();
  const [isHovered, setIsHovered] = useState(false);

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 16,
  });

  const onEdgeDelete = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      {/* Invisible wider path for hover detection */}
      <path
        d={edgePath}
        fill="none"
        strokeWidth={20}
        stroke="transparent"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ cursor: 'pointer' }}
      />
      {/* Glow layer */}
      <BaseEdge
        id={`${id}-glow`}
        path={edgePath}
        style={{
          ...style,
          strokeWidth: 8,
          stroke: 'hsl(180 100% 50% / 0.2)',
          filter: 'blur(4px)',
        }}
      />
      {/* Main edge */}
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: 2,
          stroke: 'hsl(180 100% 50%)',
        }}
      />
      {/* Animated dots */}
      <circle r="4" fill="hsl(180 100% 60%)">
        <animateMotion dur="2s" repeatCount="indefinite" path={edgePath} />
      </circle>
      {/* Delete button */}
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered && (
            <button
              onClick={onEdgeDelete}
              className="w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
