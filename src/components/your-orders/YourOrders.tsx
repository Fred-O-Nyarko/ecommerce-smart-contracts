import React from 'react';

import { List, Steps, Radio } from 'antd';

import { fromWei } from '../../utils/web3';
import IconText from '../icon-text';
import './your-orders.css';
import { useOrders } from '../../redux/hooks/useOrders';
import { IReduxStore } from '../../redux/types';

const { Step } = Steps;
const { Button: RadioButton, Group: RadioGroup } = Radio;

const YourOrders = () => {

  const {fetchOrders, acceptOrder, rejectOrder, changeView} = useOrders()
  let view = ""
  const orders: any = [];
  const isFetching =  false;

  React.useEffect(() => {
    fetchOrders(view);
  })

  function switchView (event?: any) {
    const view = event?.target.value;
    changeView(view);
    fetchOrders(view);
  };


    return (
      <div>
        <RadioGroup
          className="switcher"
          onChange={switchView}
          defaultValue={view}
        >
          <RadioButton value="buyer">Buyer</RadioButton>
          <RadioButton value="seller">Seller</RadioButton>
        </RadioGroup>

        <List
          loading={isFetching}
          itemLayout="vertical"
          size="default"
          dataSource={orders}
          renderItem={(item: Partial<IReduxStore["order"]>) => (
            <List.Item
              actions={[
                <IconText
                  type="check-circle-o"
                  text={view === "buyer" ? "Received" : "Accept"}
                  onClick={() => acceptOrder(item )}
                />,
                <IconText
                  type="close-circle-o"
                  text="Reject"
                  onClick={() => rejectOrder(item)}
                />,
              ]}
              extra={
                <img
                  width={272}
                  alt={item?.product?.name}
                  src={item?.product?.imageLink}
                />
              }
            >
              <List.Item.Meta
                title={item.product?.name}
                description={item.product?.descLink}
              />

              <Steps
                className="steps"
                size="small"
                // current={item.product?.status?.toNumber()}
                // status={item.product?.status?.toNumber() === 0 ? 'error' : null}
              >
                <Step title="Available" />
                <Step title="Buying" />
                <Step title="Shipping" />
                <Step title="Finished" />
              </Steps>

              <div>
                {fromWei(item.product?.price, 'finney')?.toString()} finney
              </div>
            </List.Item>
          )}
        />
      </div>
    );


}


export default YourOrders;
