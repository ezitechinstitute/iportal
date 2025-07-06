import React, { useEffect, useState } from "react";
import axios from "axios";

export const InternDashboard = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const email = sessionStorage.getItem("email");

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await axios.get(`http://api.ezitech.org/get-certificates/${email}`);
        setCertificates(res.data.certificates || []);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [email]);

  const baseCardStyle = {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
    border: "1px solid #e5e7eb",
    transition: "all 0.3s ease-in-out",
  };

  const hoverStyle = {
    transform: "translateY(-5px)",
    boxShadow: "0 10px 20px rgba(0, 123, 255, 0.15)",
    borderColor: "#cfe2ff",
  };

 const handleDownload = (cert) => {
  // Directly create link (no fetch needed if file is publicly accessible)
  const a = document.createElement('a');
  a.href = `http://api.ezitech.org${cert.certificate_url}`;
  a.download = cert.certificate_url.split('/').pop() || 'certificate.pdf';
  a.target = '_blank'; // Open in new tab as fallback
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

  return (
    <div className="app-content content">
      <div className="content-wrapper">
        <div className="content-header row"></div>
        <div className="content-body">
          <section id="intern-dashboard">
            <h2 className="text-center my-3">My Certificates</h2>
            {loading ? (
              <p className="text-center">Loading certificates...</p>
            ) : certificates.length === 0 ? (
              <p className="text-center text-muted">No certificates issued yet.</p>
            ) : (
              <div className="row">
                {certificates.map((cert, index) => (
                  <div
                    key={cert.id}
                    className="col-md-6 col-lg-4 mb-4"
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div
                      style={{
                        ...baseCardStyle,
                        ...(hoveredCard === index ? hoverStyle : {}),
                      }}
                    >
                      <h5 className="mb-3 text-primary">{cert.tech}</h5>
                      <p><strong>Name:</strong> {cert.student_username}</p>
                      <p><strong>Email:</strong> {cert.student_email}</p>
                      <p><strong>EZI ID:</strong> {cert.ezi_id}</p>
                      <p><strong>Projects:</strong> {cert.project_count}</p>
                      <p><strong>Experience:</strong> {cert.experience_duration}</p>
                      <p><strong>Issued by:</strong> {cert.issued_by}</p>
                      <p><strong>Issued on:</strong> {new Date(cert.issued_at).toLocaleDateString()}</p>
                      

                      <button style={{
                              backgroundColor: '#4e73df',
                              color: 'white',
                              border: 'none',
                              padding: '8px 16px',
                              borderRadius: '4px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '8px',
                              width: '100%',
                              ':hover': {
                              backgroundColor: '#2e59d9',
                              transform: 'translateY(-1px)'}
                              }}
      onClick={() => handleDownload(cert)}>Download Certificate</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};
