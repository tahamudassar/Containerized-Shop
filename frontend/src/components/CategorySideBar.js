import React, { useEffect, useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Button, Input, Badge } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './LogoutButton'; // Import LogoutButton component

const { Header, Content, Sider } = Layout;
const { Search } = Input;

const CategorySideBar = ({ Component, toggleSidebar }) => {
  const [categories, setCategories] = useState([]);
  const isLoggedIn = useSelector((state) => state.cart.loggedIn); // Read loggedIn from Redux store
  const itemCount = useSelector((state) => state.cart.itemCount); // Read itemCount from Redux store
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const onSearch = (value) => {
    navigate(`/search?query=${value}`);
  };

  const items1 = [
    { key: '1', label: <Link to="/">Home</Link> },
    !isLoggedIn && { key: '2', label: <Link to="/create-account">Sign Up</Link> },
    !isLoggedIn && { key: '3', label: <Link to="/SignIn">Sign In</Link> },
    { key: '4', label: <Link to="/FullCartView">Full Cart View</Link> },
    { key: '5', label: <Link to="/all-categories">All Categories</Link> },
    { key: '6', label: <Link to="/checkout">Check Out</Link> },
    { key: '7', label: <Link to="/fetch-user-data">Fetch User Data</Link> },
    { key: '8', label: <Link to="/forgot-password">Forgot Password</Link> },
  ].filter(Boolean); // Filter out null values

  const items2 = [
    {
      key: 'sub1',
      icon: <UserOutlined />,
      theme: 'dark',
      label: 'Category',
      children: categories.map((category, index) => ({
        key: `category-${index}`,
        label: <Link to={`/category/${category.slug}`}>{category.name}</Link>,
      })),
    },
    {
      key: 'sub2',
      icon: <LaptopOutlined />,
      label: 'subnav 2',
      children: new Array(4).fill(null).map((_, j) => ({
        key: `option${j + 1}`,
        label: `option${j + 1}`,
      })),
    },
    {
      key: 'sub3',
      icon: <NotificationOutlined />,
      label: 'subnav 3',
      children: new Array(4).fill(null).map((_, j) => ({
        key: `option${j + 5}`,
        label: `option${j + 5}`,
      })),
    },
  ];

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center', position: 'fixed', width: '100%', zIndex: 1 }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
        <Search
          placeholder="Search"
          enterButton="Search"
          size="middle"
          onSearch={onSearch}
          style={{ width: 300, marginRight: '16px' }}
        />
        <Badge count={itemCount} offset={[10, 0]}>
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={toggleSidebar}
          >
            Cart
          </Button>
        </Badge>
        <p style={{ color: 'white', margin: '0 16px' }}></p>
        <LogoutButton /> {/* Add LogoutButton component */}
      </Header>
      <Layout style={{ marginTop: 64 }}>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          {/* <Breadcrumb
            items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
            style={{ margin: '16px 0' }}
          /> */}
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Component />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default CategorySideBar;