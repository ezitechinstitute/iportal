import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReviewSidebar } from '../component/ReviewSidebar';
import { ReviewTopbar } from '../component/ReviewTopbar';

const NonReview_intern = () => {
    const [nonReviewInterns, setNonReviewInterns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10
    });
    const navigate = useNavigate();

    // Check if the user is logged in
    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            navigate('/');
        }
    }, [navigate]);

    // Fetch non-review interns data from the API with pagination and search
    useEffect(() => {
        const fetchNonReviewInterns = async () => {
            try {
                const url = new URL('https://api.ezitech.org/non-review-interns');
                url.searchParams.append('page', pagination.currentPage);
                url.searchParams.append('limit', pagination.itemsPerPage);
                if (searchTerm) {
                    url.searchParams.append('search', searchTerm);
                }

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const { data, pagination: paginationData } = await response.json();
                setNonReviewInterns(data);
                setPagination(paginationData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const delayDebounceFn = setTimeout(() => {
            // Reset to first page when searching
            if (searchTerm) {
                setPagination(prev => ({ ...prev, currentPage: 1 }));
            }
            fetchNonReviewInterns();
        }, 500); // Debounce delay

        return () => clearTimeout(delayDebounceFn);
    }, [pagination.currentPage, searchTerm]);

    // Function to format phone number for WhatsApp
    const formatPhoneNumberForWhatsApp = (phone) => {
        const cleaned = phone.replace(/\D/g, '');
        return `+${cleaned}`;
    };

    // Function to update review status
    const updateReviewStatus = async (email) => {
        try {
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

            // Refresh the current page after updating
            const url = new URL('https://api.ezitech.org/non-review-interns');
            url.searchParams.append('page', pagination.currentPage);
            url.searchParams.append('limit', pagination.itemsPerPage);
            if (searchTerm) {
                url.searchParams.append('search', searchTerm);
            }

            const updatedResponse = await fetch(url);
            const { data, pagination: paginationData } = await updatedResponse.json();
            setNonReviewInterns(data);
            setPagination(paginationData);
        } catch (err) {
            console.error('Error updating review status:', err);
            setError(err.message);
        }
    };

    // Change page
    const paginate = (pageNumber) => {
        setPagination(prev => ({ ...prev, currentPage: pageNumber }));
    };

    return (
        <div>
            <ReviewSidebar />
            <ReviewTopbar />
            <div className="app-content content">
                <div className="content-overlay"></div>
                <div className="header-navbar-shadow"></div>
                <div className="content-wrapper">
                    <div className="content-header row">
                        {/* Search Input Field */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', padding: '10px' }}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ width: '300px' }}
                            />
                        </div>
                    </div>
                    <div className="content-body">
                        {/* Loading state */}
                        {loading && (
                            <div className="text-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        )}

                        {/* Error state */}
                        {error && (
                            <div className="alert alert-danger">
                                Error: {error}
                            </div>
                        )}

                        {/* Table to display non-review interns data */}
                        {!loading && !error && (
                            <>
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
                                            {nonReviewInterns.map((intern, index) => {
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
                                                                        onClick={() => updateReviewStatus(intern.email)}
                                                                    >
                                                                        Move to Review
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
                                {pagination.totalPages > 1 && (
                                    <div className="d-flex justify-content-center mt-3">
                                        <nav>
                                            <ul className="pagination">
                                                {/* Previous button */}
                                                <li className={`page-item ${pagination.currentPage === 1 ? 'disabled' : ''}`}>
                                                    <button
                                                        className="page-link"
                                                        onClick={() => paginate(pagination.currentPage - 1)}
                                                        disabled={pagination.currentPage === 1}
                                                    >
                                                        &laquo;
                                                    </button>
                                                </li>

                                                {/* Page numbers */}
                                                {Array.from({ length: pagination.totalPages }, (_, i) => (
                                                    <li key={i + 1} className={`page-item ${pagination.currentPage === i + 1 ? 'active' : ''}`}>
                                                        <button
                                                            className="page-link"
                                                            onClick={() => paginate(i + 1)}
                                                        >
                                                            {i + 1}
                                                        </button>
                                                    </li>
                                                ))}

                                                {/* Next button */}
                                                <li className={`page-item ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}`}>
                                                    <button
                                                        className="page-link"
                                                        onClick={() => paginate(pagination.currentPage + 1)}
                                                        disabled={pagination.currentPage === pagination.totalPages}
                                                    >
                                                        &raquo;
                                                    </button>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                )}

                                {/* Pagination info */}
                                <div className="text-center mt-2">
                                    Showing {(pagination.currentPage - 1) * pagination.itemsPerPage + 1} to{' '}
                                    {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of{' '}
                                    {pagination.totalItems} entries
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NonReview_intern;