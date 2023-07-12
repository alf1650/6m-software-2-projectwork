import React, { useState } from 'react';

const Favorites = ({ favorites }) => {
  const [notes, setNotes] = useState({});

  const handleNoteChange = (id, note) => {
    setNotes((prevNotes) => ({ ...prevNotes, [id]: note }));
  };

  return (
    <div>
      <h2>Favorites</h2>
      {Array.isArray(favorites) && favorites.length === 0 ? (
        <p>No favorites saved.</p>
      ) : (
        <ul>
          {favorites && favorites.map((favorite, index) => (
            <li key={index}>
              {favorite.date} - {favorite.name}
              <input
                type="text"
                placeholder="Add notes..."
                value={notes[favorite.date] || ''}
                onChange={(e) => handleNoteChange(favorite.date, e.target.value)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
