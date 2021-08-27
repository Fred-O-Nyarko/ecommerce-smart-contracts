
import { Card } from 'antd';
import { useOrders } from '../../redux/hooks/useOrders';
import { useProducts } from '../../redux/hooks/useProducts';
import { IReduxStore } from '../../redux/types';
import { fromWei } from '../../utils/web3';
import IconText from '../icon-text';
import './product.css';

const { Meta } = Card;

const STATUS = {
  0: 'Available',
  1: 'Buying',
  2: 'Shipping',
  3: 'Sold',
};

interface ProductProps{
  product: Partial<IReduxStore["product"]>;
  placeOrder: (product: Partial<IReduxStore["product"]>) => any
}
const Product = ({ product, placeOrder }: ProductProps) => (

  <Card
    className="product"
    cover={<img alt={product.name} src={product.imageLink} />}
    actions={[
      <span>{STATUS[1]}</span>,
      <span>{fromWei(product.price, 'finney')?.toString()} finney</span>,
      <IconText
        type="shopping-cart"
        text="Buy"
        onClick={() => placeOrder(product)}
      />,
    ]}
  >
    <Meta title={product.name} description={product.descLink} />
  </Card>
);


export default Product;
