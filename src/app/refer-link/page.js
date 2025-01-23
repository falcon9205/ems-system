"use client";

import { useLogin } from "@/store/login";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ReferAndEarn() {
  const [referralLink, setReferralLink] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [data, setData] = useState({
    clicks: 0,
    register: 0,
    points: 0,
  });

  const router = useRouter();
  const { user_ID } = useLogin((state) => ({
    user_ID: state.user_ID,
  }));

  // Generate referral link
  const handleGenerateLink = async () => {
    try {
      setIsGenerating(true);
      const link = `https://www.ilearningscareer.com/Login/?ref=${user_ID}`;
      setReferralLink(link);
    } catch (error) {
      console.error("Error generating link:", error);
      showToastMessage("Failed to generate referral link");
    } finally {
      setIsGenerating(false);
    }
  };

  // Copy referral link to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      showToastMessage("Referral link copied to clipboard!");
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      showToastMessage("Failed to copy link");
    }
  };

  // Share referral link
  const shareLink = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Join me!",
          text: "Check out this awesome platform!",
          url: referralLink,
        });
        showToastMessage("Referral link shared successfully!");
      } else {
        await copyToClipboard();
      }
    } catch (error) {
      console.error("Error sharing link:", error);
      showToastMessage("Failed to share link");
    }
  };

  // Fetch referral data
  const fetchData = async () => {
    if (!user_ID) {
      console.error("No user_ID found");
      return;
    }

    try {
      const res = await fetch(`/api/referal-links?user_ID=${user_ID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": `${process.env.NEXT_PUBLIC_FRONTEND}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch referral data");
      }

      const responseData = await res.json();
      console.log("Referral data:", responseData.data);
      setData(responseData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      showToastMessage("Failed to fetch referral data");
    }
  };

  // Show toast notification
  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Fetch referral data on component mount
  useEffect(() => {
    if (!user_ID) {
      router.push("/Login");
    } else {
      fetchData();
    }
  }, [user_ID]);

  return (
    <div className="min-h-screen p-4 md:p-8 my-24">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 px-4 py-2 rounded shadow">
          {toastMessage}
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-100">Refer & Earn</h1>
          <p className="text-lg text-gray-400">
            Share with friends and earn rewards together!
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* How It Works */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">How it works</h2>
            <p className="mb-6">Three simple steps to earn rewards</p>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-200 rounded-full">
                  <span className="text-blue-700 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-black">Share your link</h3>
                  <p className="text-sm text-gray-800">
                    Generate and share your unique referral link
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-200 rounded-full">
                  <span className="text-blue-700 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-black">Friends join</h3>
                  <p className="text-sm text-gray-800">
                    Your friends sign up using your referral link
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-200 rounded-full">
                  <span className="text-blue-700 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-black">Earn rewards</h3>
                  <p className="text-sm text-gray-800">
                    Both you and your friends get exclusive rewards
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Referral Link */}
          <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-black shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Your Referral Link</h2>
            <p className="mb-6">Generate and share your unique link.</p>
            {referralLink ? (
              <>
                <div className="flex space-x-2 mb-4">
                  <input
                    type="text"
                    value={referralLink}
                    readOnly
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-300"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                  >
                    Copy
                  </button>
                </div>
                <button
                  onClick={shareLink}
                  className="w-full px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                >
                  Share Link
                </button>
              </>
            ) : (
              <button
                onClick={handleGenerateLink}
                disabled={isGenerating}
                className={`w-full px-4 py-2 rounded ${
                  isGenerating
                    ? "bg-black text-gray-400 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-900"
                }`}
              >
                {isGenerating ? "Generating..." : "Generate Referral Link"}
              </button>
            )}
          </div>
        </div>

        {/* Rewards Section */}
        <div className="bg-slate-600 text-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Your Rewards</h2>
          <p className="mb-6">Track your referral rewards</p>
          <div className="grid gap-4 md:grid-cols-3">
            {/* Total Clicks */}
            <div className="p-4 bg-white text-white bg-opacity-20 rounded-lg text-center">
              <div className="text-3xl font-bold">
                {data?.clicks > 0 ? data.clicks : 0}
              </div>
              <div className="text-sm">Total Clicks</div>
            </div>

            {/* Register */}
            <div className="p-4 bg-white text-white bg-opacity-20 rounded-lg text-center">
              <div className="text-3xl font-bold">
                {data?.register > 0 ? data.register : 0}
              </div>
              <div className="text-sm">Register</div>
            </div>

            {/* Points */}
            <div className="p-4 bg-white text-white bg-opacity-20 rounded-lg text-center">
              <div className="text-3xl font-bold">
                {data?.points > 0 ? data.points : 0}
              </div>
              <div className="text-sm">Points</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
