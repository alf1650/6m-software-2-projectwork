import styles from "../css-modules/Favorites.module.css";
import { useNavigate } from "react-router-dom";
import useUserState from "../store/userStateContext";

const sampleTexts = [
  "e.g. I want to go there with..",
  "e.g. Take leave from..",
  "e.g. Buying tickets..",
  "e.g. Check schedule..",
  "e.g. Save up..",
  "e.g. To arrange..",
  "e.g. A good option..",
  "e.g. To consider..",
]; //placeholders

const getRandomInt = () => {
  return Math.floor(Math.random() * sampleTexts.length); //displays random placeholders
};

function Favorites() {
  const { favs, updateFavNotes, deleteFav } = useUserState();
  const navigate = useNavigate();

  const handleChange = (e, id) => {
    const input = e.target.value;
    updateFavNotes(id, input);
  };

  return (
    <div className={styles.fav}>
      <button className={styles.back} onClick={() => navigate(-1)}>
        {`« Back to previous page`}
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
                    <button onClick={() => deleteFav(fav.id)}>x</button>
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
