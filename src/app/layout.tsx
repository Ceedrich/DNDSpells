import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const sans = Inter({ subsets: ["latin"] });

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Spell Creator",
  description: "Blah Blah", // TODO
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={cn(
          sans.className,
          "text-base print:text-[8pt] print:leading-snug",
        )}
      >
        <div className="container print:p-0">{children}</div>
      </body>
    </html>
  );
}
