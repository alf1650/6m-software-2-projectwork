import styles from './Table.module.css';
function TableUserFav({ list }) {

  // const newEditList = list.filter((item) => item.);
    return (
      
            <div>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>start date</th>
                    <th>end date</th>
                    <th>country</th>
                  </tr>
                </thead>
                <tbody>
                  {list &&
                    list.map((item) => (
                      <tr key={item.favid}>
                        <td>{item.userId}</td>
                        <td>{item.favstartdate}</td>
                        <td>{item.favenddate}</td>
                        <td>{item.country}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          );
        }
  
  export default TableUserFav;