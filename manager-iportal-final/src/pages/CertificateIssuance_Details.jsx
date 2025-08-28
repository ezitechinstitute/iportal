'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Certificate from '../components/Certificate_temp';
import { ManagerSidebar } from '../components/ManagerSidebar';
import { ManagerTopbar } from '../components/ManagerTopbar';
import './style/CertificateIssuanceDetails.css';

const CertificateIssuanceDetails = () => {
  // Get email parameter from URL
  const { email } = useParams();

  // State management for intern data and loading states
  const [internData, setInternData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectsLoading, setProjectsLoading] = useState(false);

  // Error states for different API calls
  const [error, setError] = useState(null);
  const [projectsError, setProjectsError] = useState(null);

  // Eligibility and certificate states
  const [isEligible, setIsEligible] = useState(false);
  const [eligibilityMessage, setEligibilityMessage] = useState('');
  const [allowCertificate, setAllowCertificate] = useState('');

  const [isPublished, setIsPublished] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);

  // Calculate eligibility based on join date and duration
  const calculateEligibility = (joinDate, duration) => {
    try {
      // Parse join date and current date
      const joinDateObj = new Date(joinDate);
      const currentDate = new Date();
      const durationMonths = Number.parseInt(duration.split(' ')[0]);

      // Calculate when internship should be completed
      const completionDate = new Date(joinDateObj);
      completionDate.setMonth(completionDate.getMonth() + durationMonths);

      // Check if internship is completed
      const isEligible = currentDate >= completionDate;

      if (isEligible) {
        return {
          eligible: true,
          message: `Congratulations! Internship completed on ${completionDate.toLocaleDateString()}. Certificate can be generated.`,
        };
      } else {
        // Calculate remaining days
        const remainingDays = Math.ceil(
          (completionDate - currentDate) / (1000 * 60 * 60 * 24)
        );
        return {
          eligible: false,
          message: `Internship will complete on ${completionDate.toLocaleDateString()}. ${remainingDays} days remaining.`,
        };
      }
    } catch (err) {
      console.error('Error calculating eligibility:', err);
      return {
        eligible: false,
        message: 'Unable to determine eligibility due to invalid date format',
      };
    }
  };

  // Fetch intern data from API when component mounts
  useEffect(() => {
    const fetchInternData = async () => {
      try {
        // Validate email parameter exists
        if (!email) {
          throw new Error('Email parameter is missing in URL');
        }

        // Set loading state and clear previous errors
        setLoading(true);
        setError(null);

        console.log('[v0] Fetching intern data for email:', email);

        // Make API call to get intern data
        const response = await axios.get(
          `http://localhost:8000/get-intern-byemail/${email}`,
          {
            timeout: 10000,
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            validateStatus: status => {
              return status >= 200 && status < 500; // Reject only if status is >= 500
            },
          }
        );

        // Handle different response statuses
        if (response.status === 404) {
          throw new Error(`No intern found with email: ${email}`);
        }

        if (response.status !== 200 || !response.data?.data?.length) {
          throw new Error('Invalid data received from server');
        }

        // Extract intern data and set state
        const intern = response.data.data[0];
        setInternData(intern);

        setIsPublished(intern.isCertificate || false);

        // Calculate and set eligibility status
        const eligibilityResult = calculateEligibility(
          intern.join_date,
          intern.duration
        );
        setIsEligible(eligibilityResult.eligible);
        setEligibilityMessage(eligibilityResult.message);

        console.log('[v0] Successfully fetched intern data:', intern.name);
      } catch (err) {
        // Handle and log errors
        console.error('Error fetching intern data:', err);
        setError(
          err.response?.data?.message ||
            err.message ||
            'Failed to fetch intern data. Please try again later.'
        );
      } finally {
        // Always stop loading regardless of success/failure
        setLoading(false);
      }
    };

    fetchInternData();
  }, [email]);

  // Fetch intern projects when intern data is available
  useEffect(() => {
    const fetchInternProjects = async () => {
      // Don't fetch if no email available
      if (!email) return;

      try {
        // Set loading state for projects
        setProjectsLoading(true);
        setProjectsError(null);

        console.log('[v0] Fetching projects for email:', email);

        // Make API call to get projects
        const response = await axios.get(
          `http://localhost:8000/get-intern-projects-byemail/${email}`,
          {
            timeout: 10000,
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            validateStatus: status => {
              return status >= 200 && status < 500;
            },
          }
        );

        // Handle no projects found
        if (response.status === 404) {
          setProjects([]);
          console.log('[v0] No projects found for intern');
          return;
        }

        // Handle other errors
        if (response.status !== 200) {
          throw new Error('Failed to fetch projects data');
        }

        // Set projects data
        setProjects(response.data.data || []);
        console.log(
          '[v0] Successfully fetched projects:',
          response.data.data?.length || 0
        );
      } catch (err) {
        // Handle projects fetch errors
        console.error('Error fetching intern projects:', err);
        setProjectsError(
          err.response?.data?.message ||
            err.message ||
            'Failed to fetch projects data.'
        );
      } finally {
        // Stop projects loading
        setProjectsLoading(false);
      }
    };

    // Only fetch projects if intern data is loaded
    if (internData) {
      fetchInternProjects();
    }
  }, [email, internData]);

  const handleAllowedCertificate = async () => {
    try {
      // Set loading state for publish button
      setPublishLoading(true);
      console.log('[v0] Toggling certificate publish state...');

      // Make API call to toggle certificate allowance
      const res = await axios.put(
        `http://localhost:8000/iscertificate-allow-toggle/${email}`
      );

      console.log('[v0] Toggle response:', res?.data?.data?.newValue);

      // Update local state with new value
      if (res?.data) {
        const newPublishState = res?.data?.data?.newValue;
        setAllowCertificate(newPublishState);
        setIsPublished(newPublishState); // Update published state
        console.log('[v0] Updated publish state to:', newPublishState);
      }

      // Refresh intern data to get updated information
      console.log('[v0] Refreshing intern data after toggle...');
      const response = await axios.get(
        `http://localhost:8000/get-intern-byemail/${email}`,
        {
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          validateStatus: status => {
            return status >= 200 && status < 500;
          },
        }
      );

      // Handle response errors
      if (response.status === 404) {
        throw new Error(`No intern found with email: ${email}`);
      }

      if (response.status !== 200 || !response.data?.data?.length) {
        throw new Error('Invalid data received from server');
      }

      // Update intern data with fresh information
      const intern = response.data.data[0];
      setInternData(intern);
      setIsPublished(intern.isCertificate || false); // Ensure published state is synced
      console.log('[v0] Successfully refreshed intern data');
    } catch (error) {
      console.error('Error toggling certificate allowance:', error);
      alert('Failed to update certificate status. Please try again.');
    } finally {
      setPublishLoading(false);
    }
  };

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div className='cert-container'>
        <div className='cert-loading'>
          <div className='cert-spinner'></div>
          <p>Loading intern details...</p>
        </div>
      </div>
    );
  }

  // Show error message if data fetch failed
  if (error) {
    return (
      <div className='cert-container'>
        <div className='cert-error'>
          <h3>Error</h3>
          <p>{error}</p>
          {error.includes('email') && (
            <p>Please check the URL format: /certificate/:email</p>
          )}
        </div>
      </div>
    );
  }

  // Show no data message if intern not found
  if (!internData) {
    return (
      <div className='cert-container'>
        <div className='cert-no-data'>
          <h3>No Data Found</h3>
          <p>No intern data available for email: {email}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Top navigation bar */}
      <ManagerTopbar />
      {/* Side navigation menu */}
      <ManagerSidebar />

      <div className='cert-main-container'>
        {/* Main content area */}
        <div className='cert-content-area'>
          {/* Eligibility status banner with certificate controls */}
          <div
            className={`cert-eligibility-banner ${
              isEligible ? 'cert-eligible' : 'cert-not-eligible'
            }`}
          >
            <div className='cert-banner-content'>
              <h3>
                {isEligible
                  ? '✓ Certificate Eligible'
                  : '⏳ Certificate Not Ready'}
              </h3>
              <p>{eligibilityMessage}</p>
            </div>

            <div className='cert-banner-actions'>
              {/* Publish button container with fixed positioning */}
              <div className='cert-publish-section'>
                <div
                  className={`cert-toggle-container ${
                    !isEligible ? 'cert-disabled' : ''
                  }`}
                >
                  <button
                    onClick={handleAllowedCertificate}
                    className='btn-certificate-toggle'
                    disabled={!isEligible || publishLoading}
                  >
                    {publishLoading ? (
                      <>
                        <div className='cert-spinner-small'></div>
                        {isPublished ? 'Unpublishing...' : 'Publishing...'}
                      </>
                    ) : (
                      <>{isPublished ? 'Unpublish' : 'Publish'}</>
                    )}
                  </button>

                  {/* Status indicator for publish state */}
                  {/* <span className='cert-toggle-label'>
                    {publishLoading
                      ? 'Updating status...'
                      : isPublished
                      ? 'Certificate generation enabled'
                      : 'Certificate generation disabled'}
                  </span> */}
                </div>
              </div>

              {/* Certificate section with fixed height container */}
              <div className='cert-certificate-section'>
                <div
                  className={`cert-certificate-container ${
                    !isPublished || !isEligible ? 'cert-disabled' : ''
                  }`}
                >
                  {isPublished && isEligible ? (
                    <Certificate internData={internData} projects={projects} />
                  ) : (
                    <div className='cert-disabled-message'>
                      <p>
                        {!isEligible
                          ? 'internship not completed'
                          : 'not published yet'}
                      </p>
                      {!isEligible && (
                        <small>
                          Complete your internship duration to enable
                          certificate generation
                        </small>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable content area with all intern details */}
          <div className='cert-scrollable-content'>
            {/* Page header with intern identification */}
            <div className='cert-header'>
              <h1>Certificate Issuance Details</h1>
              <div className='cert-ids'>
                <span className='cert-eti-id'>ETI ID: {internData.eti_id}</span>
                <span className='cert-email'>Email: {email}</span>
              </div>
            </div>

            {/* Personal information section */}
            <div className='cert-section'>
              <h2 className='cert-section-title'>
                <span className='cert-icon'>👤</span>
                Personal Information
              </h2>
              <div className='cert-info-grid'>
                <div className='cert-info-item'>
                  <label>Full Name:</label>
                  <span>{internData.name}</span>
                </div>
                <div className='cert-info-item'>
                  <label>Email:</label>
                  <span>{internData.email}</span>
                </div>
                <div className='cert-info-item'>
                  <label>Phone:</label>
                  <span>{internData.phone}</span>
                </div>
                <div className='cert-info-item'>
                  <label>CNIC:</label>
                  <span>{internData.cnic}</span>
                </div>
                <div className='cert-info-item'>
                  <label>Gender:</label>
                  <span>{internData.gender}</span>
                </div>
                <div className='cert-info-item'>
                  <label>Birth Date:</label>
                  <span>
                    {new Date(internData.birth_date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Location and education information */}
            <div className='cert-section'>
              <h2 className='cert-section-title'>
                <span className='cert-icon'>📍</span>
                Location Information
              </h2>
              <div className='cert-info-grid'>
                <div className='cert-info-item'>
                  <label>City:</label>
                  <span>{internData.city}</span>
                </div>
                <div className='cert-info-item'>
                  <label>Country:</label>
                  <span>{internData.country}</span>
                </div>
                <div className='cert-info-item'>
                  <label>University:</label>
                  <span>{internData.university}</span>
                </div>
              </div>
            </div>

            {/* Internship details and status */}
            <div className='cert-section'>
              <h2 className='cert-section-title'>
                <span className='cert-icon'>💼</span>
                Internship Information
              </h2>
              <div className='cert-info-grid'>
                <div className='cert-info-item'>
                  <label>Technology:</label>
                  <span className='cert-technology'>
                    {internData.technology}
                  </span>
                </div>
                <div className='cert-info-item'>
                  <label>Duration:</label>
                  <span>{internData.duration}</span>
                </div>
                <div className='cert-info-item'>
                  <label>Join Date:</label>
                  <span>
                    {new Date(internData.join_date).toLocaleDateString()}
                  </span>
                </div>
                <div className='cert-info-item'>
                  <label>Intern Type:</label>
                  <span className='cert-intern-type'>
                    {internData.intern_type}
                  </span>
                </div>
                <div className='cert-info-item'>
                  <label>Status:</label>
                  <span
                    className={`cert-status ${internData.status.toLowerCase()}`}
                  >
                    {internData.status}
                  </span>
                </div>
                <div className='cert-info-item'>
                  <label>Internal Status:</label>
                  <span
                    className={`cert-status ${internData.int_status.toLowerCase()}`}
                  >
                    {internData.int_status}
                  </span>
                </div>
              </div>
            </div>

            {/* Projects completed during internship */}
            <div className='cert-section'>
              <h2 className='cert-section-title'>
                <span className='cert-icon'>🚀</span>
                Project Information
                {projects.length > 0 && (
                  <span className='cert-badge'>{projects.length} projects</span>
                )}
              </h2>

              {/* Handle different project loading states */}
              {projectsLoading ? (
                <div className='cert-projects-loading'>
                  <div className='cert-spinner-small'></div>
                  <p>Loading projects...</p>
                </div>
              ) : projectsError ? (
                <div className='cert-projects-error'>
                  <p>{projectsError}</p>
                </div>
              ) : projects.length === 0 ? (
                <div className='cert-no-projects'>
                  <p>No projects found for this intern.</p>
                </div>
              ) : (
                // Display all projects in a grid layout
                <div className='cert-projects-grid'>
                  {projects.map((project, index) => (
                    <div key={index} className='cert-project-card'>
                      <h3 className='cert-project-title'>
                        {project.title || `Project ${index + 1}`}
                      </h3>
                      <div className='cert-project-details'>
                        {/* Project description */}
                        {project.description && (
                          <div className='cert-project-field'>
                            <label>Description:</label>
                            <span>{project.description}</span>
                          </div>
                        )}
                        {/* Technologies used */}
                        {project.technologies && (
                          <div className='cert-project-field'>
                            <label>Technologies:</label>
                            <span>{project.technologies}</span>
                          </div>
                        )}
                        {/* GitHub repository link */}
                        {project.github_link && (
                          <div className='cert-project-field'>
                            <label>GitHub:</label>
                            <a
                              href={project.github_link}
                              target='_blank'
                              rel='noopener noreferrer'
                            >
                              View Repository
                            </a>
                          </div>
                        )}
                        {/* Live deployment link */}
                        {project.deployment_link && (
                          <div className='cert-project-field'>
                            <label>Live Demo:</label>
                            <a
                              href={project.deployment_link}
                              target='_blank'
                              rel='noopener noreferrer'
                            >
                              View Live Demo
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Interview details and scheduling */}
            <div className='cert-section'>
              <h2 className='cert-section-title'>
                <span className='cert-icon'>🎯</span>
                Interview Information
              </h2>
              <div className='cert-info-grid'>
                <div className='cert-info-item'>
                  <label>Interview Type:</label>
                  <span>{internData.interview_type}</span>
                </div>
                <div className='cert-info-item'>
                  <label>Interview Date:</label>
                  <span>
                    {new Date(internData.interview_date).toLocaleDateString()}
                  </span>
                </div>
                <div className='cert-info-item'>
                  <label>Interview Time:</label>
                  <span>{internData.interview_time}</span>
                </div>
              </div>
            </div>

            {/* System metadata and tracking information */}
            <div className='cert-section'>
              <h2 className='cert-section-title'>
                <span className='cert-icon'>⚙️</span>
                System Information
              </h2>
              <div className='cert-info-grid'>
                <div className='cert-info-item'>
                  <label>Record ID:</label>
                  <span>{internData.id}</span>
                </div>
                <div className='cert-info-item'>
                  <label>Created At:</label>
                  <span>
                    {new Date(internData.created_at).toLocaleString()}
                  </span>
                </div>
                <div className='cert-info-item'>
                  <label>Profile Image:</label>
                  <span>{internData.image}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CertificateIssuanceDetails;
