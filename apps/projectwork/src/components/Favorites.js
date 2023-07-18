import styles from "./Favorites.module.css";
import { useNavigate } from "react-router-dom";

function Favorites({ favs, updateFavNotes, deleteFav }) {
  const sampleTexts = [
    "e.g. I want to go there with..",
    "e.g. Take leave from..",
    "e.g. Buying tickets..",
    "e.g. Check schedule..",
    "e.g. Save up..",
    "e.g. To arrange..",
    "e.g. A good option..",
    "e.g. To consider..",
  ];

  const getRandomInt = () => {
    return Math.floor(Math.random() * sampleTexts.length);
  };
  const navigate = useNavigate();

  const handleChange = (e, id) => {
    const input = e.target.value;
    updateFavNotes(id, input);
  };

  const handleDelete = (id) => {
    const newFavs = favs.filter((fav) => fav.id !== id);
    deleteFav(newFavs);
  };

  return (
    <div className={styles.fav}>
      <button className={styles.back} onClick={() => navigate(-1)}>
        {`« Back to Results`}
      </button>
      <h1>Favorites</h1>
      <div>
        {favs.length !== 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Country</th>
                <th>From</th>
                <th>To</th>
                <th>Personal Notes</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {favs.map((fav, i) => (
                <tr key={i}>
                  <td>{fav.country}</td>
                  <td>{fav.start}</td>
                  <td>{fav.end}</td>
                  <td>
                    <textarea
                      value={fav.notes}
                      rows="3"
                      cols="50"
                      maxLength="150"
                      placeholder={sampleTexts[getRandomInt()]}
                      onChange={(e) => handleChange(e, fav.id)}
                    ></textarea>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(fav.id)}>x</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No favorites yet..</p>
        )}
      </div>
    </div>
  );
}

export default Favorites;