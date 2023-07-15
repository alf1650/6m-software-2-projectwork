import React, { useState } from "react";
import styles from "./Favorites.module.css";

const Favorites = ({ favorites, handleUpdate, handleCancel }) => {
  const [countryName, setCountryName] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [submittedFavorites, setSubmittedFavorites] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFavorites = {
      id: editingIndex !== null ? editingIndex : null,
      countryName: countryName,
      date: date,
      notes: notes,
    };

    if (editingIndex !== null) {
      // Update an existing favorite
      setSubmittedFavorites((prevFavorites) =>
        prevFavorites.map((favorite, index) =>
          index === editingIndex ? updatedFavorites : favorite
        )
      );
      setEditingIndex(null);
    } else {
      // Add a new favorite
      setSubmittedFavorites((prevFavorites) => [...prevFavorites, updatedFavorites]);
    }

    // Clear the input fields after submission
    setCountryName("");
    setDate("");
    setNotes("");
  };

  const handleDelete = (index) => {
    setSubmittedFavorites((prevFavorites) =>
      prevFavorites.filter((_, i) => i !== index)
    );
  };

  const handleEdit = (index) => {
    const favorite = submittedFavorites[index];
    setCountryName(favorite.countryName);
    setDate(favorite.date);
    setNotes(favorite.notes);
    setEditingIndex(index);
  };

  return (
    <div className={styles.fav}>
      <h2>Favorites</h2>
      <form onSubmit={handleSubmit}>
        <label>Country Name:</label>
        <input
          type="text"
          placeholder="Country"
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
        />
        <br />
        <label>Date:</label>
        <input
          type="number"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <br />
        <label>Notes:</label>
        <input
          type="text"
          placeholder="Things to Note"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <br />
        <button type="submit">
          {editingIndex !== null ? "Update" : "Submit"}
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>

      {/* Display the submitted favorites */}
      <div>
        <h3>Current Favorites:</h3>
        <ul>
          {submittedFavorites.length > 0 ? (
            submittedFavorites.map((favorite, index) => (
              <li key={index}>
                <strong>Country:</strong> {favorite.countryName},{" "}
                <strong>Date:</strong> {favorite.date}, <strong>Notes:</strong>{" "}
                {favorite.notes}
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </li>
            ))
          ) : (
            <p>No favorites yet..</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Favorites;
