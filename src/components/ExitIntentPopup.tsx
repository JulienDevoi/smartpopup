'use client';

import React from 'react';
import Image from 'next/image';

interface ExitIntentPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({ isVisible, onClose }) => {
  const handleDemoClick = () => {
    window.open('https://www.request.finance/demo?utm_source=pricing-page&utm_medium=popup&utm_campaign=demo', '_blank');
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-lg transform animate-in slide-in-from-bottom-4 duration-300">


        {/* Main popup content */}
        <div className="rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-2xl overflow-hidden">
          {/* Header image - no margins/padding */}
          <Image 
            src="/header.png" 
            alt="Request Finance" 
            width={500}
            height={200}
            className="w-full h-auto object-contain"
            priority
          />
          
          {/* Content with padding */}
          <div className="p-8">

          {/* Main heading */}
          <div className="mb-6 text-center">
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Ready to Simplify Your Finances?
            </h2>
            <p className="text-gray-600">
              Discover how Request Finance can help streamline your invoicing, payments, and accounting, all in one place.
            </p>
          </div>

          {/* Demo Button */}
          <div className="mb-6">
            <button
              onClick={handleDemoClick}
              className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 font-semibold text-white transition-all hover:from-blue-600 hover:to-blue-700 hover:shadow-lg"
            >
              Get a live demo
            </button>
          </div>

          {/* Team avatars */}
          <div className="mt-6 flex justify-center">
            <div className="flex -space-x-2">
              <Image 
                src="/thomas.png" 
                alt="Thomas" 
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border-2 border-white object-cover"
                title="Thomas"
              />
              <Image 
                src="/mashudi.png" 
                alt="Mashudi" 
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border-2 border-white object-cover"
                title="Mashudi"
              />
              <Image 
                src="/eduardo.png" 
                alt="Eduardo" 
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border-2 border-white object-cover"
                title="Eduardo"
              />
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-4 text-center text-xs text-gray-500">
          Fast, Compliant, Scalable. <br />Your Finance Ops HQ, ready when you are.
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
