import type { Metadata } from "next";
import {
  Titillium_Web,
  Source_Code_Pro,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";

const titilliumWeb = Titillium_Web({
  variable: "--font-titillium",
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "900"],
  display: "swap",
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const headingFont = Inter({
  variable: "--font-rigid-square",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Data Terminal Design System",
  description: "A cyberpunk terminal aesthetic design system built with React and Tailwind CSS 4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("data-terminal-theme");if(t&&["dark","light","contrast","warm","cool"].includes(t)){document.documentElement.classList.add("theme-"+t)}else{document.documentElement.classList.add("theme-dark")}}catch(e){document.documentElement.classList.add("theme-dark")}})()`,
          }}
        />
      </head>
      <body
        className={`${titilliumWeb.variable} ${sourceCodePro.variable} ${headingFont.variable} ${jetbrainsMono.variable}`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
