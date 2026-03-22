
import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import logo from '../assets/images/logo.png';
import usFlag from '@/assets/flags/us.svg';
import brFlag from '@/assets/flags/br.svg';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: t('header.home'), section: 'home' },
    { label: t('header.about'), section: 'about' },
    { label: t('header.services'), section: 'services' },
    { label: t('header.projects'), section: 'projects' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(240,20%,3.5%)]/90 backdrop-blur-xl border-b border-white/[0.04]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={logo}
              alt="Emagine"
              className="h-8 w-auto brightness-0 invert"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => scrollToSection(item.section)}
                className="relative px-4 py-2 text-sm font-medium text-white/60 hover:text-[#00E87B] transition-colors duration-300 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#00E87B] transition-all duration-300 group-hover:w-3/4" />
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-white/50 hover:text-white/80 hover:bg-white/5 text-sm">
                  <img src={i18n.language === 'en' ? usFlag : brFlag} alt={i18n.language === 'en' ? 'English' : 'Português'} className="h-4 w-4" />
                  <span>{i18n.language === 'en' ? 'EN' : 'PT'}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[hsl(240,18%,8%)] border-white/10 text-white/80">
                <DropdownMenuItem onClick={() => i18n.changeLanguage("en")} className="hover:bg-white/5 focus:bg-white/5 focus:text-white cursor-pointer">
                  <img src={usFlag} alt="English" className="h-4 w-4 mr-2" style={{display: 'inline-block'}} />
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => i18n.changeLanguage("pt")} className="hover:bg-white/5 focus:bg-white/5 focus:text-white cursor-pointer">
                  <img src={brFlag} alt="Portuguese" className="h-4 w-4 mr-2" style={{display: 'inline-block'}} />
                  Português
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white/70 hover:text-[#00E87B] transition-colors p-2"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-[4.5rem] left-0 right-0 bg-[hsl(240,20%,3.5%)]/95 backdrop-blur-xl border-b border-white/[0.04]">
            <nav className="flex flex-col px-4 py-6 gap-1">
              {navItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => scrollToSection(item.section)}
                  className="text-white/60 hover:text-[#00E87B] transition-colors text-left py-3 px-3 rounded-lg hover:bg-white/[0.03] font-medium"
                >
                  {item.label}
                </button>
              ))}
              <div className="border-t border-white/[0.06] mt-3 pt-4 flex flex-col gap-3">
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => i18n.changeLanguage("en")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${i18n.language === 'en' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/70'}`}
                  >
                    <img src={usFlag} alt="English" className="h-4 w-4" />
                    EN
                  </button>
                  <button
                    onClick={() => i18n.changeLanguage("pt")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${i18n.language === 'pt' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/70'}`}
                  >
                    <img src={brFlag} alt="Português" className="h-4 w-4" />
                    PT
                  </button>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
