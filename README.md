# Exit-Intent Popup Widget

A modern, customizable exit-intent popup widget that can be easily embedded on any website. Inspired by Request Finance's design, this widget helps capture leads before visitors leave your site.

## 🚀 Features

- **Exit-Intent Detection**: Triggers when users move their mouse to leave the page
- **Mobile-Friendly**: Scroll-to-top detection for mobile devices
- **Cookie Control**: Prevents popup spam with configurable frequency
- **Modern Design**: Beautiful, responsive UI with gradient backgrounds
- **Easy Integration**: Simple JavaScript embed script
- **Customizable**: Configure timing, appearance, and behavior
- **API Ready**: Built-in support for API endpoints and custom handlers

## 📦 Quick Start

### Option 1: Use the Standalone Widget

Add this code to your website:

```html
<script>
  // Optional: Configure the widget
  window.PopupWidgetConfig = {
    threshold: 50,        // pixels from top to trigger
    delay: 5000,         // minimum time on page (ms)
    cookieExpiry: 1,     // days before showing again
    apiEndpoint: 'https://your-api.com/leads',
    onEmailSubmit: function(email) {
      console.log('Email submitted:', email);
    }
  };
</script>
<script src="https://your-domain.com/embed.js"></script>
```

### Option 2: Use as Next.js Component

```tsx
import PopupWidget from '@/components/PopupWidget';

export default function YourPage() {
  return (
    <div>
      {/* Your page content */}
      
      <PopupWidget 
        delay={3000}
        threshold={50}
        cookieExpiry={1}
        onEmailSubmit={async (email) => {
          // Handle email submission
          console.log('Email:', email);
        }}
      />
    </div>
  );
}
```

## ⚙️ Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `threshold` | number | 50 | Pixels from top of screen to trigger popup |
| `delay` | number | 5000 | Minimum time on page before popup can show (ms) |
| `cookieExpiry` | number | 1 | Days before popup can show again |
| `apiEndpoint` | string | null | API endpoint to send email submissions |
| `onEmailSubmit` | function | null | Custom handler for email submissions |

## 🎨 Customization

### Basic Configuration

```javascript
window.PopupWidgetConfig = {
  threshold: 30,        // More sensitive trigger
  delay: 3000,         // Show after 3 seconds
  cookieExpiry: 7,     // Remember for 7 days
};
```

### API Integration

```javascript
window.PopupWidgetConfig = {
  apiEndpoint: 'https://api.example.com/newsletter',
  onEmailSubmit: async function(email) {
    // Send to your CRM
    await fetch('/api/crm/add-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: email,
        source: 'exit-intent',
        timestamp: new Date().toISOString()
      })
    });
  }
};
```

## 🧪 Testing

The widget includes a reset function for testing:

```javascript
// Reset the popup (removes cookie, allows popup to show again)
resetExitIntentPopup();
```

Or open the browser console and run:
```javascript
window.resetExitIntentPopup();
```

## 🏗️ Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Project Structure

```
popup/
├── src/
│   ├── components/
│   │   ├── ExitIntentPopup.tsx    # Main popup component
│   │   └── PopupWidget.tsx        # Widget wrapper
│   ├── hooks/
│   │   └── useExitIntent.ts       # Exit-intent detection logic
│   └── app/
│       └── page.tsx               # Demo page
├── public/
│   ├── embed.js                   # Standalone embed script
│   └── example.html               # Integration example
└── README.md
```

## 📱 Mobile Support

The widget automatically detects mobile devices and uses scroll-to-top detection as an alternative to mouse-leave events. This provides a good user experience across all devices.

## 🔒 Privacy & Performance

- **Lightweight**: Minimal JavaScript footprint
- **No External Dependencies**: Vanilla JS embed script
- **Cookie Compliant**: Uses minimal cookies for frequency control
- **Performance Optimized**: Lazy loading and efficient event handling

## 🚀 Deployment

### Static Hosting (Recommended for embed script)

1. Build the project: `npm run build`
2. Upload `public/embed.js` to your CDN
3. Update the script src in your integration code

### Next.js Hosting

Deploy to Vercel, Netlify, or any Node.js hosting provider:

```bash
npm run build
npm start
```

## 📄 License

MIT License - feel free to use in your projects!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues or questions, please open a GitHub issue or contact the development team.

---

**Made with ❤️ for better lead conversion**