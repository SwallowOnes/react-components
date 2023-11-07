import { useState } from 'react';
import '../../index.css';
import { useSearchParams } from 'react-router-dom';

function SearchBar(props: {
  page: string | null,
}) {
  const { page } = props;
  const [searchText, setSearchText] = useState('');
  const [errorHandler, setErrorHandler] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const saveData = () => {
    window.localStorage.setItem('temp', JSON.stringify(searchText));
  };


  if (!page) {
    return '';
  }

  const onSearchButtonClick = () => {
    saveData();
    setSearchParams({ page, search: searchText })
    if (!searchText) {
      searchParams.delete("page")
    }
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
