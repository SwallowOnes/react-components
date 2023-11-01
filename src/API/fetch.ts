import { IItemsResponse } from "../types/interfaces";

async function fetchProducts() {
  const fetchBody = {
    pageNumber: 1,
    pageLimit: 10,
    sortColumn: 'gameTitle',
    sortDirection: 'up',
    minPrice: 0,
    maxPrice: 100,
  };

  const response = await fetch(
    'https://codefrondlers.store/api/product/catalog',
    {
      body: JSON.stringify(fetchBody),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "sec-fetch-mode": "cors",
        'Host': 'codefrondlers.store:5000',

      },
      method: 'POST',
    },
  );
  if (!response.ok) {
    throw new Error('Error');
  }
  const data: IItemsResponse = await response.json();
  console.log(data.products)
  return data.products;
};

async function fetchSearch(searchValue: string) {
  const url = `https://codefrondlers.store/api/product/search?${new URLSearchParams({
    query: searchValue,
  }).toString()}`
  const response = await fetch(
    url,
  );
  if (!response.ok) {
    throw new Error('Error');
  }
  const data: IItemsResponse = await response.json();
  console.log(data)
  return data.products;
};

export { fetchProducts, fetchSearch};