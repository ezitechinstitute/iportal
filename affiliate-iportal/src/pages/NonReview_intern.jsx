import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { ReviewSidebar } from '../components/ReviewSidebar';
import { ReviewTopbar } from '../components/ReviewTopbar';

const NonReview_intern = () => {
    const [nonReviewInterns, setNonReviewInterns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const [itemsPerPage] = useState(10); // Number of items per page
    const navigate = useNavigate(); // Hook for navigation

    // Check if the user is logged in
    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            navigate('/'); // Redirect to login page if not logged in
        }
    }, [navigate]);

    // Fetch non-review interns data from the API
    useEffect(() => {
        const fetchNonReviewInterns = async () => {
            try {
                const response = await fetch('https://api.ezitech.org/non-review-interns');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setNonReviewInterns(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        setTimeout(() => {
            fetchNonReviewInterns();
        }, 500); // Simulate a delay
    }, []);

    // Function to format phone number for WhatsApp
    const formatPhoneNumberForWhatsApp = (phone) => {
        const cleaned = phone.replace(/\D/g, '');
        return `+${cleaned}`;
    };

    // Function to update review status
    const updateReviewStatus = async (email) => {
        try {
            console.log('Updating review status for email:', email); // Debugging
            console.log('Request body:', JSON.stringify({ email, reviewStatus: 'Review' })); // Debugging

            const response = await fetch('https://api.ezitech.org/update-review-status', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, reviewStatus: 'Review' }),
            });

            if (!response.ok) {
                throw new Error('Failed to update review status');
            }

            // Refresh the list after updating
            const updatedResponse = await fetch('https://api.ezitech.org/non-review-interns');
            const updatedData = await updatedResponse.json();
            setNonReviewInterns(updatedData);
        } catch (err) {
            console.error('Error updating review status:', err);
        }
    };

    // Filter interns based on the search term
    const filteredInterns = nonReviewInterns.filter((intern) =>
        intern.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredInterns.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <ReviewSidebar />
            <ReviewTopbar />
            <div className="app-content content">
                <div className="content-overlay"></div>
                <div className="header-navbar-shadow"></div>
                <div className="content-wrapper">
                    <div className="content-header row">
                        {/* Search Input Field on the Right Side */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', padding: '10px' }}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ width: '300px' }} // Adjust width as needed
                            />
                        </div>
                    </div>
                    <div className="content-body">
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Technology</th>
                                        <th>Join Date</th>
                                        <th>Phone</th>
                                        <th>Intern Type</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((intern, index) => {
                                        const whatsappLink = `https://wa.me/${formatPhoneNumberForWhatsApp(intern.phone)}`;
                                        return (
                                            <tr key={index}>
                                                <td className="border px-1">
                                                    <img
                                                        src={intern.image || 'https://via.placeholder.com/50'}
                                                        alt={intern.name}
                                                        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                                                    />
                                                </td>
                                                <td className="border px-1">{intern.name}</td>
                                                <td className="border px-1">{intern.email}</td>
                                                <td className="border px-1">{intern.technology}</td>
                                                <td className="border px-1">{intern.joinDate}</td>
                                                <td className="border px-1">
                                                    <a
                                                        href={whatsappLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{ color: '#25D366', textDecoration: 'none' }}
                                                    >
                                                        {intern.phone}
                                                    </a>
                                                </td>
                                                <td className="border px-1">{intern.internType}</td>
                                                <td className="border px-1">
                                                    <div className="dropdown">
                                                        <button
                                                            className="btn btn-secondary dropdown-toggle"
                                                            type="button"
                                                            id="dropdownMenuButton"
                                                            data-toggle="dropdown"
                                                            aria-haspopup="true"
                                                            aria-expanded="false"
                                                        >
                                                            Action
                                                        </button>
                                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                            <button
                                                                className="dropdown-item"
                                                                onClick={() => {
                                                                    console.log('Intern email:', intern.email); // Debugging
                                                                    updateReviewStatus(intern.email); // Pass `intern.email`
                                                                }}
                                                            >
                                                                Review
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="d-flex justify-content-center mt-3">
                            <nav>
                                <ul className="pagination">
                                    {Array.from({ length: Math.ceil(filteredInterns.length / itemsPerPage) }, (_, i) => (
                                        <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                            <button
                                                className="page-link"
                                                onClick={() => paginate(i + 1)}
                                            >
                                                {i + 1}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NonReview_intern;