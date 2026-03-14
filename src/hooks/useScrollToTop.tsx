
import { useEffect } from "react";
import { usePathname } from 'next/navigation';

/**
 * Hook that scrolls to the top of the page when the route changes
 */
export const useScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [pathname]);
};
