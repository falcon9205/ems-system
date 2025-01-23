
import { Quicksand } from "next/font/google";
import "./globals.css";
const roboto = Quicksand({
  weight: "500",
  subsets: ["latin"],
});


export const metadata = {
  title: "iLearnings-EMS",
  description: "An EMS for iLearnings management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.ico" /> {/* Add favicon link */}
      </head>
      <body className={`bg-black ${roboto.className}`}
      >
        {children}
      </body>
    </html>
  );
}
