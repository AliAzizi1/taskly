import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import SideBar from "@/components/mainComponents/SideBar/SideBar";
import Navigations from "@/components/mainComponents/Navigations/Navigations";
import Contents from "@/components/Contents/Contents";
import { TaskProvider } from "./context/TaskContext";
import { SettingTaskProvider } from "./context/SettingTask";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TODO App",
  description: "to do list",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SettingTaskProvider>
          <TaskProvider>
            <ThemeProvider>
              <div className="w-full h-screen overflow-hidden flex gap-3 p-2 flex-col lg:flex-row bg-white">
                <SideBar size="larg" />
                <div className="w-full lg:h-full overflow-hidden flex flex-col gap-3 pm-7">
                  <Navigations />
                  <Contents>
                    {children}
                  </Contents>
                </div>
              </div>
            </ThemeProvider>
          </TaskProvider>
        </SettingTaskProvider>
      </body>
    </html>
  );
}
