import React from 'react';

interface ISearchBarProps {
  onSearch: (temp: string) => void;
}

interface ISearchBarState {
  temp: string;
  options: Array<string>;
}

class SearchBar extends React.Component<ISearchBarProps, ISearchBarState> {
  constructor(props: ISearchBarProps) {
    super(props);
    this.state = {
      temp: window.localStorage.getItem('storedText') || '',
      options: [],
    };
  }

  componentDidMount() {
    this.fetchCategory();
  }

  private fetchCategory = async () => {
    const response = await fetch(
      'http://codefrondlers.store:5000/api/product/all-categories',
    );
    if (!response.ok) {
      throw new Error('Error');
    }
    const data = await response.json();
    this.setState({ options: data });
  };

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
  };

  public render() {
    const { temp, options } = this.state;
    return (
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          value={temp}
          onChange={this.onInputChange}
        />
        <select>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
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
