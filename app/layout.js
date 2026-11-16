import "./globals.css";
import Preloader from "../components/Preloader";

export const metadata = {
  title: "Restaurant, Café & Hospitality Consultants in India | Restavision",
  description:
    "Restaurant consultancy in India for launches, menu engineering, SOPs, food safety audits, franchising and brand reputation management. Talk to Restavision.",
  icons: {
    icon: "/restavision-logo-circle.webp",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-white text-[#171717] font-sans antialiased">
        <Preloader />
        {children}
      </body>
    </html>
  );
}
