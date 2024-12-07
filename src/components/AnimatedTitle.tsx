import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const AnimatedTitle: React.FC = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const animation = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('gsap/TextPlugin').then(({ TextPlugin }) => {
        gsap.registerPlugin(TextPlugin);

        if (titleRef.current) {
          animation.current = gsap.to(titleRef.current, {
            duration: 1,
            text: "Koreya O'zbek Dasturchilari Jamiyati",
            ease: 'power2.inOut',
            paused: true,
          });
        }
      });
    }
  }, []);

  const handleMouseEnter = () => {
    animation.current?.play();
  };

  const handleMouseLeave = () => {
    animation.current?.reverse();
  };

  return (
    <div className="flex justify-center items-center overflow-hidden">
      <div className="text-pink-500 font-bold text-3xl sm:text-4xl">
        {'>'}
      </div>
      <div
        ref={titleRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        // className="cursor-pointer text-4xl md:text-4xl font-bold py-4 px-6 md:px-12 text-white"
        className="cursor-pointer text-3xl sm:text-4xl font-bold py-2 px-4 sm:py-4 sm:px-6 text-white whitespace-nowrap"
      >
        KO&apos;DJ
      </div>
    </div>
  );
};

export default AnimatedTitle;

