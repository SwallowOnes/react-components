import { useSearchParams } from 'react-router-dom';
import IProduct from '../../../types/IProduct';
import '../../index.css';

function CatalogPage(props: { products: IProduct[]; page: string | null }) {
  const { products, page } = props;
  const [, setSearchParams] = useSearchParams();

  if (!page) {
    return '';
  }

  if (products) {
    return (
      <div className="catalog">
        {products.map((product: IProduct) => (
          <div
            role="button"
            className="CardClicker"
            onClick={() => setSearchParams({ page, card: product.gameTitle })}
            aria-hidden="true"
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
