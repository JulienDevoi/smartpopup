(function() {
  'use strict';
  
  // Configuration - can be overridden by the website
  window.PopupWidgetConfig = window.PopupWidgetConfig || {
    threshold: 50,
    delay: 5000,
    cookieExpiry: 1
  };

  // Exit intent detection
  let timeOnPage = 0;
  let popupShown = false;
  const cookieName = 'exitIntentShown';

  // Utility functions
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
  }

  function hasShownBefore() {
    return getCookie(cookieName) !== null;
  }

  // Create popup HTML
  function createPopupHTML() {
    return `
      <div id="exit-intent-popup" style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease-out;
      ">
        <div style="
          position: relative;
          width: 90%;
          max-width: 500px;
          margin: 0 16px;
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border-radius: 16px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          animation: slideIn 0.3s ease-out;
          overflow: hidden;
        ">


          <!-- Header image - no margins/padding -->
          <img src="https://smartpopup-smoky.vercel.app/header.png" alt="Request Finance" style="width: 100%; height: auto; object-fit: contain; display: block;" />
          
          <!-- Content with padding -->
          <div style="padding: 32px;">

          <div style="text-align: center !important; margin-bottom: 24px;">
            <h2 style="
              font-size: 24px !important;
              font-weight: 600 !important;
              color: #111827 !important;
              margin: 0 0 12px 0 !important;
              line-height: 1.2 !important;
              text-align: center !important;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
            ">Ready to Simplify Your Finances?</h2>
            <p style="
              color: #6b7280 !important;
              margin: 0 !important;
              line-height: 1.5 !important;
              text-align: center !important;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
            ">Discover how Request Finance can help streamline your invoicing, payments, and accounting, all in one place.</p>
          </div>

          <div style="margin-bottom: 24px;">
            <button 
              id="demo-btn"
              onclick="window.open('https://www.request.finance/demo?utm_source=pricing-page&utm_medium=popup&utm_campaign=demo', '_blank'); closePopup();"
              style="
                width: 100% !important;
                background: linear-gradient(45deg, #3b82f6, #2563eb) !important;
                color: white !important;
                padding: 12px 24px !important;
                border: none !important;
                border-radius: 8px !important;
                font-size: 16px !important;
                font-weight: 600 !important;
                cursor: pointer !important;
                transition: all 0.2s !important;
                text-align: center !important;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
              "
              onmouseover="this.style.background='linear-gradient(45deg, #2563eb, #1d4ed8) !important'"
              onmouseout="this.style.background='linear-gradient(45deg, #3b82f6, #2563eb) !important'"
            >Get a live demo</button>
          </div>

          <div style="text-align: center;">
            <div style="display: flex; justify-content: center; margin-bottom: 8px;">
              <div style="display: flex; margin-left: -8px;">
                <img src="https://smartpopup-smoky.vercel.app/thomas.png" alt="Thomas" title="Thomas" style="width: 32px; height: 32px; border-radius: 50%; border: 2px solid white; margin-left: -8px; object-fit: cover;" />
                <img src="https://smartpopup-smoky.vercel.app/mashudi.png" alt="Mashudi" title="Mashudi" style="width: 32px; height: 32px; border-radius: 50%; border: 2px solid white; margin-left: -8px; object-fit: cover;" />
                <img src="https://smartpopup-smoky.vercel.app/eduardo.png" alt="Eduardo" title="Eduardo" style="width: 32px; height: 32px; border-radius: 50%; border: 2px solid white; margin-left: -8px; object-fit: cover;" />
              </div>
            </div>
            <p style="font-size: 12px !important; color: #9ca3af !important; margin: 0 !important; text-align: center !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;">Fast, Compliant, Scalable.<br />Your Finance Ops HQ, ready when you are.</p>
          </div>
          </div>
        </div>
      </div>
      
      <style>
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      </style>
    `;
  }

  // Show popup
  function showPopup() {
    if (popupShown || hasShownBefore()) return;
    
    popupShown = true;
    setCookie(cookieName, 'true', window.PopupWidgetConfig.cookieExpiry);
    
    // Create and inject popup
    const popupContainer = document.createElement('div');
    popupContainer.innerHTML = createPopupHTML();
    document.body.appendChild(popupContainer);

    // Add event listener for clicking outside popup
    document.getElementById('exit-intent-popup').addEventListener('click', function(e) {
      if (e.target.id === 'exit-intent-popup') {
        closePopup();
      }
    });

    // No form to handle anymore
  }

  // Close popup
  function closePopup() {
    const popup = document.getElementById('exit-intent-popup');
    if (popup) {
      popup.style.animation = 'fadeOut 0.2s ease-out';
      setTimeout(() => {
        popup.remove();
      }, 200);
    }
  }

  // No form submission needed anymore

  // Exit intent detection
  function handleMouseLeave(e) {
    if (e.clientY <= window.PopupWidgetConfig.threshold && 
        timeOnPage >= window.PopupWidgetConfig.delay) {
      showPopup();
    }
  }

  // Mobile scroll detection
  function handleScroll() {
    if (window.scrollY === 0 && timeOnPage >= window.PopupWidgetConfig.delay) {
      setTimeout(() => {
        if (window.scrollY === 0) showPopup();
      }, 500);
    }
  }

  // Initialize
  function init() {
    // Track time on page
    setInterval(() => {
      timeOnPage += 1000;
    }, 1000);

    // Add event listeners
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);

    // Add fadeOut animation to CSS
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose reset function for testing
  window.resetExitIntentPopup = function() {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    popupShown = false;
    timeOnPage = 0;
  };

})();
