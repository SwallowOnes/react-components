import { Link } from 'react-router-dom';
import IProduct from '../../../types/IProduct';
import '../../index.css';

function CatalogPage(props: { products: IProduct[] }) {
  const { products } = props;
  if (products) {
    return products.map((product: IProduct) => (
      <Link
        to={`main/detailed/${product.gameTitle}`}
        key={product.gameTitle}
      >
        <div className="card" key={product.gameTitle}>
          <p className="game-title">{product.gameTitle}</p>
          <img src={product.headerImg} alt={product.gameTitle} />
        </div>
      </Link>
    ));
  }
  return null;
}

export default CatalogPage;
