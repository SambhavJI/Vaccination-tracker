import { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { HiOutlineSearch, HiOutlineRefresh, HiOutlinePlusCircle, HiOutlineX } from 'react-icons/hi';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({ name: '', phone: '', email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!addForm.name || !addForm.phone || !addForm.email || !addForm.password) {
      return toast.error('All fields are required');
    }
    setSubmitting(true);
    try {
      await api.post('/signup', { ...addForm, role: 'user' });
      toast.success('User created successfully');
      setShowAddModal(false);
      setAddForm({ name: '', phone: '', email: '', password: '' });
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create user');
    } finally {
      setSubmitting(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.phone.includes(q) ||
      u.email.toLowerCase().includes(q)
    );
  });

  if (loading) {
    return (
      <div className="page-loader">
        <div className="page-loader__spinner" />
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="users-page">
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Users</h1>
          <p className="page-header__subtitle">{users.length} registered users</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn--primary" onClick={() => setShowAddModal(true)}>
            <HiOutlinePlusCircle />
            Add User
          </button>
          <button className="btn btn--outline" onClick={fetchUsers}>
            <HiOutlineRefresh />
            Refresh
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="search-bar">
        <HiOutlineSearch className="search-bar__icon" />
        <input
          id="users-search"
          type="text"
          placeholder="Search by name, phone, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar__input"
        />
      </div>

      {/* Table */}
      <div className="card">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => (
                <tr key={user._id}>
                  <td>{i + 1}</td>
                  <td>
                    <div className="user-cell">
                      <div className="user-cell__avatar">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`badge badge--${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="data-table__empty">
                    {search ? 'No users match your search' : 'No users found'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h2 className="modal__title">Add New User</h2>
              <button className="modal__close" onClick={() => setShowAddModal(false)}>
                <HiOutlineX />
              </button>
            </div>
            <form className="form" onSubmit={handleAddSubmit}>
              <div className="form__group">
                <label className="form__label" htmlFor="user-name">Full Name *</label>
                <input
                  id="user-name"
                  type="text"
                  placeholder="John Doe"
                  value={addForm.name}
                  onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                  className="form__input"
                />
              </div>
              <div className="form__group">
                <label className="form__label" htmlFor="user-phone">Phone Number *</label>
                <input
                  id="user-phone"
                  type="text"
                  placeholder="1234567890"
                  value={addForm.phone}
                  onChange={(e) => setAddForm({ ...addForm, phone: e.target.value })}
                  className="form__input"
                />
              </div>
              <div className="form__group">
                <label className="form__label" htmlFor="user-email">Email Address *</label>
                <input
                  id="user-email"
                  type="email"
                  placeholder="john@example.com"
                  value={addForm.email}
                  onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                  className="form__input"
                />
              </div>
              <div className="form__group">
                <label className="form__label" htmlFor="user-password">Password *</label>
                <input
                  id="user-password"
                  type="password"
                  placeholder="Secure password"
                  value={addForm.password}
                  onChange={(e) => setAddForm({ ...addForm, password: e.target.value })}
                  className="form__input"
                />
              </div>
              <button
                type="submit"
                className="btn btn--primary btn--full"
                disabled={submitting}
              >
                {submitting ? <span className="login-card__spinner" /> : 'Register User'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
