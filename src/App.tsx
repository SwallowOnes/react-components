import React from 'react';

import SearchBar from './components/SearchBar';
import CatalogPage from './components/CatalogPage';

class App extends React.Component {
  state = {};

  private onSearch = () => {
    console.log(this);
  };

  render() {
    return (
      <>
        <div>
          REACT CLASS COMPONENTS
          <SearchBar onSearch={this.onSearch} />
        </div>
        <div>
          <CatalogPage />
        </div>
      </>
    );
  }
}
export default App;
