
import { ExternalLink, Github, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import monexUpImg from '../assets/images/monexup.jpg';
import goblinWarsRebornImg from '../assets/images/goblinwars-reborn.jpg';
import goblinWarsClassicImg from '../assets/images/goblinwars-classic.jpg';
import slapRoyaleImg from '../assets/images/slaproyale.png';
import ladinoBotImg from '../assets/images/ladinobot.png';
import noChainSwapImg from '../assets/images/nochainswap.png';
import kryptoDriveImg from '../assets/images/kryptodrive.jpg';
import gehrImg from '../assets/images/gehr.png';
import viraltImg from '../assets/images/viralt.jpg';
import pandoraImg from '../assets/images/pandoravault.jpg';
import easyslaImg from '../assets/images/easysla.jpg';
import wb3Img from '../assets/images/wb3.jpg';
import nauthImg from '../assets/images/nauth.png';


const Projects = () => {
  const { t } = useTranslation();

  const projects = [
    {
      title: 'NAuth',
      description: t('projectsSection.descriptions.nauth'),
      image: nauthImg,
      technologies: [ 'React', 'Bootstrap', '.NET Core', 'PostgreSQL', 'GitHub Actions'],
      category: 'Open Source',
      year: '2025',
      status: 'completed',
      url: 'https://emagine.com.br/nauth',
      urlGitHub: 'https://github.com/landim32/nauth'
    },
    {
      title: 'Pandora Vault',
      description: t('projectsSection.descriptions.pandoraVault'),
      image: pandoraImg,
      technologies: [ 'React', 'Bootstrap', '.NET Core', 'PostgreSQL', 'AWS', 'Docker', 'GitHub Actions'],
      category: 'Segurança da Informação',
      year: '2025',
      status: 'completed',
      url: 'https://pandoravault.com'
    },
    {
      title: 'Easy SLA',
      description: t('projectsSection.descriptions.easySLA'),
      image: easyslaImg,
      technologies: [ 'React', 'Bootstrap', '.NET Core', 'PostgreSQL', 'AWS', 'Docker', 'GitHub Actions'],
      category: 'Agile / Dev / Web App',
      year: '2025',
      status: 'deploying',
      url: 'https://easysla.com'
    },
    {
      title: 'Viralt',
      description: t('projectsSection.descriptions.viralt'),
      image: viraltImg,
      technologies: [ 'React', 'Bootstrap', '.NET Core', 'PostgreSQL', 'AWS', 'Docker', 'GitHub Actions'],
      category: 'Marketing / Web App',
      year: '2025',
      status: 'development',
      url: 'https://viralt.net'
    },
    {
      title: 'MonexUp',
      description: t('projectsSection.descriptions.monexUp'),
      image: monexUpImg,
      technologies: [ 'React', 'Bootstrap', '.NET Core', 'PostgreSQL', 'AWS', 'Docker', 'GitHub Actions'],
      category: 'Web Application',
      year: '2025',
      status: 'deploying',
      url: 'https://monexup.com'
    },
    {
      title: 'GoblinWars Reborn',
      description: t('projectsSection.descriptions.goblinWarsReborn'),
      image: goblinWarsRebornImg,
      technologies: ['Unity', 'Modelagem 3D', 'PixiJS', 'React', 'TypeScript', '.NET Core', 'Solidity', 'Docker', 'AWS', 'ERC-721'],
      category: 'Game / NFT / Web3',
      year: '2026',
      status: 'development',
      url: 'https://goblinwars.net'
    },
    {
      title: 'Slap Royale',
      description: t('projectsSection.descriptions.slapRoyale'),
      image: slapRoyaleImg,
      technologies: ['React', '.NET Core', 'Solidity', 'PostgreSQL', 'Docker', 'AWS', 'ERC-20', 'ERC-721', 'ERC-1155'],
      category: 'Game / Blockchain',
      year: '2025',
      status: 'completed',
      url: 'https://slaproyale.com'
    },
    {
      title: 'NoChainSwap',
      description: t('projectsSection.descriptions.noChainSwap'),
      image: noChainSwapImg,
      technologies: ['.NET Core', 'Bitcoin', 'Ethereum', 'Solidity', 'Stack', 'Tor', 'P2P Network'],
      category: 'DeFi / Blockchain',
      year: '2024',
      status: 'deploying',
      url: 'https://nochainswap.org',
      urlGitHub: 'https://github.com/landim32/nochainswap'
    },
    {
      title: 'KryptoDrive',
      description: t('projectsSection.descriptions.kryptoDrive'),
      image: kryptoDriveImg,
      technologies: ['.NET Core', '.NET MAUI', 'C#', 'Criptografia'],
      category: 'Security Tool',
      year: '2024',
      status: 'migration',
      url: 'https://pandoravault.com'
    },
    {
      title: 'GEHR - Global Electronic Health Record',
      description: t('projectsSection.descriptions.gehr'),
      image: gehrImg,
      technologies: ['React', 'Bootstrap', 'Blockchain', 'IPFS'],
      category: 'HealthTech / Blockchain',
      year: '2025',
      status: 'deploying',
      url: 'https://emagine.com.br/gehr',
      urlGitHub: 'https://github.com/landim32/gehr'
    },
    {
      title: 'WB3',
      description: t('projectsSection.descriptions.wb3'),
      image: wb3Img,
      technologies: ['React', 'Bootstrap', 'Blockchain', 'IPFS'],
      category: 'Game / Browser',
      year: '2023',
      status: 'discontinued',
      url: 'https://emagine.com.br/wibov'
    },
    {
      title: 'GoblinWars Classic',
      description: t('projectsSection.descriptions.goblinWarsClassic'),
      image: goblinWarsClassicImg,
      technologies: ['JavaScript', 'HTML5 Canvas', 'CSS'],
      category: 'Game / Browser',
      year: '2021',
      status: 'completed',
      url: 'https://goblinwars.net/classic'
    },
    {
      title: 'LadinoBot',
      description: t('projectsSection.descriptions.ladinoBot'),
      image: ladinoBotImg,
      technologies: ['MQL5', 'MetaTrader 5', 'Trading Automation'],
      category: 'FinTech / Automação de Trades',
      year: '2011',
      status: 'completed',
      url: 'https://github.com/landim32/ladinobot',
      urlGitHub: 'https://github.com/landim32/ladinobot'
    }
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
                className="glass-effect rounded-xl overflow-hidden group hover:border-white/10 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(240,18%,6%)] via-transparent to-transparent opacity-60" />

                  {/* Status badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text} backdrop-blur-sm`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                      {t(`projectsSection.status.${project.status}`)}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
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
                    <Button
                      size="sm"
                      className="flex-1 bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/10 transition-all duration-300 text-xs"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(project.url, '_blank');
                      }}
                    >
                      <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                      {t('projectsSection.seeMore')}
                    </Button>
                    {project.urlGitHub &&
                      <Button
                        size="sm"
                        className="bg-white/[0.04] text-white/40 hover:text-white hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/10 transition-all duration-300"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(project.urlGitHub, '_blank');
                        }}
                      >
                        <Github className="h-3.5 w-3.5" />
                      </Button>
                    }
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
