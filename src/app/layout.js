import { StoreProvider } from "@/redux/StoreProvider";

export const metadata = {
  title: "Jelajah",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
    <html lang="en">
      <body
      // className={inter.className}
      >
        {children}
      </body>

    </html>
    </StoreProvider>
  );
}
