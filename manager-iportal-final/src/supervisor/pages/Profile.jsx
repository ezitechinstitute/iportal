import React, { useState, useEffect } from 'react';
import { SupervisorTopbar } from "../components/SupervisorTopbar";
import { SupervisorSidebar } from "../components/SupervisorSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [token] = useState(sessionStorage.getItem("token"));
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    contact: '',
    image: '',
    password: '',
    emergency_contact: ''
  });
  const [formData, setFormData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");
  const managerId = sessionStorage.getItem("managerid");

  // Check login status
  useEffect(() => {
    if (!check || !token) {
      navigate("/");
    }
  }, [check, token, navigate]);

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (!managerId || !token) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.ezitech.org/supervisor/profile/${managerId}`,
          {
            headers: { "x-access-token": token }
          }
        );
        if (response.data.success) {
          setProfile(response.data.user);
          setFormData(response.data.user);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [managerId, token]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!managerId || !token) {
      alert("Authentication required");
      return;
    }

    try {
      const response = await axios.put(
        `https://api.ezitech.org/supervisor/profile/${managerId}`,
        formData,
        {
          headers: { 
            "x-access-token": token,
            "Content-Type": "application/json"
          }
        }
      );
      if (response.data.success) {
        setProfile(formData);
        setIsModalOpen(false);
        alert("Profile updated successfully");
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert("Failed to update profile");
    }
  };

  // Handle avatar update with Base64 conversion
  const handleAvatarUpdate = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result;

      try {
        const response = await axios.put(
          `https://api.ezitech.org/supervisor-avatar/${managerId}`,
          { image: base64String },
          {
            headers: { 
              "x-access-token": token,
              "Content-Type": "application/json"
            }
          }
        );
        if (response.data.success) {
          setProfile(prev => ({ ...prev, image: base64String }));
          alert("Avatar updated successfully");
        }
      } catch (error) {
        console.error('Error updating avatar:', error);
        alert("Failed to update avatar");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <SupervisorTopbar />
      <SupervisorSidebar />
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body">
            {loading ? (
              <div className="text-center">
                <h3>Loading...</h3>
              </div>
            ) : (
              <div className="row">
                <div className="col-12 col-md-6 mx-auto">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Profile Information</h4>
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => setIsModalOpen(true)}
                        disabled={!managerId || !token}
                      >
                        Edit Profile
                      </button>
                    </div>
                    <div className="card-body">
                      <div className="text-center mb-3">
                        <img 
                          src={profile.image || 'https://via.placeholder.com/150'} 
                          alt="Profile" 
                          className="rounded-circle" 
                          style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        />
                        <div className="mt-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarUpdate}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="profile-details">
                        <p><strong>Name:</strong> {profile.name || 'Not set'}</p>
                        <p><strong>Email:</strong> {profile.email || 'Not set'}</p>
                        <p><strong>Contact:</strong> {profile.contact || 'Not set'}</p>
                        <p><strong>Emergency Contact:</strong> {profile.emergency_contact || 'Not set'}</p>
                        <p><strong>Password:</strong> {profile.password ? '••••••••' : 'Not set'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Profile</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Contact</label>
                    <input
                      type="text"
                      className="form-control"
                      name="contact"
                      value={formData.contact || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Emergency Contact</label>
                    <input
                      type="text"
                      className="form-control"
                      name="emergency_contact"
                      value={formData.emergency_contact || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email || ''}
                      readOnly
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={formData.password || ''}
                      onChange={handleInputChange}
                      placeholder="Enter new password"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;