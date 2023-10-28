import * as React from 'react';

interface ISearchBarProps {
  onSearch: (temp: string) => void;
}
interface ISearchBarState {
  temp: string;
}
class SearchBar extends React.Component<ISearchBarProps, ISearchBarState> {
  constructor(props: ISearchBarProps) {
    super(props);
    this.state = { temp: '' };
  }

  componentDidMount() {
    const storedValue = window.localStorage.getItem('storedText')

    if (storedValue) {
      this.setState({ temp: storedValue })
    }
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
    if (onSearch){
      onSearch(temp);
    }
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
      </div>
    );
  }
}
export default SearchBar;
