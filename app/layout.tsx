import type { Metadata, Viewport } from 'next';

/** Set the theme before first paint so dark mode never flashes white. */
const THEME_BOOTSTRAP = `try{var t=JSON.parse(localStorage.getItem('pathway.proto.v1')||'{}').theme;if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}`;

export const metadata: Metadata = {
  title: 'PATHWAY — Explore • Plan • Build Your Future',
  description:
    'PATHWAY helps Grade 9–12 learners explore study options, plan their subjects, track progress and apply to university.',
  icons: { icon: '/pathway/img/mark.webp' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,500&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/pathway/css/app.css" />
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
