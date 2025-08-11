import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import Layout from '../components/Layout';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    referral_code: '',
    address: '',
    city: '',
    postal_code: '',
    bank_name: '',
    account_number: '',
    iban: '',
  });

  const [image, setImage] = useState('https://via.placeholder.com/150');
  const [selectedFile, setSelectedFile] = useState(null);

  const token = localStorage.getItem('affiliateToken');

  const fetchProfile = async () => {
    try {
      const res = await axios.get('http://localhost:8088/api/affiliate/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data.profile;
      let bankInfo = {};
      try {
        bankInfo = JSON.parse(data.bank_info || '{}');
      } catch (e) {
        console.warn('Failed to parse bank_info');
      }

      setProfile({
        name: data.name,
        email: data.email,
        referral_code: data.referral_code,
        address: data.address || '',
        city: data.city || '',
        postal_code: data.postal_code || '',
        bank_name: bankInfo.bankName || '',
        account_number: bankInfo.accountNumber || '',
        iban: bankInfo.accountTitle || '',
      });

      if (data.profile_image) {
        setImage(`http://localhost:8088/uploads/${encodeURIComponent(data.profile_image)}`);
      }


    } catch (err) {
      console.error('Failed to fetch profile', err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setSelectedFile(file); // 🔄 save file for upload
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("address", profile.address);
      formData.append("city", profile.city);
      formData.append("postal_code", profile.postal_code);
      if (selectedFile) {
        formData.append("profile_image", selectedFile);
      }

      await axios.put(
        'http://localhost:8088/api/affiliate/profile',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Bank Info Update separately
      await axios.put(
        'http://localhost:8088/api/affiliate/bank-info',
        {
          bankName: profile.bank_name,
          accountNumber: profile.account_number,
          accountTitle: profile.iban,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Profile and Bank Info updated successfully!');
    } catch (err) {
      console.error('Error updating info:', err);
      alert('Failed to update info');
    }
  };

  return (
    <Layout>
      <div className="px-10 py-10 bg-white shadow-lg mx-auto mt-8 max-w-4xl rounded-lg animate-fadeIn">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h2>

        {/* Profile Picture */}
        <div className="flex items-center mb-8 space-x-6">
          <div className="relative w-32 h-32">
            <img
              src={image}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
            />
            <label className="absolute bottom-0 right-0 bg-indigo-600 p-1 rounded-full cursor-pointer">
              <Upload className="w-4 h-4 text-white" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
          <div>
            <p className="text-gray-600">Upload your profile photo</p>
          </div>
        </div>

        {/* Basic Info */}
        <h3 className="text-xl font-semibold text-indigo-700 mb-3">Basic Info</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="text-gray-600 text-sm">Full Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
              disabled
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
              disabled
            />
          </div>
        </form>

        <hr className="my-6" />

        {/* Contact Info */}
        <h3 className="text-xl font-semibold text-indigo-700 mb-3">Contact Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="text-gray-600 text-sm">Address</label>
            <input
              type="text"
              name="address"
              value={profile.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">City</label>
            <input
              type="text"
              name="city"
              value={profile.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Postal Code</label>
            <input
              type="text"
              name="postal_code"
              value={profile.postal_code}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
            />
          </div>
        </div>

        <hr className="my-6" />

        {/* Bank Info */}
        <h3 className="text-xl font-semibold text-indigo-700 mb-3">Bank Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="text-gray-600 text-sm">Bank Name</label>
            <input
              type="text"
              name="bank_name"
              value={profile.bank_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Account Number</label>
            <input
              type="text"
              name="account_number"
              value={profile.account_number}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">IBAN</label>
            <input
              type="text"
              name="iban"
              value={profile.iban}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-10">
          <button
            type="button"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            onClick={handleSave}
          >
            Save & Change
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
