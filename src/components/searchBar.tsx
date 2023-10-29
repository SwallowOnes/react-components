import React from 'react';

import { ISearchBarProps, ISearchBarState } from '../types/interfaces';

class SearchBar extends React.Component<ISearchBarProps, ISearchBarState> {
  constructor(props: ISearchBarProps) {
    super(props);
    this.state = {
      temp: window.localStorage.getItem('storedText') || '',
    };
  }

  componentDidMount() {
    console.log('ss',this.props)
  }

  private onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState(() => ({ temp: value }));
  };

  private onSearchButtonClick = () => {
    const { temp } = this.state;
    const { fetchSearch } = this.props;
    fetchSearch(temp)
    if (temp.trim() === '') {
      return;
    }
    localStorage.setItem('storedText', temp);
  };

  public render() {
    const { temp } = this.state;
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
        <button
          type="button"
          className="search-button"
          onClick={() => {throw new Error('Error alert')}}
        >
          ERROR
        </button>
      </div>
    );
  }
}
export default SearchBar;
