import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import ProjectForm from "./pages/ProjectForm";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ServicesPage from "./pages/ServicesPage";
import Launching from "./pages/services/Launching";
import Branding from "./pages/services/Branding";
import Automation from "./pages/services/Automation";
import Marketing from "./pages/services/Marketing";
import Strategy from "./pages/services/Strategy";
import Portfolio from "./pages/Portfolio";
import ProjectDetail from "./pages/ProjectDetail";
import LegalPage from "./pages/LegalPage";
import PrivacyPage from "./pages/PrivacyPage";
import IALanding from "./pages/IALanding";
import Archilo from "./pages/Archilo";
import LegalOps from "./pages/LegalOps";
import LegalOpsForm from "./pages/LegalOpsForm";
import CaisseMedicale from "./pages/CaisseMedicale";
import CaisseMedicaleForm from "./pages/CaisseMedicaleForm";
import GeoAlliance from "./pages/GeoAlliance";
import GymOps from "./pages/GymOps";
import { useScrollToTop } from "./hooks/useScrollToTop";
import { useGSAPAnimations } from "./hooks/useGSAPAnimations";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";

const queryClient = new QueryClient();

// ScrollToTop component to be used within the router
const ScrollToTop = () => {
  useScrollToTop();
  return null;
};

// Layout component to conditionally render navbar and footer
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isTradeCryptoPage = location.pathname === '/tradecrypto';
  useGSAPAnimations();
  
  return (
    <>
      {!isTradeCryptoPage && <Navbar />}
      {children}
      {!isTradeCryptoPage && <Footer />}
    </>
  );
};

// Main app component
const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          <Layout>
            <Index />
          </Layout>
        } />
        <Route path="/project-form" element={
          <Layout>
            <ProjectForm />
          </Layout>
        } />
        <Route path="/about" element={
          <Layout>
            <About />
          </Layout>
        } />
        <Route path="/contact" element={
          <Layout>
            <Contact />
          </Layout>
        } />
        <Route path="/services" element={
          <Layout>
            <ServicesPage />
          </Layout>
        } />
        <Route path="/services/launching" element={
          <Layout>
            <Launching />
          </Layout>
        } />
        <Route path="/services/branding" element={
          <Layout>
            <Branding />
          </Layout>
        } />
        <Route path="/services/automation" element={
          <Layout>
            <Automation />
          </Layout>
        } />
        <Route path="/services/marketing" element={
          <Layout>
            <Marketing />
          </Layout>
        } />
        <Route path="/services/strategy" element={
          <Layout>
            <Strategy />
          </Layout>
        } />
        <Route path="/portfolio" element={
          <Layout>
            <Portfolio />
          </Layout>
        } />
        <Route path="/portfolio/:id" element={
          <Layout>
            <ProjectDetail />
          </Layout>
        } />
        <Route path="/mentions-legales" element={
          <Layout>
            <LegalPage />
          </Layout>
        } />
        <Route path="/politique-confidentialite" element={
          <Layout>
            <PrivacyPage />
          </Layout>
        } />
        <Route path="/ia" element={
          <Layout>
            <IALanding />
          </Layout>
        } />
        <Route path="/archilo" element={
          <Layout>
            <Archilo />
          </Layout>
        } />
        <Route path="/caisse-medicale" element={
          <Layout>
            <CaisseMedicale />
          </Layout>
        } />
        <Route path="/caisse-medicale/demande" element={
          <Layout>
            <CaisseMedicaleForm />
          </Layout>
        } />
        <Route path="/geo-alliance" element={<GeoAlliance />} />
        <Route path="/legalops" element={
          <Layout>
            <LegalOps />
          </Layout>
        } />
        <Route path="/legalops/demande" element={
          <Layout>
            <LegalOpsForm />
          </Layout>
        } />
        <Route path="/gym-ops" element={
          <Layout>
            <GymOps />
          </Layout>
        } />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={
          <Layout>
            <NotFound />
          </Layout>
        } />
      </Routes>
    </>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
          <CookieConsent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
