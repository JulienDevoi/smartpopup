'use client';

import PopupWidget from '@/components/PopupWidget';

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Demo content */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="mb-8 text-4xl font-bold text-gray-900">
              Exit-Intent Popup Widget Demo
            </h1>
            <p className="mb-12 text-xl text-gray-600">
              Move your mouse cursor toward the top of the browser to trigger the exit-intent popup
            </p>
            
            <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-2xl font-semibold text-gray-800">
                Sample Marketing Content
              </h2>
              
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-xl font-medium text-gray-700">
                    Features
                  </h3>
                  <ul className="space-y-2 text-left text-gray-600">
                    <li>• Exit-intent detection</li>
                    <li>• Mobile-friendly scroll detection</li>
                    <li>• Cookie-based frequency control</li>
                    <li>• Customizable timing and thresholds</li>
                    <li>• Modern, responsive design</li>
                    <li>• Easy integration</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="mb-4 text-xl font-medium text-gray-700">
                    How to Test
                  </h3>
                  <ul className="space-y-2 text-left text-gray-600">
                    <li>• Move mouse to top of browser window</li>
                    <li>• Wait at least 3 seconds on page first</li>
                    <li>• On mobile: scroll to top quickly</li>
                    <li>• Popup shows once per day (cookie-controlled)</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-gray-500">
                  This is a demo page. The popup will appear when you try to leave!
                </p>
                <div className="mt-4">
                  <a 
                    href="/example.html" 
                    target="_blank"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    🔗 View Standalone Example Page
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* The popup widget */}
      <PopupWidget 
        delay={3000}
        threshold={50}
        cookieExpiry={1}
      />
    </>
  );
}