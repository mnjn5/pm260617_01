import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5e6ad2',
          hover:   '#828fff',
          focus:   '#5e69d1',
          on:      '#ffffff',
        },
        'brand-secure': '#7a7fad',

        canvas: '#010102',
        surface: {
          1: '#0e0f11',
          2: '#1a1b1e',
          3: '#232428',
          4: '#2c2e33',
        },
        hairline: {
          DEFAULT:  '#23252a',
          strong:   '#333640',
          tertiary: '#3a3d44',
        },
        'inverse-canvas': '#ffffff',
        'inverse-surface': {
          1: '#f5f5f5',
          2: '#ebebeb',
        },

        ink: {
          DEFAULT:  '#f7f8f8',
          muted:    '#d0d6e0',
          subtle:   '#8a8f98',
          tertiary: '#62666d',
        },
        'inverse-ink': '#0e0f11',

        semantic: {
          success: '#27a644',
          overlay: '#000000',
        },
      },

      fontFamily: {
        display: ['Inter', 'SF Pro Display', '-apple-system', 'system-ui', 'sans-serif'],
        sans:    ['Inter', '-apple-system', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono:    ['JetBrains Mono', 'ui-monospace', 'SF Mono', 'Menlo', 'monospace'],
      },

      fontSize: {
        'display-xl': ['80px',  { lineHeight: '1.05', letterSpacing: '-3px'   }],
        'display-lg': ['56px',  { lineHeight: '1.10', letterSpacing: '-1.8px' }],
        'display-md': ['40px',  { lineHeight: '1.15', letterSpacing: '-1px'   }],
        headline:     ['28px',  { lineHeight: '1.20', letterSpacing: '-0.6px' }],
        'card-title': ['22px',  { lineHeight: '1.25', letterSpacing: '-0.4px' }],
        subhead:      ['20px',  { lineHeight: '1.40', letterSpacing: '-0.2px' }],
        'body-lg':    ['18px',  { lineHeight: '1.50', letterSpacing: '-0.1px' }],
        body:         ['16px',  { lineHeight: '1.50', letterSpacing: '-0.05px'}],
        'body-sm':    ['14px',  { lineHeight: '1.50', letterSpacing: '0'      }],
        caption:      ['12px',  { lineHeight: '1.40', letterSpacing: '0'      }],
        button:       ['14px',  { lineHeight: '1.20', letterSpacing: '0'      }],
        eyebrow:      ['13px',  { lineHeight: '1.30', letterSpacing: '0.4px'  }],
        mono:         ['13px',  { lineHeight: '1.50', letterSpacing: '0'      }],
      },

      spacing: {
        xxs:     '4px',
        xs:      '8px',
        sm:      '12px',
        md:      '16px',
        lg:      '24px',
        xl:      '32px',
        xxl:     '48px',
        section: '96px',
      },

      borderRadius: {
        xs:   '4px',
        sm:   '6px',
        md:   '8px',
        lg:   '12px',
        xl:   '16px',
        xxl:  '24px',
        pill: '9999px',
        full: '9999px',
      },

      maxWidth: {
        content: '1280px',
      },
    },
  },
  plugins: [],
} satisfies Config;
