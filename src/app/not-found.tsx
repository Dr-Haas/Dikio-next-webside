import Link from 'next/link';

export const metadata = {
  title: 'Page non trouvée',
  description: "La page que vous recherchez n'existe pas ou a été déplacée.",
  robots: 'noindex, nofollow',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page non trouvée</p>
        <Link href="/" className="text-dikio-accent hover:text-dikio-accent-light underline">
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
