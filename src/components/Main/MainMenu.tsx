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
  const [catalogCurrentPage, setCatalogCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(Number);
  const [cardsOnPage, setCardsOnPage] = useState(cardsPerPageDefault);
  const navigate = useNavigate();
  const params = useLocation();

  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page')
  const currentCard= searchParams.get('card')


  useEffect(()=>{
    if (!currentPage) {
      navigate(`/main/?page=1`)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
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
  }, [currentPage, navigate, cardsOnPage, params]);

  useEffect(() => {
    if (totalProducts / cardsOnPage < catalogCurrentPage - 1) {
      setCatalogCurrentPage(1);
    }
  }, [catalogCurrentPage, totalProducts, cardsOnPage]);

  const handleSearch = async (searchValue: string | null): Promise<void> => {
    if (searchValue) {
      const fetchData = await fetchSearch(searchValue);
      setProducts(fetchData);
    } else {
      const fethBody = {
        pageNumber: +(currentPage || 1),
        pageLimit: cardsOnPage,
        sortColumn: 'gameTitle',
        sortDirection: 'up',
        minPrice: 0,
        maxPrice: 100,
      };
      const fetchData = await fetchProducts(fethBody);
      setProducts(fetchData.products);
    }
  };

  const paginate = (pageNumber: number) => {
    setCatalogCurrentPage(pageNumber);
    navigate(`/main/?page=${pageNumber}`)
  };

  const selectCardsOnPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const number = parseInt(event.target.value, 10);
    setCardsOnPage(number);
    setCatalogCurrentPage(1);
    navigate(`/main/?page=${currentPage}`)
  };

  const handleNext = () => {
    setCatalogCurrentPage(+(currentPage || 1) + 1);
  };

  const handlePrev = () => {
    setCatalogCurrentPage(+(currentPage || 1) - 1);
  };

  if (products) {
    return (
      <div className="container">
        <div className="header">
          <h1 className="title">REACT COMPONENTS</h1>
          <SearchBar handleSearch={handleSearch} />
          <div className='select_items'>
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
          <CatalogPage products={products} page={currentPage} />
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
