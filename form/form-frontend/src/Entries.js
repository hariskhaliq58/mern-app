import React, { useEffect, useState } from 'react';

const REACT_APP_BACKEND_URL = 'http://form-backend:30081';


const Entries = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch(`${REACT_APP_BACKEND_URL}/entries`)
      .then(res => res.json())
      .then(data => setEntries(data))
      .catch(err => console.error('Error fetching entries:', err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Submitted Entries</h2>
      {entries.length === 0 ? (
        <p>No entries found.</p>
      ) : (
        <ul>
          {entries.map((entry) => (
            <li key={entry._id}>
              <strong>{entry.name}</strong> | {entry.email} | {entry.contact}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Entries;
