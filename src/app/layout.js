
import { Quicksand } from "next/font/google";
import "./globals.css";
const roboto = Quicksand({
  weight: "500",
  subsets: ["latin"],
});


export const metadata = {
  title: "Nirwana.ai",
  description: "An EMS for nirwana.ai management system",
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
