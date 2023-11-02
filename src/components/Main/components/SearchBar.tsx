import { useState } from 'react';
import '../../index.css';


function SearchBar( props: { handleSearch: (searchValue: string | null) => void }) {
  const { handleSearch } = props;
  const [searchText, setSearchText] = useState('');
  const [errorHandler, setErrorHandler] = useState(false)

  const saveData = () => {
    window.localStorage.setItem("temp", JSON.stringify(searchText));
  };

  const onSearchButtonClick = () => {
    saveData();
    handleSearch(searchText)
  };

    if (errorHandler) {
      throw new Error('kek');
    }
    return (
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          type="button"
          className="search-button"
          onClick={onSearchButtonClick}
        >
          Search
        </button>
        <button
          type="button"
          className="search-button"
          onClick={() => {
            setErrorHandler(true);
          }}
        >
          ERROR
        </button>
      </div>
    );
}
export default SearchBar;
