import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';

const VerifyEmail = () => {
    const { token } = useParams();
    const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
    const [message, setMessage] = useState('');

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const { data } = await api.post(`/verify/${token}`);
                setStatus('success');
                setMessage(data.message || 'Email verified successfully!');
            } catch (error) {
                setStatus('error');
                setMessage(error.response?.data?.message || 'Verification failed. The link might be expired.');
            }
        };

        if (token) {
            verifyToken();
        }
    }, [token]);

    return (
        <div className="min-h-screen flex items-center justify-center p-6 animate-fade-in">
            <div className="max-w-md w-full glass-panel rounded-3xl p-10 text-center">
                {status === 'verifying' && (
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                        <h2 className="text-2xl font-bold mb-2">Verifying Email</h2>
                        <p className="text-slate-400">Please wait while we secure your account...</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mb-6 text-emerald-400">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-2 text-emerald-400">Verified!</h2>
                        <p className="text-slate-400 mb-8">{message}</p>
                        <Link to="/login" className="px-8 py-3 rounded-xl btn-primary">
                            Sign In Now
                        </Link>
                    </div>
                )}

                {status === 'error' && (
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/20 rounded-full flex items-center justify-center mb-6 text-rose-400">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-2 text-rose-400">Failed!</h2>
                        <p className="text-slate-400 mb-8">{message}</p>
                        <Link to="/register" className="px-8 py-3 rounded-xl glass-panel text-indigo-400 border border-indigo-400/20 hover:bg-white/5 transition-all">
                            Try Registering Again
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;
