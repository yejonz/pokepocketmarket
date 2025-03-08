import "./globals.css";
import MyNavigationMenu from "@/my_components/myNavigationMenu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MyNavigationMenu />
        {children}
      </body>
    </html>
  );
}
