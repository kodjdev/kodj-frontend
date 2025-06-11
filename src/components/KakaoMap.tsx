/* eslint-disable */
/* @ts-nocheck */

import { useEffect, useRef, useState } from 'react';

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
 * KakaoMap - Util Map Component
 *
 * This component initializes a Kakao map and displays a marker at the specified address.
 * It also shows an optional event room name on the map.
 *
 * @param {string} address - Address to be displayed on the map
 * @param {string} [eventRoom] - Optional event room name to be displayed on the map
 */
export default function KakaoMap({ address, eventRoom }: KakaoMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // kakao script load bo'lganidan keyin mapni initialize qilamiz
        const initMap = () => {
            if (!mapRef.current || !window.kakao?.maps) {
                console.error('Kakao Maps SDK not loaded');
                setError('Map initialization failed');
                return;
            }

            try {
                const geocoder = new window.kakao.maps.services.Geocoder();

                geocoder.addressSearch(address, (result: any[], status: any) => {
                    if (status === window.kakao.maps.services.Status.OK) {
                        console.log('Geocoding successful');
                        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

                        const mapOptions = {
                            center: coords,
                            level: 3,
                        };

                        const map = new window.kakao.maps.Map(mapRef.current, mapOptions);

                        new window.kakao.maps.Marker({
                            position: coords,
                            map: map,
                        });

                        const locationContent = document.createElement('div');
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
                    } else {
                        console.error('Geocoding failed:', status);
                        setError('Failed to locate address');
                    }
                });
            } catch (err) {
                console.error('Map initialization error:', err);
                setError('Failed to initialize map');
            }
        };

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
                    setError('Kakao Maps failed to load');
                }
            }, 5000);
        }
    }, [address, eventRoom]);

    if (error) {
        return <div className="text-red-500 p-4 border border-red-300 rounded">{error}</div>;
    }

    return (
        <div
            ref={mapRef}
            className="w-full h-52 sm:h-60 rounded-md overflow-hidden mb-4"
            style={{ width: '100%', height: '450px' }}
        />
    );
}
