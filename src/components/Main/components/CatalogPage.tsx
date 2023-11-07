import { useSearchParams } from 'react-router-dom';
import IProduct from '../../../types/IProduct';
import '../../index.css';

function CatalogPage(props: { products: IProduct[]; page: string | null; search: string | null }) {
  const { products, page, search } = props;
  const [, setSearchParams] = useSearchParams();

  if (!page) {
    return '';
  }

  const checkSearch = (gameTitle: string) => {
    if (search) {
      setSearchParams({ page, search, card: gameTitle })
    } else {
      setSearchParams({ page, card: gameTitle })
    }
}

  if (products) {
    return (
      <div className="catalog">
        {products.map((product: IProduct) => (
          <div
            role="button"
            className="CardClicker"
            onClick={() => checkSearch(product.gameTitle)}
            aria-hidden="true"
            key={product.gameTitle}
          >
            <div className="card" key={product.gameTitle}>
              <p className="game-title">{product.gameTitle}</p>
              <img src={product.headerImg} alt={product.gameTitle} />
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default CatalogPage;
