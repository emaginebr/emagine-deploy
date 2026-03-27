export interface DiagramNode {
  id: string;
  label: string;
  description: string;
  technologies?: string[];
  status?: 'active' | 'planned' | 'deprecated';
  url?: string;
  navigateTo?: string;
}

export interface ProjectDiagram {
  slug: string;
  title: string;
  parent?: string;
  mermaidDefinition: string;
  nodes: DiagramNode[];
}
