import React from "react";
import KakaoMap from "@/components/KakaoMap";

interface RightSideDetailsProps {
  imageSource: string;
  title: string;
  formattedDate: string;
  organizer: string;
  eventLocation: string;
  eventRoom: string;
}

const RightSideDetails: React.FC<RightSideDetailsProps> = ({
  imageSource,
  title,
  formattedDate,
  organizer,
  eventLocation,
  eventRoom,
}) => {
  return (
    <div className="w-full md:w-1/2 bg-opacity-80 max-w-lg">
      <div className="w-full max-w-md p-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden hover:shadow-blue-900/20 transition-all duration-300">
        <img
          src={imageSource}
          alt={title}
          className="w-full h-40 sm:h-60 object-cover rounded-lg mb-4 sm:mb-6"
          width={500}
          height={500}
        />
        <h2 className="text-2xl font-bold text-blue-400 mb-5">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 text-lg text-gray-700">
          <div className="flex flex-col">
            <strong className="text-md text-blue-400 mb-1">Date:</strong>
            <p className="text-sm text-white">{formattedDate}</p>
          </div>
          <div className="flex flex-col">
            <strong className="text-md text-blue-400 mb-1">Organizer:</strong>
            <p className="text-sm text-white">{organizer}</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="w-full h-52 rounded-md overflow-hidden mb-4">
            <KakaoMap address={eventLocation} eventRoom={eventRoom} />
            <a
              href={`https://map.kakao.com/link/search/${encodeURIComponent(
                eventLocation
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mr-3 mb-3 text-blue-500 hover:underline"
            >
              View on Kakao Map
            </a>
          </div>
          <div className="flex flex-col">
            <strong className="text-blue-400 mb-1">Location:</strong>
            <p className="text-sm text-gray-300 font-bold mb-1">
              {eventLocation}
            </p>
            <p className="text-sm text-gray-500">{eventRoom}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSideDetails;
