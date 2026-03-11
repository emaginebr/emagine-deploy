
import { ExternalLink, Github, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'deploying':
        return 'bg-yellow-100 text-yellow-800';
      case 'development':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t('projectsSection.heading').split(' ')[0]}{' '}
            <span className="gradient-text">{t('projectsSection.heading').split(' ')[1]}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('projectsSection.subheading')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border-0 shadow-lg"
            >
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className={getStatusColor(project.status)}>
                    {t(`projectsSection.status.${project.status}`)}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {project.category}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {project.year}
                  </div>
                </div>
                <CardTitle className="text-xl text-gray-900">{project.title}</CardTitle>
              </CardHeader>

              <CardContent>
                <CardDescription className="text-gray-600 mb-4">
                  {project.description}
                </CardDescription>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1" onClick={(e) => {
                    e.preventDefault();
                    window.open(project.url, '_blank');
                  }}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {t('projectsSection.seeMore')}
                  </Button>
                  {project.urlGitHub && 
                  <Button size="sm" variant="ghost" onClick={(e) => {
                    e.preventDefault();
                    window.open(project.urlGitHub, '_blank');
                  }}>
                    <Github className="h-4 w-4" />
                  </Button>
      }
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/*
        <div className="text-center mt-12">
          <Button size="lg" className="gradient-blue text-white">
            Ver Todos os Projetos
          </Button>
        </div>
        */}
      </div>
    </section>
  );
};

export default Projects;
