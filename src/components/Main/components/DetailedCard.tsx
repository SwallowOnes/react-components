import { useState, useEffect } from 'react';
import { fetchProduct } from '../../../API/fetch';
import IProduct from '../../../types/IProduct';
import styles from '../index.module.css'

function DetailedCard(props: { card: string | null }) {
  const { card } = props;
  const [productData, setProductData] = useState<IProduct>();

  const [titleForRequest, setTitleForRequest] = useState('');

  useEffect(() => {
    if (titleForRequest === card) {
      const getProduct = async () => {
        const product = await fetchProduct(card || '');
        setProductData(product);
      };
      getProduct();
    }
    setTitleForRequest(card || '');
  }, [card, titleForRequest]);

  if (!card) {
    return null;
  }
  if (productData) {
    return (
      <div className={styles.card} key={productData.gameTitle}>
        <p className={styles.game_title}>{productData.gameTitle}</p>
        <img src={productData.headerImg} alt={productData.gameTitle} />
        <p className={styles.card_text}>{productData.descriptionShort}</p>
        <p className={styles.card_text}>{`${productData.category}`}</p>
        <p className={styles.card_text}>{`${productData.devCompany}`}</p>
        <p className={styles.card_text}>{`${productData.price}$`}</p>
      </div>
    );
  }
  return null;
}

export default DetailedCard;
