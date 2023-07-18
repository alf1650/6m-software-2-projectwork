import styles from './CurrencySelector.module.css';

function CurrencySelector({ currency, updateCurrency }) {
    const handleChange = (e) => {
      updateCurrency(e.target.value);
    };
    return (
      <div className={styles.CurrencySelector}>
      <select value={currency} onChange={handleChange}>
        <option value="SGD">SGD</option>
        <option value="USD">USD</option>
        <option value="GBP">GBP</option>
      </select>
      </div>
    );
  }
  
  export default CurrencySelector;