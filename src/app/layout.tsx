import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ClientLayoutWrapper } from "./ClientLayoutWrapper";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#8B5CF6",
};

export const metadata: Metadata = {
  title: {
    default: "IDOL Manager Wiki — 공식 게임 위키",
    template: "%s | IDOL Manager Wiki",
  },
  description:
    "Windows PC용 아이돌 기획사 경영 시뮬레이션 IDOL Manager의 공식 게임 시스템, 일정, 드래프트, 능력치, 공략 위키입니다.",
  keywords: [
    "IDOL Manager",
    "아이돌 매니저",
    "아이돌 기획사 시뮬레이션",
    "IDOL Manager 공략",
    "IDOL Manager 위키",
  ],
  authors: [{ name: "IDOL Manager Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col bg-wiki-bg text-wiki-text antialiased">
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
