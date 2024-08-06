import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "React Playground",
  description: "A playground for React",
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
