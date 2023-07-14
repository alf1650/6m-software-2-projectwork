import styles from "./Favorites.module.css";
import { useNavigate } from "react-router-dom";

function Favorites({ favs }) {
  const navigate = useNavigate();
  return (
    <div className={styles.fav}>
      <button className={styles.back} onClick={() => navigate(-1)}>
        {`< Back to Results`}
      </button>
      <h1>Favorites</h1>
      <div>
        {favs ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Type</th>
                <th>Date/Time</th>
              </tr>
            </thead>
            <tbody>
              {/* {favs ?
              favs.map((fav, i) => (
                <tr key={i}>
                  <td>{fav.name}</td>
                  <td>{fav.description}</td>
                  <td>{fav.type}</td>
                  <td>{fav.date.iso}</td>
                </tr> :
               <h2>No Favourites yet..</h2>
              ))} */}
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
