import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const VerifyOtp = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);

    const email = state?.email;

    useEffect(() => {
        if (!email) {
            navigate('/login');
        }
    }, [email, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post('/verify-otp', { email, otp });
            toast.success(data.message || 'Login successful!');
            setUser(data.user);
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'OTP verification failed');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        try {
            const { data } = await api.post('/request-otp', { email });
            toast.success(data.message || 'New OTP sent to email.');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to resend OTP');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 animate-fade-in">
            <div className="max-w-md w-full glass-panel rounded-3xl p-10">
                <div className="mb-10 text-center">
                    <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto text-indigo-400 mb-6">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0112 21a9.963 9.963 0 01-2.754-1.429M12 11c0-1.767-1.12-3.21-2.656-3.731l-.226-.076a10.001 10.001 0 00-11.458 12.115l.054-.09M12 11c1.767 0 3.21 1.12 3.731 2.656l.076.226a10.001 10.001 0 0012.115 11.458l-.09-.054" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Verify OTP</h1>
                    <p className="text-slate-400">Enter the 6-digit code sent to<br/><span className="text-white font-medium">{email}</span></p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="text"
                            maxLength="6"
                            placeholder="000000"
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full px-4 py-4 rounded-xl input-glass text-center text-3xl font-bold tracking-[0.5em]"
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
                            'Verify & Sign In'
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <button onClick={handleResend} className="text-sm text-slate-400 hover:text-indigo-400 transition-all">
                        Didn't receive code? <span className="font-medium text-indigo-400">Resend</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyOtp;
