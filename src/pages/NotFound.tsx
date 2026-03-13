import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEO from '@/components/SEO';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <SEO 
        title="Page non trouvée"
        description="La page que vous recherchez n'existe pas ou a été déplacée."
        noIndex={true}
      />
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page non trouvée</p>
        <a href="/" className="text-dikio-accent hover:text-dikio-accent-light underline">
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
};

export default NotFound;
