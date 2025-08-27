import { useEffect, useState } from 'react';
import { ManagerSidebar } from '../components/ManagerSidebar';
import { ManagerTopbar } from '../components/ManagerTopbar';

const OfferLetter = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(null);

  // Fetch all offer letter requests on component mount
  useEffect(() => {
    const fetchAllRequests = async () => {
      try {
        const response = await fetch(
          'https://api.ezitech.org/offer-letter-request'
        );
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
      const response = await fetch(
        `https://api.ezitech.org/offer-letter-request/${requestId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setRequests(
          requests.map(request =>
            request.id === requestId
              ? { ...request, status: newStatus }
              : request
          )
        );
        setError(null);
      } else {
        setError(data.message || 'Failed to update status');
      }
    } catch (error) {
      console.error('Network error updating status:', error);
      setError('Network error updating status');
    }
  };

  // Copy email to clipboard
  const copyEmail = (email, id) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(id);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  return (
    <>
      <ManagerTopbar />
      <ManagerSidebar />
      <div className='app-content content'>
        <div className='content-overlay'></div>
        <div className='header-navbar-shadow'></div>
        <div className='content-wrapper'>
          <div className='content-header row'></div>
          <div className='content-body mt-3'>
            <div className='d-flex justify-content-between align-items-center mb-3'>
              <h2 className='mb-0'>Offer Letter Requests</h2>
              <div className='text-muted'>
                Total Requests:{' '}
                <span className='font-weight-bold'>{requests.length}</span>
              </div>
            </div>

            {loading && (
              <div className='text-center py-5'>
                <div className='spinner-border text-primary' role='status'>
                  <span className='sr-only'>Loading...</span>
                </div>
                <p className='mt-2'>Loading requests...</p>
              </div>
            )}

            {error && (
              <div className='alert alert-danger mb-3'>
                <i className='fas fa-exclamation-circle mr-2'></i>
                {error}
              </div>
            )}

            {requests.length > 0 ? (
              <div className='card'>
                <div className='card-body p-0'>
                  <div className='table-container'>
                    <table className='table table-hover mb-0'>
                      <thead className='thead-light'>
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
                          <th className='text-center'>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {requests.map(request => (
                          <tr key={request.id}>
                            <td className='font-weight-bold'>#{request.id}</td>
                            <td>{request.username}</td>
                            <td>
                              <div className='d-flex align-items-center'>
                                <a
                                  href={`mailto:${request.email}`}
                                  className='text-primary email-link'
                                  onClick={e => e.stopPropagation()}
                                >
                                  <i className='fas fa-envelope mr-1'></i>
                                  {request.email}
                                </a>
                                <button
                                  className='btn btn-link btn-sm copy-btn'
                                  onClick={() =>
                                    copyEmail(request.email, request.id)
                                  }
                                  title='Copy email'
                                >
                                  {copiedEmail === request.id ? (
                                    <i className='fas fa-check text-success'></i>
                                  ) : (
                                    <i className='far fa-copy text-muted'></i>
                                  )}
                                </button>
                              </div>
                            </td>
                            <td>{request.ezi_id || '-'}</td>
                            <td>{request.intern_status || '-'}</td>
                            <td>
                              <span className='tech-badge'>
                                {request.tech || '-'}
                              </span>
                            </td>
                            <td
                              className='text-truncate'
                              style={{ maxWidth: '200px' }}
                              title={request.reason}
                            >
                              {request.reason}
                            </td>
                            <td>
                              <span
                                className={`status-badge badge badge-${
                                  request.status === 'accept'
                                    ? 'success'
                                    : request.status === 'reject'
                                    ? 'danger'
                                    : 'warning'
                                }`}
                              >
                                {request.status === 'accept'
                                  ? 'Accepted'
                                  : request.status === 'reject'
                                  ? 'Rejected'
                                  : 'Pending'}
                              </span>
                            </td>
                            <td>
                              <small className='text-muted'>
                                {new Date(request.created_at).toLocaleString()}
                              </small>
                            </td>
                            <td className='text-center'>
                              {request.status === 'pending' ? (
                                <div className='action-buttons'>
                                  <button
                                    className='btn btn-success btn-sm mr-2 accept-btn'
                                    onClick={() =>
                                      handleStatusUpdate(request.id, 'accept')
                                    }
                                  >
                                    <i className='fas fa-check mr-1'></i> Accept
                                  </button>
                                  <button
                                    className='btn btn-danger btn-sm reject-btn'
                                    onClick={() =>
                                      handleStatusUpdate(request.id, 'reject')
                                    }
                                  >
                                    <i className='fas fa-times mr-1'></i> Reject
                                  </button>
                                </div>
                              ) : (
                                <span className='text-success'>
                                  <i className='fas fa-check-circle mr-1'></i>
                                  Action Completed
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              !loading &&
              !error && (
                <div className='text-center py-5'>
                  <i className='fas fa-inbox fa-3x text-muted mb-3'></i>
                  <p className='text-muted'>No offer letter requests found.</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .table-container {
          max-height: calc(100vh - 250px);
          overflow: auto;
          border-radius: 8px;
        }

        .table {
          min-width: 1200px;
        }

        .table th {
          position: sticky;
          top: 0;
          background: #f8f9fa;
          z-index: 10;
          white-space: nowrap;
          vertical-align: middle;
        }

        .table td {
          vertical-align: middle;
          white-space: nowrap;
        }

        .status-badge {
          font-size: 0.75rem;
          padding: 0.35em 0.65em;
          border-radius: 50rem;
          text-transform: capitalize;
        }

        .tech-badge {
          display: inline-block;
          padding: 0.25em 0.6em;
          font-size: 0.75rem;
          font-weight: 600;
          line-height: 1;
          color: #fff;
          background-color: #6c757d;
          border-radius: 0.25rem;
        }

        .accept-btn {
          min-width: 80px;
          transition: all 0.2s;
        }

        .accept-btn:hover {
          background-color: #218838;
          transform: translateY(-1px);
        }

        .reject-btn {
          min-width: 80px;
          transition: all 0.2s;
        }

        .reject-btn:hover {
          background-color: #c82333;
          transform: translateY(-1px);
        }

        .action-buttons {
          display: flex;
          justify-content: center;
        }

        .email-link {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          transition: color 0.2s;
          flex-grow: 1;
        }

        .email-link:hover {
          color: #0056b3 !important;
          text-decoration: underline;
        }

        .copy-btn {
          padding: 0.25rem;
          margin-left: 0.5rem;
          color: #6c757d;
          transition: all 0.2s;
        }

        .copy-btn:hover {
          color: #0056b3 !important;
          transform: scale(1.1);
        }

        @media (max-width: 1399.98px) {
          .table-container {
            max-height: calc(100vh - 200px);
          }
        }

        @media (max-width: 767.98px) {
          .table-container {
            max-height: calc(100vh - 180px);
          }

          .action-buttons {
            flex-direction: column;
            gap: 5px;
          }

          .accept-btn,
          .reject-btn {
            width: 100%;
            margin-right: 0 !important;
          }
        }
      `}</style>
    </>
  );
};

export default OfferLetter;
