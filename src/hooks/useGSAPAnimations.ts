import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Global GSAP ScrollTrigger animations hook.
 * Automatically animates elements with `data-gsap` attributes on scroll.
 * 
 * Usage: Add data-gsap="fade-up" (or fade-left, fade-right, scale, stagger) to any element.
 * Also auto-animates sections, headings, and common patterns.
 */
export const useGSAPAnimations = () => {
  const pathname = usePathname();
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    // Kill previous animations on route change
    if (contextRef.current) {
      contextRef.current.revert();
    }

    // Small delay to let React render the new page
    const timeout = setTimeout(() => {
      contextRef.current = gsap.context(() => {
        // ── 1. Auto-animate elements with data-gsap attribute ──
        
        // Fade up
        gsap.utils.toArray<HTMLElement>('[data-gsap="fade-up"]').forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0, y: 60 },
            {
              opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
            }
          );
        });

        // Fade left
        gsap.utils.toArray<HTMLElement>('[data-gsap="fade-left"]').forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0, x: -80 },
            {
              opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
            }
          );
        });

        // Fade right
        gsap.utils.toArray<HTMLElement>('[data-gsap="fade-right"]').forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0, x: 80 },
            {
              opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
            }
          );
        });

        // Scale reveal
        gsap.utils.toArray<HTMLElement>('[data-gsap="scale"]').forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0, scale: 0.85 },
            {
              opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.4)',
              scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
            }
          );
        });

        // Stagger children
        gsap.utils.toArray<HTMLElement>('[data-gsap="stagger"]').forEach((el) => {
          const children = el.children;
          if (children.length === 0) return;
          gsap.fromTo(children,
            { opacity: 0, y: 40 },
            {
              opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
              stagger: 0.1,
              scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
            }
          );
        });

        // Clip reveal (wipe from bottom)
        gsap.utils.toArray<HTMLElement>('[data-gsap="clip-up"]').forEach((el) => {
          gsap.fromTo(el,
            { clipPath: 'inset(100% 0% 0% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power4.inOut',
              scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
            }
          );
        });

        // Parallax
        gsap.utils.toArray<HTMLElement>('[data-gsap="parallax"]').forEach((el) => {
          const speed = parseFloat(el.dataset.gsapSpeed || '0.3');
          gsap.to(el, {
            yPercent: -20 * speed,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            }
          });
        });

        // Text reveal (line by line)
        gsap.utils.toArray<HTMLElement>('[data-gsap="text-reveal"]').forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0, y: 30, filter: 'blur(8px)' },
            {
              opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
            }
          );
        });

        // Counter animation
        gsap.utils.toArray<HTMLElement>('[data-gsap="counter"]').forEach((el) => {
          const target = parseInt(el.dataset.gsapTarget || '0', 10);
          const suffix = el.dataset.gsapSuffix || '';
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
            onUpdate: () => {
              el.textContent = Math.round(obj.val) + suffix;
            }
          });
        });

        // ── 2. Auto-animate common page elements (no data attributes needed) ──

        // Footer reveal
        const footer = document.querySelector('footer');
        if (footer) {
          gsap.fromTo(footer,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
              scrollTrigger: { trigger: footer, start: 'top 95%', toggleActions: 'play none none none' }
            }
          );
        }

        // Smooth section separator lines
        gsap.utils.toArray<HTMLElement>('section + section').forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0 },
            {
              opacity: 1, duration: 0.5,
              scrollTrigger: { trigger: el, start: 'top 95%', toggleActions: 'play none none none' }
            }
          );
        });

      }); // end gsap.context
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (contextRef.current) {
        contextRef.current.revert();
      }
    };
  }, [pathname]);
};
