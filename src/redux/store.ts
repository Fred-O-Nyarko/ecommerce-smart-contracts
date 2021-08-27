import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import {rootReducer} from './reducers';
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
const presistConfig = {
    key: 'root',
    storage,
    blacklist: ['misc']

}
const enhancer = composeWithDevTools(applyMiddleware(thunk));
const persistedReducer = persistReducer(presistConfig, rootReducer)
const store = createStore(persistedReducer, enhancer);
const persistor = persistStore(store as any);
export {store, persistor}
