// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import ScrollTrigger from "gsap/dist/ScrollTrigger";
// import AnimatedTitle from "@/components/AnimatedTitle";
// import { LuGoal } from "react-icons/lu";
// import { Benefits } from "./Benefits";
// import { Mission } from "./Mission";
// import { Organizers } from "./Organizers";

// gsap.registerPlugin(ScrollTrigger);

// export default function About() {
//   const sectionRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     // initalize the ScrollTrigger
//     gsap.utils.toArray(".revealUp").forEach((elem) => {
//       ScrollTrigger.create({
//         trigger: elem as Element,
//         start: "top 80%",
//         end: "bottom 20%",
//         markers: true,
//         onEnter: () => {
//           gsap.fromTo(
//             elem as Element,
//             { y: 100, autoAlpha: 0 },
//             {
//               duration: 1.25,
//               y: 0,
//               autoAlpha: 1,
//               ease: "back",
//               overwrite: "auto",
//             }
//           );
//         },
//         onLeave: () => {
//           gsap.fromTo(
//             elem as Element,
//             { autoAlpha: 1 },
//             { autoAlpha: 0, overwrite: "auto" }
//           );
//         },
//         onEnterBack: () => {
//           gsap.fromTo(
//             elem as Element,
//             { y: -100, autoAlpha: 0 },
//             {
//               duration: 1.25,
//               y: 0,
//               autoAlpha: 1,
//               ease: "back",
//               overwrite: "auto",
//             }
//           );
//         },
//         onLeaveBack: () => {
//           gsap.fromTo(
//             elem as Element,
//             { autoAlpha: 1 },
//             { autoAlpha: 0, overwrite: "auto" }
//           );
//         },
//       });
//     });
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 p-10 text-gray-200 rounded-lg">
//       <div className="container mx-auto py-10 px-6 max-w-6xl">
//         <div className="flex flex-col text-center mb-12">
//           <div className="pb-5">
//             <AnimatedTitle />
//           </div>
//           <h2 className="text-left text-4xl font-bold text-blue-400 mb-6">
//             Who is{" "}
//             <span className="text-4xl font-bold text-blue-600 mb-6 bg-gray-200">
//               &nbsp;KO'DJ&nbsp;
//             </span>
//             ?
//           </h2>
//           <p className="text-left text-gray-400 text-lg">
//             At KO&apos;DJ, we are passionate about creating a thriving developer
//             community in Uzbekistan. Our events are designed to empower
//             developers, inspire creativity, and foster collaboration.
//             <p className="text-left text-blue-500 text-lg hover:text-gray-500 mt-4">
//               <LuGoal className="inline-block text-1xl mr-2 mt-1 mb-2" />
//               We strongly believe that the best way to learn is by doing, and
//               our events are designed to provide hands-on experience and
//               practical knowledge that can be applied in real-world scenarios.
//             </p>
//           </p>
//         </div>
//         <Mission />
//         <Benefits sectionRef={sectionRef} />
//         <Organizers />
//       </div>
//     </div>
//   );
// }
