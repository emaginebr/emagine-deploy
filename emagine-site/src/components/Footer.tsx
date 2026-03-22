
import { MapPin, Linkedin, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logo from '../assets/images/logo.png';

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
    { icon: Linkedin, href: 'https://www.linkedin.com/company/emagine-brasil', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/emaginebr', label: 'GitHub Emagine' },
    { icon: Github, href: 'https://github.com/landim32', label: 'GitHub Landim' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#00E87B]/20 to-transparent" />

      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img
                src={logo}
                alt="Emagine"
                className="h-8 w-auto mb-5 brightness-0 invert opacity-80"
              />
              <p className="text-white/30 leading-relaxed text-sm font-light">
                Transformamos ideias em soluções digitais inovadoras.
                Especialistas em desenvolvimento de software com foco na experiência do usuário.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl glass-effect flex items-center justify-center text-white/40 hover:text-[#00E87B] hover:border-[#00E87B]/20 transition-all duration-300"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white/70 mb-6 tracking-wide uppercase">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/30 hover:text-[#00E87B] transition-colors duration-300 text-sm font-light"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold text-white/70 mb-6 tracking-wide uppercase">{t('footer.services')}</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-white/30 text-sm font-light">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-bold text-white/70 mb-6 tracking-wide uppercase">{t('footer.contact')}</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/30">
                <MapPin className="h-4 w-4 text-[#00E87B]/50" />
                <span className="text-sm font-light">Brasília, DF - Brasil</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/[0.04]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/20 text-xs font-light">
              © {currentYear} Emagine. {t('footer.rights')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
