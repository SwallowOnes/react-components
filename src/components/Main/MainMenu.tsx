import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import CatalogPage from './components/CatalogPage';
import SearchBar from './components/SearchBar';
import { fetchProducts, fetchSearch } from '../../API/fetch';
import IProduct from '../../types/IProduct';
import Pagination from './components/Pagination';
import DetailedCard from './components/DetailedCard';

const cardsPerPageDefault = 10;
const options: number[] = [5, 10, 20];

function MainPage() {
  const [products, setProducts] = useState<IProduct[]>();
  const [totalProducts, setTotalProducts] = useState(Number);
  const [cardsOnPage, setCardsOnPage] = useState(cardsPerPageDefault);
  const navigate = useNavigate();
  const params = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get('page');
  const currentCard = searchParams.get('card');
  const currentSearch = searchParams.get('search');

  useEffect(() => {
    if (!currentPage) {
      navigate(`?page=1`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if ( !currentSearch) {
      const fetchCatalog = async () => {
        const fethBody = {
          pageNumber: +(currentPage || 1),
          pageLimit: cardsOnPage,
          sortColumn: 'gameTitle',
          sortDirection: 'up',
          minPrice: 0,
          maxPrice: 100,
        };
        const catalog = await fetchProducts(fethBody);
        setProducts(catalog.products);
        setTotalProducts(catalog.totalProducts);
      };
      fetchCatalog();
    } else {
      const fetchSearchProd = async () => {
        const fetchData = await fetchSearch(currentSearch || '');
        setProducts(fetchData);
        setTotalProducts(1)
      };
      fetchSearchProd();
    }
  }, [currentPage, cardsOnPage, params, currentSearch, setSearchParams, searchParams]);

  const paginate = (pageNumber: number) => {
    navigate(`?page=${pageNumber}`);
  };

  const selectCardsOnPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const number = parseInt(event.target.value, 10);
    setCardsOnPage(number);
    navigate(`?page=1`);
  };

  const handleNext = () => {
    navigate(`?page=${+(currentPage || 1) + 1}`);
  };

  const handlePrev = () => {
    navigate(`?page=${+(currentPage || 1) - 1}`);
  };

  if (products) {
    return (
      <div className="container">
        <div className="header">
          <h1 className="title">REACT COMPONENTS</h1>
          <SearchBar page={currentPage} />
          <div className="select_items">
            <h1 className="title">SELECT ITEMS PRE PAGE</h1>
            <select value={cardsOnPage} onChange={selectCardsOnPage}>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="main">
          <CatalogPage products={products} page={currentPage} search={currentSearch} />
          <DetailedCard card={currentCard} />
        </div>
        <div className="pagination_cont">
          <Pagination
            currentPage={+(currentPage || 1)}
            totalProducts={totalProducts}
            cardsPerPage={cardsOnPage}
            paginate={paginate}
            prev={handlePrev}
            next={handleNext}
          />
        </div>
      </div>
    );
  }
}

export default MainPage;
