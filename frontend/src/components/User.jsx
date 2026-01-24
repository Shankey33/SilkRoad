import { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../AuthContext'

const User = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('customer');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { login, register, error, setError, forgotPassword } = useContext(AuthContext);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleUserAuth = async (e) => {

    e.preventDefault();
    if (isLogin) {
      login(email, password);
    }
    else {
      register(name, email, password, role);
    };
  }

  // Forgot password UI state & handlers
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMessage, setForgotMessage] = useState(null);

  const openForgotModal = () => {
    setForgotEmail(email || '');
    setForgotMessage(null);
    setShowForgot(true);
  };

  const submitForgotPassword = async (e) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotMessage(null);
    try {
      const res = await forgotPassword(forgotEmail);
      setForgotMessage({ type: 'success', text: res?.message || 'Reset link sent. Check your email.' });
    } catch (err) {
      const message = typeof err === 'string' ? err : (err?.response?.data?.message || err?.message || 'Error sending reset link.');
      setForgotMessage({ type: 'error', text: message });
    } finally {
      setForgotLoading(false);
    }
  }



  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 pb-20">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-green-700">{isLogin ? 'Login' : 'Register'}</h2>
          <p className="text-gray-600 mt-2">
            {isLogin ? 'Welcome back!' : 'Create your account'}
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleUserAuth}>
          <div className="relative">
            {error &&
              <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-400 rounded">
                {error}
              </div>
            }
            <label htmlFor="email" className="block text-gray-700 mb-2 font-semibold">Email</label>
            <div className="flex items-center">
              <div className="absolute left-3 text-gray-500">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <input
                type="email"
                id="email"
                className="w-full py-2 px-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>


          {!isLogin && (
            <div className="relative">
              <label htmlFor="name" className="block text-gray-700 mb-2 font-semibold">Full Name</label>
              <div className="flex items-center">
                <div className="absolute left-3 text-gray-500">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <input
                  type="text"
                  id="name"
                  className="w-full py-2 px-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}


          <div className="relative">
            <label htmlFor="password" className="block text-gray-700 mb-2 font-semibold">Password</label>
            <div className="flex items-center">
              <div className="absolute left-3 text-gray-500">
                <FontAwesomeIcon icon={faLock} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full py-2 px-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute right-3 text-gray-500 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </div>
            </div>
          </div>


          {!isLogin && (
            <><div className="relative">
              <label htmlFor="confirmPassword" className="block text-gray-700 mb-2 font-semibold">Confirm Password</label>
              <div className="flex items-center">
                <div className="absolute left-3 text-gray-500">
                  <FontAwesomeIcon icon={faLock} />
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full py-2 px-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="role" className="block text-gray-700 mb-2 font-semibold">Role</label>
              <select
                id="role"
                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={role}
                onChange={(e) => setRole(e.target.value)}>
                <option value="customer">Customer</option>
                <option value="seller">Seller</option>
              </select>
            </div>
            </>

          )}

          <div>
            {isLogin && <button type="button" onClick={openForgotModal} className="text-green-700 hover:underline">Forgot password</button>}
          </div>
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 transition font-semibold"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        {showForgot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
              <h3 className="text-xl font-semibold mb-4">Reset Password</h3>
              {forgotMessage && (
                <div className={`mb-4 p-3 rounded ${forgotMessage.type === 'error' ? 'bg-red-100 text-red-700 border border-red-400' : 'bg-green-100 text-green-700 border border-green-400'}`}>
                  {forgotMessage.text}
                </div>
              )}
              <form onSubmit={submitForgotPassword} className="space-y-4">
                <input
                  type="email"
                  placeholder="Your email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setShowForgot(false)} className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100">Cancel</button>
                  <button type="submit" disabled={forgotLoading} className="px-4 py-2 rounded-md bg-green-700 text-white hover:bg-green-800">
                    {forgotLoading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={toggleForm}
              className="ml-2 text-green-700 hover:text-green-800 font-semibold"
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
};

export default User;  