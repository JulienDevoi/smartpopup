'use client';

import PopupWidget from '@/components/PopupWidget';

export default function Home() {
  const popups = [
    {
      id: 'exit-intent',
      name: 'Exit-Intent Popup',
      description: 'Captures users before they leave your site',
      demoUrl: '/example.html',
      features: ['Exit-intent detection', 'Mobile scroll detection', 'Cookie control'],
      hasLiveDemo: true
    }
    // Future popups will be added here
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="mb-4 text-5xl font-bold text-gray-900">
              Popup Widget Collection
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A collection of modern, embeddable popup widgets for your marketing website. 
              Each widget is designed for maximum conversion and easy integration.
            </p>
          </div>

          {/* Popup List */}
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 max-w-6xl mx-auto">
            {popups.map((popup) => (
              <div key={popup.id} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {popup.name}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {popup.description}
                    </p>
                  </div>
                  {popup.hasLiveDemo && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Live Demo
                    </span>
                  )}
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    Features
                  </h3>
                  <ul className="space-y-1">
                    {popup.features.map((feature, index) => (
                      <li key={index} className="text-gray-600 text-sm flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <a 
                    href={popup.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600 text-white text-center py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    🚀 View Demo
                  </a>
                  {popup.id === 'exit-intent' && (
                    <button 
                      onClick={() => {
                        // Clear cookie for testing
                        document.cookie = 'exitIntentShown=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                        alert('Cookie cleared! You can now test the popup on this page by moving your mouse to the top.');
                      }}
                      className="bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                      title="Reset popup for testing on this page"
                    >
                      🔄 Reset
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Current Demo Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  🎯 Live Exit-Intent Demo
                </h2>
                <p className="text-gray-600">
                  This page demonstrates the exit-intent popup. Move your mouse toward the top of the browser to trigger it!
                </p>
              </div>
              
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-xl font-medium text-gray-700">
                    Technical Features
                  </h3>
                  <ul className="space-y-2 text-left text-gray-600">
                    <li>• Exit-intent detection (mouse leave)</li>
                    <li>• Mobile-friendly scroll detection</li>
                    <li>• Cookie-based frequency control</li>
                    <li>• Customizable timing and thresholds</li>
                    <li>• Modern, responsive design</li>
                    <li>• Easy integration with any website</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="mb-4 text-xl font-medium text-gray-700">
                    How to Test This Demo
                  </h3>
                  <ul className="space-y-2 text-left text-gray-600">
                    <li>• Move mouse to top of browser window</li>
                    <li>• Wait at least 1 second on page first</li>
                    <li>• On mobile: scroll to top quickly</li>
                    <li>• Popup shows once per day (cookie-controlled)</li>
                    <li>• Use "Reset" button to test again</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* The popup widget */}
      <PopupWidget 
        delay={1000}
        threshold={50}
        cookieExpiry={1}
      />
    </>
  );
}