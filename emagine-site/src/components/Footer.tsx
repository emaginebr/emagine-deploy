
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: t('header.home'), href: '#home' },
    { name: t('header.about'), href: '#about' },
    { name: t('header.services'), href: '#services' },
    { name: t('header.projects'), href: '#projects' }
  ];

  const services = [
    t('servicesSection.webdev.title'),
    t('servicesSection.mobile.title'),
    t('servicesSection.blockchain.title'),
    t('servicesSection.backend.title'),
    t('servicesSection.design.title')
  ];

  const socialLinks = [
    //{ icon: Facebook, href: '#', label: 'Facebook' },
    //{ icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/emagine-brasil', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/landim32', label: 'GitHub' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img 
                src="/lovable-uploads/192a4956-b8f6-4fed-9047-691f8a79ce7f.png" 
                alt="Emagine" 
                className="h-8 w-auto mb-4 brightness-0 invert"
              />
              <p className="text-gray-300 leading-relaxed">
                Transformamos ideias em soluções digitais inovadoras. 
                Especialistas em desenvolvimento de software com foco na experiência do usuário.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
          <h3 className="text-lg font-semibold mb-6">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
          <h3 className="text-lg font-semibold mb-6">{t('footer.services')}</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-gray-300">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
          <h3 className="text-lg font-semibold mb-6">{t('footer.contact')}</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <a 
                  href="mailto:contato@emagine.com.br"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  contato@emagine.com.br
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <a 
                  href="https://wa.me/5561998752588"
                  target="_blank"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  +55 (61) 9 9875 2588
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">
                  Brasília, DF - Brasil
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {currentYear} Emagine. {t('footer.rights')}
            </p>
            {/*
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                Termos de Uso
              </a>
            </div>
            */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
