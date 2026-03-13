'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  
  return (
    <header className="sticky top-0 z-50 bg-dikio-background backdrop-blur-sm border-b border-dikio-subtitle/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img src="/lovable-uploads/771a8b36-282b-42f2-8437-f98e84fc4d05.png" alt="Dikio Logo" className="h-20 object-contain" />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-dikio-title hover:text-dikio-accent transition-colors">{t('nav.services')}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-2 gap-3 p-6 w-[600px]">
                      <Link href="/services/launching" className="block p-3 space-y-1 rounded-md hover:bg-gray-100 transition-colors">
                        <div className="font-medium">{t('nav.launching')}</div>
                        <p className="text-sm text-gray-500">{t('nav.launchingDesc')}</p>
                      </Link>
                      <Link href="/services/branding" className="block p-3 space-y-1 rounded-md hover:bg-gray-100 transition-colors">
                        <div className="font-medium">{t('nav.branding')}</div>
                        <p className="text-sm text-gray-500">{t('nav.brandingDesc')}</p>
                      </Link>
                      <Link href="/services/automation" className="block p-3 space-y-1 rounded-md hover:bg-gray-100 transition-colors">
                        <div className="font-medium">{t('nav.automation')}</div>
                        <p className="text-sm text-gray-500">{t('nav.automationDesc')}</p>
                      </Link>
                      <Link href="/services/marketing" className="block p-3 space-y-1 rounded-md hover:bg-gray-100 transition-colors">
                        <div className="font-medium">{t('nav.marketing')}</div>
                        <p className="text-sm text-gray-500">{t('nav.marketingDesc')}</p>
                      </Link>
                      <Link href="/services/strategy" className="block p-3 space-y-1 rounded-md hover:bg-gray-100 transition-colors">
                        <div className="font-medium">{t('nav.strategy')}</div>
                        <p className="text-sm text-gray-500">{t('nav.strategyDesc')}</p>
                      </Link>
                      <Link href="/archilo" className="block p-3 space-y-1 rounded-md hover:bg-gray-100 transition-colors">
                        <div className="font-medium">{t('nav.archilo')}</div>
                        <p className="text-sm text-gray-500">{t('nav.archiloDesc')}</p>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/portfolio">
                    <NavigationMenuLink className={navigationMenuTriggerStyle() + " text-dikio-title hover:text-dikio-accent transition-colors"}>
                      {t('nav.projects')}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/about">
                    <NavigationMenuLink className={navigationMenuTriggerStyle() + " text-dikio-title hover:text-dikio-accent transition-colors"}>
                      {t('nav.about')}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/contact">
                    <NavigationMenuLink className={navigationMenuTriggerStyle() + " text-dikio-title hover:text-dikio-accent transition-colors"}>
                      {t('nav.contact')}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
          
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            <Link href="/project-form">
              <Button className="bg-dikio-accent hover:bg-dikio-accent-light text-white transform transition-transform duration-300 hover:scale-105">
                {t('nav.startProject')}
              </Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-dikio-title hover:text-dikio-accent hover:bg-dikio-background focus:outline-none focus:ring-2 focus:ring-inset focus:ring-dikio-subtitle">
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-dikio-background shadow-lg">
            <Link href="/services/launching" className="block px-3 py-2 rounded-md text-base font-medium text-dikio-title hover:text-dikio-accent hover:bg-white/50" onClick={() => setIsMenuOpen(false)}>
              {t('nav.launching')}
            </Link>
            <Link href="/services/branding" className="block px-3 py-2 rounded-md text-base font-medium text-dikio-title hover:text-dikio-accent hover:bg-white/50" onClick={() => setIsMenuOpen(false)}>
              {t('nav.branding')}
            </Link>
            <Link href="/services/automation" className="block px-3 py-2 rounded-md text-base font-medium text-dikio-title hover:text-dikio-accent hover:bg-white/50" onClick={() => setIsMenuOpen(false)}>
              {t('nav.automation')}
            </Link>
            <Link href="/services/marketing" className="block px-3 py-2 rounded-md text-base font-medium text-dikio-title hover:text-dikio-accent hover:bg-white/50" onClick={() => setIsMenuOpen(false)}>
              {t('nav.marketing')}
            </Link>
            <Link href="/services/strategy" className="block px-3 py-2 rounded-md text-base font-medium text-dikio-title hover:text-dikio-accent hover:bg-white/50" onClick={() => setIsMenuOpen(false)}>
              {t('nav.strategy')}
            </Link>
            <Link href="/portfolio" className="block px-3 py-2 rounded-md text-base font-medium text-dikio-title hover:text-dikio-accent hover:bg-white/50" onClick={() => setIsMenuOpen(false)}>
              {t('nav.projects')}
            </Link>
            <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-dikio-title hover:text-dikio-accent hover:bg-white/50" onClick={() => setIsMenuOpen(false)}>
              {t('nav.about')}
            </Link>
            <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-dikio-title hover:text-dikio-accent hover:bg-white/50" onClick={() => setIsMenuOpen(false)}>
              {t('nav.contact')}
            </Link>
            <div className="px-3 py-2">
              <Link href="/project-form" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-dikio-accent hover:bg-dikio-accent-light text-white">
                  {t('nav.startProject')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
