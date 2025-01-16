import Header from "@/components/Header";
import SparklesPreview from "@/components/Sparkless";
import Footer from "@/components/Footer";
import { useLocation } from "react-router-dom";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const LayoutContent = (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow w-full">
        <div className="max-w-[1440px] mx-auto pl-8 pr-8 md:px-[40px] w-full py-[70px]">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );

  return isHomePage ? (
    <SparklesPreview>{LayoutContent}</SparklesPreview>
  ) : (
    <div className="bg-black w-full">{LayoutContent}</div>
  );
}
