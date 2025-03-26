import React, { useState, useEffect } from 'react';
import InternTopbar from "../InternTopbar/InternTopbar";
import InternSidebar from "../InternSidebar";
import { jsPDF } from "jspdf";
import letterheadImage from '../../../assets/offer_letter.jpg';
import {Footer} from '../../Footer';

const OfferLetter = () => {
    const [user, setUser] = useState({
        username: sessionStorage.getItem("username"),
        email: sessionStorage.getItem("email"),
        ezi_id: sessionStorage.getItem("eziId"),
        status: sessionStorage.getItem("internStatus"),
        tech: sessionStorage.getItem("tech"),
        duration: sessionStorage.getItem("duration"),
        interntype: sessionStorage.getItem("interntype"),
        join_date: sessionStorage.getItem("join_date"),
    });
    
    const [reason, setReason] = useState('');
    const [requestData, setRequestData] = useState(null);
    const [requestManagerData, setRequestManagerData] = useState([]);
    const [error, setError] = useState(null);
    const [lastOfferLetterId, setLastOfferLetterId] = useState(null);

    // Function to generate the next offer letter ID
    const generateNextOfferLetterId = () => {
        if (lastOfferLetterId) {
            const num = parseInt(lastOfferLetterId.split('_')[2]) + 1;
            return `off_lett_${num.toString().padStart(4, '0')}`;
        }
        return 'off_lett_0001'; // Default starting ID
    };

    useEffect(() => {
        const fetchRequestData = async () => {
            try {
                const encodedEziId = encodeURIComponent(user.ezi_id);
                const response = await fetch(`https://api.ezitech.org/get-intern-offer-letter/${encodedEziId}`);
                
                const result = await response.json();
                
                if (result.data) {
                    setRequestData(result.data);
                    // Extract the highest offer_letter_id from existing records if available
                    if (result.data.offer_letter_id) {
                        setLastOfferLetterId(result.data.offer_letter_id);
                    }
                    setError(null);
                } else {
                    setRequestData(null);
                }
            } catch (error) {
                console.error('Error fetching request data:', error.message);
                setError(error.message);
                setRequestData(null);
            }
        };
        
        if (user.ezi_id) {
            fetchRequestData();
        }
    }, [user.ezi_id]);

    useEffect(() => {
        const fetchManagerData = async () => {
            if (!user.interntype) {
                console.log('No interntype provided, skipping fetch');
                return;
            }

            try {
                const url = new URL(`https://api.ezitech.org/get-manager`);
                url.searchParams.append("interview_type", encodeURIComponent(user.interntype));
                const response = await fetch(url);
                
                if (!response.ok) {
                    if (response.status === 400) {
                        throw new Error('Interview type is required');
                    } else if (response.status === 404) {
                        throw new Error(`No manager found for interview type: ${user.interntype}`);
                    } else {
                        const errorText = await response.text();
                        throw new Error(`Server error: ${response.status} - ${errorText}`);
                    }
                }

                const result = await response.json();
                setRequestManagerData(result.data || []);
                setError(result.data.length > 0 ? null : 'No manager data found in response');
            } catch (error) {
                console.error('Error fetching manager data:', error.message);
                setError(error.message);
                setRequestManagerData([]);
            }
        };
        
        fetchManagerData();
    }, [user.interntype]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const offer_letter_id = generateNextOfferLetterId();
        
        const requestDataToSend = {
            username: user.username,
            email: user.email,
            ezi_id: user.ezi_id,
            intern_status: user.status,
            tech: user.tech,
            reason: reason,
            offer_letter_id: offer_letter_id // Add the generated offer letter ID
        };

        try {
            const response = await fetch('https://api.ezitech.org/intern-offer-letter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestDataToSend),
            });

            const data = await response.json();
            
            if (response.ok) {
                setReason('');
                setRequestData({
                    ...requestDataToSend,
                    status: 'pending',
                    created_at: new Date().toISOString(),
                    id: data.request_id,
                    offer_letter_id: offer_letter_id // Include the offer letter ID in the local state
                });
                setLastOfferLetterId(offer_letter_id); // Update the last used ID
                setError(null);
            } else {
                console.error('Error submitting request:', data.message);
                setError(data.message);
            }
        } catch (error) {
            console.error('Network error submitting request:', error);
            setError('Network error submitting request');
        }
    };

    const generatePDF = () => {
        if (!requestData) return;

        const doc = new jsPDF();
        doc.addImage(letterheadImage, 'PNG', 0, 0, 210, 297);

        doc.setFont("helvetica");

        let y = 50;
        const managerName = requestManagerData.length > 0 ? requestManagerData[0].name : "Manager Name Not Available";
        const managerContact = requestManagerData.length > 0 ? requestManagerData[0].contact : "N/A";
        
        // Add offer letter ID to the PDF
        doc.setFontSize(10);
        doc.text(`Offer Letter ID: ${requestData.offer_letter_id || 'N/A'}`, 190, 30, { align: 'right' });

        // From Section
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text("From", 20, y);
        y += 5;
        doc.setFont("helvetica", "bold");
        doc.text("M/S Ezitech Institute", 20, y);
        y += 5;
        doc.text("Amna Plaza Peshawar Road", 20, y);
        y += 5;
        doc.setFont("helvetica", "normal");
        doc.text(new Date(requestData.created_at).toLocaleDateString(), 180, y, { align: 'right' });
        y += 5;
        doc.setFont("helvetica", "bold");
        doc.text("To Whom It May Concern", 105, y, { align: 'center' });
        y += 10;

        // Rest of the PDF generation remains the same...
        // Intern Details
        doc.text(requestData?.username || "", 20, y);
        y += 5;
        doc.text(`Intern-ID-${requestData?.ezi_id || ""}`, 20, y);
        y += 5;
        doc.text("Internship Offer", 20, y);
        y += 10;
        doc.text(`Joining Date: ${user.join_date || ""}`, 20, y);
        y += 5;
        doc.text("Ending Date: 31-May-2025", 20, y);
        y += 10;

        // Greeting and Body
        doc.setFontSize(12);
        doc.text(`Dear ${requestData?.username || ""},`, 20, y);
        y += 8;
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(
            `We are delighted to offer you an onsite ${user.duration} internship position in ${requestData?.tech || ""} Intern at Ezitech Institute. ` +
            `Your skills, experience, and passion for ${requestData?.tech || ""} make you an exceptional candidate, and we believe your contributions will greatly enhance our team.`,
            20, y, { maxWidth: 170 }
        );
        y += 15;
        doc.text(
            "Ezitech Institute is a subsidiary of Eziline Software House (established in 2007). We take pride in our commitment to innovation, " +
            "quality, and client satisfaction. After reviewing your portfolio, we are confident that you will be a valuable addition to our organisation.",
            20, y, { maxWidth: 170 }
        );
        y += 15;
        doc.text(
            "This offer letter represents the full extent of the internship offer and supersedes any prior discussions about the position. " +
            "Any changes to this agreement must be made in writing.",
            20, y, { maxWidth: 170 }
        );
        y += 15;
        doc.text(
            `If you have any questions regarding this offer, please contact current Intern Manager Mr. ${managerName} in our recruiting department `+
            `at ${managerContact} on WhatsApp.`,
            20, y, { maxWidth: 170 }
        );
        y += 15;
        doc.text(
            `Please review this letter in full and confirm your acceptance of the position. We look forward to supporting your journey in ${requestData?.tech || ""} ` +
            "and wish you a successful internship.",
            20, y, { maxWidth: 170 }
        );
        y += 15;
        doc.text("Welcome to the team!", 20, y, { maxWidth: 170 });
        y += 15;

        // Closing
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Best regards,", 20, y);
        y += 5;
        doc.text("Ezitech Institute", 20, y);

        doc.save(`Offer_Letter_${requestData?.offer_letter_id || requestData?.ezi_id || "unknown"}.pdf`);
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
                        <h2 className="mb-3">Apply Offer Letter</h2>
                        
                        {error && (
                            <div className="alert alert-danger mb-3">
                                {error}
                            </div>
                        )}

                        {requestData ? (
                            <div className="table-responsive mb-3">
                                <table className="table table-bordered table-striped">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Offer Letter ID</th>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>EZI ID</th>
                                            <th>Intern Status</th>
                                            <th>Tech</th>
                                            <th>Reason</th>
                                            <th>Status</th>
                                            <th>Created At</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{requestData.offer_letter_id || 'N/A'}</td>
                                            <td>{requestData.username}</td>
                                            <td>{requestData.email}</td>
                                            <td>{requestData.ezi_id}</td>
                                            <td>{requestData.intern_status || '-'}</td>
                                            <td>{requestData.tech || '-'}</td>
                                            <td>{requestData.reason}</td>
                                            <td>
                                                <span className={`badge badge-${
                                                    requestData.status === 'accept' ? 'success' : 
                                                    requestData.status === 'reject' ? 'danger' : 
                                                    'warning'
                                                }`}>
                                                    {requestData.status}
                                                </span>
                                            </td>
                                            <td>{new Date(requestData.created_at).toLocaleString()}</td>
                                            <td>
                                                {requestData.status === 'accept' && (
                                                    <button
                                                        className="btn btn-info btn-sm"
                                                        data-toggle="modal"
                                                        data-target="#offerLetterModal"
                                                    >
                                                        View Offer Letter
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p>No offer letter request found.</p>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="reason">Reason</label>
                                <textarea
                                    className="form-control"
                                    id="reason"
                                    rows="5"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    placeholder="Enter your reason here..."
                                    required
                                    disabled={requestData && (requestData.status === 'accept' || requestData.status === 'reject')}
                                ></textarea>
                            </div>
                            <button 
                                type="submit" 
                                className="btn btn-primary mt-2"
                                disabled={requestData && (requestData.status === 'accept' || requestData.status === 'reject')}
                            >
                                Submit
                            </button>
                        </form>

                        <div
                            className="modal fade"
                            id="offerLetterModal"
                            tabIndex="-1"
                            role="dialog"
                            aria-labelledby="offerLetterModalLabel"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog modal-lg" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="offerLetterModalLabel">
                                            Internship Offer Letter
                                        </h5>
                                        <button
                                            type="button"
                                            className="close"
                                            data-dismiss="modal"
                                            aria-label="Close"
                                        >
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div 
                                        className="modal-body" 
                                        id="offerLetterContent"
                                        style={{ 
                                            backgroundImage: `url(${letterheadImage})`,
                                            backgroundSize: 'contain',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            height: '942px',
                                            width: '625px',
                                            fontSize: '12px',
                                            lineHeight: '1.4',
                                            padding: '20px',
                                            color: '#333',
                                            position: 'relative',
                                            margin: '0 auto',
                                            overflowY: 'auto'
                                        }}
                                    >
                                        {requestData && (
                                            <>
                                                <div style={{ position: 'absolute', top: 15, right: 20, fontSize: '10px' }}>
                                                    Offer Letter ID: {requestData.offer_letter_id || 'N/A'}
                                                </div>
                                                
                                                <div style={{ marginTop: '150px', marginLeft:'20px' }}>
                                                    <p style={{margin:0}}>From</p>
                                                    <p style={{margin:0, fontWeight: 'bold'}}>M/S Ezitech Institute</p>
                                                    <p style={{margin:0,fontWeight: 'bold'}}>Amna Plaza Peshawar Road</p>
                                                    <p style={{margin:0, marginRight:'50px', textAlign:'right', fontSize:'12px'}}>
                                                        {new Date(requestData.created_at).toLocaleDateString()}
                                                    </p>
                                                    <p style={{margin:5, textAlign:'center', fontWeight: 'bold'}}>To Whom It May Concern</p>
                                                </div>

                                                <div style={{ marginLeft:'20px' }}>
                                                    <p style={{ margin:0,fontWeight: 'bold' }}>{requestData.username}</p>
                                                    <p style={{margin:0,fontWeight: 'bold'}}>Intern-ID-{requestData.ezi_id}</p>
                                                    <p style={{marginBottom:10,fontWeight: 'bold'}}>Internship Offer</p>
                                                    <p style={{margin:0,fontWeight: 'bold'}}><strong>Joining Date:</strong> {user.join_date}</p>
                                                    <p style={{margin:0,fontWeight: 'bold'}}><strong>Ending Date:</strong> 31-May-2025</p>
                                                </div>

                                                <div style={{ marginLeft:'20px' }}>
                                                    <p style={{marginTop:8, marginBottom:8, fontWeight: 'bold' }}>
                                                        <strong>Dear</strong> {requestData.username},
                                                    </p>
                                                    <p style={{ fontSize: '10px', marginBottom:0 }}>
                                                    We are delighted to offer you an onsite <strong>{user.duration}</strong> internship position in <strong>{requestData.tech}</strong> Intern at Ezitech Institute. Your skills, experience, and passion for <strong>{requestData.tech}</strong> make you an exceptional candidate, and we believe your contributions will greatly enhance our team.
                                                    </p>
                                                    <p style={{ fontSize: '10px', marginBottom:0 }}>
                                                    Ezitech Institute is a subsidiary of Eziline Software House (established in 2007). We take pride in our commitment to innovation, quality, and client satisfaction. After reviewing your portfolio, we are confident that you will be a valuable addition to our organisation.
                                                    </p>
                                                    <p style={{ fontSize: '10px', marginBottom:0 }}>
                                                    This offer letter represents the full extent of the internship offer and supersedes any prior discussions about the position. Any changes to this agreement must be made in writing.
                                                    </p>
                                                    <p style={{ fontSize: '10px', marginBottom:0 }}>
                                                    If you have any questions regarding this offer, please contact current Intern Manager Mr. <strong>{requestManagerData.length > 0 ? requestManagerData[0].name : "Manager"}</strong> in our recruiting department at {requestManagerData.length > 0 ? requestManagerData[0].contact : "N/A"} on WhatsApp.
                                                    </p>
                                                    <p style={{ fontSize: '10px', marginBottom:0 }}>
                                                    Please review this letter in full and confirm your acceptance of the position. We look forward to supporting your journey in <strong>{requestData.tech}</strong> and wish you a successful internship.
                                                    </p>
                                                    <p style={{ fontSize: '10px',  }}>
                                                    Welcome to the team!
                                                    </p>
                                                </div>

                                                <div style={{marginLeft:'20px'}}>
                                                    <p style={{fontWeight:'bold' , marginBottom:0 }}>Best regards,</p>
                                                    <p style={{ fontWeight:'bold' }}>Ezitech Institute</p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            data-dismiss="modal"
                                        >
                                            Close
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={generatePDF}
                                            disabled={!requestData}
                                        >
                                            Download as PDF
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OfferLetter;