
import { Users, Award, Clock, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  const stats = [
    { icon: Users, label: t('about.stats.clients'), value: '30+', accent: '#00E87B' },
    { icon: Award, label: t('about.stats.projects'), value: '50+', accent: '#6C63FF' },
    { icon: Clock, label: t('about.stats.years'), value: '15+', accent: '#00C9A7' },
    { icon: Target, label: t('about.stats.success'), value: '96%', accent: '#FFBD2E' }
  ];

  return (
    <section id="about" className="py-24 lg:py-32 relative noise-overlay">
      {/* Subtle background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[#6C63FF]/[0.03] blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px flex-1 max-w-[60px] bg-[#00E87B]/40" />
          <span className="text-[#00E87B] text-xs font-semibold tracking-[0.2em] uppercase">{t('header.about')}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white/95 mb-8 leading-[1.1] tracking-tight">
              {t('about.heading').split('Emagine')[0]}
              <span className="gradient-text">Emagine</span>
            </h2>
            <p className="text-lg text-white/40 mb-6 leading-relaxed font-light">
              {t('about.description1')}
            </p>
            <p className="text-lg text-white/40 mb-10 leading-relaxed font-light">
              {t('about.description2')}
            </p>

            {/* Mission */}
            <div className="relative rounded-xl p-6 glass-effect group hover:border-[#00E87B]/20 transition-all duration-500">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-[#00E87B] to-[#6C63FF]" />
              <h3 className="text-lg font-bold text-white/90 mb-3 pl-4">{t('about.missionTitle')}</h3>
              <p className="text-white/40 pl-4 leading-relaxed">
                {t('about.missionDescription')}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 lg:gap-5">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="glass-effect rounded-xl p-6 lg:p-8 group hover:border-white/10 transition-all duration-500 text-center relative overflow-hidden"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${stat.accent}08, transparent 70%)` }}
                />

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5 transition-all duration-500 relative z-10"
                  style={{ background: `${stat.accent}0D`, border: `1px solid ${stat.accent}1A` }}
                >
                  <stat.icon className="h-5 w-5" style={{ color: stat.accent }} />
                </div>
                <div
                  className="text-3xl lg:text-4xl font-extrabold mb-2 relative z-10 glow-text"
                  style={{ color: stat.accent }}
                >
                  {stat.value}
                </div>
                <div className="text-white/35 text-sm font-medium relative z-10">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
