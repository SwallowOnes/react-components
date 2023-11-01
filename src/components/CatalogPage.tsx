import IProduct from '../types/IProduct';
import './index.css';

function CatalogPage(props: { products: IProduct[] }) {
  const { products } = props;
    if (products) {
      return products.map((product: IProduct) => (
        <div className="card" key={product.gameTitle}>
          <p className="game-title">{product.gameTitle}</p>
          <img src={product.headerImg} alt={product.gameTitle} />
        </div>
      ));
    }
    return null;
}

export default CatalogPage;
