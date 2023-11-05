import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './components/Main/MainMenu';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
