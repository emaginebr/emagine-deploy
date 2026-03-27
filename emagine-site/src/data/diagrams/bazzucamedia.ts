import { ProjectDiagram } from '@/types/diagram';

const diagram: ProjectDiagram = {
  slug: 'bazzucamedia',
  title: 'BazzucaMedia',
  parent: 'main',
  mermaidDefinition: `graph TD
    Dashboard["Dashboard React"]
    API["API .NET 8"]
    NAuth["NAuth"]
    Scheduler["Scheduler Service"]
    Queue["RabbitMQ"]
    Worker["Worker Playwright"]
    Twitter["Twitter API"]
    LinkedIn["LinkedIn"]
    DB[("PostgreSQL")]
    zTools["zTools"]

    Dashboard -->|"REST"| API
    Dashboard -->|"Auth"| NAuth
    API -->|"CRUD"| DB
    API -->|"Agenda post"| Scheduler
    API -->|"Utils"| zTools
    Scheduler -->|"Enqueue"| Queue
    Queue -->|"Consume"| Worker
    Worker -->|"API v2"| Twitter
    Worker -->|"Automação"| LinkedIn
    Worker -->|"Status"| DB

    click Dashboard mermaidCallback "Dashboard"
    click API mermaidCallback "API"
    click NAuth mermaidCallback "NAuth"
    click Scheduler mermaidCallback "Scheduler"
    click Queue mermaidCallback "Queue"
    click Worker mermaidCallback "Worker"
    click Twitter mermaidCallback "Twitter"
    click LinkedIn mermaidCallback "LinkedIn"
    click DB mermaidCallback "DB"
    click zTools mermaidCallback "zTools"`,
  nodes: [
    {
      id: 'Dashboard',
      label: 'Dashboard React',
      description: 'Interface web para gerenciar posts, agendar publicações e visualizar analytics.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      status: 'active',
      url: 'https://bazzuca.media',
    },
    {
      id: 'API',
      label: 'API .NET 8',
      description: 'Backend REST API que gerencia usuários, posts e integrações com redes sociais.',
      technologies: ['.NET 8', 'PostgreSQL', 'Docker'],
      status: 'active',
    },
    {
      id: 'NAuth',
      label: 'NAuth',
      description: 'Autenticação de usuários via microserviço NAuth.',
      technologies: ['JWT', '.NET 8'],
      status: 'active',
      navigateTo: 'nauth',
    },
    {
      id: 'Scheduler',
      label: 'Scheduler Service',
      description: 'Serviço que monitora posts agendados e os enfileira no RabbitMQ no horário programado.',
      technologies: ['.NET 8', 'Background Service'],
      status: 'active',
    },
    {
      id: 'Queue',
      label: 'RabbitMQ',
      description: 'Fila de mensagens que desacopla o agendamento da execução das publicações.',
      technologies: ['RabbitMQ', 'AMQP', 'Docker'],
      status: 'active',
    },
    {
      id: 'Worker',
      label: 'Worker Playwright',
      description: 'Worker que consome a fila e executa publicações via API ou automação com Playwright.',
      technologies: ['Playwright', '.NET 8', 'Headless Browser'],
      status: 'active',
    },
    {
      id: 'Twitter',
      label: 'Twitter API',
      description: 'Integração com Twitter API v2 para publicação automática de tweets.',
      technologies: ['Twitter API v2', 'OAuth 2.0'],
      status: 'active',
    },
    {
      id: 'LinkedIn',
      label: 'LinkedIn',
      description: 'Automação de publicações no LinkedIn via Playwright (headless browser).',
      technologies: ['Playwright', 'Automação'],
      status: 'planned',
    },
    {
      id: 'DB',
      label: 'PostgreSQL',
      description: 'Banco de dados com histórico de publicações, métricas e configurações de contas.',
      technologies: ['PostgreSQL', 'Docker'],
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
