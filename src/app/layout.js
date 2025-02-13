import { DM_Sans, Inter, Montserrat, Afacad } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/global/Toaster";
import { GrammarlyCleanup } from "@/components/global/GrammerlyCleanup";
import "google-fonts-complete";

const font = DM_Sans({ subsets: ["latin"], variable: "--font-dm" });
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});
const mon = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-mon",
});
const afc = Afacad({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-afc",
});

export const metadata = {
  title: "Competiboard",
  description: "Leaderboard creation app",
  icons: {
    icon: "/CompetiboardLogo.png", // ✅ Uses metadata instead of manual <link>
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <head>
          <link rel="icon" type="image/png" href="CompetiboardLogo.png" />
          <link
            href="https://fonts.googleapis.com/css2?family=Archivo&family=Bebas+Neue&family=Oswald&family=Quicksand&family=Work+Sans&family=Nunito&display=swap"
            rel="stylesheet"
          />
        </head>
        <body
          className={`${font.variable} ${inter.variable} ${mon.variable} ${afc.variable} bg-white text-black`}
        >
          <GrammarlyCleanup />
          <main>{children}</main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
