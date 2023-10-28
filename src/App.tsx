import React from 'react';

import SearchBar from './components/SearchBar';

class App extends React.Component {
  state = {}

  private onSearch = () => {
    console.log(this)
  }

  render() {
    return (
      <div>
        Hello, world!
        <SearchBar onSearch={this.onSearch}/>
      </div>
    );
  }
}
export default App;
