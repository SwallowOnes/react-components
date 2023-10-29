import React from 'react';

import SearchBar from './components/SearchBar';
import CatalogPage from './components/CatalogPage';
import { IItemsResponse } from './types/interfaces';

class App extends React.Component {
  state = {
    products: [],
  };

  componentDidMount() {
    this.handleSearch(window.localStorage.getItem('storedText'));
    //   this.fetchSearch();
    // } else {
    //   this.fetchItems();
    // }
  }

  private handleSearch = (searchValue: string | null) => {
    if (searchValue) {
      return this.fetchSearch(searchValue);
    }
    return this.fetchItems();
  };

  private fetchSearch = async (searchValue: string) => {
    const response = await fetch(`
    http://codefrondlers.store:5000/api/product/search?${new URLSearchParams({
      query: searchValue,
    }).toString()}`);
    if (!response.ok) {
      throw new Error('Error');
    }
    const data: IItemsResponse = await response.json();
    this.setState({ products: data });
  };

  public fetchItems = async () => {
    const fetchBody1238 = {
      pageNumber: 1,
      pageLimit: 10,
      sortColumn: 'gameTitle',
      sortDirection: 'up',
      tags: [],
      themes: [],
      genres: [],
      minPrice: 0,
      maxPrice: 100,
    };
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
    this.setState({ products: data.products });
    console.log(data.products);
  };

  render() {
    const { products } = this.state;
    console.log('prod', products);
    return (
      <>
        <div>
          REACT CLASS COMPONENTS
          <SearchBar handleSearch={this.handleSearch} />
        </div>
        <div>
          <CatalogPage items={products} />
        </div>
      </>
    );
  }
}
export default App;
