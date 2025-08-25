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
          padding: 32px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          animation: slideIn 0.3s ease-out;
        ">
          <button id="close-popup" style="
            position: absolute;
            top: -8px;
            right: -8px;
            width: 32px;
            height: 32px;
            background: white;
            border: none;
            border-radius: 50%;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            color: #6b7280;
            transition: all 0.2s;
          " onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background='white'">
            ×
          </button>

          <div style="text-align: center; margin-bottom: 24px;">
            <div style="
              width: 64px;
              height: 64px;
              background: linear-gradient(45deg, #3b82f6, #8b5cf6);
              border-radius: 50%;
              margin: 0 auto 16px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 24px;
            ">✨</div>
            
            <div style="margin-bottom: 16px;">
              <span style="
                background: linear-gradient(45deg, #3b82f6, #8b5cf6);
                color: white;
                padding: 4px 16px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 600;
              ">$1B+ paid through Request Finance</span>
            </div>

            <div style="
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              gap: 16px;
              margin-bottom: 24px;
              opacity: 0.6;
              font-size: 12px;
              color: #6b7280;
            ">
              <span>Fantom</span>
              <span>NEAR</span>
              <span>Merit Circle</span>
              <span>CORE</span>
              <span>SANDBOX</span>
            </div>
          </div>

          <div style="text-align: center; margin-bottom: 24px;">
            <h2 style="
              font-size: 24px;
              font-weight: bold;
              color: #111827;
              margin: 0 0 12px 0;
              line-height: 1.2;
            ">Ready to Simplify Your Finances?</h2>
            <p style="
              color: #6b7280;
              margin: 0;
              line-height: 1.5;
            ">Discover how Request Finance can help streamline your invoicing, payments, and accounting, all in one place.</p>
          </div>

          <div style="margin-bottom: 24px;">
            <button 
              id="demo-btn"
              onclick="window.open('https://www.request.finance/demo?utm_source=pricing-page&utm_medium=popup&utm_campaign=demo', '_blank'); closePopup();"
              style="
                width: 100%;
                background: linear-gradient(45deg, #3b82f6, #2563eb);
                color: white;
                padding: 12px 24px;
                border: none;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
              "
              onmouseover="this.style.background='linear-gradient(45deg, #2563eb, #1d4ed8)'"
              onmouseout="this.style.background='linear-gradient(45deg, #3b82f6, #2563eb)'"
            >Get a live demo</button>
          </div>

          <div style="text-align: center;">
            <div style="display: flex; justify-content: center; margin-bottom: 8px;">
              <div style="display: flex; margin-left: -8px;">
                <div style="width: 32px; height: 32px; background: linear-gradient(45deg, #60a5fa, #a78bfa); border-radius: 50%; border: 2px solid white; margin-left: -8px;"></div>
                <div style="width: 32px; height: 32px; background: linear-gradient(45deg, #34d399, #60a5fa); border-radius: 50%; border: 2px solid white; margin-left: -8px;"></div>
                <div style="width: 32px; height: 32px; background: linear-gradient(45deg, #fbbf24, #f59e0b); border-radius: 50%; border: 2px solid white; margin-left: -8px;"></div>
              </div>
            </div>
            <p style="font-size: 12px; color: #9ca3af; margin: 0;">Trusted by 1000+ companies worldwide</p>
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

    // Add event listeners
    document.getElementById('close-popup').addEventListener('click', closePopup);
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
