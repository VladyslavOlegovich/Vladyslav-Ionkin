export const CurrencyOption: React.FC<{
  currency: string;
  iconUrl: string;
  onClick: () => void;
}> = ({ currency, iconUrl, onClick }) => (
  <div
    onClick={onClick}
    style={{
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      padding: "5px",
    }}
  >
    <img
      src={iconUrl}
      alt={currency}
      style={{ width: "24px", height: "24px", marginRight: "8px" }}
    />
    <span>{currency}</span>
  </div>
);
