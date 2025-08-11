import React, { useState, Fragment } from 'react';
import Layout from '../components/Layout';
import { Tab } from '@headlessui/react';
import { Lock, ShieldCheck, Trash } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Settings = () => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: true,
    twoFactor: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("affiliateToken");
    if (!token) {
      toast.error("Login required.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New password and confirm password do not match.');
      return;
    }

    try {
      const res = await fetch('http://localhost:8088/api/affiliate/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: formData.oldPassword.trim(),
          newPassword: formData.newPassword.trim(),
          confirmPassword: formData.confirmPassword.trim(),
        }),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (!res.ok) {
        toast.error(data?.error || 'Failed to update password');
        return;
      }

      toast.success(data.message || 'Password updated successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("affiliateToken");
    if (!token) {
      toast.error("Login required.");
      return;
    }

    if (!deletePassword.trim()) {
      toast.error("Please enter your password.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8088/api/affiliate/delete-account", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password: deletePassword.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.error || "Failed to delete account");
        return;
      }

      toast.success("Account deleted successfully.");
      localStorage.removeItem("affiliateToken");
      window.location.href = "/login";
    } catch (err) {
      toast.error(err.message);
    }
  };

  const tabs = ['Password', 'Security'];

  return (
    <Layout>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-left">Account Settings</h1>

        <Tab.Group>
          <Tab.List className="flex flex-wrap justify-left gap-2 sm:gap-4 border-b mb-6">
            {tabs.map((tab) => (
              <Tab key={tab} as={Fragment}>
                {({ selected }) => (
                  <button
                    className={classNames(
                      'outline-none py-2 px-4 text-sm font-medium border-b-2 transition-all',
                      selected
                        ? 'border-[#9086F3] text-[#9086F3]'
                        : 'border-transparent text-gray-500 hover:text-blue-[#9086F3]'
                    )}
                  >
                    {tab}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="mt-4 space-y-6">
            {/* Password */}
            <Tab.Panel className="bg-white rounded-md shadow p-6 border space-y-4">
              <div className="flex items-center gap-2 mb-4 text-red-600">
                <Lock className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Change Password</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-flow-row gap-4">
                <div className="w-full flex flex-col">
                  <label className="text-sm font-medium text-gray-700">Old Password</label>
                  <input
                    name="oldPassword"
                    type="password"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:shadow-md focus:border-[#9086F3]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full">
                    <label className="text-sm font-medium text-gray-700">New Password</label>
                    <input
                      name="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:shadow-md focus:border-[#9086F3]"
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:shadow-md focus:border-[#9086F3]"
                    />
                  </div>
                </div>
              </div>
              <div className="text-center mt-8">
          <button
            onClick={handleSubmit}
            className="px-6 mt-10 py-3 bg-[#9086F3] text-white rounded-md hover:bg-[#8176df] transition w-full sm:w-auto"
          >
            Save All Changes
          </button>
        </div>
            </Tab.Panel>

            {/* Security */}
            <Tab.Panel className="bg-white rounded-md shadow p-6 border space-y-4">
              <div className="flex items-center gap-2 mb-4 text-green-600">
                <ShieldCheck className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Security</h2>
              </div>
              <label className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  name="twoFactor"
                  checked={formData.twoFactor}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
                <span className="text-gray-700">Enable Two-Factor Authentication</span>
              </label>
              <div className="text-sm text-gray-500">
                Last login: July 23, 2025 — IP: 192.168.1.10
              </div>

              {/* Danger Zone */}
              <div className="bg-white rounded-md shadow p-6 border border-red-200">
                <div className="flex items-center gap-2 mb-4 text-red-600">
                  <Trash className="w-5 h-5" />
                  <h2 className="text-lg font-semibold">Danger Zone</h2>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  Deleting your account is permanent and cannot be undone.
                </p>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition w-full sm:w-auto"
                >
                  Delete My Account
                </button>

                {showDeleteModal && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 mx-1 rounded-md shadow-lg max-w-sm w-full">
                      <h3 className="text-lg font-semibold mb-4 text-red-600">Confirm Account Deletion</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Please enter your password to confirm account deletion.
                      </p>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none mb-4"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setShowDeleteModal(false)}
                          className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleDeleteAccount}
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>

        
        <ToastContainer />
      </div>
    </Layout>
  );
};

export default Settings;
