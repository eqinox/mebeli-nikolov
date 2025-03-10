import "./globals.css";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

export const metadata = {
  title: "Мебели Николов",
  description: "Мебели по поръчка",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" style={{ height: '100%' }}>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/fav-icon-bigger.png" />
      </head>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main
          style={{
            backgroundImage: 'url(/wood-2.jpg)',
            flex: '1 0 auto',
            display: 'flex',
            flexDirection: 'column',
            color: 'whitesmoke',
            fontSize: '1.5rem',
            position: 'relative'
          }}
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
