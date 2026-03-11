
import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={logo}
              alt="Emagine"
              className="h-8 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {t('header.home')}
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {t('header.about')}
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {t('header.services')}
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {t('header.projects')}
            </button>
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <img src={i18n.language === 'en' ? usFlag : brFlag} alt={i18n.language === 'en' ? 'English' : 'Português'} className="h-4 w-4" />
                  <span>{i18n.language === 'en' ? 'English' : 'Português'}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => i18n.changeLanguage("en")}>
                  <img src={usFlag} alt="English" className="h-4 w-4 mr-1" style={{display: 'inline-block'}} />
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => i18n.changeLanguage("pt")}>
                  <img src={brFlag} alt="Portuguese" className="h-4 w-4 mr-1" style={{display: 'inline-block'}} />
                  Portuguese
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              onClick={() => scrollToSection('projects')}
              className="gradient-blue text-white hover:opacity-90 transition-opacity"
            >
              {t('header.cta')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b shadow-lg">
            <nav className="flex flex-col space-y-4 px-4 py-6">
              <button
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-blue-600 transition-colors text-left"
              >
                {t('header.home')}
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-blue-600 transition-colors text-left"
              >
                {t('header.about')}
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-gray-700 hover:text-blue-600 transition-colors text-left"
              >
                {t('header.services')}
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="text-gray-700 hover:text-blue-600 transition-colors text-left"
              >
                {t('header.projects')}
              </button>
              <Button
                onClick={() => scrollToSection('projects')}
                className="gradient-blue text-white hover:opacity-90 transition-opacity w-full"
              >
                {t('header.cta')}
              </Button>
              <Select
                onValueChange={(lang) => i18n.changeLanguage(lang)}
                defaultValue={i18n.language}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en"><img src={usFlag} alt="English" /> English</SelectItem>
                  <SelectItem value="pt"><img src={brFlag} alt="Portuguese" /> Português</SelectItem>
                </SelectContent>
              </Select>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
