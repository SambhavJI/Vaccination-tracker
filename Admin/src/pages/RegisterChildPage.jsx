import { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { HiOutlineUserAdd } from 'react-icons/hi';

export default function RegisterChildPage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    userId: '',
    babyName: '',
    dateOfBirth: '',
    motherConceiveDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    api.get('/admin/users')
      .then((res) => setUsers(res.data))
      .catch(() => toast.error('Failed to load users'));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.userId || !form.babyName || !form.dateOfBirth) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        userId: form.userId,
        babyName: form.babyName,
        dateOfBirth: form.dateOfBirth,
      };
      if (form.motherConceiveDate) {
        payload.motherConceiveDate = form.motherConceiveDate;
      }

      const res = await api.post('/admin/register-child', payload);
      setResult(res.data);
      toast.success(res.data.message);
      setForm({ userId: '', babyName: '', dateOfBirth: '', motherConceiveDate: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="page-header">
        <h1 className="page-header__title">Register Child</h1>
        <p className="page-header__subtitle">Register a new child and auto-schedule vaccines</p>
      </div>

      <div className="form-layout">
        <div className="card form-card">
          <form className="form" onSubmit={handleSubmit}>
            {/* User Select */}
            <div className="form__group">
              <label className="form__label" htmlFor="reg-userId">Parent / User *</label>
              <select
                id="reg-userId"
                name="userId"
                value={form.userId}
                onChange={handleChange}
                className="form__select"
              >
                <option value="">Select a user...</option>
                {users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name} — {u.phone}
                  </option>
                ))}
              </select>
            </div>

            {/* Baby Name */}
            <div className="form__group">
              <label className="form__label" htmlFor="reg-babyName">Baby Name *</label>
              <input
                id="reg-babyName"
                name="babyName"
                type="text"
                placeholder="Enter baby's name"
                value={form.babyName}
                onChange={handleChange}
                className="form__input"
              />
            </div>

            {/* Date of Birth */}
            <div className="form__group">
              <label className="form__label" htmlFor="reg-dob">Date of Birth *</label>
              <input
                id="reg-dob"
                name="dateOfBirth"
                type="date"
                value={form.dateOfBirth}
                onChange={handleChange}
                className="form__input"
              />
            </div>

            {/* Mother Conceive Date */}
            <div className="form__group">
              <label className="form__label" htmlFor="reg-conceive">Mother Conceive Date (optional)</label>
              <input
                id="reg-conceive"
                name="motherConceiveDate"
                type="date"
                value={form.motherConceiveDate}
                onChange={handleChange}
                className="form__input"
              />
            </div>

            <button
              id="reg-submit"
              type="submit"
              className="btn btn--primary btn--full"
              disabled={loading}
            >
              {loading ? (
                <span className="login-card__spinner" />
              ) : (
                <>
                  <HiOutlineUserAdd />
                  Register Child
                </>
              )}
            </button>
          </form>
        </div>

        {/* Result Card */}
        {result && (
          <div className="card result-card">
            <div className="result-card__icon">🎉</div>
            <h3 className="result-card__title">Registration Successful!</h3>
            <p className="result-card__text">{result.message}</p>
            <div className="result-card__detail">
              <span>Baby:</span>
              <strong>{result.babyInfo?.babyName}</strong>
            </div>
            <div className="result-card__detail">
              <span>DOB:</span>
              <strong>{new Date(result.babyInfo?.dateOfBirth).toLocaleDateString()}</strong>
            </div>
            <div className="result-card__detail">
              <span>Vaccines Scheduled:</span>
              <strong>{result.vaccinesCount}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
