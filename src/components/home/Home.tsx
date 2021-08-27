import React from 'react';
// @ts-ignore
import uuid from 'uuid-v4';
import { Row, Col } from 'antd';
import Product from '../product';
import "./home.css"
import { useOrders } from '../../redux/hooks/useOrders';

const Home = () => {

    const NO_OF_ITEMS = 4;
    React.useEffect(() => {
        // fetchProducts()
    })
    const products = Array(10).fill(0)
    const {placeOrder} = useOrders();
    return(
        <div className="home">
        {Array(Math.ceil(products.length / NO_OF_ITEMS))
          .fill(0)
          .map((_, i) =>
            products.slice(i * NO_OF_ITEMS, (i * NO_OF_ITEMS) + NO_OF_ITEMS))
          .map(row => (
            <Row key={uuid()} gutter={16}>
              {row.map(product => (
                <Col key={product.id} span={24 / NO_OF_ITEMS}>
                  <Product product={product} placeOrder={placeOrder}/>
                </Col>
              ))}
            </Row>
          ))}
        {!products.length && (
          <div className="emptyView">No product available</div>
        )}
      </div>
    )
}


export default Home;
