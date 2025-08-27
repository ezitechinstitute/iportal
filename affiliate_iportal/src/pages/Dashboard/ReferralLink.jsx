import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import {
  Copy,
  CheckCircle,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  MessageSquare,
  TrendingUp,
  Calendar,
  Star,
} from "lucide-react";

const ReferralLink = () => {
  const [copied, setCopied] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [stats, setStats] = useState({ successfulSignups: 0 });
  const [loading, setLoading] = useState(true);
  const [referralHistory, setReferralHistory] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("affiliateToken");

    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch referral link + stats
    fetch("http://localhost:8088/api/affiliate/referral-link", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized or server error");
        return res.json();
      })
      .then((data) => {
        setReferralCode(data.referralCode);
        setReferralLink(data.referralLink);
        setStats(data.stats || { successfulSignups: 0 });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching referral data:", error);
        localStorage.removeItem("affiliateToken");
        navigate("/login");
      });

    // Fetch recent referred interns (limit 3)
    fetch("http://localhost:8088/api/affiliate/recent-interns", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setReferralHistory(data.results || []);
      })
      .catch((err) => {
        console.error("Failed to fetch recent referrals", err);
      }
      );
  }, [navigate]);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform) => {
    const message = `Join Ezitech's amazing internship program! Use my referral link: ${referralLink}`;
    const encodedMessage = encodeURIComponent(message);

    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedMessage}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`,
      email: `mailto:?subject=Join Ezitech Internship&body=${encodedMessage}`,
      whatsapp: `https://wa.me/?text=${encodedMessage}`,
    };

    if (urls[platform]) {
      window.open(urls[platform], "_blank");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen p-4 md:p-8 animate-fadeIn">
        <div className="max-w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Referral Link Card */}
            <div className="bg-white rounded-md shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Share2 className="text-[#9086F3] mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Your Referral Link
                </h2>
              </div>
              <div className="bg-[#9086F3] rounded-md p-4 mb-4 text-center">
                <p className="text-white text-sm opacity-90">Your Referral Code</p>
                <p className="text-white text-2xl font-bold">{referralCode}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                            className="flex-1 px-4 py-2 border rounded-md text-sm text-gray-700 border-gray-300 focus:shadow-md focus:outline-none focus:border-[#9086F3]"
                />
                <button
                  onClick={handleCopy}
                  className="bg-[#9086F3] hover:bg-[#7f74f0] text-white px-5 py-3 rounded-md flex items-center justify-center text-sm"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="mr-2 w-5 h-5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 w-5 h-5" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div>
                <p className="text-gray-600 mb-2 text-sm">Share via:</p>
                <div className="grid grid-cols-2 sm:flex gap-2 flex-wrap">
                  <button onClick={() => handleShare("twitter")} className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-2 rounded text-xs flex items-center"><Twitter className="mr-1" /> Twitter</button>
                  <button onClick={() => handleShare("facebook")} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs flex items-center"><Facebook className="mr-1" /> Facebook</button>
                  <button onClick={() => handleShare("linkedin")} className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-2 rounded text-xs flex items-center"><Linkedin className="mr-1" /> LinkedIn</button>
                  <button onClick={() => handleShare("email")} className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded text-xs flex items-center"><Mail className="mr-1" /> Email</button>
                  <button onClick={() => handleShare("whatsapp")} className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-xs flex items-center col-span-2 sm:col-span-1"><MessageSquare className="mr-1" /> WhatsApp</button>
                </div>
              </div>
            </div>

            {/* Referral History */}
            <div className="bg-white rounded-md shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <TrendingUp className="mr-2 text-[#9086F3]" />
                  Recent Referrals
                </h3>
                <span className="text-sm text-gray-500">
                  {referralHistory.length} total
                </span>
              </div>
              <div className="space-y-3">
                {referralHistory.map((referral) => (
                  <div key={referral.id} className="border rounded-md p-3 hover:bg-gray-50 transition">
                    {/* Desktop */}
                    <div className="hidden sm:flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800">{referral.name}</p>
                        <p className="text-sm text-gray-500">{referral.email}</p>
                      </div>
                      <div className="text-sm text-gray-600 flex items-center">
                        <Calendar className="mr-1 w-4 h-4" />
                        {referral.date}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${referral.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                        {referral.status}
                      </span>
                    </div>

                    {/* Mobile */}
                    <div className="sm:hidden space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-800">{referral.name}</p>
                          <p className="text-xs text-gray-500">{referral.email}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${referral.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                          {referral.status}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="mr-1 w-3 h-3" />
                          {referral.date}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-md shadow-lg p-6">
              <Star className="text-yellow-500 text-3xl mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-center text-gray-800">Referral Rewards</h3>
              <div className="space-y-3 mt-4">
                <div className="flex justify-between items-center bg-blue-50 p-3 rounded-md">
                  <span className="text-gray-700 text-sm">Per Successful Referral</span>
                  <span className="font-bold text-[#9086F3]">10%</span>
                </div>
                <div className="flex justify-between items-center bg-green-50 p-3 rounded-md">
                  <span className="text-gray-700 text-sm">Bonus (10+ referrals)</span>
                  <span className="font-bold text-green-600">15%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-md shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Progress to Bonus</h3>
              <div className="text-center text-2xl font-bold text-[#9086F3] mb-2">
                {stats.successfulSignups} <span className="text-gray-500">/ 10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div className="bg-[#9086F3] h-3 rounded-full transition-all duration-300" style={{ width: `${(stats.successfulSignups / 10) * 100}%` }} />
              </div>
              <p className="text-sm text-gray-600 text-center">
                {10 - stats.successfulSignups} more referrals to unlock $100 bonus!
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#9086F3] to-[#8174f3] rounded-md shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-3">💡 Referral Tips</h3>
              <ul className="text-sm space-y-1">
                <li>• Share on social media for better reach</li>
                <li>• Personalize your message</li>
                <li>• Target people interested in tech</li>
                <li>• Follow up with pending referrals</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReferralLink;
