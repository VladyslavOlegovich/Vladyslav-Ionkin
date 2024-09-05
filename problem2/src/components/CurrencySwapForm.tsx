import React, { useState, useEffect } from "react";
import "./CurrencySwapForm.css";
import { Token } from "../Interfaces/Token";
import { CurrencyDropdown } from "./CurrencyDropdown";

export const CurrencySwapForm = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>("");
  const [toCurrency, setToCurrency] = useState<string>("");
  const [amount, setAmount] = useState<number | "">("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [errors, setErrors] = useState<{
    amount?: string;
    fromCurrency?: string;
    toCurrency?: string;
  }>({});

  useEffect(() => {
    fetch("https://interview.switcheo.com/prices.json")
      .then((response) => response.json())
      .then((data: Token[]) => setTokens(data));
  }, []);

  const handleSwap = () => {
    const validationErrors: {
      amount?: string;
      fromCurrency?: string;
      toCurrency?: string;
    } = {};

    if (!amount) validationErrors.amount = "Amount is required.";
    if (Number(amount) <= 0) validationErrors.amount = "Enter amount above 0";

    if (!fromCurrency)
      validationErrors.fromCurrency = "From currency is required.";
    if (!toCurrency) validationErrors.toCurrency = "To currency is required.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const exchangeRate = calculateExchangeRate();

    const receivedAmount = Number(amount) * exchangeRate;
    setResult(receivedAmount.toFixed(2));
  };

  const calculateExchangeRate = (): number => {
    const fromToken = tokens.find((token) => token.currency === fromCurrency);
    const toToken = tokens.find((token) => token.currency === toCurrency);

    if (fromToken && toToken) {
      return fromToken.price / toToken.price;
    }
    return 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handleSwap();
    }, 1000);
  };

  const getIconUrl = (currency: string) => {
    return `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency}.svg`;
  };

  return (
    <form onSubmit={handleSubmit} className="currency-swap-form">
      <h5> Currency Swap</h5>
      <label htmlFor="input-amount">Amount to send</label>
      <input
        id="input-amount"
        type="number"
        value={amount}
        onChange={(e) => {
          setAmount(Number(e.target.value));
          setErrors((prev) => ({ ...prev, amount: undefined }));
        }}
        className={`currency-input ${errors.amount ? "input-error" : ""}`}
      />
      {errors.amount && <div className="error-text">{errors.amount}</div>}

      <label htmlFor="from-currency">From</label>
      <CurrencyDropdown
        selectedCurrency={fromCurrency}
        showDropdown={showFromDropdown}
        tokens={tokens}
        onSelectCurrency={(currency: string) => {
          setFromCurrency(currency);
          setShowFromDropdown(false);
          setErrors((prev) => ({ ...prev, fromCurrency: undefined }));
        }}
        onToggleDropdown={() => setShowFromDropdown(!showFromDropdown)}
        error={errors.fromCurrency}
        getIconUrl={getIconUrl}
      />

      <label htmlFor="to-currency">To</label>
      <CurrencyDropdown
        selectedCurrency={toCurrency}
        showDropdown={showToDropdown}
        tokens={tokens}
        onSelectCurrency={(currency: string) => {
          setToCurrency(currency);
          setShowToDropdown(false);
          setErrors((prev) => ({ ...prev, toCurrency: undefined }));
        }}
        onToggleDropdown={() => setShowToDropdown(!showToDropdown)}
        error={errors.toCurrency}
        getIconUrl={getIconUrl}
      />

      <button type="submit" disabled={loading} className="swap-button">
        {loading ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            Swapping...
            <div className="loader"></div>
          </div>
        ) : (
          "CONFIRM SWAP"
        )}
      </button>

      {result && (
        <div className="result">
          <h5>Amount to receive: {result}$</h5>
        </div>
      )}
    </form>
  );
};
