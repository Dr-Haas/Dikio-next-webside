'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-dikio-background text-black py-12">
      <div className="container px-4 md:px-6">
        <div data-gsap="stagger" className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4">
              <Link href="/">
                <img src="/lovable-uploads/771a8b36-282b-42f2-8437-f98e84fc4d05.png" alt="Dikio Logo" className="h-20 object-contain cursor-pointer" />
              </Link>
            </div>
            <p className="text-gray-700 mb-4">
              {t('footer.tagline')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-700 hover:text-dikio-accent-light transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-700 hover:text-dikio-accent-light transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="text-gray-700 hover:text-dikio-accent-light transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.services')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services/launching" className="text-gray-700 hover:text-dikio-accent transition-colors">
                  {t('nav.launching')}
                </Link>
              </li>
              <li>
                <Link href="/services/branding" className="text-gray-700 hover:text-dikio-accent transition-colors">
                  {t('nav.branding')}
                </Link>
              </li>
              <li>
                <Link href="/services/automation" className="text-gray-700 hover:text-dikio-accent transition-colors">
                  {t('nav.automation')}
                </Link>
              </li>
              <li>
                <Link href="/services/marketing" className="text-gray-700 hover:text-dikio-accent transition-colors">
                  {t('nav.marketing')}
                </Link>
              </li>
              <li>
                <Link href="/services/strategy" className="text-gray-700 hover:text-dikio-accent transition-colors">
                  {t('nav.strategy')}
                </Link>
              </li>
              <li>
                <Link href="/caisse-medicale" className="text-gray-700 hover:text-dikio-accent transition-colors">
                  Optimisation Caisse
                </Link>
              </li>
              <li>
                <Link href="/gym-ops" className="text-gray-700 hover:text-dikio-accent transition-colors">
                  GymOps
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.navigation')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-700 hover:text-dikio-accent transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-700 hover:text-dikio-accent transition-colors">
                  {t('nav.projects')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-700 hover:text-dikio-accent transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link href="/project-form" className="text-gray-700 hover:text-dikio-accent transition-colors">
                  {t('nav.startProject')}
                </Link>
              </li>
              <li>
                <Link href="/geo-alliance" className="text-gray-700 hover:text-dikio-accent transition-colors">
                  GEO Alliance
                </Link>
              </li>
            </ul>
          </div>
          
          
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Dikio. {t('footer.rights')}
          </p>
          <div className="flex space-x-6">
            <Link href="/mentions-legales" className="text-gray-500 hover:text-dikio-accent text-sm transition-colors">
              {t('footer.legal')}
            </Link>
            <Link href="/politique-confidentialite" className="text-gray-500 hover:text-dikio-accent text-sm transition-colors">
              {t('footer.privacy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
