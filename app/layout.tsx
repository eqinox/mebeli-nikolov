import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Мебели Николов",
  description: "Мебели по поръчка",
  icons: {
    icon: "/fav-icon-bigger.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundImage: "url('/wood-2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="h-dvh"
      >
        {children}
      </body>
    </html>
  );
}
