'use client';

import React from 'react';
import ExitIntentPopup from './ExitIntentPopup';
import { useExitIntent } from '@/hooks/useExitIntent';

interface PopupWidgetProps {
  // Configuration options
  threshold?: number;
  delay?: number;
  cookieExpiry?: number;
}

const PopupWidget: React.FC<PopupWidgetProps> = ({
  threshold = 50,
  delay = 5000,
  cookieExpiry = 1
}) => {
  const { showPopup, closePopup } = useExitIntent({
    threshold,
    delay,
    cookieExpiry
  });

  return (
    <ExitIntentPopup
      isVisible={showPopup}
      onClose={closePopup}
    />
  );
};

export default PopupWidget;
