'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ScrollToTop } from '../ScrollToTop';
import { GSAPWrapper } from '../GSAPWrapper';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GSAPWrapper>
      <ScrollToTop />
      <Navbar />
      {children}
      <Footer />
    </GSAPWrapper>
  );
}
