import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CatalogPage from './components/CatalogPage';
import SearchBar from './components/SearchBar';
import { fetchProducts, fetchSearch } from '../../API/fetch';
import IProduct from '../../types/IProduct';
import Pagination from './components/Pagination';

const cardsPerPageDefault = 10;

function MainPage() {
  const [products, setProducts] = useState<IProduct[]>();
  const [catalogCurrentPage, setCatalogCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(Number);
  const [cardsOnPage, setCardsOnPage] = useState(cardsPerPageDefault)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCatalog = async () => {
      const fethBody = {
        pageNumber: catalogCurrentPage,
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
    navigate(`$page${catalogCurrentPage}`);
  }, [catalogCurrentPage, navigate, cardsOnPage]);

  useEffect(() => {
    if (totalProducts / cardsOnPage < catalogCurrentPage - 1) {
      setCatalogCurrentPage(1);
    }
  }, [catalogCurrentPage, totalProducts, cardsOnPage]);

  const handleSearch = async (searchValue: string | null): Promise<void> => {
    if (searchValue) {
      const fetchData = await fetchSearch(searchValue);
      setProducts(fetchData);
    }
     else {
      const fethBody = {
        pageNumber: catalogCurrentPage,
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
  };

  const selectCardsOnPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const number = parseInt(event.target.value, 10);
    setCardsOnPage(number);
  }

  const handleNext = () => {
		setCatalogCurrentPage(catalogCurrentPage+ 1);
	}

  const handlePrev = () => {
		setCatalogCurrentPage(catalogCurrentPage - 1);
	}

  if (products) {
    return (
      <div className="main_header">
        <div className="header">
          <h1 className="title">REACT COMPONENTS</h1>
          <SearchBar handleSearch={handleSearch} />
        </div>
        <div className="main">
          <CatalogPage products={products} />
          <Pagination
            currentPage={catalogCurrentPage}
            totalProducts={totalProducts}
            cardsPerPage={cardsOnPage}
            paginate={paginate}
            select={selectCardsOnPage}
            prev={handlePrev}
            next={handleNext}
          />
        </div>
      </div>
    );
  }
}

export default MainPage;
