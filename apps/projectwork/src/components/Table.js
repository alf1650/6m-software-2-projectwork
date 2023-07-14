import styles from "./Table.module.css";
function Table({ holidayData }) {
  return (
    <div>
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
          {holidayData &&
            holidayData.map((data, i) => (
              <tr key={i}>
                <td>{data.name}</td>
                <td>{data.description}</td>
                <td>{data.type}</td>
                <td>{data.date.iso}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export default Table;
