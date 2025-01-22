import { SpeakerCard } from "@/components/Event/Speakers/SpeakerCard";
import { Speaker } from "../../../types";

interface SpeakerGridProps {
  speakers: Speaker[];
}

export default function Speakers({ speakers }: SpeakerGridProps) {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl text-blue-600 font-bold mb-5 mt-3">Speakers: </h2>
      <div className="flex justify-start">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-10">
          {speakers.map((speaker, index) => (
            <SpeakerCard
              key={index}
              name={speaker.name}
              position={speaker.position}
              linkedinUrl={speaker.linkedinUrl}
              speakerImg={speaker.speakerImg}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
