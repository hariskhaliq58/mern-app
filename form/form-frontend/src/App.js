import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const REACT_APP_BACKEND_URL = 'http://172.16.149.131:30081';

function FormPage() {
  const [formData, setFormData] = useState({ name: '', email: '', contact: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(`${REACT_APP_BACKEND_URL}/submit`, formData);
      setMessage(response.data.message);
      setFormData({ name: '', email: '', contact: '' });
    } catch (err) {
      console.error('Submit error:', err);
      setMessage('Error submitting the form.');
    }
  };

  return (
    <div className="App">
      <h2>React Form</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required /><br /><br />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" type="email" required /><br /><br />
        <input name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact" required /><br /><br />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

function EntriesPage() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    axios.get(`${REACT_APP_BACKEND_URL}/entries`)
      .then(res => setEntries(res.data))
      .catch(err => console.error('Error fetching entries:', err));
  }, []);

  return (
    <div className="App">
      <h2>Submitted Entries</h2>
      {entries.length === 0 ? (
        <p>No entries found.</p>
      ) : (
        <ul>
          {entries.map(entry => (
            <li key={entry._id}>
              <strong>{entry.name}</strong> | {entry.email} | {entry.contact}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Form</Link>
        <Link to="/entries">View Entries</Link>
      </nav>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/entries" element={<EntriesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
