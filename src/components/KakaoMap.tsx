import React, { useEffect, useRef, useState } from "react";

interface KakaoMapProps {
  address: string; 
  eventRoom?: string;
}

const KakaoMap: React.FC<KakaoMapProps> = ({ address, eventRoom }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadKakaoScript = () => {
      if (document.getElementById("kakao-map-script")) {
        setIsScriptLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.id = "kakao-map-script";
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_APP_KEY}&autoload=true&libraries=services`;
      script.async = true;

      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          console.log("Kakao Maps SDK script loaded successfully.");
          setIsScriptLoaded(true);
        } else {
          console.error("Kakao Maps SDK is not available.");
          setError("Kakao Maps SDK is not available.");
        }
      };

      script.onerror = () => {
        console.error("Failed to load Kakao Maps script.");
        setError("Failed to load Kakao Maps script.");
      };

      document.head.appendChild(script);
    };

    loadKakaoScript();
  }, []);

  const initializeMap = () => {
    if (!mapRef.current) {
      console.error("Map container is not available.");
      return;
    }

    if (!window.kakao || !window.kakao.maps) {
      console.error("Kakao Maps SDK is not available.");
      setError("Kakao Maps SDK is not available.");
      return;
    }

    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, (result: any[], status: string) => {
      if (status === window.kakao.maps.services.Status.OK) {
        console.log("Geocoding successful.");
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

        const map = new window.kakao.maps.Map(mapRef.current, {
          center: coords,
          level: 3,
        });

        const marker = new window.kakao.maps.Marker({
          map: map,
          position: coords,
        });

        if (eventRoom) {
          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px;">${eventRoom}</div>`,
          });
          infowindow.open(map, marker);
        }
      } else {
        console.error("Geocoding failed:", status);
        alert("Failed to locate the address on the map.");
      }
    });
  };

  useEffect(() => {
    if (isScriptLoaded) {
      console.log("Initializing Kakao Map.");
      initializeMap();
    }
  }, [isScriptLoaded, address, eventRoom]);

  if (error) {
    // return <div className="text-red-500">Map failed to show: {error}</div>;
    return <div className="text-red-500">Map failed to show !</div>;
  }

  return (
    <div
      id="map"
      ref={mapRef}
      style={{ width: "100%", height: "450px" }}
      className="w-full h-52 sm:h-60 rounded-md overflow-hidden mb-4"
    />
  );
};

export default KakaoMap;
