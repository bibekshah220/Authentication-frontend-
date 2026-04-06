import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post('/forgot-password', { email });
            toast.success(data.message || 'Reset link sent to your email.');
            setSent(true);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to request reset');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 animate-fade-in">
            <div className="max-w-md w-full glass-panel rounded-3xl p-10">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
                    <p className="text-slate-400">Enter your email for the reset link</p>
                </div>

                {sent ? (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400 mb-4">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-emerald-400 mb-2">Email Sent!</h2>
                        <p className="text-sm text-slate-400 mb-6 font-medium">Please check your inbox at {email}</p>
                        <Link to="/login" className="text-indigo-400 font-medium hover:text-indigo-300">
                            Back to Login
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                className="w-full px-4 py-3 rounded-xl input-glass"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 rounded-xl btn-primary flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                'Send Link'
                            )}
                        </button>

                        <div className="text-center">
                            <Link to="/login" className="text-sm text-slate-400 hover:text-indigo-400 transition-all">
                                Back to Log In
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
