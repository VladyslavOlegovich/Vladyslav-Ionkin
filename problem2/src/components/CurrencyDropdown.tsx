import React from "react";
import { CurrencyOption } from "./CurrencyOption";
import { DropdownProps } from "../Interfaces/DropdownProps";

export const CurrencyDropdown: React.FC<DropdownProps> = ({
  selectedCurrency,
  showDropdown,
  tokens,
  onSelectCurrency,
  onToggleDropdown,
  error,
  getIconUrl,
}) => {
  return (
    <div className="custom-select-container">
      <div
        onClick={onToggleDropdown}
        className={`custom-select ${error ? "input-error" : ""}`}
      >
        {selectedCurrency ? (
          <CurrencyOption
            currency={selectedCurrency}
            iconUrl={getIconUrl(selectedCurrency)}
            onClick={() => {}}
          />
        ) : (
          <span>Select Currency</span>
        )}
        <span className={`arrow ${showDropdown ? "open" : ""}`}></span>
      </div>
      {error && <div className="error-text">{error}</div>}
      {showDropdown && (
        <div className="custom-dropdown">
          {tokens.map((token, index) => (
            <CurrencyOption
              key={`${token.currency}-${index}`}
              currency={token.currency}
              iconUrl={getIconUrl(token.currency)}
              onClick={() => onSelectCurrency(token.currency)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
