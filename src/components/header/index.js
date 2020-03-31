import React from 'react';
import './index.less';
import { Button, Row, Col, Divider, Input, Menu, Modal, Form, Icon, message } from 'antd'
import Api from '../../api'
import { Link } from 'react-router-dom'

const { Search } = Input;

class Header extends React.Component {
    state = {
        isShowLoginModal: false, // 是否显示登录对话框
        isShowRegisterModal: false // 是否显示注册对话框
    }

    // 登录提交事件
    onLoginSubmit = values => {
        Api.login({
            username: values.username,
            password: values.password
        }).then((res) => {
            if (res.data.errno === 0) {
                message.success(`登录成功`)
                this.setState({ isShowLoginModal: false })
            } else {
                message.error(res.data.message)
            }
        })
    }

    // 注册提交事件
    onRegisterSubmit = values => {
        Api.register({
            username: values.username,
            password: values.password
        }).then((res) => {
            if (res.data.errno === 0) {
                message.success(`注册成功`)
                this.setState({ isShowRegisterModal: false })
            } else {
                message.error(res.data.message)
            }
        })
    }

    render() {
        return (
            <header className="header">
                <Row>
                    <Col span={4}>
                        <div className="header__title">七哥</div>
                    </Col>
                    <Col span={20}>
                        <Divider type="vertical" />
                        <Search
                            placeholder="搜索"
                            onSearch={value => console.log(value)}
                            style={{ width: 200 }}
                        />
                        <div className="header__btn">
                            <Button type="primary">
                                <Link to="/blog">
                                    写博客
                                </Link>
                            </Button>
                            <Button onClick={() => this.setState({ isShowLoginModal: true })} type="primary">
                                登录
                            </Button>
                            <Button onClick={() => this.setState({ isShowRegisterModal: true })}>
                                注册
                            </Button>
                        </div>
                        <Menu mode="horizontal">
                            <Menu.Item key="首页">
                                <Link to="/">
                                    首页
                                </Link>
                            </Menu.Item>
                            {/* <Menu.Item key="归档">
                                    归档
                            </Menu.Item>
                            <Menu.Item key="分类">
                                    分类
                            </Menu.Item>
                            <Menu.Item key="关于">
                                    关于
                            </Menu.Item> */}
                        </Menu>
                    </Col>
                </Row>

                <Modal
                    title="登录"
                    centered
                    footer={null}
                    visible={this.state.isShowLoginModal}
                    onCancel={() => this.setState({ isShowLoginModal: false })}
                >
                    <Form onFinish={this.onLoginSubmit} className="login-form">
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[{ required: true, message: '请输入用户名' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: '请输入密码' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title="注册"
                    centered
                    footer={null}
                    visible={this.state.isShowRegisterModal}
                    onCancel={() => this.setState({ isShowRegisterModal: false })}
                >
                    <Form onFinish={this.onRegisterSubmit} className="login-form">
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[{ required: true, message: '请输入用户名' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: '请输入密码' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </header >
        );
    }
}

export default Header;