declare module '@/lib/*';
declare module '@/components/*';
declare module '@/pages/*';
declare module 'motion/*';

// Vite alias-style versioned imports (map to actual packages at build time)
declare module 'vaul@1.1.2';
declare module 'sonner@2.0.3';
declare module 'recharts@2.15.2';
declare module 'react-resizable-panels@2.1.7';
declare module 'react-hook-form@7.55.0';
declare module 'react-day-picker@8.10.1';
declare module 'next-themes@0.4.6';
declare module 'lucide-react@0.487.0';
declare module 'input-otp@1.4.2';
declare module 'embla-carousel-react@8.6.0';
declare module 'cmdk@1.1.1';
declare module 'class-variance-authority@0.7.1';
declare module '@radix-ui/react-tooltip@1.1.8';
declare module '@radix-ui/react-toggle@1.1.2';
declare module '@radix-ui/react-toggle-group@1.1.2';
declare module '@radix-ui/react-tabs@1.1.3';
declare module '@radix-ui/react-switch@1.1.3';
declare module '@radix-ui/react-slot@1.1.2';
declare module '@radix-ui/react-slider@1.2.3';
declare module '@radix-ui/react-separator@1.1.2';
declare module '@radix-ui/react-select@2.1.6';
declare module '@radix-ui/react-scroll-area@1.2.3';
declare module '@radix-ui/react-radio-group@1.2.3';
declare module '@radix-ui/react-progress@1.1.2';
declare module '@radix-ui/react-popover@1.1.6';
declare module '@radix-ui/react-navigation-menu@1.2.5';
declare module '@radix-ui/react-menubar@1.1.6';
declare module '@radix-ui/react-label@2.1.2';
declare module '@radix-ui/react-hover-card@1.1.6';
declare module '@radix-ui/react-dropdown-menu@2.1.6';
declare module '@radix-ui/react-dialog@1.1.6';
declare module '@radix-ui/react-context-menu@2.2.6';
declare module '@radix-ui/react-collapsible@1.1.3';
declare module '@radix-ui/react-checkbox@1.1.4';
declare module '@radix-ui/react-avatar@1.1.3';
declare module '@radix-ui/react-aspect-ratio@1.1.2';
declare module '@radix-ui/react-alert-dialog@1.1.6';
declare module '@radix-ui/react-accordion@1.2.3';

// Generic fallback for any other versioned import pattern
declare module '*@*' {
  const v: any;
  export = v;
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // Add other environment variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Minimal JSX types for non-TSX environments (the project uses React types from @types/react)
import * as React from 'react';
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    interface Element extends React.ReactElement {}
    interface ElementClass extends React.Component {}
  }
}
