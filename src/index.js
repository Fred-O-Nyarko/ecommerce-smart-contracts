import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { initWeb3 } from "./utils/web3";
import { listenToContractEvents } from "./utils/events";
import App from "./components/App";

initWeb3().then(() => {
  const store = configureStore();

  listenToContractEvents(store.dispatch);

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
});
