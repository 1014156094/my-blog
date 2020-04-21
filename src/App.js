import React, { Component } from 'react';
import './App.less';
import './styles/common.less'
import { Layout, Row, Col, Avatar, Divider, Tag } from 'antd'
import { GithubOutlined, UserOutlined } from '@ant-design/icons'
import Header from './components/header'

const { Footer } = Layout

class App extends Component {
  render() {
    return (
      <div className="App" >
        <Header />

        <Row className="main-wrap">
          <Col span={4} className="sider-wrap">
            <Avatar size={132} icon={<UserOutlined />} />
            <h2 className="my-name">姓名呀</h2>
            <div className="my-desc">介绍呀</div>
            <ul className="home-list">
              <li>
                <a href="https://github.com/1014156094" rel="noopener noreferrer" target="_blank">
                  <GithubOutlined />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a href="https://blog.csdn.net/qq1014156094" rel="noopener noreferrer" target="_blank">
                  <GithubOutlined />
                  <span>CSDN</span>
                </a>
              </li>
              <li>
                <a href="https://juejin.im/user/5acf1681f265da237f1eaf38" rel="noopener noreferrer" target="_blank">
                  <GithubOutlined />
                  <span>掘金</span>
                </a>
              </li>
            </ul>
            {/* <Divider orientation="left">热门文章</Divider>
            <ul className="article-list">
              <li><a href=";">如何用 es6+ 写出优雅的 js 代码</a></li>
              <li><a href=";">如何用 es6+ 写出优雅的 js 代码</a></li>
              <li><a href=";">如何用 es6+ 写出优雅的 js 代码</a></li>
            </ul> */}
            <Divider orientation="left">标签</Divider>
            <Tag color="magenta">magenta</Tag>
            <Tag color="red">red</Tag>
            <Tag color="volcano">volcano</Tag>
            <Tag color="orange">orange</Tag>
            <Tag color="gold">gold</Tag>
            <Tag color="lime">lime</Tag>
            <Tag color="green">green</Tag>
            <Tag color="cyan">cyan</Tag>
            <Tag color="blue">blue</Tag>
            <Tag color="geekblue">geekblue</Tag>
            <Tag color="purple">purple</Tag>
          </Col>
          <Col span={20} className="content-inner-wrap">
            {this.props.children}
          </Col>
        </Row>

        <Footer>Blog ©2019 Created by LiRiPeng</Footer >
      </div >
    );
  }
}

export default App;
