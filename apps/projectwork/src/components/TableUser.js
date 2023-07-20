import styles from './Table.module.css';
function TableUser({ list }) {
    return (
            <div>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>email</th>
                  </tr>
                </thead>
                <tbody>
                  {list &&
                    list.map((item) => (
                      <tr key={item.userId}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          );
        }
  
  export default TableUser;