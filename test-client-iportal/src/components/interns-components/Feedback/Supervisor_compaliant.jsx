import React, { useState, useEffect } from 'react';
import InternTopbar from "../InternTopbar/InternTopbar";
import InternSidebar from "../InternSidebar";
import { Footer } from '../../Footer';
import './SupervisorComplaint.css'; // Create this CSS file for custom styles

const SupervisorComplaint = () => {
    const [user, setUser] = useState({
        int_id: sessionStorage.getItem("int_id"),
    });
    const currentYear = new Date().getFullYear();

    // State for form inputs
    const [complaintName, setComplaintName] = useState('');
    const [complaintText, setComplaintText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
    const [message, setMessage] = useState({ type: '', text: '' }); // Success/error message

    // State for modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State to store supervisor complaints
    const [complaints, setComplaints] = useState([]);

    // Fetch supervisor complaints on component mount
    useEffect(() => {
        fetchSupervisorComplaints();
    }, []);

    // Fetch supervisor complaints from the server
    const fetchSupervisorComplaints = async () => {
        try {
            const response = await fetch(`https://api.ezitech.org/supervisor-complaints?id=${user.int_id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch complaints');
            }
            const data = await response.json();
            setComplaints(data);
        } catch (error) {
            console.error('Error fetching complaints:', error);
            setMessage({ type: 'error', text: 'Failed to fetch complaints. Please try again.' });
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!complaintName || !complaintText) {
            setMessage({ type: 'error', text: 'Please fill in all fields.' });
            return;
        }

        setIsSubmitting(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch('https://api.ezitech.org/intern-supervisor-complaint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    eti_id: user.int_id,
                    complaint_name: complaintName,
                    complaint_text: complaintText,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit complaint');
            }

            const data = await response.json();
            console.log('Complaint submitted successfully:', data);

            // Clear form fields and show success message
            setComplaintName('');
            setComplaintText('');
            setMessage({ type: 'success', text: 'Complaint submitted successfully!' });

            // Refresh the complaints list
            fetchSupervisorComplaints();

            // Close the modal
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error submitting complaint:', error);
            setMessage({ type: 'error', text: 'Failed to submit complaint. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
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
                        <div className="card">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <div>
                                <h4 className="card-title mb-0">Supervisor Complaints</h4>
                                <p style={
                                    {
                                        fontSize:'10px'
                                    }
                                }>Complaint Directly Send To Admin</p>
                                </div>
                                <div>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    Add Complaint
                                </button>
                                </div>
                            </div>
                            <div className="card-body">
                                {message.text && (
                                    <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'}`}>
                                        {message.text}
                                    </div>
                                )}

                                {/* Table to display complaints */}
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Complaint Name</th>
                                            <th>Complaint Details</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {complaints.map((complaint, index) => (
                                            <tr key={index}>
                                                <td>{complaint.complaint_name}</td>
                                                <td>{complaint.complaint_text}</td>
                                                <td>{new Date(complaint.created_at).toLocaleDateString()}</td>
                                                <td>
                                                    <span style={{
                                                        color: complaint.status === 'Accepted' ? 'green' : 'red'
                                                    }}>
                                                        {complaint.status === 'Accepted' 
                                                            ? 'OK, I will take action' 
                                                            : 'Pending'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Footer inside content body */}
                        <Footer />
                    </div>
                </div>
            </div>

            {/* Modal for adding a new complaint */}
            {isModalOpen && (
                <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Submit Supervisor Complaint</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    <span>×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="complaintName">Complaint Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="complaintName"
                                            placeholder="Enter complaint name"
                                            value={complaintName}
                                            onChange={(e) => setComplaintName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="complaintText">Complaint Details</label>
                                        <textarea
                                            className="form-control"
                                            id="complaintText"
                                            rows="5"
                                            placeholder="Enter complaint details"
                                            value={complaintText}
                                            onChange={(e) => setComplaintText(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                        {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SupervisorComplaint;