
import { Globe, Smartphone, Database, Palette, Shield, Bitcoin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: Globe,
      title: t('servicesSection.webdev.title'),
      description: t('servicesSection.webdev.description'),
      features: t('servicesSection.webdev.features', { returnObjects: true }),
      accent: '#00E87B',
      delay: '0.1s',
    },
    {
      icon: Smartphone,
      title: t('servicesSection.mobile.title'),
      description: t('servicesSection.mobile.description'),
      features: t('servicesSection.mobile.features', { returnObjects: true }),
      accent: '#6C63FF',
      delay: '0.2s',
    },
    {
      icon: Bitcoin,
      title: t('servicesSection.blockchain.title'),
      description: t('servicesSection.blockchain.description'),
      features: t('servicesSection.blockchain.features', { returnObjects: true }),
      accent: '#FFBD2E',
      delay: '0.3s',
    },
    {
      icon: Database,
      title: t('servicesSection.backend.title'),
      description: t('servicesSection.backend.description'),
      features: t('servicesSection.backend.features', { returnObjects: true }),
      accent: '#00C9A7',
      delay: '0.4s',
    },
    {
      icon: Palette,
      title: t('servicesSection.design.title'),
      description: t('servicesSection.design.description'),
      features: t('servicesSection.design.features', { returnObjects: true }),
      accent: '#FF6B8A',
      delay: '0.5s',
    },
    {
      icon: Shield,
      title: t('servicesSection.security.title'),
      description: t('servicesSection.security.description'),
      features: t('servicesSection.security.features', { returnObjects: true }),
      accent: '#4ECDC4',
      delay: '0.6s',
    }
  ];

  return (
    <section id="services" className="py-24 lg:py-32 relative noise-overlay">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#00E87B]/[0.02] blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px flex-1 max-w-[60px] bg-[#00E87B]/40" />
          <span className="text-[#00E87B] text-xs font-semibold tracking-[0.2em] uppercase">{t('header.services')}</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white/95 leading-[1.1] tracking-tight max-w-xl">
            {t('servicesSection.heading')}
          </h2>
          <p className="text-lg text-white/35 max-w-md font-light leading-relaxed">
            {t('servicesSection.subheading')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <div
              key={index}
              className="glass-effect rounded-xl p-7 group hover:border-white/10 transition-all duration-500 relative overflow-hidden"
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, ${service.accent}, transparent)` }}
              />

              {/* Hover background glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: `radial-gradient(ellipse at top left, ${service.accent}06, transparent 60%)` }}
              />

              <div className="relative z-10">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-500"
                  style={{ background: `${service.accent}0D`, border: `1px solid ${service.accent}1A` }}
                >
                  <service.icon className="h-5 w-5" style={{ color: service.accent }} />
                </div>

                <h3 className="text-lg font-bold text-white/90 mb-3">{service.title}</h3>
                <p className="text-white/35 text-sm mb-5 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2.5">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-white/50 group-hover:text-white/60 transition-colors">
                      <div
                        className="w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0"
                        style={{ background: service.accent }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
