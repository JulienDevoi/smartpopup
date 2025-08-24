'use client';

import React, { useCallback } from 'react';
import ExitIntentPopup from './ExitIntentPopup';
import { useExitIntent } from '@/hooks/useExitIntent';

interface PopupWidgetProps {
  // Configuration options
  threshold?: number;
  delay?: number;
  cookieExpiry?: number;
  onEmailSubmit?: (email: string) => void | Promise<void>;
  apiEndpoint?: string;
}

const PopupWidget: React.FC<PopupWidgetProps> = ({
  threshold = 50,
  delay = 5000,
  cookieExpiry = 1,
  onEmailSubmit,
  apiEndpoint
}) => {
  const { showPopup, closePopup } = useExitIntent({
    threshold,
    delay,
    cookieExpiry
  });

  const handleEmailSubmit = useCallback(async (email: string) => {
    try {
      // If custom handler is provided, use it
      if (onEmailSubmit) {
        await onEmailSubmit(email);
        return;
      }

      // If API endpoint is provided, send to that
      if (apiEndpoint) {
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, source: 'exit-intent-popup' }),
        });

        if (!response.ok) {
          throw new Error('Failed to submit email');
        }
      }

      // Default behavior: log to console (for demo purposes)
      console.log('Email submitted:', email);
      
      // Close popup after successful submission
      setTimeout(() => {
        closePopup();
      }, 1000);

    } catch (error) {
      console.error('Error submitting email:', error);
      // You might want to show an error message to the user here
    }
  }, [onEmailSubmit, apiEndpoint, closePopup]);

  return (
    <ExitIntentPopup
      isVisible={showPopup}
      onClose={closePopup}
      onSubmit={handleEmailSubmit}
    />
  );
};

export default PopupWidget;
