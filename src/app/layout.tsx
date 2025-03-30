import "./globals.css";
import { Metadata } from "next";
import { UserContextProvider } from "../../contexts/UserContext";
import LayoutWrapper from "./layoutWrapper";

export const metadata: Metadata = {
  title: 'Poke Pocket Market',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <UserContextProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </UserContextProvider>
      </body>
    </html>
  )
}
