import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { ReviewSidebar } from '../component/ReviewSidebar';
import { ReviewTopbar } from '../component/ReviewTopbar';
import { FaClipboardCheck, FaClipboardList } from 'react-icons/fa';
import './Home.css';

const Home = () => {
    const [reviewInternCount, setReviewInternCount] = useState(0);
    const [nonReviewInternCount, setNonReviewInternCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook for navigation

    // Check if the user is logged in
    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            navigate('/'); // Redirect to login page if not logged in
        }
    }, [navigate]);

    // Fetch counts for review and non-review interns
    useEffect(() => {
        const fetchCounts = async () => {
            try {
                // Fetch review interns count
                const reviewResponse = await fetch('https://api.ezitech.org/count-review-interns');
                if (!reviewResponse.ok) {
                    throw new Error('Failed to fetch review interns count');
                }
                const reviewData = await reviewResponse.json();
                setReviewInternCount(reviewData.totalReviewInterns);

                // Fetch non-review interns count
                const nonReviewResponse = await fetch('https://api.ezitech.org/count-non-review-interns');
                if (!nonReviewResponse.ok) {
                    throw new Error('Failed to fetch non-review interns count');
                }
                const nonReviewData = await nonReviewResponse.json();
                setNonReviewInternCount(nonReviewData.totalNonReviewInterns);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCounts();
    }, []); // Empty dependency array to run only once on mount

    // Display loading state
    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // // Display error message if there's an error
    // if (error) {
    //     return <div>Error: {error}</div>;
    // }

    return (
        <>
            <ReviewSidebar />
            <ReviewTopbar />
            <div className="app-content content">
                <div className="content-overlay"></div>
                <div className="header-navbar-shadow"></div>
                <div className="content-wrapper">
                    <div className="content-header row"></div>
                    <div className="content-body">
                        <div className="row">
                            {/* Card for Review Intern */}
                            <div className="col-lg-4 col-md-6 col-12">
                                <div className="card2">
                                    <div className="card py-2">
                                        <div className="d-flex">
                                            <div className="icon px-1 mx-1" style={{ color: "#007bff", backgroundColor: "#e6f0ff", borderRadius: "5px", padding: "4px 5px" }}>
                                                <FaClipboardCheck size={20} />
                                            </div>
                                            <h3>{reviewInternCount}</h3>
                                        </div>
                                        <div className="card-body pl-1 mt-1">
                                            <h4 className="" style={{ marginBottom: "5px", width: "max-content" }}>Review</h4>
                                            <p className="card-text" style={{ display: "flex", paddingBottom: "0%", marginTop: "14px" }}>Interns under review</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card for Non-Review Intern */}
                            <div className="col-lg-4 col-md-6 col-12">
                                <div className="card2">
                                    <div className="card py-2">
                                        <div className="d-flex">
                                            <div className="icon px-1 mx-1" style={{ color: "#28a745", backgroundColor: "#e6f4ea", borderRadius: "5px", padding: "4px 5px" }}>
                                                <FaClipboardList size={20} />
                                            </div>
                                            <h3>{nonReviewInternCount}</h3>
                                        </div>
                                        <div className="card-body pl-1 mt-1">
                                            <h4 className="" style={{ marginBottom: "5px", width: "max-content" }}>Non-Review</h4>
                                            <p className="card-text" style={{ display: "flex", paddingBottom: "0%", marginTop: "14px" }}>Interns not under review</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;