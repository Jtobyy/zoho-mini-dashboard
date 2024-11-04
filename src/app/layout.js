import localFont from "next/font/local";
import Link from 'next/link';
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Zoho Mini Dashboard",
  description: "A streamlined dashboard for Zoho tasks and leads",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.webp" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header style={styles.header}>
          <Link href="/">
            <img
              src="/logo.webp"
              alt="Zoho Mini Dashboard Logo"
              style={styles.headerLogo}
            />
          </Link>
        </header>
        <div style={styles.container}>
          {children}
          <footer style={styles.footer}>
            <p>Powered by</p>
            <img
              src="/zoho-logo.png"
              alt="Zoho Logo"
              style={styles.footerLogo}
            />
          </footer>
        </div>
      </body>
    </html>
  );
}

const styles = {
  header: {
    padding: '20px',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
  },
  headerLogo: {
    height: '100px',
    cursor: 'pointer',
    position: 'absolute'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  footer: {
    marginTop: 'auto',
    padding: '20px 0',
    textAlign: 'center',
    fontSize: '0.9rem',
    color: '#718096',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  footerLogo: {
    height: '30px',
    marginTop: '4px',
  },
};
