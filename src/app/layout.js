
import "./globals.css";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer/Footer";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"; // Vercel website speed checker
import { Analytics } from "@vercel/analytics/react"; // Vercel analytics for website
import React from "react";
import Script from "next/script"; // Import Next.js Script component
import Link from "next/link";

import Marquee from "react-fast-marquee";
import Popup from "@/components/recruiterpopup/popup";


const font = Inter({
  weight: "500",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "iLearnings",
    template: "iLearnings - %s",
  },
  description:
    "EdTech startup providing innovative and personalized learning solutions for students and educators worldwide.",
};

const Header = dynamic(() => import("../components/Navbar/navbar"));

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="jMPiH5VVLtpMFxcNlbWqf4mJS62R1VjpVttdyDJ8OQw"
        />
        <link rel="icon" href="/Favicon/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${font.className} bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800`}
      >
        {/* Meta Ads Script */}
        <Script
          id="meta-ads"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s) {
                if(f.fbq) return;
                n = f.fbq = function() {
                  n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
                };
                if(!f._fbq) f._fbq = n;
                n.push = n;
                n.loaded = true;
                n.version = '2.0';
                n.queue = [];
                t = b.createElement(e);
                t.async = true;
                t.src = v;
                s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s);
              }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '584424537297755'); 
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=584424537297755&ev=PageView&noscript=1"
          />
        </noscript>

        {/* Google Analytics Script */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-QSZYNTGSDQ"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QSZYNTGSDQ');
            `,
          }}
        />
        <Link href="/certified">
          <button className="fixed bottom-20 right-2 px-2 py-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-lg shadow-2xl transition-colors z-50">
            Get Certified
          </button>
        </Link>
        {/* Marquee Fixed at the Bottom */}
        <div className="z-50  text-white fixed bg-gradient-to-r from-pink-500 to-yellow-500 right-[0] bottom-[0px] w-full  flex md:items-center justify-between">
          <img
            className="w-12 h-12 md:w-16 md:h-16"
            src="https://cdn.iconscout.com/icon/free/png-256/free-aim-icon-download-in-svg-png-gif-file-formats--arrow-bullseye-purpose-xomo-basics-pack-business-icons-267590.png"
            alt="aim"
          />
          <Marquee
            pauseOnHover="false"
            direction="left"
            speed={90}
            className="fixed left-0   right-0 w-full   text-white  transition-colors z-50"
          >
            <h1 className=" text-sm md:text-3xl capitalize py-3 font-bold">
              On a mission to provide jobs & internships to 1 million candidates
              by 2025.
            </h1>
          </Marquee>
        </div>

        {/* Header Component */}
        <Header />
        {/* <Click/> */}
         {/* <Popup/> */}
        {/* Main Content */}
        {children}
        {/* <Marquee
          pauseOnHover="false"
          direction="left"
          speed={120}
          className="fixed bottom- left-0 right-0 w-full px-2 py-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white  shadow-2xl transition-colors z-50"
        >
          <h1 className="font-sans text-2xl md:text-7xl capitalize py-5 font-bold">
            We-make-your-Career-Opportunities-easier-
          </h1>
        </Marquee> */}
        {/* Footer and Other Analytics */}

        <Footer />

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
