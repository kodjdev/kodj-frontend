import { useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import BenefitsSection from "../../components/Community";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  useEffect(() => {
    // initalize the ScrollTrigger
    gsap.utils.toArray(".revealUp").forEach((elem) => {
      ScrollTrigger.create({
        trigger: elem as Element,
        start: "top 80%",
        end: "bottom 20%",
        markers: true,
        onEnter: () => {
          gsap.fromTo(
            elem as Element,
            { y: 100, autoAlpha: 0 },
            {
              duration: 1.25,
              y: 0,
              autoAlpha: 1,
              ease: "back",
              overwrite: "auto",
            }
          );
        },
        onLeave: () => {
          gsap.fromTo(
            elem as Element,
            { autoAlpha: 1 },
            { autoAlpha: 0, overwrite: "auto" }
          );
        },
        onEnterBack: () => {
          gsap.fromTo(
            elem as Element,
            { y: -100, autoAlpha: 0 },
            {
              duration: 1.25,
              y: 0,
              autoAlpha: 1,
              ease: "back",
              overwrite: "auto",
            }
          );
        },
        onLeaveBack: () => {
          gsap.fromTo(
            elem as Element,
            { autoAlpha: 1 },
            { autoAlpha: 0, overwrite: "auto" }
          );
        },
      });
    });
  }, []);

  return (
    <div>
      <BenefitsSection />
    </div>
  );
}
