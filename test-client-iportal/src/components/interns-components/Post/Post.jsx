import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import InternTopbar from "../InternTopbar/InternTopbar";
import InternSidebar from "../InternSidebar";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import backgroundImage from "../../../assets/welcome_post.png"; // Ensure this path is correct
import { Footer } from "../../Footer";

const Post = () => {
  const navigate = useNavigate();
  const postRef = useRef(); // Ref to capture the post image and user details
  const [user, setUser] = useState({
    image: null,
    name: "Loading...",
    technology: "Loading...",
    joinDate: "Loading...",
  });

  const checkLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const email = sessionStorage.getItem("email");

  

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get("https://api.ezitech.org/get-int-post", {
          params: { email: email },
        });

        if (res.data) {
          setUser({
            image: res.data.image,
            name: res.data.name,
            technology: res.data.technology,
            joinDate: new Date(res.data.joinDate).toLocaleDateString(),
          });
        }
      } catch (err) {
        console.error("Error fetching intern details:", err);
      }
    };

    if (email) {
      fetchUserDetails();
    }
  }, [email]);

  // Function to download profile card as PDF
  const downloadPDF = () => {
    const input = postRef.current;

    // Use html2canvas to capture the post image and user details
    html2canvas(input, { scale: 3, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Create a new PDF instance
      const pdf = new jsPDF("p", "mm", "a4"); // Portrait, A4 size
      const pdfWidth = pdf.internal.pageSize.getWidth(); // Width of A4 (210mm)
      const pdfHeight = pdf.internal.pageSize.getHeight(); // Height of A4 (297mm)

      // Calculate the aspect ratio of the image
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const aspectRatio = imgWidth / imgHeight;

      // Calculate the dimensions to fit the image within the PDF page
      let imgFitWidth = pdfWidth; // Default to full width
      let imgFitHeight = pdfWidth / aspectRatio; // Adjust height based on aspect ratio

      // If the calculated height exceeds the PDF height, adjust dimensions
      if (imgFitHeight > pdfHeight) {
        imgFitHeight = pdfHeight;
        imgFitWidth = pdfHeight * aspectRatio;
      }

      // Add the image to the PDF, centered on the page
      const x = (pdfWidth - imgFitWidth) / 2; // Center horizontally
      const y = (pdfHeight - imgFitHeight) / 2; // Center vertically
      pdf.addImage(imgData, "PNG", x, y, imgFitWidth, imgFitHeight);

      // Save the PDF
      pdf.save(`${user.name || "post"}.pdf`);
    });
  };

  // Function to download profile card as Image (PNG)
  const downloadImage = () => {
    const input = postRef.current;
    html2canvas(input, { scale: 3, useCORS: true }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${user.name || "post"}.png`;
      link.click();
    });
  };

  return (
    <>
      <InternTopbar />
      <InternSidebar />
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body mt-3">
            {/* Background image and user details container */}
            <div
              ref={postRef} // Attach the ref to this div
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "contain", // Ensure the full image is visible
                backgroundRepeat: "no-repeat", // Prevent repeating the image
                backgroundPosition: "center",
                width: "100%", // Full width of the container
                height: "70vh",
                display: "flex",
                flexDirection: "column", // Stack children vertically
                justifyContent: "flex-start", // Align items to the top
                alignItems: "center", // Center items horizontally
                position: "relative", // For positioning the image and text
              }}
            >
              {/* User image at the top */}
              <div
                style={{
                  marginTop: "197px",
                  marginLeft: "12px", // Adjust this value to position the image
                  textAlign: "center",
              
                }}
              >
                <img
                  src={user.image}
                  alt=""
                  sizes="certain"
                  style={{
                    borderRadius: "50%",
                    width: "174px", // Fixed size for better control
                    height: "175px", // Fixed size for better control
                    objectFit: "cover", // Ensure the image covers the area
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Add a subtle shadow
                  }}
                />
              </div>

              {/* User details at the bottom */}
              <div
                style={{
                  textAlign: "center",
                  position: "absolute",
                  bottom: "20px", // Adjust this value to position the text
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "#333", // Darker text for better readability
                  padding: "10px 20px",
                  borderRadius: "10px",
                }}
              >
                <h1 style={{ margin: "0", fontSize: "22px", fontWeight: "bold" }}>
                  {user.name}
                </h1>
                <p style={{ margin: "5px 0", fontSize: "17px" }}>{user.technology}</p>
                <p style={{ margin: "0", fontSize: "15px" }}>{user.joinDate}</p>
              </div>
            </div>

            {/* Download buttons */}
            <div
              style={{
                marginTop: "20px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                gap: "15px", // Space between buttons
                flexWrap: "wrap", // Wrap buttons on small screens
                marginBottom: "100px",
              }}
            >
              <button
                onClick={downloadPDF}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
              >
                Download as PDF
              </button>
              <button
                onClick={downloadImage}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
              >
                Download as Image
              </button>
            </div>
            {/* <Footer /> */}
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Post;