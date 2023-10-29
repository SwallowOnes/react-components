import React from 'react';

import IProduct from '../types/IProduct';
import ProductCard from './ProductCard';

interface IFilters {
  themes: string[];
  genres: string[];
  tags: string[];
  minPrice: number;
  maxPrice: number;
}

interface IItemsResponse {
  products: IProduct[],
  filters: IFilters[],
  totalProducts: number
}

class CatalogPage extends React.Component {
    state = {
      items: [],
    };


  componentDidMount() {
    this.fetchItems();
  }

  private fetchItems = async () => {
    const fetchBody1238 = {
      "pageNumber": 1,
      "pageLimit": 10,
      "sortColumn": "gameTitle",
      "sortDirection": "up",
      "tags": [],
      "themes": [],
      "genres": [],
      "minPrice": 0,
      "maxPrice": 100
    }
    const response = await fetch(
      'http://codefrondlers.store:5000/api/product/catalog',
      {
        body: JSON.stringify(fetchBody1238),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    );
    if (!response.ok) {
      throw new Error('Error');
    }
    const data: IItemsResponse = await response.json();
    this.setState({items: data.products});
  };

  public render () {
    const { items } = this.state
    console.log('state.', items)
    return (
      <div>
        <ProductCard items={items} />
      </div>
    );
  }
}

export default CatalogPage;
