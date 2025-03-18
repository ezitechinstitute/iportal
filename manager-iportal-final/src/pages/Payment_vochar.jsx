import React, { useState, useEffect } from 'react';
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";

const AdminPaymentVoucher = () => {
    const [vouchers, setVouchers] = useState([]);
    const [formData, setFormData] = useState({
        amount: '',
        recipientType: 'Manager',
        recipientId: '',
        recipientName: '',
        adminAccountNo: '',
        date: '',
        status: 'Pending'
    });
    const [managers, setManagers] = useState([]);
    const [supervisors, setSupervisors] = useState([]);
    const [error, setError] = useState(null);
    const [editingVoucher, setEditingVoucher] = useState(null); // Track the voucher being edited

    const adminAccountNo = 'ACCT-1234-5678';
    const API_BASE_URL = 'https://api.ezitech.org';

    useEffect(() => {
        fetchManagers();
        fetchSupervisors();
        fetchVouchers();
    }, []);

    const fetchManagers = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/get-managers`);
            const data = await response.json();
            setManagers(data);
        } catch (error) {
            console.error('Error fetching managers:', error);
            setError('Failed to load managers');
        }
    };

    const fetchSupervisors = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/get-supervisors`);
            const data = await response.json();
            setSupervisors(data);
        } catch (error) {
            console.error('Error fetching supervisors:', error);
            setError('Failed to load supervisors');
        }
    };

    const fetchVouchers = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/get-payment`);
            const result = await response.json();
            if (result.success) {
                setVouchers(result.data);
            } else {
                setError(result.message);
            }
        } catch (error) {
            console.error('Error fetching vouchers:', error);
            setError('Failed to load payment vouchers');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'recipientType') {
            setFormData({ 
                ...formData, 
                recipientType: value,
                recipientId: '',
                recipientName: ''
            });
        } else if (name === 'recipientId') {
            const recipients = formData.recipientType === 'Manager' ? managers : supervisors;
            const selectedRecipient = recipients.find(r => r.eti_id === value);
            setFormData({ 
                ...formData, 
                recipientId: value,
                recipientName: selectedRecipient ? selectedRecipient.name : ''
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const voucherData = {
            amount: parseFloat(formData.amount) || 0,
            recipientType: formData.recipientType,
            recipientId: formData.recipientId,
            recipientName: formData.recipientName,
            adminAccountNo: adminAccountNo,
            date: formData.date,
            status: formData.status
        };

        if (!voucherData.amount || !voucherData.recipientType || !voucherData.recipientId || 
            !voucherData.recipientName || !voucherData.adminAccountNo || !voucherData.date) {
            setError('Please fill in all required fields');
            return;
        }

        try {
            const url = editingVoucher ? `${API_BASE_URL}/edit-payment/${editingVoucher.id}` : `${API_BASE_URL}/add-payment`;
            const method = editingVoucher ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(voucherData),
            });

            const result = await response.json();

            if (result.success) {
                await fetchVouchers();
                resetForm();
                setEditingVoucher(null); // Clear editing state
            } else {
                setError(result.message);
            }
        } catch (error) {
            console.error('Error submitting voucher:', error);
            setError('Failed to create/update payment voucher');
        }
    };

    const handleEdit = (voucher) => {
        setEditingVoucher(voucher);
        setFormData({
            amount: voucher.amount,
            recipientType: voucher.recipient_type,
            recipientId: voucher.recipient_id,
            recipientName: voucher.recipient_name,
            adminAccountNo: voucher.admin_account_no,
            date: voucher.date.split('T')[0], // Format date for input
            status: voucher.status
        });
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/delete-payment/${id}`, {
                method: 'DELETE',
            });

            const result = await response.json();

            if (result.success) {
                await fetchVouchers();
            } else {
                setError(result.message);
            }
        } catch (error) {
            console.error('Error deleting voucher:', error);
            setError('Failed to delete payment voucher');
        }
    };

    const resetForm = () => {
        setFormData({
            amount: '',
            recipientType: 'Manager',
            recipientId: '',
            recipientName: '',
            adminAccountNo: '',
            date: '',
            status: 'Pending'
        });
    };

    const recipients = formData.recipientType === 'Manager' ? managers : supervisors;

    return (
        <div>
            <ManagerTopbar />
            <ManagerSidebar />
            <div className="app-content content">
                <div className="content-overlay"></div>
                <div className="header-navbar-shadow"></div>
                <div className="content-wrapper">
                    <div className="content-header row">
                        <h1 className="content-header-title">Payment Vouchers</h1>
                    </div>
                    <div className="content-body">
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <div className="card p-3 mb-3">
                            <h3>{editingVoucher ? 'Edit Payment Voucher' : 'Create Payment Voucher'}</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-2">
                                        <select
                                            name="recipientType"
                                            className="form-control mb-2"
                                            value={formData.recipientType}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="Manager">Manager</option>
                                            <option value="Supervisor">Supervisor</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <select
                                            name="recipientId"
                                            className="form-control mb-2"
                                            value={formData.recipientId}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select {formData.recipientType}</option>
                                            {recipients.map(recipient => (
                                                <option key={recipient.eti_id} value={recipient.eti_id}>
                                                    {recipient.name} ({recipient.eti_id})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-2">
                                        <input
                                            type="number"
                                            name="amount"
                                            className="form-control mb-2"
                                            placeholder="Amount"
                                            value={formData.amount}
                                            onChange={handleInputChange}
                                            min="1"
                                            step="0.01"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <input
                                            type="date"
                                            name="date"
                                            className="form-control mb-2"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            value={adminAccountNo}
                                            onChange={handleInputChange}
                                            
                                            title="Admin Account Number"
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    {editingVoucher ? 'Update Voucher' : 'Create Voucher'}
                                </button>
                                {editingVoucher && (
                                    <button
                                        type="button"
                                        className="btn btn-secondary ml-2"
                                        onClick={() => {
                                            resetForm();
                                            setEditingVoucher(null);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </form>
                        </div>

                        <div className="card p-3">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Recipient</th>
                                        <th>Amount</th>
                                        <th>Admin Account</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vouchers.map(voucher => (
                                        <tr key={voucher.id}>
                                            <td>{voucher.recipient_type}</td>
                                            <td>{voucher.recipient_name} ({voucher.recipient_id})</td>
                                            <td>{voucher.amount.toFixed(2)}</td>
                                            <td>{voucher.admin_account_no}</td>
                                            <td>{new Date(voucher.date).toLocaleDateString()}</td>
                                            <td>{voucher.status}</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-warning mr-2"
                                                    onClick={() => handleEdit(voucher)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDelete(voucher.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPaymentVoucher;