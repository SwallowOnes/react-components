import { useState } from 'react';
import '../../index.css';
import { useSearchParams } from 'react-router-dom';

function SearchBar(props: {
  handleSearch: (searchValue: string | null) => void;
  page: string | null,
}) {
  const { handleSearch, page } = props;
  const [searchText, setSearchText] = useState('');
  const [errorHandler, setErrorHandler] = useState(false);
  const [, setSearchParams] = useSearchParams();

  const saveData = () => {
    window.localStorage.setItem('temp', JSON.stringify(searchText));
  };


  if (!page) {
    return '';
  }

  const onSearchButtonClick = () => {
    saveData();
    if(!searchText){
      setSearchParams({ page: "1" })
    }
    handleSearch(searchText);
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
        onChange={(e) =>
           setSearchText(e.target.value)
          }
      />
      <button
        type="button"
        className="search-button"
        onClick={
          onSearchButtonClick
        }
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
