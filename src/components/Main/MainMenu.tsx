import { useEffect, useState } from 'react';
import CatalogPage from './components/CatalogPage';
import SearchBar from './components/SearchBar';
import { fetchProducts, fetchSearch } from '../../API/fetch';
import IProduct from '../../types/IProduct';
import Pagination from './components/Pagination';

const cardsPerPage = 10;

function MainPage() {
  const [products, setProducts] = useState<IProduct[]>();
  const [catalogCurrentPage, setCatalogCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(Number);

  useEffect(() => {
    const fetchCatalog = async () => {
      const fethBody = {
        pageNumber: catalogCurrentPage,
        pageLimit: cardsPerPage,
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
  }, [catalogCurrentPage]);

  useEffect(() => {
    if (totalProducts / 10 < catalogCurrentPage - 1) {
      setCatalogCurrentPage(1);
    }
  }, [catalogCurrentPage, totalProducts]);

  const handleSearch = async (searchValue: string | null): Promise<void> => {
    if (searchValue) {
      const fetchData = await fetchSearch(searchValue);
      setProducts(fetchData);
    } else {
      const fethBody = {
        pageNumber: catalogCurrentPage,
        pageLimit: cardsPerPage,
        sortColumn: 'gameTitle',
        sortDirection: 'up',
        minPrice: 0,
        maxPrice: 100,
      };
      const fetchData = await fetchProducts(fethBody);
      setProducts(fetchData.products);
    }
  };

  const paginate = async (pageNumber: number) => {
    await setCatalogCurrentPage(pageNumber)
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
            catalogCurrentPage={catalogCurrentPage}
            totalProducts={totalProducts}
            cardsPerPage={cardsPerPage}
            paginate={paginate}
          />
        </div>
      </div>
    );
  }
}

export default MainPage;
