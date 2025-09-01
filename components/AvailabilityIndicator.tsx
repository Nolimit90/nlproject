'use client';

import { useState } from 'react';
import { useI18n } from '@/hooks/useI18n';

type AvailabilityStatus = 'available' | 'booked';

interface AvailabilityPillProps {
  variant?: 'header' | 'mobile';
  className?: string;
}

export default function AvailabilityPill({ variant = 'header', className = '' }: AvailabilityPillProps) {
  const [status] = useState<AvailabilityStatus>('available'); // You can toggle this based on your availability
  const { lang } = useI18n();

  const getAvailabilityText = () => {
    if (lang === 'fr') {
      return 'Disponible';
    }
    return 'Available';
  };

  const getStatusConfig = (status: AvailabilityStatus) => {
    switch (status) {
      case 'available':
        return {
          dot: 'bg-[#10B981]',
          text: 'text-[#10B981]',
          bg: 'bg-[#10B981]/10',
          label: getAvailabilityText()
        };
      case 'booked':
        return {
          dot: 'bg-[#EF4444]',
          text: 'text-[#EF4444]',
          bg: 'bg-[#EF4444]/10',
          label: lang === 'fr' ? 'Occupé' : 'Busy'
        };
      default:
        return {
          dot: 'bg-[#6B7280]',
          text: 'text-[#6B7280]',
          bg: 'bg-[#6B7280]/10',
          label: 'Unknown'
        };
    }
  };

  const config = getStatusConfig(status);

  if (variant === 'mobile') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className={`w-2 h-2 rounded-full ${config.dot}`}></div>
        <span className="text-sm font-medium">
          {getAvailabilityText()}
        </span>
      </div>
    );
  }

  // Header variant - compact chip
  return (
    <div className={`inline-flex items-center px-2 py-1 rounded-full ${config.bg} border border-current ${config.text} ${className}`}>
      <div className={`w-1.5 h-1.5 rounded-full ${config.dot} mr-1.5`}></div>
      <span className="text-xs font-medium">
        {config.label}
      </span>
    </div>
  );
}
