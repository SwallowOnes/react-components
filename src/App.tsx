import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './components/Main/MainMenu';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<MainPage />}>
          {/* <Route path="detailed" element={<DetailedMain />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
