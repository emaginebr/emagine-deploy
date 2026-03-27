import { ProjectDiagram } from '@/types/diagram';

const diagram: ProjectDiagram = {
  slug: 'nnews',
  title: 'NNews',
  parent: 'main',
  mermaidDefinition: `graph TD
    Frontend["Frontend React"]
    API["NNews API"]
    FeedService["Feed Service"]
    Scheduler["RSS Scheduler"]
    NAuth["NAuth"]
    DB[("PostgreSQL")]
    RSS["RSS Sources"]
    zTools["zTools"]

    Frontend -->|"REST"| API
    Frontend -->|"Auth"| NAuth
    API -->|"CRUD"| DB
    API -->|"Feeds"| FeedService
    FeedService -->|"Parse"| RSS
    Scheduler -->|"Cron"| FeedService
    FeedService -->|"Store"| DB
    API -->|"Utils"| zTools

    click Frontend mermaidCallback "Frontend"
    click API mermaidCallback "API"
    click FeedService mermaidCallback "FeedService"
    click Scheduler mermaidCallback "Scheduler"
    click NAuth mermaidCallback "NAuth"
    click DB mermaidCallback "DB"
    click RSS mermaidCallback "RSS"
    click zTools mermaidCallback "zTools"`,
  nodes: [
    {
      id: 'Frontend',
      label: 'Frontend React',
      description: 'Interface para leitura de notícias, gerenciamento de fontes e categorias.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      status: 'active',
    },
    {
      id: 'API',
      label: 'NNews API',
      description: 'API REST para gerenciar notícias, fontes RSS e categorias.',
      technologies: ['.NET 8', 'ASP.NET Core'],
      status: 'active',
    },
    {
      id: 'FeedService',
      label: 'Feed Service',
      description: 'Serviço que parseia feeds RSS/Atom e normaliza os artigos para armazenamento.',
      technologies: ['.NET 8', 'RSS', 'Atom'],
      status: 'active',
    },
    {
      id: 'Scheduler',
      label: 'RSS Scheduler',
      description: 'Background service que agenda a coleta periódica de novos artigos das fontes.',
      technologies: ['.NET 8', 'Background Service'],
      status: 'active',
    },
    {
      id: 'NAuth',
      label: 'NAuth',
      description: 'Autenticação de usuários via JWT fornecida pelo microserviço NAuth.',
      technologies: ['JWT', '.NET 8'],
      status: 'active',
      navigateTo: 'nauth',
    },
    {
      id: 'DB',
      label: 'PostgreSQL',
      description: 'Banco com artigos, fontes, categorias e preferências dos usuários.',
      technologies: ['PostgreSQL', 'Entity Framework'],
      status: 'active',
    },
    {
      id: 'RSS',
      label: 'RSS Sources',
      description: 'Fontes externas de notícias em formato RSS e Atom.',
      technologies: ['RSS 2.0', 'Atom'],
      status: 'active',
    },
    {
      id: 'zTools',
      label: 'zTools',
      description: 'Pacote utilitário compartilhado.',
      technologies: ['.NET 8'],
      status: 'active',
      navigateTo: 'ztools',
    },
  ],
};

export default diagram;
