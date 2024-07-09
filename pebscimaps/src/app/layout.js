import { SpeedInsights } from "@vercel/speed-insights/next"

import { Inter } from "next/font/google";
import "./globals.css";
import Head from 'next/head';

import Sidebar from "../components/Sidebar"
import Footer from '../components/Footer'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Atlas-ter",
  description: "Your personal atlas and exploration companion.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <Head>
        {/* Viewport Meta Tag */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Custom Metadata */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="msapplication-TileColor" content="#00aba9" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />

        </Head>
      <body className={inter.className}>
        <div style={{display: 'grid', gridTemplateColumns: " 1fr", backgroundColor: "#f9f9f9", width: "100vw", height: '100vh'}}>
          <Sidebar />

          <div style={{minHeight: '100%', width: '100%'}}>
            {children}
            <SpeedInsights />
            <Footer />
          </div>
        </div>
        
      </body>
    </html>
  );
}
