import { Geist, Geist_Mono, Source_Serif_4, Montserrat } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

export const metadata = {
  title: "Aaliyah Pirani",
  description: "Portfolio of Aaliyah Pirani",
};

const symphony = localFont({
  src: "./fonts/Symphony-Regular.ttf",
  variable: "--font-symphony",
})
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const pinyon = localFont({
  variable: "--font-pinyon",
  src: "./fonts/PinyonScript-Regular.ttf",
});

const imbue_light = localFont({
  variable: "--font-imbue-light",
  src: "./fonts/Imbue_14pt-Light.ttf",
});

const imbue_regular = localFont({
  variable: "--font-imbue-regular",
  src: "./fonts/Imbue_14pt-Medium.ttf",
});

const garamond = localFont({
  variable: "--font-garamond",
  src: "./fonts/CormorantGaramond-VariableFont_wght.ttf",
});

const playfair = localFont({
  variable: "--font-playfair",
  src: "./fonts/PlayfairDisplay-VariableFont_wght.ttf",
});

const playfair_italic = localFont({
  variable: "--font-playfair-italic",
  src: "./fonts/PlayfairDisplay-Italic-VariableFont_wght.ttf",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${playfair_italic.variable} ${symphony.variable} ${sourceSerif.variable} ${montserrat.variable} ${pinyon.variable} ${imbue_light.variable} ${imbue_regular.variable} ${garamond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
