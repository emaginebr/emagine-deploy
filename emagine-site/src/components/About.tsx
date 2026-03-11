
import { Users, Award, Clock, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  const stats = [
    { icon: Users, label: t('about.stats.clients'), value: '30+' },
    { icon: Award, label: t('about.stats.projects'), value: '50+' },
    { icon: Clock, label: t('about.stats.years'), value: '15+' },
    { icon: Target, label: t('about.stats.success'), value: '96%' }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              {t('about.heading').split('Emagine')[0]}
              <span className="gradient-text">Emagine</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {t('about.description1')}
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t('about.description2')}
            </p>

            {/* Missão */}
            <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('about.missionTitle')}</h3>
              <p className="text-gray-600">
                {t('about.missionDescription')}
              </p>
            </div>
          </div>


          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="w-12 h-12 gradient-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
