import { useEffect, useState } from "react";

const CountdownTimer = () => {
  const totalCountdownTime = 86400; // 24 hours in seconds (86400 seconds)
  const [timeRemaining, setTimeRemaining] = useState(totalCountdownTime); // Remaining time in seconds
  const [loading, setLoading] = useState(true); // Loading state while fetching time

  // Function to fetch current time from World Time API
  const fetchCurrentTime = async () => {
    try {
      const response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
      const data = await response.json();
      const currentTime = new Date(data.datetime).getTime(); // Current time in milliseconds

      const storedStartTime = localStorage.getItem("countdownStartTime");

      if (storedStartTime) {
        // Calculate elapsed time since the countdown started
        const elapsedSeconds = Math.floor((currentTime - storedStartTime) / 1000);
        setTimeRemaining(Math.max(totalCountdownTime - elapsedSeconds, 0)); // Calculate remaining time
      } else {
        // Store the start time in localStorage
        localStorage.setItem("countdownStartTime", currentTime);
      }

      setLoading(false); // Stop loading once the time is fetched
    } catch (error) {
      console.error("Error fetching time:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch current time from the API on mount
    fetchCurrentTime();

    // Set up an interval to decrease the time every second on the frontend
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          // Stop the countdown when it reaches 0
          clearInterval(interval); // Stop the interval
          return 0; // Set timeRemaining to 0
        }
        return prevTime - 1; // Decrease the time by 1 second
      });
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Convert seconds to HH:MM:SS format
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="text-center font-bold mt-[20%] w-2/3 md:w-[50%] md:py-2 rounded-t-full text-xs md:text-4xl gap-x-1 md:mt-20 bg-[#FADB0E] flex mx-auto justify-center">
        <h1 className="text-pink-700">Hurry! Offer ends soon! :</h1>
        <h2 className="text-gray-700">{formatTime(timeRemaining)}</h2>
        {timeRemaining === 0 && <p>Sales End</p>}
      </div>
    </>
  );
};

export default CountdownTimer;
