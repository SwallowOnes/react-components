import { useEffect, useState } from 'react';
import CatalogPage from './components/CatalogPage';
import SearchBar from './components/SearchBar';
import { fetchProducts, fetchSearch } from '../../API/fetch';
import IProduct from '../../types/IProduct';

function MainPage() {
  const [products, setProducts] = useState<IProduct[]>();

  useEffect(() => {
    const fetchCatalog = async () => {
      const catalog = await fetchProducts();
      setProducts(catalog);
    };
    fetchCatalog();
  }, []);

  const handleSearch = async (searchValue: string | null): Promise<void> => {
    if (searchValue) {
      const fetchData = await fetchSearch(searchValue);
      setProducts(fetchData)
    }
    else {
      const fetchData = await fetchProducts();
      setProducts(fetchData);
    }
  };

 if (products){
   return (
     <div className="main_header">
       <div className="header">
         <h1 className="title">REACT CLASS COMPONENTS</h1>
         <SearchBar handleSearch={handleSearch} />
       </div>
       <div className="main">
         <CatalogPage products={products} />
       </div>
     </div>
   );
 }
}

export default MainPage;
