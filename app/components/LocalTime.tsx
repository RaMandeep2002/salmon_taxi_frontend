import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function ServerTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    socket.on("serverTime", (serverTime: string) => {
      setTime(serverTime);
    });

    return () => {
      socket.off("serverTime");
    };
  }, []);

  return (
    <div className="text-lg font-medium text-white">
      Time (Live): {time}
    </div>
  );
}