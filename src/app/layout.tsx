import LastActiveUpdater from "@/my_components/lastActiveUpdater";
import "./globals.css";
import MyNavigationMenu from "@/my_components/myNavigationMenu"

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>
        <MyNavigationMenu />
        <LastActiveUpdater />
        {children}
      </body>
    </html>
  );
}
