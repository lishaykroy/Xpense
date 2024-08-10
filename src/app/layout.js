import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {

  title: "Xpense",
  description: "AI Powered Financial Advisor",

};

export default function RootLayout({ children }) {

  return (

    <ClerkProvider>

        <html lang="en">

          <body className={inter.className}>

            {children}
            <Toaster position="bottom-center"/>
            
          </body>

        </html>

    </ClerkProvider>

  );

}
