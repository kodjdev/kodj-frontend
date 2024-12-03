import { SpeakerCard } from "../components/ui/guest-card";

export interface Speaker  {
    name: string;
    role: string;
    expertises: string[];
    imageUrl: string;
    linkedIn?: string;
    date?: string;
    description?: string;
    authorImg?: string;
    author ?: string;
  };
  
  interface SpeakerGridProps  {
    speakers: Speaker[];
  };
  

export default function Speakers({speakers}: SpeakerGridProps) {
  return (
     <div className="container mx-auto py-8">
      {/* <h2 className="text-3xl font-bold text-center mb-6">Speakers</h2> */}
      <h3 className="text-3xl text-blue-600 font-bold mb-5 mt-3">Speakers: </h3> 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {speakers.map((speaker, index) => 
          <SpeakerCard
            key={index}
            name={speaker.name}
            role={speaker.role}
            expertises={speaker.expertises}
            imageUrl={speaker.imageUrl}
            linkedIn={speaker.linkedIn}
            date={speaker.date}
            description={speaker.description}
            authorImg={speaker.authorImg}
          />
        )}
      </div>
    </div>
  );
}
