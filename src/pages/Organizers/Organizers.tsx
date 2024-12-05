import { FaPeopleGroup } from 'react-icons/fa6';
import { GoGoal } from 'react-icons/go';
import sardorImage from '../../assets/avatars/sardor.png';
import behzodImage from '../../assets/avatars/bekhzod.png';

const organizers = [
  {
    name: "Sardor Madaminov",
    title: "Co-Founder & Organizer",
    description: "Passionate about organizing events that bring people together to share ideas and innovate, with a focus on building a strong community.",
    imageUrl: sardorImage,
    githubUrl: "https://github.com/Sardor-M",
    jobtags : "Software Developer",
  },
  {
    name: "Behzod Halil",
    title: "Founder & Organizer",
    description: "Dedicated to fostering a welcoming and inclusive environment for all attendees, speakers, and sponsors. Building a community of learners and creators.",
    imageUrl: behzodImage,
    githubUrl: "https://github.com/behzodhalil",
    jobtags : "Andoroid Developer",
  },
];

export default function Organizers() {
    return (
      <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 p-8 text-gray-200 rounded-lg">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex flex-col text-center mb-12">
            <h1 className="text-left text-4xl font-bold text-blue-400 mb-4"> 
                <FaPeopleGroup className="inline-block text-4xl mr-2 mb-2" />
                Event Organizers:
                </h1>
            <p className="text-left text-gray-400">
              Behind every successful event is a team of dedicated individuals. Get to know the people making it all happen.
            </p>
          </div>
          {/* Organizers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {organizers.map((organizer, index) => (
                <a
                    key={index}
                    href={organizer.githubUrl} // we link to the organizer's github
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                >
                    <div
                        key={index}
                        className="bg-gray-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300  transition-shadow duration-300 flex flex-col items-start h-full cursor-pointer group"
                    >
                        <div className="flex flex-col sm:flex-row items-start">
                            <div className="relative w-28 h-28 mr-4 rounded-full overflow-hidden bg-white flex-shrink-0">
                            {/* <div className="relative w-28 h-28 mr-4 rounded-full overflow-hidden bg-white flex-shrink-0 sm:w-28 sm:h-28">  */}
                            <img
                                src={organizer.imageUrl}
                                alt={organizer.name}
                                // layout="fill"
                                width={116}
                                height={116}
                                // objectFit="cover" // we ensure the image scales properly
                                className="rounded-full" // we keep corners rounded for a clean look
                            />
                            </div>
                            <div className="flex flex-col">
                                <h2 
                                    className="text-xl font-bold text-blue-400 text-left mb-2 whitespace-nowrap truncate"
                                    title={organizer.name}  
                                >
                                   {organizer.name}
                                </h2>
                                <h3 className="text-sm text-gray text-left mb-2 font-bold">{organizer.title}</h3>
                                <div className='flex flex-wrap gap-1 mt-auto'>
                                    {/* {organizer.jobtags.map((jobag, index) => ( */}
                                        <span key={index} className="text-left text-[10px] text-gray-300 mt-4 px-2 py-1 rounded-full bg-gray-700 break-words"> 👨🏻‍💻 {organizer.jobtags}</span>
                                    {/* ))} */}
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-400 text-left overflow-hidden text-ellipsis">{organizer.description}</p>
                        </div>
                    </div>
                </a>
            ))}
            {/* // empty placeholder grid */}
            {Array.from({ length: 3 - (organizers.length % 3) }).map((_, index) => (
                <div
                  key={`placeholder-${index}`}
                  className="bg-gray-700 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex justify-center items-center cursor-pointer group"
                >
                  <div className="text-center">
                      <p className="text-lg font-bold text-gray-400 group-hover:hidden">
                          We hope to grow our community leaders soon 🌱
                      </p>
                      <p className="text-lg font-bold text-blue-400 hidden group-hover:block">
                          Future Community Organizers 🌱
                      </p>
                  </div>
                </div>
            ))}
            </div>
          {/* Mission Section */}
          <div className="bg-gray-800 p-8 rounded-3xl shadow-lg mt-12">
            <h2 className="text-3xl font-bold text-blue-400 mb-4">
                <GoGoal className="inline-block text-3xl mr-2 mb-2" />
                Our Mission
                </h2>
            <p className="text-gray-400">
              Our mission is to create a platform for collaboration, learning, and inspiration. We believe in the power of
              community and innovation to drive positive change. Join us as we work together to make a difference.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  