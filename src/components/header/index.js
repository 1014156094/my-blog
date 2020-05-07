import React from 'react';
import './index.less';
import { Button, Row, Col, Divider, Input, Menu, Modal, Form, message } from 'antd'
import { login, register } from '../../api'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { SET_USER_INFO } from '../../store/types'

const mapState = state => state
const mapDispatch = dispatch => {
    return {
        setUserInfo: (info) => dispatch({ type: SET_USER_INFO, info }), // 设置当前用户信息
    }
}

const { Search } = Input;

class Header extends React.Component {
    state = {
        isShowLoginModal: false, // 是否显示登录对话框
        isShowRegisterModal: false, // 是否显示注册对话框
        isLogin: this.props.user.info // 是否已登录
    }

    // 登录提交事件
    onLoginSubmit = values => {
        login({
            username: values.username,
            password: values.password
        }).then(({ data }) => {
            if (data.errno === 0) {
                message.success(`登录成功`)

                this.setState({
                    isShowLoginModal: false,
                    isLogin: true
                })
                this.props.setUserInfo(data.data)
            } else {
                message.error(data.message)
            }
        })
    }

    // 注册提交事件
    onRegisterSubmit = values => {
        register({
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
                        <Link to="/" className="header__title">小七哥的博客</Link>
                    </Col>
                    <Col span={20}>
                        <Divider type="vertical" />
                        <Search
                            placeholder="搜索"
                            onSearch={value => console.log(value)}
                            style={{ width: 200 }}
                        />
                        <div className="header__btn">
                            {
                                this.state.isLogin ?
                                    <Button type="primary">
                                        <Link to="/blog">
                                            写博客
                                        </Link>
                                    </Button> :
                                    (
                                        this.props.location.pathname === '/blog' &&
                                        <>
                                            <Button onClick={() => this.setState({ isShowLoginModal: true })} type="primary">
                                                登录
                                        </Button>
                                            <Button onClick={() => this.setState({ isShowRegisterModal: true })}>
                                                注册
                                        </Button>
                                        </>
                                    )
                            }

                        </div>
                        <Menu mode="horizontal">
                            <Menu.Item key="首页">
                                <Link to="/">
                                    首页
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="开源组件">
                                <Link to="http://127.0.0.1/arsenal">
                                    开源组件
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="给作者留言">
                                <Link to="/guestbook">
                                    给作者留言
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
                            <Input placeholder="请输入用户名" />
                        </Form.Item>
                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: '请输入密码' }]}
                        >
                            <Input.Password placeholder="请输入密码" />
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

export default connect(mapState, mapDispatch)(Header);