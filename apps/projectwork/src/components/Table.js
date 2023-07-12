
import styles from './Table.module.css';
function Table({ list }) {
  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Type</th>
            <th>Country</th>
            <th>Date</th>

          </tr>
        </thead>
        <tbody>
          {list &&
            list.map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.type}</td>
                <td>{item.country.name}</td>
                <td>{item.date.iso}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export default Table;