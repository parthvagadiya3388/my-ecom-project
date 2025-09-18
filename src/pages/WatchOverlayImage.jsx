import React, { useEffect, useState } from "react";

export default function WatchOverlayImage() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds() * 6; // 360/60
  const minutes = time.getMinutes() * 6 + time.getSeconds() * 0.1;
  const hours = ((time.getHours() % 12) / 12) * 360 + time.getMinutes() * 0.5;

  return (
    <div className="relative">
      {/* Watch Image */}
      <img
        src="https://images.pexels.com/photos/3766111/pexels-photo-3766111.jpeg?cs=srgb&dl=pexels-alexazabache-3766111.jpg&fm=jpg"
        alt="Watch"
        className="w-full h-full object-cover rounded-lg shadow-md"
      />

      {/* Clock Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="watch_c w-32 h-32 relative rounded-full border-0 border-gray-800 bg-transparent">
          {/* Hour hand */}
          <div
            className="absolute w-1 h-10 bg-amber-600 top-8 left-1/2 origin-bottom"
            style={{ transform: `rotate(${hours}deg)` }}
          />
          {/* Minute hand */}
          <div
            className="absolute w-1 h-14 bg-red-600 top-4 left-1/2 origin-bottom"
            style={{ transform: `rotate(${minutes}deg)` }}
          />
          {/* Second hand */}
          <div
            className="absolute w-0.5 h-16 bg-red-500 top-0 left-1/2 origin-bottom"
            style={{ transform: `rotate(${seconds}deg)` }}
          />
          {/* Center dot */}
          <div className="absolute w-3 h-3 bg-black rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
    </div>
  );
}
