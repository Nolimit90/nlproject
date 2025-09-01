'use client';

import { useState, useEffect, useRef } from 'react';
import { useI18n } from '@/hooks/useI18n';

export default function ParisTimeDisplay() {
  const [time, setTime] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);
  const { lang } = useI18n();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Format : "HH:MM" (24h, minutes uniquement, pas de secondes)
      const parisTime = now.toLocaleTimeString('fr-FR', {
        timeZone: 'Europe/Paris',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      
      setTime(parisTime);
    };

    // Mise à jour initiale
    updateTime();
    
    // Mise à jour toutes les minutes (60000ms)
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  const updateTooltipPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const top = rect.bottom + 8; // 8px en dessous du bouton
      const left = rect.left + rect.width / 2; // Centré horizontalement
      
      setTooltipPosition({ top, left });
    }
  };

  const handleMouseEnter = () => {
    updateTooltipPosition();
    setShowTooltip(true);
  };

  const handleFocus = () => {
    updateTooltipPosition();
    setShowTooltip(true);
  };

  return (
    <div className="relative">
      <div
        ref={buttonRef}
        className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-[#4A4A4A] uppercase tracking-[0.1em] border border-[#E8E0D8] rounded-full bg-white/90 backdrop-blur-sm cursor-help transition-all duration-150 hover:border-[#D1D5DB] hover:bg-white/95"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={handleFocus}
        onBlur={() => setShowTooltip(false)}
        role="button"
        tabIndex={0}
        aria-label={`Heure de Paris : ${time}, fuseau CET/CEST`}
        aria-describedby={showTooltip ? "paris-time-tooltip" : undefined}
      >
        <span className="text-[#2D5A27] font-semibold">
          {lang === 'fr' ? 'PARIS' : 'PARIS'}
        </span>
        <span className="mx-2 text-[#9CA3AF]">•</span>
        <span className="font-mono text-[#374151]">{time}</span>
        <span className="ml-1 text-[#9CA3AF] text-[10px]">CET</span>
      </div>

      {/* Tooltip accessible et positionné */}
      {showTooltip && (
        <div
          id="paris-time-tooltip"
          role="tooltip"
          className="fixed z-[9999] px-3 py-2 bg-[#1F2937] text-white text-xs rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="text-center">
            <div className="font-medium">
              {lang === 'fr' ? 'Heure de Paris' : 'Paris time'}
            </div>
          </div>
          {/* Flèche du tooltip vers le haut */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-[#1F2937]"></div>
        </div>
      )}
    </div>
  );
}
