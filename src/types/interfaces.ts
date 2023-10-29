import IProduct from "./IProduct";

interface IFilters {
  themes: string[];
  genres: string[];
  tags: string[];
  minPrice: number;
  maxPrice: number;
}

interface IItemsResponse {
  products: IProduct[];
  filters: IFilters[];
  totalProducts: number;
}

interface IItems {
  items: IProduct[];
}

interface ISearchBarProps {
  onSearch: (temp: string) => void;
}

interface ISearchBarState {
  temp: string;
  data: Array<string>
}

export type {
  IFilters,
  IItemsResponse,
  IItems,
  ISearchBarProps,
  ISearchBarState
}
