import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_URL;

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!token) {
      setMessage({ type: 'error', text: 'Error, Use the link from your email to reset password.' });
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (!password || password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters.' });
      return;
    }
    if (password !== confirm) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/user/reset-password/token=${token}`, { newPassword: password });
      setMessage({ type: 'success', text: 'Password reset successful. Redirecting to login...' });
      setTimeout(() => navigate('/user'), 2000);
    } catch (err) {
      const text = err?.response?.data?.message || err?.message || 'Error resetting password.';
      setMessage({ type: 'error', text });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold mb-4 text-green-700">Set a New Password</h2>
        {message && (
          <div className={`mb-4 p-3 rounded ${message.type === 'error' ? 'bg-red-100 text-red-700 border border-red-400' : 'bg-green-100 text-green-700 border border-green-400'}`}>
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">New Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Enter new password" required />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">Confirm Password</label>
            <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Confirm new password" required />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => navigate('/user')} className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 rounded-md bg-green-700 text-white hover:bg-green-800">
              {loading ? 'Saving...' : 'Save Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
