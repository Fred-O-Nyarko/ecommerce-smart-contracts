import { getStoreContract, getEscrowContract } from '../../utils/contracts';
import { getWeb3 } from '../../utils/web3';
import { promisify } from '../../utils/promises';
import {ActionTypes as types} from '../actions';
import { useDispatch, useSelector } from 'react-redux';

import { IReduxStore } from '../types';


export function useOrders(){
    const state = useSelector((state: IReduxStore) => state.order)
    const dispatch = useDispatch()

    function changeView(data: typeof types.CHANGE_VIEW){
    dispatch({type: types.CHANGE_VIEW})
    };

    async function placeOrder (product: Partial<IReduxStore['product']>){
      const web3 = getWeb3();
      const Store = getStoreContract();
      const priceInWei = web3.toWei(product.price, product.unit);

      console.table([web3, Store, priceInWei, 'tests']);
      
    
      dispatch({type: types.PLACE_ORDER})
    
      try {
        const store = await Store.deployed();
        const coinbase = await promisify(web3.eth.getCoinbase)();
    
        store.OrderCreated().watch((error: any, event: any) => {
          if (error) {
            return;
          }
    
          const {
            productId, seller, buyer, escrow,
          } = event.args;
    
          dispatch({
            type: types.PLACE_ORDER_SUCCESS,
            order: {
              productId,
              seller,
              buyer,
              escrow,
              product,
            },
          });
        });
    
        await store.placeOrder(product.id, {
          from: coinbase,
          value: priceInWei,
        });
      } catch (ex) {
        dispatch({
          type: types.PLACE_ORDER_FAIL,
          message: ex.toString ? ex.toString() : ex,
        });
      }
    };

    async function fetchOrders(from = 'buyer'){
  const web3 = getWeb3();
  const Store = getStoreContract();

  dispatch({
    type: types.FETCH_ORDERS,
    view: from,
  });

  try {
    const store = await Store.deployed();
    const coinbase = await promisify(web3.eth.getCoinbase)();
    const orderCreatedEvent = store.OrderCreated(
      { [from]: coinbase },
      { fromBlock: 0, toBlock: 'latest' },
    );
    const events = await promisify(orderCreatedEvent.get.bind(orderCreatedEvent))();
    const orders = await Promise.all(events.map(async (event: any) => {
      const id = event.args.productId;
      const [
        name,
        category,
        imageLink,
        descLink,
        price,
        index,
        status,
      ] = await store.getProduct.call(id);

      const product = {
        id,
        name,
        category,
        imageLink,
        descLink,
        price,
        index,
        status,
        unit: 'wei',
      };

      return { ...event.args, product };
    }));

    dispatch({
      type: types.FETCH_ORDERS_SUCCESS,
      orders,
    });
  } catch (ex) {
    dispatch({
      type: types.FETCH_ORDERS_FAIL,
      message: ex,
    });
  }
};

async function acceptOrder(order: Partial<IReduxStore["order"]>){
  const web3 = getWeb3();
  const Store = getStoreContract();
  const Escrow = getEscrowContract();

  dispatch({
    type: types.ACCEPT_ORDER,
  });

  try {
    const store = await Store.deployed();
    const escrow = Escrow.at(order.escrow);
    const coinbase = await promisify(web3.eth.getCoinbase)();

    store.ProductUpdated().watch((error: any, event: any) => {
      if (error) {
        return;
      }

      const product = { ...event.args, unit: 'wei' };

      dispatch({
        type: types.ACCEPT_ORDER_SUCCESS,
        order: {
          ...order,
          product,
        },
      });
    });

    await escrow.accept({
      from: coinbase,
    });
  } catch (ex) {
    dispatch({
      type: types.ACCEPT_ORDER_FAIL,
      message: ex.toString ? ex.toString() : ex,
    });
  }
};

async function rejectOrder(order: Partial<IReduxStore["order"]>){
  const web3 = getWeb3();
  const Store = getStoreContract();
  const Escrow = getEscrowContract();

  dispatch({
    type: types.REJECT_ORDER,
  });

  try {
    const store = await Store.deployed();
    const escrow = Escrow.at(order.escrow);
    const coinbase = await promisify(web3.eth.getCoinbase)();

    store.ProductUpdated().watch((error: any, event: any) => {
      if (error) {
        return;
      }

      const product = { ...event.args, unit: 'wei' };

      if (product.id === order.productId) {
        dispatch({
          type: types.REJECT_ORDER_SUCCESS,
          order: {
            ...order,
            product,
          },
        });
      }
    });

    await escrow.reject({
      from: coinbase,
    });
  } catch (ex) {
    dispatch({
      type: types.REJECT_ORDER_FAIL,
      message: ex.toString ? ex.toString() : ex,
    });
  }
};

    return{
        ...state,
        changeView,
        placeOrder,
        acceptOrder,
        rejectOrder,
        fetchOrders
    }
}









