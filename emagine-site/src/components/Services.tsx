
import { Globe, Smartphone, Database, Palette, Shield, Headphones, Bitcoin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();
  const services = [
    {
      icon: Globe,
      title: t('servicesSection.webdev.title'),
      description: t('servicesSection.webdev.description'),
      features: t('servicesSection.webdev.features', { returnObjects: true })
    },
    {
      icon: Smartphone,
      title: t('servicesSection.mobile.title'),
      description: t('servicesSection.mobile.description'),
      features: t('servicesSection.mobile.features', { returnObjects: true })
    },
    {
      icon: Bitcoin,
      title: t('servicesSection.blockchain.title'),
      description: t('servicesSection.blockchain.description'),
      features: t('servicesSection.blockchain.features', { returnObjects: true })
    },
    {
      icon: Database,
      title: t('servicesSection.backend.title'),
      description: t('servicesSection.backend.description'),
      features: t('servicesSection.backend.features', { returnObjects: true })
    },
    {
      icon: Palette,
      title: t('servicesSection.design.title'),
      description: t('servicesSection.design.description'),
      features: t('servicesSection.design.features', { returnObjects: true })
    },
    {
      icon: Shield,
      title: t('servicesSection.security.title'),
      description: t('servicesSection.security.description'),
      features: t('servicesSection.security.features', { returnObjects: true })
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t('servicesSection.heading').split(' ')[0]}{' '}
            <span className="gradient-text">{t('servicesSection.heading').split(' ')[1]}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('servicesSection.subheading')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg"
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 gradient-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4 text-center">
                  {service.description}
                </CardDescription>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
