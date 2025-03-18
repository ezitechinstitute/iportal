import React, { useState, useEffect } from 'react';
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";

const OfferLetter = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all offer letter requests on component mount
    useEffect(() => {
        const fetchAllRequests = async () => {
            try {
                const response = await fetch('https://api.ezitech.org/offer-letter-request');
                const result = await response.json();

                if (response.ok && result.data) {
                    setRequests(result.data);
                    setError(null);
                } else {
                    setError(result.message || 'Failed to fetch requests');
                    setRequests([]);
                }
            } catch (error) {
                console.error('Network error fetching requests:', error);
                setError('Network error fetching requests');
                setRequests([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAllRequests();
    }, []);

    // Handle status update
    const handleStatusUpdate = async (requestId, newStatus) => {
        try {
            const response = await fetch(`https://api.ezitech.org/offer-letter-request/${requestId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            const data = await response.json();

            if (response.ok) {
                setRequests(requests.map(request =>
                    request.id === requestId ? { ...request, status: newStatus } : request
                ));
                setError(null);
            } else {
                setError(data.message || 'Failed to update status');
            }
        } catch (error) {
            console.error('Network error updating status:', error);
            setError('Network error updating status');
        }
    };

    return (
        <>
            <ManagerTopbar />
            <ManagerSidebar />
            <div className="app-content content">
                <div className="content-overlay"></div>
                <div className="header-navbar-shadow"></div>
                <div className="content-wrapper">
                    <div className="content-header row"></div>
                    <div className="content-body mt-3">
                        <h2 className="mb-3">Offer Letter Requests</h2>

                        {loading && <p>Loading requests...</p>}
                        {error && (
                            <div className="alert alert-danger mb-3">
                                {error}
                            </div>
                        )}

                        {requests.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table table-bordered table-striped">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>ID</th>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>EZI ID</th>
                                            <th>Intern Status</th>
                                            <th>Tech</th>
                                            <th>Reason</th>
                                            <th>Status</th>
                                            <th>Created At</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {requests.map(request => (
                                            <tr key={request.id}>
                                                <td>{request.id}</td>
                                                <td>{request.username}</td>
                                                <td>{request.email}</td>
                                                <td>{request.ezi_id}</td>
                                                <td>{request.intern_status || '-'}</td>
                                                <td>{request.tech || '-'}</td>
                                                <td>{request.reason}</td>
                                                <td>
                                                    <span className={`badge badge-${
                                                        request.status === 'accept' ? 'success' :
                                                        request.status === 'reject' ? 'danger' :
                                                        'warning'
                                                    }`}>
                                                        {request.status}
                                                    </span>
                                                </td>
                                                <td>{new Date(request.created_at).toLocaleString()}</td>
                                                <td>
                                                    {request.status === 'pending' && (
                                                        <>
                                                            <button
                                                                className="btn btn-success btn-sm mr-2"
                                                                onClick={() => handleStatusUpdate(request.id, 'accept')}
                                                            >
                                                                Accept
                                                            </button>
                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => handleStatusUpdate(request.id, 'reject')}
                                                            >
                                                                Reject
                                                            </button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            !loading && !error && <p>No offer letter requests found.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default OfferLetter;