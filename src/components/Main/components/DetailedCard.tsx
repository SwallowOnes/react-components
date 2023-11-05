import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchProduct } from '../../../API/fetch';
import IProduct from '../../../types/IProduct';
import '../../index.css';

function DetailedCard() {
  const { productTitle } = useParams()
  const navigate = useNavigate()
  const [productData, setProductData] = useState<IProduct>();

  const [titleForRequest, setTitleForRequest] = useState('');


  useEffect(() => {
    if (titleForRequest !== productTitle) {
      const getProduct = async () => {
        const product = await fetchProduct(productTitle || "");
        setProductData(product)
      };
      getProduct();
      setTitleForRequest(productTitle || '');
      navigate(`$detailed${titleForRequest}`);
    }
  }, [ productTitle, titleForRequest, navigate]);

  if (productData) {
    return (
        <div className="card" key={productData.gameTitle}>
          <p className="game-title">{productData.gameTitle}</p>
          <img src={productData.headerImg} alt={productData.gameTitle} />
          <p className='card-text'>{productData.descriptionShort}</p>
          <p className='card-text'>{`${productData.category}`}</p>
          <p className='card-text'>{`${productData.devCompany}`}</p>
          <p className='card-text'>{`${productData.price}$`}</p>
        </div>

    )
  }
  return null;
}

export default DetailedCard