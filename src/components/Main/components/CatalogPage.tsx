import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import IProduct from '../../../types/IProduct';
import styles from '../index.module.css'

import DataContext from '../../../utils/DataContext';

function CatalogPage(props: { page: string | null }) {
  const { page } = props;
  const [, setSearchParams] = useSearchParams();
  const dataProv = useContext(DataContext);
  const products = dataProv?.products;
  const search = dataProv?.currentSearch;
  const isLoading = dataProv?.isLoading;

  if (!page) {
    return '';
  }

  const checkSearch = (gameTitle: string) => {
    if (search) {
      setSearchParams({ page, search, card: gameTitle });
    } else {
      setSearchParams({ page, card: gameTitle });
    }
  };

  if (isLoading) {
    return <div>Загрузка…</div>;
  }

  if (products) {
    return (
      <div className={styles.catalog}>
        {products.map((product: IProduct) => (
          <div
            role="button"
            className={styles.CardClicker}
            onClick={() => checkSearch(product.gameTitle)}
            aria-hidden="true"
            key={product.gameTitle}
          >
            <div className={styles.card} key={product.gameTitle}>
              <p className={styles.game_title}>{product.gameTitle}</p>
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
