import { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import {
  HiOutlineSearch,
  HiOutlineCheckCircle,
  HiOutlinePlusCircle,
  HiOutlineX,
} from 'react-icons/hi';

export default function VaccinesPage() {
  const [babies, setBabies] = useState([]);
  const [selectedBaby, setSelectedBaby] = useState('');
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [specialForm, setSpecialForm] = useState({
    name: '',
    description: '',
    sideEffects: '',
    timingInWeeks: '',
    category: 'baby',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Fetch all babies across all users (admin endpoint)
    api.get('/admin/babies')
      .then((res) => {
        const data = res.data;
        const list = data.babies || data.babyInfo || data || [];
        setBabies(Array.isArray(list) ? list : []);
      })
      .catch(() => toast.error('Failed to load babies'));
  }, []);

  const fetchVaccines = async (babyInfoId) => {
    if (!babyInfoId) return;
    setLoading(true);
    try {
      const res = await api.get(`/admin/pending-vaccines?babyInfoId=${babyInfoId}`);
      setVaccines(res.data.vaccines || []);
    } catch (err) {
      toast.error('Failed to fetch vaccines');
      setVaccines([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBabySelect = (e) => {
    const id = e.target.value;
    setSelectedBaby(id);
    if (id) fetchVaccines(id);
    else setVaccines([]);
  };

  const markCompleted = async (userVaccineId) => {
    try {
      await api.post('/admin/set-completed-status', { userVaccineId });
      toast.success('Vaccine marked as completed');
      fetchVaccines(selectedBaby);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update');
    }
  };

  const handleSpecialChange = (e) => {
    setSpecialForm({ ...specialForm, [e.target.name]: e.target.value });
  };

  const addSpecialVaccine = async (e) => {
    e.preventDefault();
    if (!specialForm.name || !specialForm.description || !specialForm.timingInWeeks || !specialForm.category) {
      toast.error('Please fill all required fields');
      return;
    }
    setSubmitting(true);
    try {
      const res = await api.post('/admin/new-vaccine', {
        babyInfoId: selectedBaby,
        ...specialForm,
        timingInWeeks: Number(specialForm.timingInWeeks),
      });
      toast.success(res.data.message);
      setShowModal(false);
      setSpecialForm({ name: '', description: '', sideEffects: '', timingInWeeks: '', category: 'baby' });
      fetchVaccines(selectedBaby);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add vaccine');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="vaccines-page">
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Vaccines</h1>
          <p className="page-header__subtitle">View and manage vaccination schedules</p>
        </div>
        {selectedBaby && (
          <button className="btn btn--primary" onClick={() => setShowModal(true)}>
            <HiOutlinePlusCircle />
            Add Special Vaccine
          </button>
        )}
      </div>

      {/* Baby Selector */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="form__group" style={{ marginBottom: 0 }}>
          <label className="form__label" htmlFor="vaccine-baby-select">Select Baby</label>
          <select
            id="vaccine-baby-select"
            value={selectedBaby}
            onChange={handleBabySelect}
            className="form__select"
          >
            <option value="">Choose a baby...</option>
            {babies.map((b) => (
              <option key={b._id} value={b._id}>
                {b.babyName} — DOB: {new Date(b.dateOfBirth).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Vaccines List */}
      {loading ? (
        <div className="page-loader">
          <div className="page-loader__spinner" />
          <p>Loading vaccines...</p>
        </div>
      ) : selectedBaby ? (
        <div className="card">
          <div className="card__header">
            <h2 className="card__title">Pending Vaccines ({vaccines.length})</h2>
          </div>
          {vaccines.length > 0 ? (
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Vaccine</th>
                    <th>Category</th>
                    <th>Scheduled Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {vaccines.map((v, i) => (
                    <tr key={v._id}>
                      <td>{i + 1}</td>
                      <td>
                        <div>
                          <strong>{v.vaccine?.name}</strong>
                          {v.vaccine?.description && (
                            <p className="data-table__sub">{v.vaccine.description}</p>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className={`badge badge--${v.vaccine?.category || 'baby'}`}>
                          {v.vaccine?.category}
                        </span>
                      </td>
                      <td>{v.scheduledDate ? new Date(v.scheduledDate).toLocaleDateString() : '—'}</td>
                      <td>
                        <span className={`badge badge--${v.status?.toLowerCase()}`}>
                          {v.status}
                        </span>
                      </td>
                      <td>
                        {v.status === 'Pending' && (
                          <button
                            className="btn btn--sm btn--success"
                            onClick={() => markCompleted(v._id)}
                          >
                            <HiOutlineCheckCircle />
                            Complete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <HiOutlineCheckCircle className="empty-state__icon" />
              <p>No pending vaccines for this baby!</p>
            </div>
          )}
        </div>
      ) : (
        <div className="card">
          <div className="empty-state">
            <HiOutlineSearch className="empty-state__icon" />
            <p>Select a baby to view their vaccination schedule</p>
          </div>
        </div>
      )}

      {/* Add Special Vaccine Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h2 className="modal__title">Add Special Vaccine</h2>
              <button className="modal__close" onClick={() => setShowModal(false)}>
                <HiOutlineX />
              </button>
            </div>
            <form className="form" onSubmit={addSpecialVaccine}>
              <div className="form__group">
                <label className="form__label" htmlFor="sv-name">Vaccine Name *</label>
                <input
                  id="sv-name"
                  name="name"
                  type="text"
                  placeholder="e.g. Rotavirus"
                  value={specialForm.name}
                  onChange={handleSpecialChange}
                  className="form__input"
                />
              </div>
              <div className="form__group">
                <label className="form__label" htmlFor="sv-desc">Description *</label>
                <textarea
                  id="sv-desc"
                  name="description"
                  placeholder="Vaccine description"
                  value={specialForm.description}
                  onChange={handleSpecialChange}
                  className="form__input form__textarea"
                  rows={3}
                />
              </div>
              <div className="form__group">
                <label className="form__label" htmlFor="sv-side">Side Effects</label>
                <input
                  id="sv-side"
                  name="sideEffects"
                  type="text"
                  placeholder="Known side effects (optional)"
                  value={specialForm.sideEffects}
                  onChange={handleSpecialChange}
                  className="form__input"
                />
              </div>
              <div className="form__row">
                <div className="form__group">
                  <label className="form__label" htmlFor="sv-timing">Timing (weeks from DOB) *</label>
                  <input
                    id="sv-timing"
                    name="timingInWeeks"
                    type="number"
                    min="0"
                    placeholder="e.g. 6"
                    value={specialForm.timingInWeeks}
                    onChange={handleSpecialChange}
                    className="form__input"
                  />
                </div>
                <div className="form__group">
                  <label className="form__label" htmlFor="sv-category">Category *</label>
                  <select
                    id="sv-category"
                    name="category"
                    value={specialForm.category}
                    onChange={handleSpecialChange}
                    className="form__select"
                  >
                    <option value="baby">Baby</option>
                    <option value="pregnancy">Pregnancy</option>
                    <option value="postpartum">Postpartum</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn--primary btn--full"
                disabled={submitting}
              >
                {submitting ? <span className="login-card__spinner" /> : 'Add Vaccine'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
