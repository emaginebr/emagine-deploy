import { ProjectDiagram } from '@/types/diagram';

const diagram: ProjectDiagram = {
  slug: 'ztools',
  title: 'zTools',
  parent: 'main',
  mermaidDefinition: `graph TD
    Package["📦 zTools NuGet"]
    OpenAI["OpenAI Integration"]
    S3["AWS S3 Storage"]
    Email["MailerSend Email"]
    Crypto["Crypto Utils"]
    StringUtils["String Helpers"]
    DateUtils["Date Helpers"]
    HttpClient["HTTP Client"]

    Package --> OpenAI
    Package --> S3
    Package --> Email
    Package --> Crypto
    Package --> StringUtils
    Package --> DateUtils
    Package --> HttpClient
    OpenAI -->|"API"| OpenAIAPI["OpenAI API"]
    S3 -->|"SDK"| AWSSDK["AWS SDK"]
    Email -->|"API"| MailerAPI["MailerSend API"]

    click Package mermaidCallback "Package"
    click OpenAI mermaidCallback "OpenAI"
    click S3 mermaidCallback "S3"
    click Email mermaidCallback "Email"
    click Crypto mermaidCallback "Crypto"
    click StringUtils mermaidCallback "StringUtils"
    click DateUtils mermaidCallback "DateUtils"
    click HttpClient mermaidCallback "HttpClient"
    click OpenAIAPI mermaidCallback "OpenAIAPI"
    click AWSSDK mermaidCallback "AWSSDK"
    click MailerAPI mermaidCallback "MailerAPI"`,
  nodes: [
    {
      id: 'Package',
      label: 'zTools NuGet',
      description: 'Pacote NuGet compartilhado entre todos os microserviços da Emagine.',
      technologies: ['.NET 8', 'NuGet'],
      status: 'active',
    },
    {
      id: 'OpenAI',
      label: 'OpenAI Integration',
      description: 'Wrapper para chamadas à API da OpenAI com retry, rate limiting e streaming.',
      technologies: ['OpenAI API', '.NET 8'],
      status: 'active',
    },
    {
      id: 'S3',
      label: 'AWS S3 Storage',
      description: 'Upload, download e gerenciamento de arquivos no AWS S3.',
      technologies: ['AWS S3', 'AWS SDK .NET'],
      status: 'active',
    },
    {
      id: 'Email',
      label: 'MailerSend Email',
      description: 'Envio de emails transacionais com templates e variáveis dinâmicas.',
      technologies: ['MailerSend API', '.NET 8'],
      status: 'active',
    },
    {
      id: 'Crypto',
      label: 'Crypto Utils',
      description: 'Funções de hash, criptografia e geração de tokens seguros.',
      technologies: ['.NET 8', 'AES', 'SHA256'],
      status: 'active',
    },
    {
      id: 'StringUtils',
      label: 'String Helpers',
      description: 'Utilitários de manipulação de strings: slug, truncate, sanitize, masks.',
      technologies: ['.NET 8'],
      status: 'active',
    },
    {
      id: 'DateUtils',
      label: 'Date Helpers',
      description: 'Helpers para formatação, timezone e cálculos com datas.',
      technologies: ['.NET 8'],
      status: 'active',
    },
    {
      id: 'HttpClient',
      label: 'HTTP Client',
      description: 'HTTP client configurado com retry policies, circuit breaker e logging.',
      technologies: ['.NET 8', 'Polly'],
      status: 'active',
    },
    {
      id: 'OpenAIAPI',
      label: 'OpenAI API',
      description: 'Serviço externo da OpenAI para geração de texto e embeddings.',
      technologies: ['OpenAI', 'GPT-4'],
      status: 'active',
    },
    {
      id: 'AWSSDK',
      label: 'AWS SDK',
      description: 'SDK oficial da AWS para interação com serviços de cloud.',
      technologies: ['AWS SDK .NET'],
      status: 'active',
    },
    {
      id: 'MailerAPI',
      label: 'MailerSend API',
      description: 'API externa do MailerSend para envio de emails.',
      technologies: ['MailerSend'],
      status: 'active',
    },
  ],
};

export default diagram;
