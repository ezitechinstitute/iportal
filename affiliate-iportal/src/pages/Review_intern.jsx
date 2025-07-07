import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { ReviewSidebar } from '../components/ReviewSidebar';
import { ReviewTopbar } from '../components/ReviewTopbar';

const Review_intern = () => {
    const [reviewInterns, setReviewInterns] = useState([]);
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

    // Fetch review interns data from the API
    useEffect(() => {
        const fetchReviewInterns = async () => {
            try {
                const response = await fetch('https://api.ezitech.org/review-interns');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setReviewInterns(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        // Simulate a delay (optional)
        setTimeout(() => {
            fetchReviewInterns();
        }, 2000); // 2-second delay
    }, []); // Empty dependency array to run only once on mount

    // Function to format phone number for WhatsApp
    const formatPhoneNumberForWhatsApp = (phone) => {
        // Remove any non-numeric characters
        const cleaned = phone.replace(/\D/g, '');
        // Add the international prefix (e.g., +92 for Pakistan)
        return `+${cleaned}`;
    };

    // Filter interns based on the search term
    const filteredInterns = reviewInterns.filter((intern) =>
        intern.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredInterns.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Display error message if there's an error
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
                        {/* Table to display review interns data */}
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
                                                <td className='border px-1'>{intern.email}</td>
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

export default Review_intern;