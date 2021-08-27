import { Route, Link } from 'react-router-dom';
import { Menu } from 'antd';

interface IProps{
    label: string;
    to: string
    activeOnlyWhenExact?: boolean;
}

const MenuLink = ({
  label, to, activeOnlyWhenExact, ...rest
}: IProps) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match }) => (
      <Menu.Item {...rest} eventKey={match ? 'active' : ''}>
        <Link to={to}>
          {label}
        </Link>
      </Menu.Item>
    )}
  />
);

export default MenuLink;
