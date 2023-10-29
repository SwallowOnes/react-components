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
  fetchSearch: (temp: string) => void;
}

interface ISearchBarState {
  temp: string;
}

export type {
  IFilters,
  IItemsResponse,
  IItems,
  ISearchBarProps,
  ISearchBarState,
};
