import { useEffect, useRef, useState, useCallback } from 'react';
import mermaid from 'mermaid';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MermaidRendererProps {
  definition: string;
  onNodeClick: (nodeId: string) => void;
}

let renderCounter = 0;

const MAX_AUTO_ZOOM = 2;
const PADDING = 80;

const MermaidRenderer = ({ definition, onNodeClick }: MermaidRendererProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const callbackRef = useRef(onNodeClick);
  const fitScaleRef = useRef(1);
  const [scale, setScale] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const handleZoomIn = () => setScale((s) => Math.min(s + 0.2, 3));
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.2, 0.3));
  const handleReset = () => setScale(fitScaleRef.current);

  callbackRef.current = onNodeClick;

  // Register global callback synchronously so it's always available
  (window as any).mermaidCallback = (nodeId: string) => {
    callbackRef.current(nodeId);
  };

  useEffect(() => {
    return () => {
      delete (window as any).mermaidCallback;
    };
  }, []);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!containerRef.current) return;

      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'loose',
        theme: 'dark',
        themeVariables: {
          primaryColor: '#00E87B',
          primaryTextColor: '#0a0a12',
          primaryBorderColor: '#00E87B',
          secondaryColor: '#6C63FF',
          secondaryTextColor: '#ffffff',
          secondaryBorderColor: '#6C63FF',
          tertiaryColor: 'rgba(255,255,255,0.06)',
          lineColor: 'rgba(255,255,255,0.25)',
          textColor: 'rgba(255,255,255,0.85)',
          mainBkg: '#1a1a2e',
          nodeBorder: 'rgba(255,255,255,0.15)',
          clusterBkg: 'rgba(108,99,255,0.1)',
          clusterBorder: 'rgba(108,99,255,0.3)',
          fontFamily: 'Outfit, sans-serif',
          fontSize: '14px',
        },
      });

      try {
        renderCounter++;
        const id = `mermaid-diagram-${renderCounter}`;
        const { svg } = await mermaid.render(id, definition);
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
          setError(null);

          // Fit-to-screen: calculate scale so diagram fills the viewport
          const svgEl = containerRef.current.querySelector('svg');
          if (svgEl && wrapperRef.current) {
            const svgW = svgEl.getBoundingClientRect().width;
            const svgH = svgEl.getBoundingClientRect().height;
            const wrapW = wrapperRef.current.clientWidth - PADDING;
            const wrapH = wrapperRef.current.clientHeight - PADDING;

            if (svgW > 0 && svgH > 0) {
              const fitScale = Math.min(wrapW / svgW, wrapH / svgH, MAX_AUTO_ZOOM);
              const clamped = Math.round(fitScale * 100) / 100;
              fitScaleRef.current = clamped;
              setScale(clamped);
            }

            // Fallback: attach click listeners to nodes
            svgEl.querySelectorAll('.node').forEach((node) => {
              const nodeEl = node as HTMLElement;
              nodeEl.style.cursor = 'pointer';
              nodeEl.addEventListener('click', (e) => {
                const elId = nodeEl.id;
                const match = elId.match(/flowchart-(\w+)-\d+/);
                if (match) {
                  e.preventDefault();
                  e.stopPropagation();
                  callbackRef.current(match[1]);
                }
              });
            });
          }
        }
      } catch (e) {
        setError('Erro ao renderizar diagrama');
        console.error('Mermaid render error:', e);
      }
    };

    renderDiagram();
  }, [definition]);

  return (
    <div className="relative h-full">
      {/* Zoom controls */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={handleZoomOut}
          className="bg-white/[0.04] border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.08] h-8 w-8 p-0"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleReset}
          className="bg-white/[0.04] border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.08] h-8 w-8 p-0"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleZoomIn}
          className="bg-white/[0.04] border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.08] h-8 w-8 p-0"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>

      {/* Diagram container - full screen */}
      <div ref={wrapperRef} className="h-full overflow-auto flex items-center justify-center">
        {error ? (
          <p className="text-red-400 text-sm">{error}</p>
        ) : (
          <div
            ref={containerRef}
            className="mermaid-container transition-transform duration-200 cursor-grab active:cursor-grabbing"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'center center',
            }}
          />
        )}
      </div>

      {/* Scale indicator */}
      <div className="absolute bottom-4 left-4 z-20">
        <span className="text-white/20 text-xs font-mono">
          {Math.round(scale * 100)}%
        </span>
      </div>
    </div>
  );
};

export default MermaidRenderer;
