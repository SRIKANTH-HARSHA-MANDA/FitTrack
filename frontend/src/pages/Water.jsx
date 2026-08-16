import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { fmt, today } from '../utils/date';
import { useAuth } from '../context/AuthContext';
import { Droplets, GlassWater, Target, TrendingUp } from 'lucide-react';

export default function Water() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(today());
  const [message, setMessage] = useState('');

  const load = () =>
    api.get('/water').then((r) => setItems(r.data));

  useEffect(() => {
    load();
  }, []);

  const add = async (e) => {
    e.preventDefault();

    try {
      await api.post('/water', { amount, date });
      setAmount('');
      setMessage('Water entry saved.');
      await load();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to save water entry.');
    }
  };

  const target = Number(user?.dailyWater) || 2000;
  const total = items
    .filter(
      (x) =>
        new Date(x.date).toDateString() ===
        new Date().toDateString()
    )
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const progress = Math.min(100, Math.round((total / target) * 100));

  return (
    <Page
      title="Water Tracking"
      sub="Keep your daily hydration history organized."
    >
      <section className="water-overview">
        <div className="water-main-card">
          <div className="water-main-content">
            <div>
              <span className="water-label">TODAY'S HYDRATION</span>
              <h1>{total.toLocaleString()} <span>ml</span></h1>
              <p>{Math.max(0, target - total).toLocaleString()} ml left to reach your daily target</p>
            </div>
            <div className="water-circle" style={{ '--progress': `${progress * 3.6}deg` }}>
              <div>
                <strong>{progress}%</strong>
                <span>complete</span>
              </div>
            </div>
          </div>
          <div className="water-progress"><i style={{ width: `${progress}%` }} /></div>
          <div className="water-progress-info">
            <span>0 ml</span>
            <strong>Daily target {target.toLocaleString()} ml</strong>
          </div>
        </div>
      </section>

      <div className="water-stats">
        <WaterStat icon={Droplets} label="Today's intake" value={`${total.toLocaleString()} ml`} />
        <WaterStat icon={Target} label="Daily target" value={`${target.toLocaleString()} ml`} />
        <WaterStat icon={TrendingUp} label="Goal progress" value={`${progress}%`} />
        <WaterStat icon={GlassWater} label="Logged today" value={items.filter((item) => new Date(item.date).toDateString() === new Date().toDateString()).length} />
      </div>

      <section className="panel water-form-panel">
        <div className="section-heading">
          <div>
            <h3>Log a drink</h3>
            <p>Add water to your daily total.</p>
          </div>
        </div>
        <form className="water-form" onSubmit={add}>
          <div className="water-field">
            <label htmlFor="water-amount">Amount</label>
            <div className="water-input-unit">
              <input
                id="water-amount"
                type="number"
                min="1"
                required
                placeholder="250"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <span>ml</span>
            </div>
          </div>
          <div className="water-field">
            <label htmlFor="water-date">Date</label>
            <input
              id="water-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button className="primary" type="submit">
            <Droplets size={16} /> Add water
          </button>
        </form>
        {message && <p className="success water-message" role="status">{message}</p>}
      </section>

      <section className="panel">
        <div className="panel-head">
          <div>
            <h3>Recent entries</h3>
            <p className="panel-subtitle">Your latest hydration logs.</p>
          </div>
          <span className="history-count">{items.length}</span>
        </div>
        {items.length ? (
          <div className="water-history">
            {items.slice().reverse().slice(0, 8).map((item) => (
              <div className="water-history-item" key={item._id}>
                <div className="water-history-icon"><Droplets size={18} /></div>
                <div className="water-history-info">
                  <strong>{Number(item.amount).toLocaleString()} ml</strong>
                  <span>Water intake</span>
                </div>
                <div className="water-history-date">
                  <small>Logged</small>
                  <strong>{fmt(item.date)}</strong>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="water-empty">
            <div className="water-empty-icon"><Droplets size={25} /></div>
            <h4>No water logged yet</h4>
            <p>Your hydration entries will appear here after your first drink.</p>
          </div>
        )}
      </section>
    </Page>
  );
}

function WaterStat({ icon: Icon, label, value }) {
  return (
    <div className="water-stat">
      <div className="water-stat-icon"><Icon size={19} strokeWidth={1.8} /></div>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function Page({ title, sub, children }) {
  return (
    <>
      <header className="page-head">
        <div>
          <h2>{title}</h2>
          <p>{sub}</p>
        </div>
      </header>

      {children}
    </>
  );
}