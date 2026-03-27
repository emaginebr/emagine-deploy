import { ProjectDiagram } from '@/types/diagram';

const diagram: ProjectDiagram = {
  slug: 'main',
  title: 'Visão Geral',
  mermaidDefinition: `graph TD
    NAuth["🔐 NAuth"]
    NNews["📰 NNews"]
    zTools["🛠️ zTools"]
    BazzucaMedia["🚀 BazzucaMedia"]

    NAuth -->|"Utils"| zTools
    NNews -->|"Utils"| zTools
    BazzucaMedia -->|"Utils"| zTools
    NAuth ---|"Auth"| BazzucaMedia
    NAuth ---|"Auth"| NNews

    click NAuth mermaidCallback "NAuth"
    click NNews mermaidCallback "NNews"
    click zTools mermaidCallback "zTools"
    click BazzucaMedia mermaidCallback "BazzucaMedia"`,
  nodes: [
    {
      id: 'NAuth',
      label: 'NAuth',
      description: 'Microserviço de autenticação e autorização com JWT, OAuth e gerenciamento de usuários.',
      technologies: ['.NET 8', 'JWT', 'PostgreSQL', 'Stripe'],
      status: 'active',
      navigateTo: 'nauth',
    },
    {
      id: 'NNews',
      label: 'NNews',
      description: 'Microserviço de notícias e conteúdo com feed RSS e agregação de fontes.',
      technologies: ['.NET 8', 'PostgreSQL', 'RSS'],
      status: 'active',
      navigateTo: 'nnews',
    },
    {
      id: 'zTools',
      label: 'zTools',
      description: 'Pacote utilitário compartilhado entre microserviços. Integração com OpenAI, AWS S3 e MailerSend.',
      technologies: ['.NET 8', 'OpenAI', 'AWS S3', 'MailerSend'],
      status: 'active',
      navigateTo: 'ztools',
    },
    {
      id: 'BazzucaMedia',
      label: 'BazzucaMedia',
      description: 'Plataforma de automação de social media com agendamento e publicação automática.',
      technologies: ['React', '.NET 8', 'RabbitMQ', 'Playwright'],
      status: 'active',
      navigateTo: 'bazzucamedia',
    },
  ],
};

export default diagram;
