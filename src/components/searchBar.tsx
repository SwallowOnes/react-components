import React from 'react';

import { ISearchBarProps, ISearchBarState } from '../types/interfaces';

class SearchBar extends React.Component<ISearchBarProps, ISearchBarState> {
  constructor(props: ISearchBarProps) {
    super(props);
    this.state = {
      temp: window.localStorage.getItem('storedText') || '',
      data: [],
    };
  }

  componentDidMount() {
  }

  private onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState(() => ({ temp: value }));
  };

  private onSearchButtonClick = () => {
    const { temp } = this.state;
    const { onSearch } = this.props;
    if (temp.trim() === '') {
      return;
    }
    localStorage.setItem('storedText', temp);
    if (onSearch) {
      onSearch(temp);
    }
    this.fetchSearch()
  };

  private fetchSearch = async () => {
    const response = await fetch(`
    http://codefrondlers.store:5000/api/product/search?${new URLSearchParams({ query: `${window.localStorage.getItem('storedText') || ''}` }).toString()}`)
    if (!response.ok) {
      throw new Error('Error');
    }
    const dataResp = await response.json();
    this.setState({ data: dataResp });
  }
  
  public render() {
    const { temp, data } = this.state;
    console.log(data)
    return (
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          value={temp}
          onChange={this.onInputChange}
          />
        <button
          type="button"
          className="search-button"
          onClick={this.onSearchButtonClick}
          >
          Search
        </button>

      </div>
    );
  }
}
export default SearchBar;
