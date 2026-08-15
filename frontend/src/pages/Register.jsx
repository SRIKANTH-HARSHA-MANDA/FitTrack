import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    gender: 'Prefer not to say',
    age: '',
    height: '',
    weight: '',
    fitnessGoal: 'General fitness'
  });

  const [err, setErr] = useState('');

  const { register } = useAuth();
  const nav = useNavigate();

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setErr('');

    try {
      await register(form);
      nav('/dashboard');
    } catch (x) {
      setErr(
        x.response?.data?.message || 'Registration failed'
      );
    }
  };

  return (
    <div className="auth-page register-page">
      <div className="auth-background" aria-hidden="true" />
      <div className="auth-wrapper register-wrapper">
        <div className="auth-brand">
          <div className="auth-brand-mark">FT</div>
          <div>
            <h1>Fit<span>Track</span></h1>
            <p>YOUR FITNESS COMPANION</p>
          </div>
        </div>

        <div className="auth-card wide register-card">
          <div className="auth-card-header">
            <div className="welcome-icon"><UserRoundPlusIcon /></div>
            <div>
              <h2>Create your account</h2>
              <p>Set up your profile and start tracking your progress.</p>
            </div>
          </div>

          {err && <div className="auth-error" role="alert"><span>!</span>{err}</div>}

          <form onSubmit={submit} className="grid-form register-form">
            <div className="auth-field">
              <label htmlFor="register-name">Full name</label>
              <input id="register-name" name="name" autoComplete="name" placeholder="Your name" required value={form.name} onChange={change} />
            </div>
            <div className="auth-field">
              <label htmlFor="register-email">Email address</label>
              <input id="register-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required value={form.email} onChange={change} />
            </div>
            <div className="auth-field">
              <label htmlFor="register-password">Password</label>
              <input id="register-password" name="password" type="password" autoComplete="new-password" placeholder="At least 6 characters" required minLength="6" value={form.password} onChange={change} />
            </div>
            <div className="auth-field">
              <label htmlFor="register-mobile">Mobile number <span>Optional</span></label>
              <input id="register-mobile" name="mobile" autoComplete="tel" placeholder="Your phone number" value={form.mobile} onChange={change} />
            </div>
            <div className="auth-field">
              <label htmlFor="register-age">Age <span>Optional</span></label>
              <input id="register-age" name="age" type="number" min="1" max="120" placeholder="Years" value={form.age} onChange={change} />
            </div>
            <div className="auth-field">
              <label htmlFor="register-gender">Gender</label>
              <select id="register-gender" name="gender" value={form.gender} onChange={change}>
                <option>Prefer not to say</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="auth-field">
              <label htmlFor="register-height">Height <span>Optional</span></label>
              <div className="input-with-unit">
                <input id="register-height" name="height" type="number" min="1" placeholder="170" value={form.height} onChange={change} />
                <span>cm</span>
              </div>
            </div>
            <div className="auth-field">
              <label htmlFor="register-weight">Weight <span>Optional</span></label>
              <div className="input-with-unit">
                <input id="register-weight" name="weight" type="number" min="1" step="0.1" placeholder="70" value={form.weight} onChange={change} />
                <span>kg</span>
              </div>
            </div>
            <div className="auth-field register-goal-field">
              <label htmlFor="register-goal">Fitness goal</label>
              <input id="register-goal" name="fitnessGoal" placeholder="e.g. Build a consistent routine" value={form.fitnessGoal} onChange={change} />
            </div>

            <button className="auth-submit register-submit" type="submit">
              <span>Create account</span>
              <span className="submit-arrow">→</span>
            </button>
          </form>

          <p className="auth-register">Already have an account? <Link to="/login">Log in</Link></p>
        </div>
        <div className="auth-footer"><span>© FitTrack</span><span>Built for your fitness journey</span></div>
      </div>
    </div>
  );
}

function UserRoundPlusIcon() {
  return <span aria-hidden="true">+</span>;
}