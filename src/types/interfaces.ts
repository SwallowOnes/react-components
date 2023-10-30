import IProduct from './IProduct';

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
  handleSearch: (temp: string) => void;
}

interface ISearchBarState {
  temp: string;
  error: boolean;
}

export type {
  IFilters,
  IItemsResponse,
  IItems,
  ISearchBarProps,
  ISearchBarState,
};
