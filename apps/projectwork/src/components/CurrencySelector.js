function CurrencySelector({ currency, updateCurrency }) {
  const handleChange = (e) => {
    updateCurrency(e.target.value);
  };
  return (
    <select value={currency} onChange={handleChange}>
      <option value="SGD">SGD</option>
      <option value="USD">USD</option>
      <option value="GBP">GBP</option>
    </select>
  );
}

export default CurrencySelector;
