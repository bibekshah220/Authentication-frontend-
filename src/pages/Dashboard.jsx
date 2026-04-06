import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState({ name: user?.name || '' });
  const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '' });
  const [loading, setLoading] = useState({ profile: false, password: false, logout: false, delete: false });

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, profile: true });
    try {
      const { data } = await api.post('/update-profile', profileData);
      setUser(data.user);
      toast.success(data.message || 'Profile updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setLoading({ ...loading, profile: false });
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, password: true });
    try {
      const { data } = await api.post('/change-password', passwordData);
      toast.success(data.message || 'Password updated successfully!');
      setPasswordData({ oldPassword: '', newPassword: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setLoading({ ...loading, password: false });
    }
  };

  const handleLogout = async () => {
    setLoading({ ...loading, logout: true });
    try {
      await api.post('/logout');
      setUser(null);
      navigate('/login');
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed');
    } finally {
      setLoading({ ...loading, logout: false });
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action is permanent.')) return;
    setLoading({ ...loading, delete: true });
    try {
      await api.post('/delete-account');
      setUser(null);
      navigate('/register');
      toast.success('Account deleted successfully');
    } catch (error) {
      toast.error('Account deletion failed');
    } finally {
      setLoading({ ...loading, delete: false });
    }
  };

  return (
    <div className="min-h-screen py-12 px-6 animate-fade-in flex flex-col items-center">
      <div className="max-w-4xl w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 glass-panel p-8 rounded-3xl">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-3xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{user?.name}</h1>
              <p className="text-slate-400 text-sm">{user?.email}</p>
              <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 capitalize">
                {user?.role}
              </div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            disabled={loading.logout}
            className="px-6 py-3 rounded-xl glass-panel text-rose-400 border border-rose-400/20 hover:bg-rose-500/10 transition-all font-medium flex items-center gap-2"
          >
            {loading.logout ? <div className="w-4 h-4 border-2 border-rose-400/30 border-t-rose-400 rounded-full animate-spin" /> : null}
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Update Profile Card */}
          <div className="glass-panel p-8 rounded-3xl">
            <h2 className="text-xl font-bold mb-6">Profile Settings</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={profileData.name}
                  onChange={(e) => setProfileData({ name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl input-glass"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="w-full px-4 py-3 rounded-xl input-glass opacity-50 cursor-not-allowed"
                />
              </div>
              <button
                type="submit"
                disabled={loading.profile}
                className="w-full py-3 rounded-xl btn-primary flex items-center justify-center gap-2"
              >
                {loading.profile ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Change Password Card */}
          <div className="glass-panel p-8 rounded-3xl">
            <h2 className="text-xl font-bold mb-6">Change Password</h2>
            <form onSubmit={handleChangePassword} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Old Password</label>
                <input
                  type="password"
                  required
                  value={passwordData.oldPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl input-glass"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">New Password</label>
                <input
                  type="password"
                  required
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl input-glass"
                />
              </div>
              <button
                type="submit"
                disabled={loading.password}
                className="w-full py-3 rounded-xl glass-panel text-indigo-400 border border-indigo-400/20 hover:bg-indigo-500/10 transition-all"
              >
                {loading.password ? <div className="w-4 h-4 border-2 border-indigo-400/30 border-t-indigo-400 rounded-full animate-spin" /> : 'Update Password'}
              </button>
            </form>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="mt-12 glass-panel p-8 rounded-3xl border border-rose-500/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-xl font-bold text-rose-400 mb-2">Danger Zone</h2>
              <p className="text-slate-400 text-sm">Once you delete your account, there is no going back. Please be certain.</p>
            </div>
            <button 
              onClick={handleDeleteAccount}
              disabled={loading.delete}
              className="px-8 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 transition-all font-medium flex items-center gap-2"
            >
              {loading.delete ? <div className="w-4 h-4 border-2 border-rose-400/30 border-t-rose-400 rounded-full animate-spin" /> : null}
              Permanently Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
