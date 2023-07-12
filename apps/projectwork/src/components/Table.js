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
console.log(list);
const startDate = "2024-01-01"
const endDate = "2024-06-01"
// console.log(date);
  const newEditList = list.filter((item) => item.date.iso > startDate && item.date.iso < endDate);
  console.log(newEditList);
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
          {newEditList &&
            newEditList.map((item) => (
              <tr key={item.id}>
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