import React, { useEffect, useRef, useState } from "react";

interface KakaoMapProps {
  address: string;
  eventRoom?: string;
}

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap: React.FC<KakaoMapProps> = ({ address, eventRoom }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // kakao sscript load bo'lganidan keyin mapni initialize qilamiz
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

            const marker = new window.kakao.maps.Marker({
              position: coords,
              map: map,
            });

            if (eventRoom) {
              const infowindow = new window.kakao.maps.InfoWindow({
                content: `<div style="padding:5px;">${eventRoom}</div>`,
              });
              infowindow.open(map, marker);
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
};

export default KakaoMap;
