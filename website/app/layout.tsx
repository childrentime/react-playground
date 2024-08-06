import type { Metadata } from "next";
import "./globals.css";

const website = 'https://reactarium.vercel.app';
const name = 'LianWen Wu';

export const metadata: Metadata = {
  title: "React Playground",
  description: "An interactive playground for experimenting with React code in real-time",
  keywords: ["React", "JavaScript", "Playground", "Code Editor", "Web Development"],
  authors: [{ name, url: website }],
  creator: name,
  publisher: name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(website),
  openGraph: {
    title: "React Playground",
    description: "Experiment with React code in real-time",
    url: website,
    siteName: 'React Playground',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            // 增加一个自执行的函数
            __html: `
          (function () {
            function setDark(dark) {
              dark &&  document.documentElement.classList.add('dark');
            }
            let store;
            try {
              store = JSON.parse(localStorage.getItem('reactuses-color-scheme'));
            } catch (err) { }
            let dark;
            if(store === null){
              const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
              dark = darkQuery.matches;
            }else {
              dark = store;
            }
            setDark(dark)
          })();
      `,
          }}
        ></script>
        {children}
      </body>
    </html>
  );
}
