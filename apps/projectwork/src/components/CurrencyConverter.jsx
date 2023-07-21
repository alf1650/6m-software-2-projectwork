import { useState, useEffect } from "react";
import converterAPI from "../api/converterAPI";
import useUserState from "../store/userStateContext";

function CurrencyConverter() {
  const { userCurrency, selectedCountry } = useUserState();
  const [convertedAmount, setConvertedAmount] = useState("1");
  const [nativeCurrency, setNativeCurrency] = useState("");
  const [nativeCurrencyName, setNativeCurrencyName] = useState("");
  const [isCurrencyLoading, setIsCurrencyLoading] = useState(false);

  const API_KEYS_ARRAY = process.env.REACT_APP_API_KEY.split(" "); //.env contains string with 2 keys, .split to access
  const CONVERTER_API_KEY = API_KEYS_ARRAY[1];

  useEffect(() => {
    const fetchNativeCurrency = async () => {
      //to fetch selected country's native currency
      try {
        const response = await converterAPI.get("/country", {
          headers: { "X-Api-Key": CONVERTER_API_KEY },
          params: {
            name: `${selectedCountry.code}`,
          },
        });
        if (response.data[0].currency) {
          return response.data[0].currency;
        }
        return;
      } catch (error) {
        console.error("Error fetching currency:", error);
      }
    };

    const fetchConvertedAmount = async (fetchedCurrencyCode) => {
      //to fetch converted amount from $1 user currency to selected country's native currency
      try {
        const response = await converterAPI.get("/convertcurrency", {
          headers: { "X-Api-Key": CONVERTER_API_KEY },
          params: {
            want: `${fetchedCurrencyCode}`,
            have: `${userCurrency}`,
            amount: 1,
          },
        });
        return response.data.new_amount;
      } catch (error) {
        console.error("Error fetching currency:", error);
      }
    };

    const currencyConversion = async () => {
      //runs conversion
      setIsCurrencyLoading(true);
      const fetchedCurrency = await fetchNativeCurrency();

      if (fetchedCurrency === undefined) {
        const convertedAmount = await fetchConvertedAmount("USD");
        setNativeCurrency("USD");
        setNativeCurrencyName("No native currency found");
        setConvertedAmount(convertedAmount);
        setIsCurrencyLoading(false);
      } else {
        const convertedAmount = await fetchConvertedAmount(
          fetchedCurrency.code
        );
        setNativeCurrency(fetchedCurrency.code);
        setNativeCurrencyName(fetchedCurrency.name);
        setConvertedAmount(convertedAmount);
        setIsCurrencyLoading(false);
      }
    };

    currencyConversion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry, userCurrency]); // re-renders on every change of user currency or selected country

  return (
    <h4>
      {isCurrencyLoading ? (
        <progress />
      ) : (
        `1 ${userCurrency} = $ ${convertedAmount} ${nativeCurrency} (${nativeCurrencyName.toUpperCase()})`
      )}
    </h4>
  );
}

export default CurrencyConverter;
