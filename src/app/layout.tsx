import type {Metadata} from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { Pirata_One, Metal_Mania } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Tic-Tac-Toe',
  description: 'A Tic-Tac-Toe game with a custom theme.',
};

const pirataOne = Pirata_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pirata-one',
});

const metalMania = Metal_Mania({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-metal-mania',
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${pirataOne.variable} ${metalMania.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
