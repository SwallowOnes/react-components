import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './components/Main/MainMenu';
import DetailedCard from './components/Main/components/DetailedCard';
import DetailedMain from './components/Main/components/DetailedMain';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<MainPage />}>
          <Route path=":id" element={<MainPage />} />
          <Route path="main/detailed" element={<DetailedMain />} />
          <Route path="main/detailed/:productTitle" element={<DetailedCard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
