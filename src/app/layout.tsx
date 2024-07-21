import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import localFont from 'next/font/local';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "언티비티",
  description: "언티비티, 무역의 장벽을 허물다",
};

const pretendardBold = localFont({
  src: '../../public/Pretendard-Bold.otf',
  variable: '--font-bold',
})

const pretendardMedium = localFont({
  src: '../../public/Pretendard-Medium.otf',
  variable: '--font-medium',
})

const pretendardRegular = localFont({
  src: '../../public/Pretendard-Regular.otf',
  variable: '--font-regular',
})

const ibmPlexSansKRSemiBold = localFont({
  src: '../../public/IBMPlexSansKR-SemiBold.otf',
  variable: '--font-IBMPlexSansKRSemiBold',
})

const ibmPlexSansKRMedium = localFont({
  src: '../../public/IBMPlexSansKR-Medium.otf',
  variable: '--font-IBMPlexSansKRMedium',
})

const ibmPlexSansKRBold = localFont({
  src: '../../public/IBMPlexSansKR-Bold.otf',
  variable: '--font-IBMPlexSansKRBold',
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(pretendardBold.variable, pretendardMedium.variable, pretendardRegular.variable, inter.className, ibmPlexSansKRSemiBold.variable, ibmPlexSansKRMedium.variable, ibmPlexSansKRBold.variable)}>{children}</body>
    </html>
  );
}
