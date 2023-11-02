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
  const [totalProducts, setTotalProducts ] = useState(Number);

  useEffect(() => {
    const fetchCatalog = async () => {
      const catalog = await fetchProducts();
      setProducts(catalog.products);
      setTotalProducts(catalog.totalProducts)
    };
    fetchCatalog();
  }, []);

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
      const fetchData = await fetchProducts();
      setProducts(fetchData.products);
    }
  };

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
            cardsPerPage={cardsPerPage} />
        </div>
      </div>
    );
  }
}

export default MainPage;
