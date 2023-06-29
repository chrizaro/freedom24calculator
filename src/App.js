import React, { useState } from "react";

function App() {
  const [plan, setPlan] = useState("");
  const [currency, setCurrency] = useState("");
  const [quantity, setQuantity] = useState("");
  const [entryPoint, setEntryPoint] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [result, setResult] = useState(0);

  const handlePlanChange = (event) => {
    setPlan(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleEntryPointChange = (event) => {
    setEntryPoint(event.target.value);
  };

  const handleExchangeRateChange = (event) => {
    setExchangeRate(event.target.value);
  };

  const calculateSomething = () => {
    // Perform your calculation here using the selected plan, currency, value/quantity, and entry point
    // You can access the current values from the state variables

    // Example calculation:
    let result = 0;

    if (plan === "all") {
      // Calculation based on 'all inclusive' plan
      if (currency === "usd") {
        if (quantity > 100) {
          result = quantity * entryPoint * 0.005 + quantity * 0.012; // Example calculation
        } else {
          result = quantity * entryPoint * 0.005 + 1.2; // Example calculation
        }
      } else if (currency === "eur") {
        // Convert EUR to USD using an exchange rate, then perform the calculation
        if (quantity > 100) {
          result =
            quantity * entryPoint * 0.005 * exchangeRate + quantity * 0.012; // Example calculation
        } else {
          result = quantity * entryPoint * 0.005 * exchangeRate + 1.2; // Example calculation
        }
      }
    } else if (plan === "smart") {
      // Calculation based on 'smart' plan
      if (currency === "usd") {
        result = (2 + quantity * 0.02) / exchangeRate;
      } else if (currency === "eur") {
        // Convert EUR to USD using an exchange rate, then perform the calculation
        result = 2 + quantity * 0.02; // Example calculation
      }
    }

    // Update the result state variable
    setResult(result);
  };

  return (
    <div>
      <div>
        <label>Fees Plan:</label>
        <label>
          <input
            type="radio"
            value="all"
            checked={plan === "all"}
            onChange={handlePlanChange}
          />
          All Inclusive in USD
        </label>
        <label>
          <input
            type="radio"
            value="smart"
            checked={plan === "smart"}
            onChange={handlePlanChange}
          />
          Smart in EUR
        </label>
      </div>
      <div>
        <label>Currency of stock price:</label>
        <label>
          <input
            type="radio"
            value="usd"
            checked={currency === "usd"}
            onChange={handleCurrencyChange}
          />
          USD
        </label>
        <label>
          <input
            type="radio"
            value="eur"
            checked={currency === "eur"}
            onChange={handleCurrencyChange}
          />
          EUR
        </label>
      </div>
      <div>
        <label>Stock price: </label>
        <input
          type="text"
          value={entryPoint}
          onChange={handleEntryPointChange}
        />
      </div>
      <div>
        <label>Quantity: </label>
        <input type="text" value={quantity} onChange={handleQuantityChange} />
      </div>
      <div>
        <label>Exchange rate: 1 EUR is </label>
        <input
          type="text"
          value={exchangeRate}
          onChange={handleExchangeRateChange}
        />
        <label> USD (πχ 1€=1.0890$)(χρειάζεται μόνο αν fee plan και currency είναι διαφορετικό currency)</label>
      </div>
      <button onClick={calculateSomething}>Calculate</button>
      <p>Result (currency is based on Plan): {result}</p>
    </div>
  );
}

export default App;
