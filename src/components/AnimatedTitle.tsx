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
    <div
      ref={titleRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="cursor-pointer text-2xl md:text-3xl font-bold py-4 px-6 md:px-12 text-white"
    >
      KO&apos;DJ
    </div>
  );
};

export default AnimatedTitle;

