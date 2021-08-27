import './App.css';
import 'antd/dist/antd.css'
import { Input, Layout, Menu } from 'antd';

import { Switch, Route } from 'react-router-dom';
import MenuLink from './components/menu-link';
import {Home} from './components'
import About from './components/about';
import AddProduct from './components/add-product';
import YourOrders from './components/your-orders';
const App = () => {
  const { Header, Content, Footer } = Layout;
const { Search } = Input;
  return (
    <Switch>
    <Layout className="">
      <Header>
        {/* <img className="logo" src={logo} alt="logo" /> */}
        <Search
          className="search"
          placeholder="What are you looking for..."
        />
      </Header>

      <Content className="content">
        <Menu
          className="mainNav"
          mode="horizontal"
          defaultSelectedKeys={['active']}
          selectable={false}
        >
          <MenuLink to="/" activeOnlyWhenExact label="Home" />
          <MenuLink to="/your-orders" label="Your Orders" />
          <MenuLink to="/add-product" label="Add Product" />
          <MenuLink to="/about" label="About" />
        </Menu>

        <div className="main">
          <Route exact path="/" component={Home} />
          <Route path="/your-orders" component={YourOrders} />
          <Route path="/add-product" component={AddProduct} />
          <Route path="/about" component={About} />
        </div>
      </Content>

      <Footer className="footer">
        DApp Store ©2018 Created by Nha Hoang
      </Footer>
    </Layout>
  </Switch>
  );
}

export default App;
