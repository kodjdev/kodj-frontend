import { ReactNode } from "react";
import { SparklesCore } from "./ui/sparkless";

export default function Sparkless({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full bg-black flex flex-col items-center min-h-screen">
      {/* header conteyneri full width uchun */}
      <div className="relative w-full z-30">
        {children}
      </div>
      {/* bu esa sparkles background */}
      <div className="fixed inset-0 w-full h-full pointer-events-none">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
    </div>
  );
}