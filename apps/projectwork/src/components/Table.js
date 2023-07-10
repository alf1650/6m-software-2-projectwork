// components/table.js
// function Table({ list }) {
//     return (
//       <div>
//         <p>{list && list[0] && list[0].name}</p>
//       </div>
//     );
//   }
//   export default Table;

// import styles from "./Table.module.css";
// function Table({ data }) {
//   return (
//     <div>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Forecast</th>
//           </tr>
//         </thead>
  
//           <tr>
//           <td>{data.date}</td>
//           <td>{data.forecast}</td>
//           </tr>
//       </table>
//     </div>
//   );
// }
// export default Table;


import styles from './Table.module.css';
function Table({ list }) {
  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Country Name</th>
            <th>ISO 3166</th>
            <th>Total Holidays</th>
          </tr>
        </thead>
        <tbody>
          {list &&
            list.map((item) => (
              <tr key={item.id}>
                <td>{item.country_name}</td>
                <td>{item['iso-3166']}</td> {/* Use bracket notation */}
                <td>{item.total_holidays}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export default Table;