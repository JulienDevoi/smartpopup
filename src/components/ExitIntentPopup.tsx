'use client';

import React, { useState } from 'react';
import { X, Sparkles, Users, Shield, Zap } from 'lucide-react';

interface ExitIntentPopupProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
}

const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({ isVisible, onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    await onSubmit(email);
    setIsSubmitting(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-lg transform animate-in slide-in-from-bottom-4 duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -right-2 -top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg transition-colors hover:bg-gray-50"
        >
          <X className="h-4 w-4 text-gray-600" />
        </button>

        {/* Main popup content */}
        <div className="rounded-2xl bg-gradient-to-br from-white to-gray-50 p-8 shadow-2xl">
          {/* Header with sparkles */}
          <div className="mb-6 text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <div className="mb-2">
              <span className="inline-block rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-1 text-sm font-semibold text-white">
                $1B+ paid through Request Finance
              </span>
            </div>

            {/* Partner logos */}
            <div className="mb-6 flex flex-wrap items-center justify-center gap-4 opacity-60">
              <div className="flex items-center gap-1 text-xs font-medium text-gray-600">
                <Shield className="h-3 w-3" />
                Fantom
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-gray-600">
                <Zap className="h-3 w-3" />
                NEAR
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-gray-600">
                <Users className="h-3 w-3" />
                Merit Circle
              </div>
              <div className="text-xs font-medium text-gray-600">CORE</div>
              <div className="text-xs font-medium text-gray-600">SANDBOX</div>
            </div>
          </div>

          {/* Main heading */}
          <div className="mb-6 text-center">
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Ready to Simplify Your Finances?
            </h2>
            <p className="text-gray-600">
              Discover how Request Finance can help streamline your invoicing, payments, and accounting, all in one place.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting || !email}
              className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 font-semibold text-white transition-all hover:from-blue-600 hover:to-blue-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Getting Demo...' : 'Get a live demo'}
            </button>
          </form>

          {/* Team avatars */}
          <div className="mt-6 flex justify-center">
            <div className="flex -space-x-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 border-2 border-white"></div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 border-2 border-white"></div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 border-2 border-white"></div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-4 text-center text-xs text-gray-500">
            Trusted by 1000+ companies worldwide
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
