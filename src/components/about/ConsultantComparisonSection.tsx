'use client';

import React from 'react';
import { Check, X } from 'lucide-react';

const rows = [
  {
    criterion: 'Spécialisation legaltech',
    dikio: true,
    freelance: false,
    cabinet: 'Partielle',
  },
  {
    criterion: 'Livrables HTML interactifs',
    dikio: true,
    freelance: false,
    cabinet: false,
  },
  {
    criterion: "Co-pilote IA en temps réel pendant l'audit",
    dikio: true,
    freelance: false,
    cabinet: false,
  },
  {
    criterion: 'Pricing transparent',
    dikio: true,
    freelance: false,
    cabinet: false,
  },
  {
    criterion: 'Délai de livraison',
    dikio: '2-5 semaines',
    freelance: '1-8 semaines',
    cabinet: '3-6 mois',
  },
  {
    criterion: "Ticket d'entrée",
    dikio: 'À partir de 3 250€',
    freelance: 'Variable',
    cabinet: '50 000€+',
  },
];

const Cell = ({ value }: { value: string | boolean }) => {
  if (value === true)
    return (
      <td className="px-4 py-3 text-center">
        <Check className="w-5 h-5 text-dikio-subtitle mx-auto" />
      </td>
    );
  if (value === false)
    return (
      <td className="px-4 py-3 text-center">
        <X className="w-5 h-5 text-dikio-accent mx-auto" />
      </td>
    );
  return (
    <td className="px-4 py-3 text-white/90 text-sm md:text-base text-center">
      {value}
    </td>
  );
};

const ConsultantComparisonSection = () => {
  return (
    <section className="py-20 md:py-28 px-4 bg-dikio-blue">
      <div className="max-w-5xl mx-auto">
        <h2
          data-gsap="text-reveal"
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-12 md:mb-16"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Pourquoi pas un consultant classique ?
        </h2>
        <div
          data-gsap="fade-up"
          className="rounded-xl border border-white/10 bg-white/5 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-4 text-left text-white/70 font-medium text-sm uppercase tracking-wide">
                    Critère
                  </th>
                  <th className="px-4 py-4 text-center text-dikio-subtitle font-semibold">
                    Dikio
                  </th>
                  <th className="px-4 py-4 text-center text-white/80 font-semibold">
                    Consultant freelance généraliste
                  </th>
                  <th className="px-4 py-4 text-center text-white/80 font-semibold">
                    Grand cabinet de conseil
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="px-4 py-3 text-white/90 text-sm md:text-base">
                      {row.criterion}
                    </td>
                    <Cell value={row.dikio} />
                    <Cell value={row.freelance} />
                    <Cell value={row.cabinet} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultantComparisonSection;
