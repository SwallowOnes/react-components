import {
  IFetchBody,
  IItemsResponse,
  ISearchResponse,
} from '../types/interfaces';
import IProduct from '../types/IProduct';

async function fetchProducts(fetchBody: IFetchBody) {
  const response = await fetch(
    'https://codefrondlers.store/api/product/catalog',
    {
      body: JSON.stringify(fetchBody),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'sec-fetch-mode': 'cors',
      },
      method: 'POST',
    },
  );
  if (!response.ok) {
    throw new Error('Error');
  }
  const data: IItemsResponse = await response.json();
  return data;
}

async function fetchSearch(searchValue: string) {
  const url = `https://codefrondlers.store/api/product/search?${new URLSearchParams(
    {
      query: searchValue,
    },
  ).toString()}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error');
  }
  const data: ISearchResponse = await response.json();
  return data;
}

async function fetchProduct(gameTitle: string) {
  const url = `https://codefrondlers.store/api/product/${gameTitle}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error');
  }
  const data: IProduct = await response.json();
  return data;
}

export { fetchProducts, fetchSearch, fetchProduct };
