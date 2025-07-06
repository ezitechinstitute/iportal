import React, { useState, useRef } from 'react';
import { 
  User, 
  Edit3, 
  Save, 
  X, 
  Camera, 
  Shield, 
  Briefcase, 
  Building, 
  MapPin, 
  DollarSign, 
  BookOpen, 
  Clock, 
  Check, 
  FileText, 
  Video, 
  Mail, 
  Phone, 
  CheckCircle, 
  AlertCircle,
  Menu,
  Bell,
  Search,
  Home,
  Users,
  Calendar,
  Settings,
  LogOut
} from 'lucide-react';
import './Profile.css';

import { InternTopbar } from '../InternTopbar/InternTopbar';
import { InternSidebar } from '../InternSidebar';


export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Mock data - replace with actual data
  const [studentData] = useState({
    profileStatus: 'approved',
    verification: {
      isVerified: true,
      cnicPicture: true,
      shortVideo: false,
      email: true,
      phoneNumber: true
    },
    attendance: 85,
    overallRating: 4.2,
    completedProjects: 8,
    skillsRating: 4.0,
    joinDate: '2024-01-15',
    projects: [
      {
        name: 'E-commerce Platform',
        tech: 'React, Node.js, MongoDB',
        status: 'completed',
        completion: 100
      },
      {
        name: 'Mobile App Design',
        tech: 'React Native, Firebase',
        status: 'in-progress',
        completion: 75
      },
      {
        name: 'Data Analytics Dashboard',
        tech: 'Python, Django, PostgreSQL',
        status: 'completed',
        completion: 100
      },
      {
        name: 'AI Chatbot',
        tech: 'Python, TensorFlow, Flask',
        status: 'in-progress',
        completion: 60
      }
    ],
    skills: [
      { name: 'JavaScript', level: 90 },
      { name: 'React', level: 85 },
      { name: 'Node.js', level: 80 },
      { name: 'Python', level: 75 },
      { name: 'MongoDB', level: 70 },
      { name: 'UI/UX Design', level: 65 }
    ]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [pendingChanges, setPendingChanges] = useState({});
  
  const profilePictureRef = useRef(null);
  const bannerRef = useRef(null);

  // Mock current data - replace with actual data
  const [currentData, setCurrentData] = useState({
    name: 'Alizba',
    position: 'Software Development Intern',
    currentCompany: 'Tech Solutions Inc.',
    location: 'Rawalpindi, Pakistan',
    startingSalary: 45000,
    profilePicture: null,
    bannerBackground: null
  });

  const handleFileUpload = (type, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (type === 'profile') {
          setPendingChanges(prev => ({ ...prev, profilePicture: e.target.result }));
        } else if (type === 'banner') {
          setPendingChanges(prev => ({ ...prev, bannerBackground: e.target.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const saveChanges = () => {
    setCurrentData(prev => ({ ...prev, ...pendingChanges }));
    setPendingChanges({});
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setPendingChanges({});
    setIsEditing(false);
  };


  // Use currentData with pending changes for display
  const displayData = { ...currentData, ...pendingChanges };

  const VerificationModal = () => (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Verification Details</h3>
          <button
            onClick={() => setShowVerificationModal(false)}
            className="modal-close"
          >
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <p>
            Complete all verification steps to unlock full platform features and increase your profile credibility.
          </p>
          <div className="verification-list">
            {[
              { label: 'CNIC Picture', status: studentData.verification.cnicPicture },
              { label: 'Short Video', status: studentData.verification.shortVideo },
              { label: 'Email Verification', status: studentData.verification.email },
              { label: 'Phone Verification', status: studentData.verification.phoneNumber }
            ].map((item, index) => (
              <div key={index} className="verification-item">
                <span>{item.label}</span>
                {item.status ? (
                  <CheckCircle size={16} className="status-verified" />
                ) : (
                  <AlertCircle size={16} className="status-pending" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    
    <div className="app-container">
      <InternSidebar/>
      <InternTopbar />
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="profile-container">
          {/* Header Section */}
          <div className="profile-header">
            <div className="header-content">
              <div className="header-text">
                <h1>Student Profile</h1>
                <p>Manage your profile and track your progress</p>
              </div>
              
              {/* Action Buttons */}
              <div className="header-actions">
                {/* Profile Status */}
                <div className="status-badges">
                  {studentData.profileStatus === 'draft' && (
                    <span className="status-badge status-draft">Draft</span>
                  )}
                  {studentData.profileStatus === 'pending' && (
                    <span className="status-badge status-pending">
                      <Clock size={16} />
                      <span>Pending Approval</span>
                    </span>
                  )}
                  {studentData.profileStatus === 'approved' && (
                    <span className="status-badge status-approved">
                      <Check size={16} />
                      <span>Approved</span>
                    </span>
                  )}
                  {studentData.profileStatus === 'rejected' && (
                    <span className="status-badge status-rejected">
                      <X size={16} />
                      <span>Rejected</span>
                    </span>
                  )}
                </div>
                
                {/* Verification Badge */}
                <button
                  onClick={() => setShowVerificationModal(true)}
                  className={`verification-btn ${studentData.verification.isVerified ? 'verified' : 'unverified'}`}
                >
                  <Shield size={16} />
                  <span>
                    {studentData.verification.isVerified ? 'Verified' : 'Verify Profile'}
                  </span>
                </button>
                


                {/* Edit Button */}
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="edit-btn"
                  >
                    <Edit3 size={16} />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <div className="edit-actions">
                    <button
                      onClick={cancelEdit}
                      className="cancel-btn"
                    >
                      <X size={16} />
                      <span>Cancel</span>
                    </button>
                    <button
                      onClick={saveChanges}
                      className="save-btn"
                    >
                      <Save size={16} />
                      <span>Save Changes</span>
                    </button>
                  </div>
                  
                )}

                <button className="logout-btn">
                  <LogOut size={16} />
                  <span>
                    Logout
                  </span>
                </button>

              </div>
            </div>
          </div>

          {/* Profile Header Card */}
          <div className="profile-card">
            {/* Banner Section */}
            <div className="banner-section">
              <div 
                className="banner-background"
                style={{
                  backgroundImage: displayData.bannerBackground ? `url(${displayData.bannerBackground})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              >
                <div className="banner-overlay"></div>
                {isEditing && (
                  <button
                    onClick={() => bannerRef.current?.click()}
                    className="banner-edit-btn"
                  >
                    <Camera size={20} />
                  </button>
                )}
              </div>
              
              {/* Profile Picture */}
              <div className="profile-picture-container">
                <div className="profile-picture-wrapper">
                  <div className="profile-picture">
                    {displayData.profilePicture ? (
                      <img 
                        src={displayData.profilePicture} 
                        alt="Profile" 
                      />
                    ) : (
                      <div className="default-avatar">
                        <User size={48} />
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => profilePictureRef.current?.click()}
                      className="profile-edit-btn"
                    >
                      <Camera size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="profile-info">
              <div className="profile-details">
                <div className="profile-main">
                  <div className="profile-name-section">
                    {isEditing ? (
                      <input
                        type="text"
                        value={displayData.name}
                        onChange={(e) => setPendingChanges(prev => ({ ...prev, name: e.target.value }))}
                        className="name-input"
                      />
                    ) : (
                      <h2 className="profile-name">{displayData.name}</h2>
                    )}
                    {studentData.verification.isVerified && (
                      <Shield size={24} className="verified-icon" />
                    )}
                  </div>
                  
                  <div className="profile-meta">
                    <div className="meta-item">
                      <Briefcase size={16} />
                      <span>{displayData.position}</span>
                    </div>
                    <div className="meta-item">
                      <Building size={16} />
                      <span>{displayData.currentCompany}</span>
                    </div>
                    <div className="meta-item">
                      <MapPin size={16} />
                      <span>{displayData.location}</span>
                    </div>
                  </div>
                  
                  {/* Performance Metrics */}
                  <div className="metrics-grid">
                    <div className="metric-item">
                      <div className="metric-value attendance">{studentData.attendance}%</div>
                      <div className="metric-label">Attendance</div>
                    </div>
                    <div className="metric-item">
                      <div className="metric-value rating">{studentData.overallRating}</div>
                      <div className="metric-label">Overall Rating</div>
                    </div>
                    <div className="metric-item">
                      <div className="metric-value projects">{studentData.completedProjects}</div>
                      <div className="metric-label">Projects</div>
                    </div>
                    <div className="metric-item">
                      <div className="metric-value skills">{studentData.skillsRating}</div>
                      <div className="metric-label">Skills Rating</div>
                    </div>
                  </div>
                </div>
                
                {/* Salary Info */}
                <div className="salary-info">
                  <div className="salary-display">
                    {isEditing ? (
                      <input
                        type="number"
                        value={displayData.startingSalary}
                        onChange={(e) => setPendingChanges(prev => ({ ...prev, startingSalary: parseInt(e.target.value) }))}
                        className="salary-input"
                      />
                    ) : (
                      <span className="salary-value">{displayData.startingSalary.toLocaleString()}</span>
                    )}
                  </div>
                  <p className="salary-label">Expected Starting Salary in Rs.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="tabs-container">
            <div className="tabs-wrapper">
              {[
                { id: 'overview', label: 'Overview', icon: User },
                { id: 'projects', label: 'Projects', icon: Briefcase },
                { id: 'skills', label: 'Skills', icon: BookOpen },
                { id: 'verification', label: 'Verification', icon: Shield }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                >
                  <tab.icon size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-grid">
                {/* Performance Chart */}
                <div className="performance-section">
                  <h3>Performance Overview</h3>
                  <div className="performance-metrics">
                    <div className="performance-item">
                      <div className="performance-header">
                        <span>Attendance</span>
                        <span className="performance-value attendance">{studentData.attendance}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill attendance"
                          style={{ width: `${studentData.attendance}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="performance-item">
                      <div className="performance-header">
                        <span>Overall Rating</span>
                        <span className="performance-value rating">{studentData.overallRating}/5</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill rating"
                          style={{ width: `${(studentData.overallRating / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="stats-section">
                  <h3>Quick Stats</h3>
                  <div className="stats-list">
                    <div className="stat-item">
                      <span>Projects Completed</span>
                      <span className="stat-value projects">{studentData.completedProjects}</span>
                    </div>
                    <div className="stat-item">
                      <span>Skills Rating</span>
                      <span className="stat-value skills">{studentData.skillsRating}/5</span>
                    </div>
                    <div className="stat-item">
                      <span>Join Date</span>
                      <span className="stat-value">{new Date(studentData.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="projects-section">
                <h3>Projects Portfolio</h3>
                <div className="projects-grid">
                  {studentData.projects.map((project, index) => (
                    <div key={index} className="project-card">
                      <div className="project-header">
                        <h4>{project.name}</h4>
                        <span className={`project-status ${project.status}`}>
                          {project.status}
                        </span>
                      </div>
                      <p className="project-tech">{project.tech}</p>
                      <div className="project-progress">
                        <div className="progress-header">
                          <span>Progress</span>
                          <span>{project.completion}%</span>
                        </div>
                        <div className="progress-bar">
                          <div 
                            className={`progress-fill ${project.completion === 100 ? 'completed' : 'in-progress'}`}
                            style={{ width: `${project.completion}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="skills-section">
                <h3>Skills & Expertise</h3>
                <div className="skills-grid">
                  {studentData.skills.map((skill, index) => (
                    <div key={index} className="skill-item">
                      <div className="skill-header">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-level">{skill.level}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill skill"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'verification' && (
              <div className="verification-section">
                <h3>Verification Status</h3>
                <div className="verification-grid">
                  {[
                    { icon: FileText, label: 'CNIC Picture', status: studentData.verification.cnicPicture, description: 'Upload your CNIC for identity verification' },
                    { icon: Video, label: 'Short Video', status: studentData.verification.shortVideo, description: 'Record a short introduction video' },
                    { icon: Mail, label: 'Email Verification', status: studentData.verification.email, description: 'Verify your email address' },
                    { icon: Phone, label: 'Phone Verification', status: studentData.verification.phoneNumber, description: 'Verify your phone number' }
                  ].map((item, index) => (
                    <div key={index} className="verification-card">
                      <div className={`verification-icon ${item.status ? 'verified' : 'unverified'}`}>
                        <item.icon size={20} />
                      </div>
                      <div className="verification-content">
                        <div className="verification-header">
                          <span className="verification-label">{item.label}</span>
                          {item.status ? (
                            <CheckCircle size={16} className="status-verified" />
                          ) : (
                            <AlertCircle size={16} className="status-pending" />
                          )}
                        </div>
                        <p className="verification-description">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* File Upload Inputs */}
      <input
        ref={profilePictureRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => handleFileUpload('profile', e.target.files[0])}
      />
      <input
        ref={bannerRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => handleFileUpload('banner', e.target.files[0])}
      />

      {/* Verification Modal */}
      {showVerificationModal && <VerificationModal />}
    </div>
  );
}