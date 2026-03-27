import { ProjectDiagram } from '@/types/diagram';

const diagram: ProjectDiagram = {
  slug: 'nauth',
  title: 'NAuth',
  parent: 'main',
  mermaidDefinition: `graph TD
    Frontend["Frontend React"]
    API["NAuth API"]
    AuthController["Auth Controller"]
    UserController["User Controller"]
    PlanController["Plan Controller"]
    JWT["JWT Provider"]
    Stripe["Stripe Integration"]
    DB[("PostgreSQL")]
    zTools["zTools"]
    MailerSend["MailerSend"]

    Frontend -->|"REST"| API
    API --> AuthController
    API --> UserController
    API --> PlanController
    AuthController -->|"Generate"| JWT
    AuthController -->|"Validate"| DB
    UserController -->|"CRUD"| DB
    PlanController -->|"Subscription"| Stripe
    PlanController -->|"Plans"| DB
    API -->|"Utils"| zTools
    zTools -->|"Email"| MailerSend

    click Frontend mermaidCallback "Frontend"
    click API mermaidCallback "API"
    click AuthController mermaidCallback "AuthController"
    click UserController mermaidCallback "UserController"
    click PlanController mermaidCallback "PlanController"
    click JWT mermaidCallback "JWT"
    click Stripe mermaidCallback "Stripe"
    click DB mermaidCallback "DB"
    click zTools mermaidCallback "zTools"
    click MailerSend mermaidCallback "MailerSend"`,
  nodes: [
    {
      id: 'Frontend',
      label: 'Frontend React',
      description: 'Interface de login, registro, gerenciamento de perfil e planos de assinatura.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      status: 'active',
    },
    {
      id: 'API',
      label: 'NAuth API',
      description: 'API REST em .NET 8 que expõe endpoints de autenticação, usuários e planos.',
      technologies: ['.NET 8', 'ASP.NET Core', 'Swagger'],
      status: 'active',
    },
    {
      id: 'AuthController',
      label: 'Auth Controller',
      description: 'Gerencia login, registro, refresh token e recuperação de senha.',
      technologies: ['.NET 8', 'JWT', 'BCrypt'],
      status: 'active',
    },
    {
      id: 'UserController',
      label: 'User Controller',
      description: 'CRUD de usuários, atualização de perfil e gerenciamento de permissões.',
      technologies: ['.NET 8', 'Entity Framework'],
      status: 'active',
    },
    {
      id: 'PlanController',
      label: 'Plan Controller',
      description: 'Gerenciamento de planos de assinatura e integração com Stripe para cobranças.',
      technologies: ['.NET 8', 'Stripe API'],
      status: 'active',
    },
    {
      id: 'JWT',
      label: 'JWT Provider',
      description: 'Geração e validação de tokens JWT para autenticação stateless.',
      technologies: ['JWT', 'RSA', '.NET 8'],
      status: 'active',
    },
    {
      id: 'Stripe',
      label: 'Stripe Integration',
      description: 'Integração com Stripe para gerenciar assinaturas, pagamentos e webhooks.',
      technologies: ['Stripe API', 'Webhooks'],
      status: 'active',
    },
    {
      id: 'DB',
      label: 'PostgreSQL',
      description: 'Banco de dados com tabelas de usuários, tokens, planos e permissões.',
      technologies: ['PostgreSQL', 'Entity Framework'],
      status: 'active',
    },
    {
      id: 'zTools',
      label: 'zTools',
      description: 'Pacote utilitário compartilhado usado para envio de emails e helpers.',
      technologies: ['.NET 8'],
      status: 'active',
      navigateTo: 'ztools',
    },
    {
      id: 'MailerSend',
      label: 'MailerSend',
      description: 'Envio de emails transacionais: confirmação de conta, recuperação de senha.',
      technologies: ['MailerSend API'],
      status: 'active',
    },
  ],
};

export default diagram;
