import { Token } from "../Interfaces/Token";

export interface DropdownProps {
  selectedCurrency: string;
  showDropdown: boolean;
  tokens: Token[];
  onSelectCurrency: (currency: string) => void;
  onToggleDropdown: () => void;
  error?: string;
  getIconUrl: (currency: string) => string;
}
