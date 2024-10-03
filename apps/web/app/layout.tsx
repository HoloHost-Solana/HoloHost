"use client";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
// });

// export const metadata: Metadata = {
//   title: "HoloHost",
//   description: "Launch NFT campaign's with ease",
// };
// className={`${geistSans.variable} ${geistMono.variable}`}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
          <WalletProvider wallets={[]}>  
              {children}
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}
