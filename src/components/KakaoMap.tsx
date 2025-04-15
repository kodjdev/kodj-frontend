import { useEffect, useRef, useState } from "react";

type KakaoMapProps = {
  address: string;
  eventRoom?: string;
};

declare global {
  interface Window {
    kakao: any;
  }
}

/**
 * Kakao Map Component
 * 
 * This will draw the map elements using the kakao map sdk.
 */

export default function KakaoMap({ address, eventRoom }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // kakao script load bo'lganidan keyin mapni initialize qilamiz
    const initMap = () => {
      if (!mapRef.current || !window.kakao?.maps) {
        console.error("Kakao Maps SDK not loaded");
        setError("Map initialization failed");
        return;
      }

      try {
        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, (result: any[], status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            console.log("Geocoding successful");
            const coords = new window.kakao.maps.LatLng(
              result[0].y,
              result[0].x
            );

            const mapOptions = {
              center: coords,
              level: 3,
            };

            const map = new window.kakao.maps.Map(mapRef.current, mapOptions);

            new window.kakao.maps.Marker({
              position: coords,
              map: map,
            });

            const locationContent = document.createElement("div");
            locationContent.innerHTML = `
              <div style="
                background: white;
                padding: 10px 15px;
                border-radius: 5px;
                border: 1px solid #ccc;
                font-size: 13px;
                color: #333;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                margin-bottom: 5px;
                white-space: nowrap;
              ">
                ${address}
              </div>
            `;

            new window.kakao.maps.CustomOverlay({
              content: locationContent,
              map: map,
              position: coords,
              yAnchor: 2.2,
            });

            if (eventRoom) {
              const eventRoomDiv = document.createElement("div");
              eventRoomDiv.innerHTML = `
                <div style="
                  position: absolute;
                  top: 10px;
                  left: 10px;
                  background-color: #dcebff;
                  border-radius: 3px;
                  border: 1px solid #ccc;
                  font-size: 14px;
                  color: #333;
                  padding: 10px;
                  box-shadow: 0 1px 1px rgba(0,0,0,0.1);
                  min-width: 150px;
                  z-index: 9999;
                  display: flex;
                  align-items: center;
                  gap: 6px;
                ">
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM9 11.5C9 10.1193 10.1193 9 11.5 9C12.8807 9 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5ZM11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16C12.3805 16 13.202 15.7471 13.8957 15.31L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L15.31 13.8957C15.7471 13.202 16 12.3805 16 11.5C16 9.01472 13.9853 7 11.5 7Z" fill="#323232"/>
                    </svg>
                  ${eventRoom}
                </div>
              `;

              // we append it to map contayner
              mapRef.current?.appendChild(eventRoomDiv);
            }
          } else {
            console.error("Geocoding failed:", status);
            setError("Failed to locate address");
          }
        });
      } catch (err) {
        console.error("Map initialization error:", err);
        setError("Failed to initialize map");
      }
    };

    // we check if Kakao is loaded, if not wait for it
    if (window.kakao?.maps) {
      initMap();
    } else {
      const checkKakao = setInterval(() => {
        if (window.kakao?.maps) {
          clearInterval(checkKakao);
          initMap();
        }
      }, 100);

      // 5 sekundan keyin clearn qilamiz agar script load bo'lmasa
      setTimeout(() => {
        clearInterval(checkKakao);
        if (!window.kakao?.maps) {
          setError("Kakao Maps failed to load");
        }
      }, 5000);
    }
  }, [address, eventRoom]);

  if (error) {
    return (
      <div className="text-red-500 p-4 border border-red-300 rounded">
        {error}
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className="w-full h-52 sm:h-60 rounded-md overflow-hidden mb-4"
      style={{ width: "100%", height: "450px" }}
    />
  );
}
