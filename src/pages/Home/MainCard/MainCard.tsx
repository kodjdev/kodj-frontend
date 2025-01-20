import React from "react";
import { cn } from "../../../lib/utils";
import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { FlipTitle } from "../../../components/FlipTitle";
import { useTranslation } from "react-i18next";
import { QrcodeCard } from "./QrcodeCard";

export function MainCard() {
  const { t } = useTranslation();

  const features = [
    {
      title: t("featuresSection.feature1.title"),
      description: t("featuresSection.feature1.description"),
      skeleton: <QrcodeCard />,
      className:
        "col-span-1 lg:col-span-3 lg:border-r  dark:border-neutral-500",
    },
    {
      title: t("featuresSection.feature2.title"),
      description: t("featuresSection.feature2.description"),
      skeleton: <SkeletonFour />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-none",
    },
  ];
  return (
    <div className="abosolute z-10 max-w-9xl mx-auto">
      <div className="px-8 relative z-10">
        {/* <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative bg-transparent mt-20 p-5 whitespace-normal sm:whitespace-nowrap overflow-hidden">
          <FlipTitle />
          </h1> */}
        <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative bg-transparent mt-10 whitespace-normal overflow-hidden mt-[-15px] mb-[25px] z-10"> {/* Added z-10 */}
        <FlipTitle />
        </h1>
        <h4 className="text-2xl lg:text-2xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black text-white">
          {t("headingTitle")}
        </h4>
      </div>

      <div className="relative mb-[50px]">
        <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-md border border-[#505050] ">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className=" h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className=" max-w-5xl mx-auto text-left tracking-tight text-white dark:text-white text-xl md:text-2xl md:leading-snug">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        "text-sm md:text-base  max-w-4xl text-left mx-auto",
        "text-neutral-500 text-center font-normal text-white",
        "text-left max-w-sm mx-0 md:text-sm my-2"
      )}
    >
      {children}
    </p>
  );
};

export const SkeletonFour = () => {
  return (
    <div className="h-60 md:h-60  flex flex-col items-center relative bg-transparent dark:bg-transparent mt-10">
      <Globe className="absolute -right-10 md:-right-10 -bottom-80 md:-bottom-72" />
    </div>
  );
};

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        // longitude latitude
        { location: [37.7595, -122.4367], size: 0.1 },
        { location: [35.9078, 127.7669], size: 0.1 },
        { location: [41.2995, 69.2401], size: 0.1 },
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.01;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      className={className}
    />
  );
};
