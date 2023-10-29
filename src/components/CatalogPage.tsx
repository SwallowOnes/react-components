import React from 'react';

import IProduct from '../types/IProduct';
import { IItems } from '../types/interfaces';
import './index.css'

class CatalogPage extends React.Component<IItems> {
  public render() {
    const { items } = this.props;
    if (items) {
      return items.map((product: IProduct) => (
        <div className='card' key={product.gameTitle}>
          <p className='game-title'>{product.gameTitle}</p>
          <img src={product.headerImg} alt={product.gameTitle} />
        </div>
      ));
    }
    return null;
  }
}

export default CatalogPage;
