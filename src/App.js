import React, { Component } from 'react';
import './App.less';
import './styles/common.less'
import { Layout, Row, Col, Avatar, Divider, Tag } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import Header from './components/header'

const { Footer } = Layout

class App extends Component {
  render() {
    return (
      <div className="App" >
        <Header location={this.props.location} />

        <Row className="main-wrap">
          <Col span={4} className="sider-wrap">
            <Avatar size={132} src={require('./static/images/my-avatar.jpg')} />
            <h2 className="my-name">小七哥</h2>
            <div className="my-desc">大家好，我是前端打杂人员</div>
            <ul className="homes">
              <li>
                <a href="https://github.com/1014156094" rel="noopener noreferrer" target="_blank">
                  <GithubOutlined />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a href="https://blog.csdn.net/qq1014156094" rel="noopener noreferrer" target="_blank">
                  <img src={require('./static/images/csdn.jpg')} className="homes__logo" alt="CSDN" />
                  <span>CSDN</span>
                </a>
              </li>
              <li>
                <a href="https://segmentfault.com/" rel="noopener noreferrer" target="_blank">
                  <img src={require('./static/images/segment-fault.jpg')} className="homes__logo" alt="SegmentFault" />
                  <span>SegmentFault</span>
                </a>
              </li>
            </ul>

            <p className="friends">
              友情链接：
              <a href="https://blog.iwnweb.com" rel="noopener noreferrer" target="_blank">勇哥的博客</a>
              <p>欢迎交换友情链接~</p>
            </p>

            {/* <Divider orientation="left">热门文章</Divider>
            <ul className="articles">
              <li><a href=";">如何用 es6+ 写出优雅的 js 代码</a></li>
              <li><a href=";">如何用 es6+ 写出优雅的 js 代码</a></li>
              <li><a href=";">如何用 es6+ 写出优雅的 js 代码</a></li>
            </ul>
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
            <Tag color="purple">purple</Tag> */}
          </Col>
          <Col span={20} className="content-inner-wrap">
            {this.props.children}
          </Col>
        </Row>

        <Footer>Blog ©2020 Created by LiRiPeng</Footer >
      </div >
    );
  }
}

export default App;
