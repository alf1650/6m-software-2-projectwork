import useUserState from "../store/userStateContext";

function CurrencySelector() {
  const { userCurrency, updateUserCurrency } = useUserState();

  return (
    <select
      value={userCurrency}
      onChange={(e) => updateUserCurrency(e.target.value)}
    >
      <option value="SGD">SGD</option>
      <option value="USD">USD</option>
      <option value="GBP">GBP</option>
    </select>
  );
}

export default CurrencySelector;
