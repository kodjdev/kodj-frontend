import { ReactNode } from "react";
import { SparklesCore } from "./ui/sparkless";

export default function Sparkles({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full bg-black flex flex-col items-center justify-center min-h-screen">
      {/* we align the header at the top */}
      <div className="relative w-full z-30">{children}</div>
      {/* here we display the sparkles background */}
      <div className="absolute insert-0 w-full h-full pointer-events-none">
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
      {/* <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-10 bg-transparent mt-20">
        Join our KO'DJ community
      </h1> */}
      {/* <div className="flex flex-col items-center justify-center h-full relative z-20">
        <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white bg-transparent">
          Build great products
        </h1>
      </div> */}
    </div>
  );
}
