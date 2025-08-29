'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ManagerSidebar } from '../components/ManagerSidebar';
import { ManagerTopbar } from '../components/ManagerTopbar';
import './style/Certificate_Issuance.css';

export default function CertificateIssuance() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/GetAll-Intern-For-Certificate-Issuance`
        );
        setData(res.data.data);
        setFilteredData(res.data.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = data;

    if (searchFilter) {
      filtered = filtered.filter(
        person =>
          person.eti_id.toLowerCase().includes(searchFilter.toLowerCase()) ||
          person.email.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [data, searchFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const clearFilters = () => {
    setSearchFilter('');
    setCurrentPage(1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = pageNumber => {
    setCurrentPage(pageNumber);
  };
  console.log(data);
  return (
    <>
      <ManagerTopbar />
      <ManagerSidebar />

      <div className='cert-issuance-wrapper'>
        <div className='cert-issuance-header'>
          <h1 className='cert-issuance-title'>
            Certificate Issuance Management
          </h1>
          <p className='cert-issuance-subtitle'>
            Manage and track certificate issuance status for all personnel
          </p>
        </div>

        <div className='cert-issuance-filters'>
          <div className='cert-issuance-filter-container'>
            <div className='cert-issuance-filter-group'>
              <label
                htmlFor='search-filter'
                className='cert-issuance-filter-label'
              >
                Search by ETI ID or Email:
              </label>
              <input
                id='search-filter'
                type='text'
                className='cert-issuance-filter-input'
                placeholder='Enter ETI ID or email address...'
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
              />
            </div>

            <div className='cert-issuance-filter-actions'>
              <button
                className='cert-issuance-clear-btn'
                onClick={clearFilters}
              >
                Clear Search
              </button>
              <span className='cert-issuance-results-count'>
                Showing {currentData.length} of {filteredData.length} results
                (Page {currentPage} of {totalPages})
              </span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className='cert-issuance-loading'>
            <div className='cert-issuance-spinner'></div>
            <p>Loading data...</p>
          </div>
        ) : error ? (
          <div className='cert-issuance-error'>
            <p className='cert-issuance-error-msg'>{error}</p>
            <button
              className='cert-issuance-retry-btn'
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <div className='cert-issuance-table-wrapper'>
              <div className='cert-issuance-table-container'>
                <table className='cert-issuance-table'>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>ETI ID</th>
                      <th>Full Name</th>
                      <th>Email Address</th>
                      <th>Status</th>
                      <th>Certificate</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentData.map(person => (
                      <tr
                        key={person.id}
                        className={`cert-issuance-row-${person.status.toLowerCase()}`}
                      >
                        <td className='cert-issuance-id'>{person.id}</td>
                        <td className='cert-issuance-eti-id'>
                          {person.eti_id}
                        </td>
                        <td className='cert-issuance-name'>{person.name}</td>
                        <Link to={`/${person.email}`}>
                          <td className='cert-issuance-email'>
                            {person.email}
                          </td>
                        </Link>
                        <td className='cert-issuance-status'>
                          <span
                            className={`cert-issuance-status-badge ${person.status.toLowerCase()}`}
                          >
                            {person.status}
                          </span>
                        </td>
                        <td>
                          <span
                            className={
                              person?.isCertificate
                                ? 'certificate-badge published'
                                : 'certificate-badge unpublished'
                            }
                          >
                            {person?.isCertificate ? 'Publish' : 'Unpublished'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredData.length === 0 && data.length > 0 && (
                  <div className='cert-issuance-no-results'>
                    <p>No results found matching your search criteria.</p>
                    <button
                      className='cert-issuance-clear-btn'
                      onClick={clearFilters}
                    >
                      Clear Search
                    </button>
                  </div>
                )}
              </div>
            </div>

            {filteredData.length > itemsPerPage && (
              <div className='cert-issuance-pagination'>
                <div className='cert-issuance-pagination-controls'>
                  <button
                    className='cert-issuance-pagination-btn'
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>

                  <div className='cert-issuance-pagination-numbers'>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      pageNumber => (
                        <button
                          key={pageNumber}
                          className={`cert-issuance-pagination-number ${
                            currentPage === pageNumber ? 'active' : ''
                          }`}
                          onClick={() => goToPage(pageNumber)}
                        >
                          {pageNumber}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    className='cert-issuance-pagination-btn'
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
