import { useEffect, useState } from "react";

const EmailVerified = () => {
  const [message, setMessage] = useState("Verifying...");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const checkVerificationStatus = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (!token) {
        setMessage("❌ Invalid verification link!");
        return;
      }

      try {
        const response = await fetch(
          `https://api.ezitech.org/verify-email-status?token=${token}`
        );
        const data = await response.json();

        if (data.success) {
          setVerified(true);
          setMessage("✅ Email Verified Successfully!");

          // Store in localStorage so the form can read it
          localStorage.setItem("emailVerified", "true");
        } else {
          setVerified(false);
          setMessage("❌ Email Verification Failed!");
        }
      } catch (error) {
        setMessage("⚠️ Something went wrong!");
      }
    };

    checkVerificationStatus();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{message}</h2>
      <p>You can now close this tab and return to the form.</p>
    </div>
  );
};

export default EmailVerified;
