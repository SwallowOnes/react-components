import React from 'react';

import IProduct from '../types/IProduct';
import { IItems } from '../types/interfaces';

class ProductCard extends React.Component<IItems> {
  public render() {
    const { items } = this.props;
    if (items) {
      return items.map((product: IProduct) => (
        <div key={product.gameTitle}>
          {product.gameTitle}
          <img src={product.headerImg} alt={product.gameTitle} />
        </div>
      ));
    }
    return null;
  }
}

export default ProductCard;
