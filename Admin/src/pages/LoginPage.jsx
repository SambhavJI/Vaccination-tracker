import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { HiOutlinePhone, HiOutlineLockClosed, HiOutlineArrowRight } from 'react-icons/hi';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await login(phone, password);
      toast.success('Welcome back, Admin!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Background decoration */}
      <div className="login-page__bg">
        <div className="login-page__bg-orb login-page__bg-orb--1" />
        <div className="login-page__bg-orb login-page__bg-orb--2" />
        <div className="login-page__bg-orb login-page__bg-orb--3" />
      </div>

      <div className="login-card">
        <div className="login-card__header">
          <div className="login-card__icon">💉</div>
          <h1 className="login-card__title">VaxAdmin</h1>
          <p className="login-card__subtitle">Vaccination Tracker Admin Panel</p>
        </div>

        <form className="login-card__form" onSubmit={handleSubmit}>
          <div className="input-group">
            <HiOutlinePhone className="input-group__icon" />
            <input
              id="login-phone"
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-group__input"
              maxLength={10}
              autoComplete="tel"
            />
          </div>

          <div className="input-group">
            <HiOutlineLockClosed className="input-group__icon" />
            <input
              id="login-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-group__input"
              autoComplete="current-password"
            />
          </div>

          <button
            id="login-submit"
            type="submit"
            className="login-card__btn"
            disabled={loading}
          >
            {loading ? (
              <span className="login-card__spinner" />
            ) : (
              <>
                Sign In
                <HiOutlineArrowRight />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
