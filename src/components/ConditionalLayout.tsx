import Header from "./Header";
import SparklesPreview from "./Sparkless";
import Footer from "./Footer";
import { useLocation } from 'react-router-dom';

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
      <main className="flex-grow w-full max-w-screen-xl mx-auto px-10 pb-20 pt-2">
        {children}
      </main>
      <Footer />
    </div>
  ) ;
  return isHomePage ? (
    <SparklesPreview>
      {LayoutContent}
    </SparklesPreview>
  ): (
    <div className="bg-black w-full">
      {LayoutContent}
    </div>
  );
}