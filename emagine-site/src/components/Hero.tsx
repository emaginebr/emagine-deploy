
import { ArrowRight, Code, Lightbulb, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center gradient-blue relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-white rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white rounded-full blur-lg"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t('hero.title')}
              <span className="block text-cyan-200">
                {t('hero.titleHighlight')}
              </span>
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-blue-100 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                onClick={() => scrollToSection('projects')}
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 transition-colors"
              >
                {t('hero.viewProjects')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">{t('hero.feature1Title')}</h3>
                  <p className="text-blue-100 text-sm">{t('hero.feature1Desc')}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">{t('hero.feature2Title')}</h3>
                  <p className="text-blue-100 text-sm">{t('hero.feature2Desc')}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">{t('hero.feature3Title')}</h3>
                  <p className="text-blue-100 text-sm">{t('hero.feature3Desc')}</p>
                </div>
              </div>
            </div>
          </div>


          {/* Visual Element */}
          <div className="relative">
            <div className="float-animation">
              <div className="w-full max-w-md mx-auto">
                <div className="glass-effect rounded-2xl p-8 backdrop-blur-md">
                  <div className="space-y-4">
                    <div className="h-4 bg-white/30 rounded animate-pulse"></div>
                    <div className="h-4 bg-white/20 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-white/25 rounded w-1/2 animate-pulse"></div>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="h-20 bg-white/20 rounded-lg animate-pulse"></div>
                      <div className="h-20 bg-white/15 rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
