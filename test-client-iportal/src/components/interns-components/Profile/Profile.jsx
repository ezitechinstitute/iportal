import React, { useState, useEffect } from 'react';
import InternTopbar from "../InternTopbar/InternTopbar";
import InternSidebar from "../InternSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [token] = useState(sessionStorage.getItem("token"));
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    image: '',
    password: '',
  });
  const [formData, setFormData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");
  const internEmail = sessionStorage.getItem("email"); // Assuming email is stored in sessionStorage

  // Check login status
  // useEffect(() => {
  //   if (!check || !token) {
  //     navigate("/");
  //   }
  // }, [check, token, navigate]);

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (!internEmail || !token) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.post(
          "https://api.ezitech.org/intern-details",
          { email: internEmail },
          {
            headers: { "x-access-token": token },
          }
        );
        if (response.data.internDetails) {
          setProfile(response.data.internDetails);
          setFormData(response.data.internDetails);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [internEmail, token]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!internEmail || !token) {
      alert("Authentication required");
      return;
    }

    try {
      const response = await axios.post(
        "https://api.ezitech.org/intern-update-details",
        {
          oldEmail: internEmail,
          newEmail: formData.email,
          name: formData.name,
          phone: formData.phone,
          password: formData.password,
        },
        {
          headers: { 
            "x-access-token": token,
            "Content-Type": "application/json"
          }
        }
      );
      if (response.data.message === "Intern details updated successfully!") {
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
        const response = await axios.post(
          "https://api.ezitech.org/intern-update-image",
          { email: internEmail, image: base64String },
          {
            headers: { 
              "x-access-token": token,
              "Content-Type": "application/json"
            }
          }
        );
        if (response.data.message === "Image updated successfully!") {
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
      <InternTopbar />
      <InternSidebar />
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
                    <div className="card-header  d-flex  justify-content-between align-items-center" style={{gap:10}}>
                      <h4 className="card-title">Profile Information</h4>
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => setIsModalOpen(true)}
                        disabled={!internEmail || !token}
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
                      <div className="profile-details mt-3">
                        <p><strong>Name:</strong> {profile.name || 'Not set'}</p>
                        <p><strong>Email:</strong> {profile.email || 'Not set'}</p>
                        <p><strong>Phone:</strong> {profile.phone || 'Not set'}</p>
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
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={formData.phone || ''}
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
                      onChange={handleInputChange}
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