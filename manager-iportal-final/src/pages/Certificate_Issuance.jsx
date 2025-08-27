'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ManagerSidebar } from '../components/ManagerSidebar';
import { ManagerTopbar } from '../components/ManagerTopbar';

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

        <style jsx>{`
          .cert-issuance-wrapper {
            min-height: 80vh;
            background: #fffff;
            padding: 1rem 2rem 2rem 2rem;
            margin-left: 260px;

            padding-right: 3rem;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              sans-serif;
          }

          .cert-issuance-header {
            text-align: left;
            margin-bottom: 0rem;
            padding: 1rem 0;
            margin-top: 80px;
            margin-left: 1rem;
          }

          .cert-issuance-filters {
            margin-bottom: 2rem;
            margin-left: 1rem;
          }

          .cert-issuance-filter-container {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            border: 1px solid #e2e8f0;
            display: flex;
            flex-wrap: wrap;
            gap: 1.5rem;
            align-items: end;
          }

          .cert-issuance-filter-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            min-width: 300px;
            flex: 1;
          }

          .cert-issuance-filter-label {
            font-size: 0.875rem;
            font-weight: 600;
            color: #374151;
            margin-bottom: 0.25rem;
          }

          .cert-issuance-filter-input {
            padding: 0.75rem 1rem;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            font-size: 0.875rem;
            transition: all 0.2s ease;
            background: white;
          }

          .cert-issuance-filter-input:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }

          .cert-issuance-filter-input::placeholder {
            color: #9ca3af;
          }

          .cert-issuance-filter-actions {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            align-items: center;
          }

          .cert-issuance-clear-btn {
            padding: 0.75rem 1.5rem;
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 0.875rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            white-space: nowrap;
          }

          .cert-issuance-clear-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.3);
          }

          .cert-issuance-results-count {
            font-size: 0.75rem;
            color: #6b7280;
            font-weight: 500;
            text-align: center;
          }

          .cert-issuance-no-results {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 3rem 2rem;
            gap: 1rem;
          }

          .cert-issuance-no-results p {
            color: #6b7280;
            font-size: 1rem;
            margin: 0;
          }

          .cert-issuance-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 300px;
            gap: 1rem;
          }

          .cert-issuance-spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-radius: 50%;
            border-top: 4px solid #3498db;
            width: 40px;
            height: 40px;
            animation: cert-issuance-spin 1s linear infinite;
          }

          @keyframes cert-issuance-spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          .cert-issuance-error {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 200px;
            gap: 1rem;
          }

          .cert-issuance-error-msg {
            color: #ef4444;
            font-weight: 500;
          }

          .cert-issuance-retry-btn {
            padding: 0.5rem 1rem;
            background-color: #3b82f6;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.2s;
          }

          .cert-issuance-retry-btn:hover {
            background-color: #2563eb;
          }

          .cert-issuance-title {
            font-size: 2.5rem;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 0.5rem;
            letter-spacing: -0.025em;
          }

          .cert-issuance-subtitle {
            font-size: 1.125rem;
            color: #64748b;
            font-weight: 400;
            margin: 0;
          }

          .cert-issuance-table-wrapper {
            max-width: calc(100vw - 330px);
            margin: 0;
            margin-left: 1rem;
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
            overflow: hidden;
            border: 1px solid #e2e8f0;
          }

          .cert-issuance-table-container {
            height: 300px;
            overflow-y: auto;
            overflow-x: auto;
          }

          .cert-issuance-table-container::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }

          .cert-issuance-table-container::-webkit-scrollbar-track {
            background: #f1f5f9;
          }

          .cert-issuance-table-container::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
          }

          .cert-issuance-table-container::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }

          .cert-issuance-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.875rem;
            background: white;
          }

          .cert-issuance-table thead {
            position: sticky;
            top: 0;
            z-index: 10;
          }

          .cert-issuance-table th {
            background: linear-gradient(135deg, #334155 0%, #475569 100%);
            color: white;
            padding: 1rem 1.5rem;
            text-align: left;
            font-weight: 600;
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border-bottom: 2px solid #1e293b;
          }

          .cert-issuance-table th:first-child {
            width: 80px;
            text-align: center;
          }
          .cert-issuance-table th:nth-child(2) {
            width: 150px;
          }
          .cert-issuance-table th:nth-child(3) {
            width: 200px;
          }
          .cert-issuance-table th:nth-child(4) {
            width: 250px;
          }
          .cert-issuance-table th:last-child {
            width: 120px;
            text-align: center;
          }

          .cert-issuance-table tbody tr {
            transition: all 0.2s ease;
            border-bottom: 1px solid #f1f5f9;
            height: 60px;
          }

          .cert-issuance-table tbody tr:hover {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            transform: translateY(-1px);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }

          .cert-issuance-table tbody tr:nth-child(even) {
            background: #fafbfc;
          }

          .cert-issuance-table tbody tr:nth-child(even):hover {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          }

          .cert-issuance-table td {
            padding: 1rem 1.5rem;
            vertical-align: middle;
            font-weight: 500;
          }

          .cert-issuance-id {
            text-align: center;
            font-weight: 600;
            color: #6b7280;
            font-size: 0.875rem;
          }

          .cert-issuance-eti-id {
            font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
            font-size: 0.8rem;
            font-weight: 600;
          }

          .cert-issuance-name {
            font-weight: 600;
            color: #1f2937;
            font-size: 0.9rem;
          }

          .cert-issuance-email {
            color: blue;
            font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
            font-size: 0.8rem;
          }

          .cert-issuance-email:hover {
            text-decoration: underline;
            cursor: pointer;
          }

          .cert-issuance-status {
            text-align: center;
          }

          .cert-issuance-status-badge {
            display: inline-block;
            padding: 0.5rem 1rem;
            border-radius: 50px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            transition: all 0.2s ease;
          }

          .cert-issuance-status-badge.active {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3);
          }

          .cert-issuance-status-badge.test {
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            color: white;
            box-shadow: 0 4px 6px -1px rgba(245, 158, 11, 0.3);
          }

          .cert-issuance-status-badge.inactive {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            color: white;
            box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.3);
          }

          .cert-issuance-status-badge:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 8px -1px rgba(0, 0, 0, 0.2);
          }

          .cert-issuance-pagination {
            margin: 2rem 1rem 0 1rem;
            display: flex;
            justify-content: center;
          }

          .cert-issuance-pagination-controls {
            display: flex;
            align-items: center;
            gap: 1rem;
            background: white;
            padding: 1rem 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            border: 1px solid #e2e8f0;
          }

          .cert-issuance-pagination-btn {
            padding: 0.5rem 1rem;
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 0.875rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .cert-issuance-pagination-btn:hover:not(:disabled) {
            transform: translateY(-1px);
            box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
          }

          .cert-issuance-pagination-btn:disabled {
            background: #e5e7eb;
            color: #9ca3af;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }

          .cert-issuance-pagination-numbers {
            display: flex;
            gap: 0.5rem;
          }

          .cert-issuance-pagination-number {
            padding: 0.5rem 0.75rem;
            background: #f8fafc;
            color: #64748b;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            font-size: 0.875rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            min-width: 40px;
          }

          .cert-issuance-pagination-number:hover {
            background: #e2e8f0;
            color: #475569;
          }

          .cert-issuance-pagination-number.active {
            background: linear-gradient(135deg, #334155 0%, #475569 100%);
            color: white;
            border-color: #334155;
          }

          @media (max-width: 1024px) {
            .cert-issuance-wrapper {
              margin-left: 210px;
              padding-right: 2rem;
            }

            .cert-issuance-table-wrapper {
              max-width: calc(100vw - 280px);
            }

            .cert-issuance-filter-container {
              flex-direction: column;
              align-items: stretch;
            }

            .cert-issuance-filter-actions {
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
            }

            .cert-issuance-pagination {
              margin: 1.5rem 0 0 0;
            }

            .cert-issuance-pagination-controls {
              padding: 0.75rem 1rem;
              gap: 0.5rem;
            }

            .cert-issuance-pagination-btn {
              padding: 0.4rem 0.8rem;
              font-size: 0.8rem;
            }

            .cert-issuance-pagination-number {
              padding: 0.4rem 0.6rem;
              font-size: 0.8rem;
              min-width: 35px;
            }
          }

          @media (max-width: 768px) {
            .cert-issuance-wrapper {
              margin-left: 0;
              margin-top: 60px;
              padding: 1rem;
            }

            .cert-issuance-table-wrapper {
              max-width: 100%;
              margin-left: 0;
            }

            .cert-issuance-filters {
              margin-left: 0;
            }

            .cert-issuance-header {
              margin-left: 0;
              text-align: center;
            }

            .cert-issuance-title {
              font-size: 2rem;
            }

            .cert-issuance-table-container {
              height: 280px;
            }

            .cert-issuance-table tbody tr {
              height: 50px;
            }

            .cert-issuance-table th,
            .cert-issuance-table td {
              padding: 0.75rem 1rem;
            }

            .cert-issuance-table th:nth-child(2) {
              width: 120px;
            }
            .cert-issuance-table th:nth-child(3) {
              width: 150px;
            }
            .cert-issuance-table th:nth-child(4) {
              width: 200px;
            }
          }

          @media (max-width: 480px) {
            .cert-issuance-title {
              font-size: 1.75rem;
            }

            .cert-issuance-subtitle {
              font-size: 1rem;
            }

            .cert-issuance-table {
              font-size: 0.8rem;
            }

            .cert-issuance-table tbody tr {
              height: 45px;
            }

            .cert-issuance-table th,
            .cert-issuance-table td {
              padding: 0.5rem 0.75rem;
            }

            .cert-issuance-filter-group {
              min-width: 100%;
            }

            .cert-issuance-pagination-controls {
              flex-direction: column;
              gap: 1rem;
            }

            .cert-issuance-pagination-numbers {
              flex-wrap: wrap;
              justify-content: center;
            }
          }
        `}</style>
      </div>
    </>
  );
}
