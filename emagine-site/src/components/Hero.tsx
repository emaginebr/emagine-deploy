
import { ArrowRight, Code, Lightbulb, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden noise-overlay grid-pattern">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-[#00E87B]/[0.06] blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#6C63FF]/[0.05] blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] rounded-full bg-[#00C9A7]/[0.04] blur-[80px]" />
      </div>

      {/* Decorative grid line */}
      <div className="absolute left-[10%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/[0.04] to-transparent" />
      <div className="absolute right-[10%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/[0.04] to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="lg:col-span-7 animate-fade-in-up">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00E87B]/20 bg-[#00E87B]/[0.06] mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00E87B] animate-pulse" />
              <span className="text-[#00E87B] text-sm font-medium tracking-wide uppercase">SaaS & dApp Studio</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] mb-8 tracking-tight">
              <span className="text-white/95">
                {t('hero.title')}
              </span>
              <span className="block gradient-text mt-2">
                {t('hero.titleHighlight')}
              </span>
            </h1>

            <p className="text-lg sm:text-xl mb-10 text-white/45 leading-relaxed max-w-xl font-light">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Button
                onClick={() => navigate('/projects')}
                size="lg"
                className="bg-[#00E87B] text-[#07070E] hover:bg-[#00D06E] font-bold text-base px-8 py-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,232,123,0.3)] group"
              >
                {t('hero.viewProjects')}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                onClick={() => scrollToSection('services')}
                size="lg"
                variant="outline"
                className="border-white/10 text-white/70 hover:text-white hover:bg-white/5 hover:border-white/20 font-medium text-base px-8 py-6 transition-all duration-300"
              >
                {t('header.services')}
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 stagger-children">
              {[
                { icon: Code, title: t('hero.feature1Title'), desc: t('hero.feature1Desc') },
                { icon: Lightbulb, title: t('hero.feature2Title'), desc: t('hero.feature2Desc') },
                { icon: Zap, title: t('hero.feature3Title'), desc: t('hero.feature3Desc') },
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0 group-hover:border-[#00E87B]/30 group-hover:bg-[#00E87B]/[0.06] transition-all duration-500">
                    <feature.icon className="h-5 w-5 text-[#00E87B]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white/90 text-sm mb-1">{feature.title}</h3>
                    <p className="text-white/35 text-xs leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Element */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="float-animation">
              {/* Main card */}
              <div className="relative">
                <div className="glass-effect-strong rounded-2xl p-8 glow-emerald">
                  <div className="space-y-4">
                    {/* Fake terminal header */}
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                      <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                      <div className="w-3 h-3 rounded-full bg-[#27CA40]" />
                      <span className="ml-3 text-white/20 text-xs font-mono">EmagineService.cs</span>
                    </div>

                    {/* Code lines */}
                    <div className="space-y-3 font-mono text-sm">
                      <div className="flex gap-2">
                        <span className="text-white/15 select-none">01</span>
                        <span className="text-[#6C63FF]">var</span>
                        <span className="text-[#00E87B]"> project</span>
                        <span className="text-white/40"> = </span>
                        <span className="text-[#FFBD2E]">await</span>
                        <span className="text-white/40"> emagine</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-white/15 select-none">02</span>
                        <span className="text-white/40">  .</span>
                        <span className="text-[#00C9A7]">CreateAsync</span>
                        <span className="text-white/40">(</span>
                        <span className="text-[#6C63FF]">new</span>
                        <span className="text-[#00C9A7]"> Project</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-white/15 select-none">03</span>
                        <span className="text-white/40">{"{"}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-white/15 select-none">04</span>
                        <span className="text-[#00E87B]">    Idea</span>
                        <span className="text-white/40"> = </span>
                        <span className="text-[#FFBD2E]">"yours"</span>
                        <span className="text-white/40">,</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-white/15 select-none">05</span>
                        <span className="text-[#00E87B]">    Tech</span>
                        <span className="text-white/40"> = </span>
                        <span className="text-[#FFBD2E]">"cutting-edge"</span>
                        <span className="text-white/40">,</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-white/15 select-none">06</span>
                        <span className="text-[#00E87B]">    Result</span>
                        <span className="text-white/40"> = </span>
                        <span className="text-[#FFBD2E]">"reality"</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-white/15 select-none">07</span>
                        <span className="text-white/40">{"}"});</span>
                      </div>
                    </div>

                    {/* Status bar */}
                    <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#00E87B] animate-pulse" />
                        <span className="text-white/25 text-xs font-mono">deploying...</span>
                      </div>
                      <span className="text-white/15 text-xs font-mono">v2.0.0</span>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 glass-effect rounded-xl px-4 py-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00E87B]" />
                  <span className="text-white/60 text-xs font-medium">50+ Projects</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-[#00E87B]/60 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
