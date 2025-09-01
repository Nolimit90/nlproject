import React from 'react';
import AppleIMacMockup from './devices/AppleMacBookProMockup';
import AppleIPhoneMockup from './devices/AppleIPhoneMockup';
import AppleIPadMockup from './devices/AppleIPadMockup';

interface DeviceFrameProps {
  type: 'macbook' | 'iphone' | 'ipad';
  children: React.ReactNode;
  className?: string;
}

export default function DeviceFrame({ type, children, className = '' }: DeviceFrameProps) {
  const deviceComponents = {
    macbook: AppleIMacMockup,   // Restaurant - Now using iMac mockup
    iphone: AppleIPhoneMockup,  // E-commerce - iPhone portrait
    ipad: AppleIPadMockup       // Hotel - iPad landscape
  };

  const DeviceComponent = deviceComponents[type];

  return (
    <DeviceComponent className={className} src={typeof children === 'string' ? children : undefined}>
      {typeof children !== 'string' ? children : undefined}
    </DeviceComponent>
  );
}
