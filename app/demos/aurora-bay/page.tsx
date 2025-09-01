import React from 'react';
import AuroraBayDemo from '@/components/demos/AuroraBayDemo';
import AuroraBayNavigation from '@/components/demos/AuroraBayNavigation';

export default function AuroraBayDemoPage() {
  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      {/* Navigation */}
      <AuroraBayNavigation />

      {/* Demo Content */}
      <AuroraBayDemo />
    </div>
  );
}
