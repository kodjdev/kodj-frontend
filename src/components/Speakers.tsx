import { SpeakerCard } from "../components/ui/guest-card";
import { Speaker } from "../types";

interface SpeakerGridProps {
  speakers: Speaker[];
}

export default function Speakers({ speakers }: SpeakerGridProps) {
  return (
    <div className="container mx-auto py-8">
      {/* <h2 className="text-3xl font-bold text-center mb-6">Speakers</h2> */}
      <h3 className="text-3xl text-blue-600 font-bold mb-5 mt-3">Speakers: </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {speakers.map((speaker, index) => (
          <SpeakerCard
            key={index}
            name={speaker.name}
            position={speaker.position}
            expertises={speaker.expertises}
            linekdinUrl={speaker.linekdinUrl}
            speakerImg={speaker.speakerImg}
          />
        ))}
      </div>
    </div>
  );
}
