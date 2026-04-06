import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post(`/reset-password/${token}`, { newPassword });
            toast.success(data.message || 'Password reset successfully!');
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 animate-fade-in">
            <div className="max-w-md w-full glass-panel rounded-3xl p-10">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold mb-2">New Password</h1>
                    <p className="text-slate-400">Set your new secure password</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">New Password</label>
                        <input
                            type="password"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl input-glass"
                        />
                        <p className="mt-2 text-xs text-slate-500 font-medium">Use 8+ chars with mix of upper, lower, number and special.</p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-xl btn-primary flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            'Reset Password'
                        )}
                    </button>
                    
                    <div className="text-center">
                        <Link to="/login" className="text-sm text-slate-400 hover:text-indigo-400 transition-all font-medium">
                            Return to Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
