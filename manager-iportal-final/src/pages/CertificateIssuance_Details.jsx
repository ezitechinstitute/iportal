'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Certificate from '../components/Certificate_temp';
import { ManagerSidebar } from '../components/ManagerSidebar';
import { ManagerTopbar } from '../components/ManagerTopbar';
import './style/CertificateIssuanceDetails.css';

const CertificateIssuanceDetails = () => {
  const { email } = useParams();
  const [internData, setInternData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [certificateLoading, setCertificateLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projectsError, setProjectsError] = useState(null);
  const [isEligible, setIsEligible] = useState(false);
  const [eligibilityMessage, setEligibilityMessage] = useState('');
  const [isCertificateAllowed, setIsCertificateAllowed] = useState(false);

  // Calculate eligibility based on join date and duration
  const calculateEligibility = (joinDate, duration) => {
    try {
      const joinDateObj = new Date(joinDate);
      const currentDate = new Date();
      const durationMonths = Number.parseInt(duration.split(' ')[0]);

      // Calculate completion date
      const completionDate = new Date(joinDateObj);
      completionDate.setMonth(completionDate.getMonth() + durationMonths);

      const isEligible = currentDate >= completionDate;

      if (isEligible) {
        return {
          eligible: true,
          message: `Congratulations! Internship completed on ${completionDate.toLocaleDateString()}. Certificate can be generated.`,
        };
      } else {
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

  // Fetch intern data from API
  useEffect(() => {
    const fetchInternData = async () => {
      try {
        if (!email) {
          throw new Error('Email parameter is missing in URL');
        }

        setLoading(true);
        setError(null);

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

        if (response.status === 404) {
          throw new Error(`No intern found with email: ${email}`);
        }

        if (response.status !== 200 || !response.data?.data?.length) {
          throw new Error('Invalid data received from server');
        }

        const intern = response.data.data[0];
        setInternData(intern);

        // Calculate eligibility
        const eligibilityResult = calculateEligibility(
          intern.join_date,
          intern.duration
        );
        setIsEligible(eligibilityResult.eligible);
        setEligibilityMessage(eligibilityResult.message);
      } catch (err) {
        console.error('Error fetching intern data:', err);
        setError(
          err.response?.data?.message ||
            err.message ||
            'Failed to fetch intern data. Please try again later.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInternData();
  }, [email]);

  // Fetch intern projects from API
  useEffect(() => {
    const fetchInternProjects = async () => {
      if (!email) return;

      try {
        setProjectsLoading(true);
        setProjectsError(null);

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

        if (response.status === 404) {
          setProjects([]);
          return;
        }

        if (response.status !== 200) {
          throw new Error('Failed to fetch projects data');
        }

        setProjects(response.data.data || []);
      } catch (err) {
        console.error('Error fetching intern projects:', err);
        setProjectsError(
          err.response?.data?.message ||
            err.message ||
            'Failed to fetch projects data.'
        );
      } finally {
        setProjectsLoading(false);
      }
    };

    if (internData) {
      fetchInternProjects();
    }
  }, [email, internData]);

  // Simulate certificate loading
  const handleCertificateLoad = () => {
    if (!isEligible || !isCertificateAllowed) return;

    setCertificateLoading(true);
    // Simulate loading for 2 seconds
    setTimeout(() => {
      setCertificateLoading(false);
    }, 2000);
  };

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
      <ManagerTopbar />
      <ManagerSidebar />
      <div className='cert-main-container'>
        {/* Content Area - Right Side */}
        <div className='cert-content-area'>
          {/* Eligibility Status Banner */}
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
              {/* Toggle Button */}
              <div
                className={`cert-toggle-container ${
                  !isEligible ? 'cert-disabled' : ''
                }`}
              >
                <div className='checkbox-wrapper-35'>
                  <input
                    value='private'
                    name='switch'
                    id='switch'
                    type='checkbox'
                    className='switch'
                    checked={isCertificateAllowed}
                    onChange={() =>
                      setIsCertificateAllowed(!isCertificateAllowed)
                    }
                    disabled={!isEligible}
                  />
                  <label htmlFor='switch'>
                    <span className='switch-x-text'>Allow certificate </span>
                    <span className='switch-x-toggletext'>
                      <span className='switch-x-unchecked'>
                        <span className='switch-x-hiddenlabel'>
                          Unchecked:{' '}
                        </span>
                        Off
                      </span>
                      <span className='switch-x-checked'>
                        <span className='switch-x-hiddenlabel'>Checked: </span>
                        On
                      </span>
                    </span>
                  </label>
                </div>
                <span className='cert-toggle-label'>
                  {isCertificateAllowed
                    ? 'Certificate generation enabled'
                    : 'Certificate generation disabled'}
                </span>
              </div>

              {/* Certificate Container with Loading State */}
              <div className='cert-certificate-container'>
                {!isCertificateAllowed && (
                  <div
                    className={`cert-get-certificate-btn ${
                      isEligible && isCertificateAllowed
                        ? 'enabled'
                        : 'disabled'
                    }`}
                    onClick={handleCertificateLoad}
                  >
                    Get Certificate
                  </div>
                )}
                {/* Show Certificate only when allowed and not loading */}
                {isCertificateAllowed && !certificateLoading && isEligible && (
                  <Certificate internData={internData} projects={projects} />
                )}
              </div>
            </div>
          </div>

          {/* Main Content with Scroll */}
          <div className='cert-scrollable-content'>
            <div className='cert-header'>
              <h1>Certificate Issuance Details</h1>
              <div className='cert-ids'>
                <span className='cert-eti-id'>ETI ID: {internData.eti_id}</span>
                <span className='cert-email'>Email: {email}</span>
              </div>
            </div>

            {/* Personal Information Section */}
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

            {/* Location Information Section */}
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

            {/* Internship Information Section */}
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

            {/* Projects Information Section */}
            <div className='cert-section'>
              <h2 className='cert-section-title'>
                <span className='cert-icon'>🚀</span>
                Project Information
                {projects.length > 0 && (
                  <span className='cert-badge'>{projects.length} projects</span>
                )}
              </h2>

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
                <div className='cert-projects-grid'>
                  {projects.map((project, index) => (
                    <div key={index} className='cert-project-card'>
                      <h3 className='cert-project-title'>
                        {project.title || `Project ${index + 1}`}
                      </h3>
                      <div className='cert-project-details'>
                        {project.description && (
                          <div className='cert-project-field'>
                            <label>Description:</label>
                            <span>{project.description}</span>
                          </div>
                        )}
                        {project.technologies && (
                          <div className='cert-project-field'>
                            <label>Technologies:</label>
                            <span>{project.technologies}</span>
                          </div>
                        )}
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

            {/* Interview Information Section */}
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

            {/* System Information Section */}
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
