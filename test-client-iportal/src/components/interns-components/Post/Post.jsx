import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import InternTopbar from "../InternTopbar/InternTopbar";
import InternSidebar from "../InternSidebar";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./post.css";

const Post = () => {
  const navigate = useNavigate();
  const profileRef = useRef(); // Ref to capture profile card
  const [user, setUser] = useState({
    image: null,
    name: "Loading...",
    technology: "Loading...",
    joinDate: "Loading...",
  });

  const checkLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const email = sessionStorage.getItem("email");
  const currentYear = new Date().getFullYear();
  useEffect(() => {
    if (!checkLoggedIn) {
      navigate("/");
    }
  }, [checkLoggedIn, navigate]);

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
    const input = profileRef.current;
    html2canvas(input, { scale: 3, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${user.name || "profile"}.pdf`);
    });
  };

  // Function to download profile card as Image (PNG)
  const downloadImage = () => {
    const input = profileRef.current;
    html2canvas(input, { scale: 3, useCORS: true }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${user.name || "profile"}.png`;
      link.click();
    });
  };

  return (
    <>
      <InternTopbar />
      <InternSidebar />
      <div className="app-content content">
                <div className="content-overlay"></div>
                {/* <div className="header-navbar-shadow"></div> */}
                <div className="content-wrapper">
                    {/* <div className="content-header row"></div> */}
                    <div className="content-body mt-3">
        <div
        ref={profileRef}
      style={{
        // width: '100vw',
        // height: '100vh',
        // display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#f3f4f6', // bg-gray-100 equivalent
      }}
    >
      <div
        style={{
          width: '870px',
          height: '688px',
          minWidth: '870px',
          minHeight: '685px',
          position: 'relative',
          backgroundColor: '#ffffff', // bg-white equivalent
          overflow: 'hidden',
          margin: '0 auto',
        }}
      >
       
        <div style={{ position: 'relative', flex: 1 }}>
          <div style={{ position: 'relative' }}>
            <img
              src="/welcomepage/topleftyellowcircle.png"
              alt="loading"
              width={130}
              height={130}
              style={{ position: 'absolute', zIndex: 5 }}
            />
            <img
              src="/welcomepage/topleftbluedot.png"
              alt="loading"
              width={100}
              height={100}
              style={{ position: 'absolute', zIndex: 5 }}
            />
            <img
              src="/welcomepage/bgsquaresdesign.png"
              alt="loading"
              width={480}
              height={500}
              style={{ position: 'relative' }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          >
            <img
              src="/welcomepage/whiteouterimg.png"
              alt="loading"
              width={331}
              height='reset'
              style={{ position: 'relative' }}
            />
            <img
              src="/welcomepage/whiteinnerimg.png"
              alt="loading"
              width={270}
              height='reset'
              style={{ position: 'absolute', right: 0, bottom: 60 }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              top: 20,
              // right: '25%'
              width:'100%',
              transform: 'translateX(33%)',
            }}
          >
            <img
              src="/welcomepage/companyimg.png"
              alt="company logo"
              width={280}
              height={85}
            />
          </div>
          <div style={{ position: 'absolute', top: 0, right: 0, zIndex: 5 }}>
            <img
              src="/welcomepage/toprightimg.png"
              alt="loading..."
              width={280}
                height='reset'
            />
          </div>
        </div>

     
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 135, // top-27 (assuming 1 unit = 4px for simplicity)
            left: '9.09%', // left-1/11 equivalent
            flex: 1,
          }}
        >
          <p
            style={{
              fontSize: 45,
              fontFamily: "'Lobster', cursive", // Lobster font fallback
              color: '#0A629C',
            }}
          >
            Welcome to Our Internship Team
          </p>
        </div>

        
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: '21%',
            top: 170, // top-45
          }}
        >
          <img src="/welcomepage/Imagecontainer.png" alt="loading"
          width={500}
          height='unset'
          style={{zIndex:10,
position:'relative'
          }}
          />
          <img src={user.image} alt="user imgage"
          width={247}
          height='reset'
          style={{
            position:'absolute',
            top:92,
            right:109,
            borderRadius:"50%"
          }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              marginLeft: 6, // ml-1.5
              left: '25%',
              bottom: '12.67%', // bottom-1/6
              color: '#FFFFFF',
              fontWeight: 300, // font-light
              zIndex: 10,
            }}
          >
            <p>Joining Data:</p>
            <p style={{ display: 'flex', justifyContent: 'center' }}>
              {user.joinDate}
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            zIndex: 10,
          }}
        >
          <img
            src="/welcomepage/bottomleftimg.png"
            alt="loading..."
            width={310}
            height='reset'
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            width: '100%',
            bottom: 0,
          }}
        >
          <img
            src="/welcomepage/bottomrightimg.png"
            alt="loading..."
            width={120}
            height={103}
            style={{ position: 'absolute', right: 0, bottom: 0, zIndex: 5 }}
          />
          <p
            style={{
              fontSize: 20,
              fontFamily: "'Inter', sans-serif", // Inter font fallback
              color: '#FFFFFF',
              position: 'absolute',
              left: 108, // left-27
              bottom: 8, // bottom-2
              zIndex: 10,
            }}
          >
            www.ezitech.org
          </p>
          <img
            src="/welcomepage/bottomrightimg2.png"
            alt="loading..."
            width={93}
            height={80}
            style={{ position: 'absolute', right: 0, bottom: 0, zIndex: 5 }}
          />
        </div>
        <div>
          <img
            src="/welcomepage/bgsquaredotsbottom.png"
            alt="loading..."
            width={480}
            height='reset'
            style={{ position: 'absolute', right: 0, bottom: 0 }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: 0,
            left: 0,
          }}
        >
          <img
            src="/welcomepage/whiteinnerimg.png"
            alt="loading"
            width={300}
            height={300}
            style={{ position: 'relative', bottom: 15, right: 130, zIndex: 2 }}
          />
          <img
            src="/welcomepage/bottomwhiteoutercircleimg.png"
            alt="loading"
            width={235}
            height='reset'
            style={{ position: 'absolute', bottom: 0, left: 0 }}
          />
        </div>

        {/* Username and Post Section */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            position: 'absolute',
            bottom: 100, // bottom-25
          }}
        >
          <p
            style={{
              fontSize: 40,
              fontFamily: "'Lobster', cursive", // Lobster font fallback
              color: '#0A629C',
            }}
          >
            {user.name}
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            position: 'absolute',
            bottom: 60, // bottom-15
          }}
        >
          <p style={{ fontSize: 30, color: '#0A629C' }}>{user.technology}</p>
        </div>
      </div>
      </div>
      </div>
        <div className="download-btn-container"
        style={{marginTop:15}}
        >
        <button className="download-btn" onClick={downloadPDF}>
          Download as PDF
        </button>
        <button className="download-btn" onClick={downloadImage}>
          Download as Image
        </button>
      </div>

      </div>

      {/* Download Buttons */}
     
      {/* Footer */}
      <footer className="footer">
        <p>
          COPYRIGHT &copy; 2016-{currentYear}
          <a href="https://ezitech.org/" target="_blank" rel="noopener noreferrer">
            Ezitech Institute
          </a>, All rights Reserved
        </p>
      </footer>
      
      </div>
    </>
  );
};

export default Post;

