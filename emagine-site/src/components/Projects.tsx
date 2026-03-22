
import { ExternalLink, Github, Calendar, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const Projects = () => {
  const { t } = useTranslation();

  const projects = [
    // ── Microserviços & Pacotes (emaginebr) ──
    {
      title: 'NAuth',
      description: t('projectsSection.descriptions.nauth'),
      technologies: ['.NET 8', 'React', 'PostgreSQL', 'JWT', 'Stripe', 'Radix UI'],
      category: 'Auth / Microserviço',
      year: '2025',
      status: 'completed',
      url: 'https://emagine.com.br/nauth',
      urlGitHub: 'https://github.com/emaginebr/NAuth',
      urlNuGet: 'https://www.nuget.org/packages/NAuth/',
      urlNpm: 'https://www.npmjs.com/package/nauth-react',
    },
    {
      title: 'zTools',
      description: t('projectsSection.descriptions.zTools'),
      technologies: ['.NET 8', 'OpenAI', 'AWS S3', 'MailerSend', 'Docker'],
      category: 'Utilities / Microserviço',
      year: '2025',
      status: 'completed',
      urlGitHub: 'https://github.com/emaginebr/zTools',
      urlNuGet: 'https://www.nuget.org/packages/zTools/',
    },
    {
      title: 'NNews',
      description: t('projectsSection.descriptions.nnews'),
      technologies: ['.NET 8', 'React', 'PostgreSQL', 'ChatGPT', 'DALL-E 3', 'Quill'],
      category: 'CMS / Microserviço',
      year: '2025',
      status: 'completed',
      urlGitHub: 'https://github.com/emaginebr/NNews',
      urlNuGet: 'https://www.nuget.org/packages/NNews/',
      urlNpm: 'https://www.npmjs.com/package/nnews-react',
    },
    {
      title: 'Lofn',
      description: t('projectsSection.descriptions.lofn'),
      technologies: ['.NET 8', 'React', 'GraphQL', 'HotChocolate', 'PostgreSQL', 'Stripe'],
      category: 'E-commerce / Microserviço',
      year: '2025',
      status: 'completed',
      url: 'https://emagine.com.br/lofn',
      urlGitHub: 'https://github.com/emaginebr/Lofn',
      urlNuGet: 'https://www.nuget.org/packages/Lofn/',
      urlNpm: 'https://www.npmjs.com/package/lofn-react',
    },
    {
      title: 'BazzucaMedia',
      description: t('projectsSection.descriptions.bazzucaMedia'),
      technologies: ['.NET 8', 'React', 'RabbitMQ', 'Playwright', 'Twitter API', 'Docker'],
      category: 'Social Media / Microserviço',
      year: '2025',
      status: 'deploying',
      url: 'https://bazzuca.media',
      urlGitHub: 'https://github.com/emaginebr/BazzucaMedia',
      urlNuGet: 'https://www.nuget.org/packages/BazzucaMedia/',
      urlNpm: 'https://www.npmjs.com/package/bazzuca-react',
    },
    {
      title: 'DevNote',
      description: t('projectsSection.descriptions.devNote'),
      technologies: ['.NET MAUI', 'Whisper', 'GPT-4o', 'SQLite'],
      category: 'Mobile / IA',
      year: '2025',
      status: 'completed',
      urlGitHub: 'https://github.com/landim32/DevNote',
    },
    // ── Aplicações Web (emaginebr) ──
    {
      title: 'Pandora Vault',
      description: t('projectsSection.descriptions.pandoraVault'),
      technologies: ['React', '.NET Core', 'PostgreSQL', 'AES-256', 'Docker'],
      category: 'Segurança da Informação',
      year: '2025',
      status: 'outdated',
      url: 'https://pandoravault.com',
    },
    {
      title: 'Easy SLA',
      description: t('projectsSection.descriptions.easySLA'),
      technologies: ['React', '.NET Core', 'PostgreSQL', 'Docker', 'AWS'],
      category: 'Agile / Web App',
      year: '2025',
      status: 'deploying',
      url: 'https://easysla.com',
    },
    {
      title: 'Viralt',
      description: t('projectsSection.descriptions.viralt'),
      technologies: ['React', '.NET 8', 'PostgreSQL', 'Docker', 'AWS'],
      category: 'Marketing / SaaS',
      year: '2025',
      status: 'development',
      url: 'https://viralt.net',
      urlGitHub: 'https://github.com/emaginebr/Viralt',
    },
    {
      title: 'MonexUp',
      description: t('projectsSection.descriptions.monexUp'),
      technologies: ['React', '.NET 8', 'PostgreSQL', 'Web3', 'Capacitor'],
      category: 'FinTech / Web App',
      year: '2025',
      status: 'deploying',
      url: 'https://monexup.com',
      urlGitHub: 'https://github.com/emaginebr/MonexUp',
    },
    {
      title: 'DevBlog',
      description: t('projectsSection.descriptions.devblog'),
      technologies: ['React 19', 'TypeScript', 'nauth-react', 'nnews-react'],
      category: 'Blog / Frontend',
      year: '2025',
      status: 'completed',
      url: 'https://emagine.com.br/rodrigolandim',
      urlGitHub: 'https://github.com/emaginebr/devblog',
    },
    {
      title: 'Abipesca',
      description: t('projectsSection.descriptions.abipesca'),
      technologies: ['React 19', 'nauth-react', 'nnews-react', 'bazzuca-react'],
      category: 'Monorepo / Web App',
      year: '2025',
      status: 'deploying',
      urlGitHub: 'https://github.com/emaginebr/Abipesca',
    },
    // ── Games & Blockchain ──
    {
      title: 'GoblinWars Reborn',
      description: t('projectsSection.descriptions.goblinWarsReborn'),
      technologies: ['Unity', '3D', 'PixiJS', 'React', '.NET Core', 'Solidity'],
      category: 'Game / NFT / Web3',
      year: '2026',
      status: 'development',
      url: 'https://goblinwars.net',
    },
{
      title: 'NoChainSwap',
      description: t('projectsSection.descriptions.noChainSwap'),
      technologies: ['.NET Core', 'Bitcoin', 'Ethereum', 'Solidity', 'Tor'],
      category: 'DeFi / Blockchain',
      year: '2024',
      status: 'deploying',
      url: 'https://nochainswap.org',
      urlGitHub: 'https://github.com/landim32/nochainswap',
    },
{
      title: 'WB3',
      description: t('projectsSection.descriptions.wb3'),
      technologies: ['React', 'Blockchain', 'IPFS'],
      category: 'FinTech / Blockchain',
      year: '2023',
      status: 'discontinued',
      url: 'https://emagine.com.br/wibov',
    },
// ── Tools & Open Source (landim32) ──
    {
      title: 'GitNews',
      description: t('projectsSection.descriptions.gitNews'),
      technologies: ['.NET 8', 'Octokit', 'OpenAI', 'pgvector', 'PostgreSQL'],
      category: 'DevTool / IA',
      year: '2025',
      status: 'completed',
      urlGitHub: 'https://github.com/landim32/GitNews',
    },
    {
      title: 'Germanium',
      description: t('projectsSection.descriptions.germanium'),
      technologies: ['.NET 9', 'SkiaSharp', 'CLI'],
      category: 'DevTool / CLI',
      year: '2025',
      status: 'completed',
      urlGitHub: 'https://github.com/landim32/germanium',
    },
    {
      title: 'VoxMeet',
      description: t('projectsSection.descriptions.voxMeet'),
      technologies: ['.NET 8', 'WPF', 'NAudio', 'Whisper', 'GPT-4o'],
      category: 'IA / Desktop',
      year: '2025',
      status: 'completed',
      urlGitHub: 'https://github.com/landim32/VoxMeet',
    },
    {
      title: 'LinkedinBot',
      description: t('projectsSection.descriptions.linkedinBot'),
      technologies: ['.NET 8', 'Playwright', 'OpenAI', 'PostgreSQL'],
      category: 'Automação / IA',
      year: '2025',
      status: 'completed',
      urlGitHub: 'https://github.com/landim32/LinkedinBot',
    },
{
      title: 'KryptoDrive',
      description: t('projectsSection.descriptions.kryptoDrive'),
      technologies: ['.NET MAUI', 'AES-256', 'Google Drive', 'PBKDF2'],
      category: 'Security / Mobile',
      year: '2024',
      status: 'migration',
      urlGitHub: 'https://github.com/landim32/KryptoDrive',
    },
    {
      title: 'LadinoBot',
      description: t('projectsSection.descriptions.ladinoBot'),
      technologies: ['MQL5', 'MetaTrader 5'],
      category: 'FinTech / Trading',
      year: '2011',
      status: 'completed',
      urlGitHub: 'https://github.com/landim32/LadinoBot',
    },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return { bg: 'bg-[#00E87B]/10', text: 'text-[#00E87B]', dot: 'bg-[#00E87B]' };
      case 'deploying':
        return { bg: 'bg-[#FFBD2E]/10', text: 'text-[#FFBD2E]', dot: 'bg-[#FFBD2E]' };
      case 'development':
        return { bg: 'bg-[#6C63FF]/10', text: 'text-[#6C63FF]', dot: 'bg-[#6C63FF]' };
      case 'migration':
        return { bg: 'bg-[#00C9A7]/10', text: 'text-[#00C9A7]', dot: 'bg-[#00C9A7]' };
      case 'outdated':
        return { bg: 'bg-[#FF6B6B]/10', text: 'text-[#FF6B6B]', dot: 'bg-[#FF6B6B]' };
      case 'discontinued':
        return { bg: 'bg-white/5', text: 'text-white/30', dot: 'bg-white/30' };
      default:
        return { bg: 'bg-white/5', text: 'text-white/40', dot: 'bg-white/40' };
    }
  };

  return (
    <section id="projects" className="py-24 lg:py-32 relative noise-overlay">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[30%] left-[60%] w-[500px] h-[500px] rounded-full bg-[#6C63FF]/[0.02] blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px flex-1 max-w-[60px] bg-[#00E87B]/40" />
          <span className="text-[#00E87B] text-xs font-semibold tracking-[0.2em] uppercase">{t('header.projects')}</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white/95 leading-[1.1] tracking-tight max-w-xl">
            {t('projectsSection.heading')}
          </h2>
          <p className="text-lg text-white/35 max-w-md font-light leading-relaxed">
            {t('projectsSection.subheading')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => {
            const statusStyle = getStatusStyle(project.status);
            return (
              <div
                key={index}
                className="glass-effect rounded-xl overflow-hidden group hover:border-white/10 transition-all duration-500 relative"
              >
                {/* Status badge - top right */}
                <div className="absolute top-4 right-4 z-10">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                    {t(`projectsSection.status.${project.status}`)}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-white/25 text-xs font-medium tracking-wide uppercase">
                      {project.category}
                    </span>
                    <div className="flex items-center text-white/20 text-xs">
                      <Calendar className="h-3 w-3 mr-1" />
                      {project.year}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white/90 mb-3 group-hover:text-[#00E87B] transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-white/35 text-sm mb-5 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2.5 py-1 rounded-md bg-white/[0.04] text-white/40 text-xs border border-white/[0.04]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2.5 py-1 rounded-md bg-white/[0.04] text-white/25 text-xs border border-white/[0.04]">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {project.url && (
                      <Button
                        size="sm"
                        className="flex-1 bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/10 transition-all duration-300 text-xs"
                        onClick={() => window.open(project.url, '_blank')}
                      >
                        <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                        {t('projectsSection.seeMore')}
                      </Button>
                    )}
                    {project.urlGitHub && (
                      <Button
                        size="sm"
                        className="bg-white/[0.04] text-white/40 hover:text-white hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/10 transition-all duration-300"
                        onClick={() => window.open(project.urlGitHub, '_blank')}
                        title="GitHub"
                      >
                        <Github className="h-3.5 w-3.5" />
                      </Button>
                    )}
                    {project.urlNuGet && (
                      <Button
                        size="sm"
                        className="bg-[#004880]/20 text-[#6C63FF]/70 hover:text-[#6C63FF] hover:bg-[#004880]/30 border border-[#6C63FF]/10 hover:border-[#6C63FF]/30 transition-all duration-300"
                        onClick={() => window.open(project.urlNuGet, '_blank')}
                        title="NuGet"
                      >
                        <Package className="h-3.5 w-3.5" />
                      </Button>
                    )}
                    {project.urlNpm && (
                      <Button
                        size="sm"
                        className="bg-[#CB3837]/10 text-[#CB3837]/70 hover:text-[#CB3837] hover:bg-[#CB3837]/20 border border-[#CB3837]/10 hover:border-[#CB3837]/30 transition-all duration-300"
                        onClick={() => window.open(project.urlNpm, '_blank')}
                        title="NPM"
                      >
                        <Package className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
