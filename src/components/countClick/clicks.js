import { useEffect, useState } from "react";

const Clicks = () => {
  const [queryValue, setQueryValue] = useState("");

  const updateData = async () => {
    const res = await fetch(`/api/referal-links`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Custom-Header": `${process.env.NEXT_PUBLIC_FRONTEND}`,
      },
      body: JSON.stringify({ queryValue }),
    });

    const data = await res.json();
    console.log("referal:", data);
  };

  useEffect(() => {
    // Ensure code is running on the client side
    if (typeof window !== "undefined") {
      const q = window.location.href;
      const queryString = q.split('=')[1];
      console.log(queryString);

      setQueryValue(queryString); // Set the extracted query value to state
    }
  }, []); // Only run on mount

  useEffect(() => {
    if (queryValue) {
      updateData(); // Call updateData once queryValue is updated
    }
  }, [queryValue]); // Runs whenever queryValue changes

  return (
    <div>
      <h1>Query Parameter Extraction</h1>
      <p><strong>Value of 'q':</strong> {queryValue || "No 'q' parameter found"}</p>
    </div>
  );
};

export default Clicks;
