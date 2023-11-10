import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

import styles from '../index.module.css'

function SearchBar(props: { page: string | null }) {
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
    setSearchParams({ page, search: searchText });
    if (!searchText) {
      searchParams.delete('page');
    }
  };

  if (errorHandler) {
    throw new Error('Error!');
  }
  return (
    <div className={styles.search_bar}>
      <input
        className={styles.search_input}
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button
        type="button"
        className={styles.search_button}
        onClick={onSearchButtonClick}
      >
        Search
      </button>
      <button
        type="button"
        className={styles.search_button}
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
