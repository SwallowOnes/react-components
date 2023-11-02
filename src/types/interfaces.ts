import IProduct from './IProduct';

interface IFetchBody {
  pageNumber: number,
  pageLimit: number,
  sortColumn: string,
  sortDirection: string,
  minPrice: number,
  maxPrice: number,
};

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

type ISearchResponse = IProduct[];

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
  IFetchBody,
  IFilters,
  IItemsResponse,
  ISearchResponse,
  IItems,
  ISearchBarProps,
  ISearchBarState,
};
