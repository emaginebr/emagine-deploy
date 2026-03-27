import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, ExternalLink, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import MermaidRenderer from './MermaidRenderer';
import { getDiagram } from '@/data/diagrams';
import { DiagramNode } from '@/types/diagram';

const DiagramViewer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [selectedNode, setSelectedNode] = useState<DiagramNode | null>(null);

  const activeDiagram = getDiagram(slug || 'main');

  if (!activeDiagram) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 text-lg mb-4">Diagrama não encontrado</p>
          <Button
            variant="outline"
            onClick={() => navigate('/diagram')}
            className="bg-white/[0.04] border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.08]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao principal
          </Button>
        </div>
      </div>
    );
  }

  const handleNodeClick = (nodeId: string) => {
    const node = activeDiagram.nodes.find((n) => n.id === nodeId);
    if (!node) return;

    if (node.navigateTo) {
      setSelectedNode(null);
      navigate(`/diagram/${node.navigateTo}`);
    } else {
      setSelectedNode(node);
    }
  };

  const handleBack = () => {
    setSelectedNode(null);
    if (activeDiagram.parent) {
      const parentSlug = activeDiagram.parent === 'main' ? '' : activeDiagram.parent;
      navigate(`/diagram${parentSlug ? `/${parentSlug}` : ''}`);
    } else {
      navigate('/');
    }
  };

  const getStatusStyle = (status?: string) => {
    switch (status) {
      case 'active':
        return { bg: 'bg-[#00E87B]/10', text: 'text-[#00E87B]', dot: 'bg-[#00E87B]', label: t('diagramSection.statusActive') };
      case 'planned':
        return { bg: 'bg-[#FFBD2E]/10', text: 'text-[#FFBD2E]', dot: 'bg-[#FFBD2E]', label: t('diagramSection.statusPlanned') };
      case 'deprecated':
        return { bg: 'bg-[#FF6B6B]/10', text: 'text-[#FF6B6B]', dot: 'bg-[#FF6B6B]', label: t('diagramSection.statusDeprecated') };
      default:
        return { bg: 'bg-white/5', text: 'text-white/40', dot: 'bg-white/40', label: '—' };
    }
  };

  const backLabel = activeDiagram.parent
    ? getDiagram(activeDiagram.parent)?.title || 'Voltar'
    : t('header.home');

  return (
    <div className="h-full relative noise-overlay">
      {/* Back button + title */}
      <div className="absolute top-4 left-4 z-30 flex items-center gap-3">
        <Button
          size="sm"
          variant="outline"
          onClick={handleBack}
          className="bg-white/[0.04] border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.08] gap-1.5"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Button>
        <span className="text-white/30 text-sm font-medium">
          {activeDiagram.title}
        </span>
      </div>

      {/* Full-screen diagram */}
      <MermaidRenderer
        definition={activeDiagram.mermaidDefinition}
        onNodeClick={handleNodeClick}
      />

      {/* Floating hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
        <span className="text-white/20 text-xs">
          {t('diagramSection.clickHint')}
        </span>
      </div>

      {/* Floating node detail panel */}
      {selectedNode && (
        <div className="absolute top-4 right-16 z-30 w-80 animate-fade-in-up">
          <div className="glass-effect-strong rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white/90">{selectedNode.label}</h3>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-white/30 hover:text-white/60 transition-colors p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {selectedNode.status && (
              <div className="mb-4">
                {(() => {
                  const style = getStatusStyle(selectedNode.status);
                  return (
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                      {style.label}
                    </div>
                  );
                })()}
              </div>
            )}

            <p className="text-white/40 text-sm leading-relaxed mb-5">
              {selectedNode.description}
            </p>

            {selectedNode.technologies && selectedNode.technologies.length > 0 && (
              <div className="mb-5">
                <h4 className="text-white/50 text-xs font-semibold tracking-wide uppercase mb-3">
                  {t('diagramSection.technologies')}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNode.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-white/[0.04] text-white/40 text-xs border border-white/[0.04]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedNode.url && (
              <Button
                size="sm"
                className="w-full bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/10 transition-all duration-300 text-xs"
                onClick={() => window.open(selectedNode.url, '_blank')}
              >
                <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                {t('diagramSection.viewProject')}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagramViewer;
