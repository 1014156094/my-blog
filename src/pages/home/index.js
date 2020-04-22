// 首页

import React from 'react'
import './index.less'
import { Divider, Popconfirm, message, Pagination } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getBlogList, delBlog } from '../../api/blog'
import MdEditor from 'react-markdown-editor-lite'
import MarkdownIt from 'markdown-it'
import { getURLParams } from '../../utils'

const mdParser = new MarkdownIt(/* Markdown-it options */)
const mapState = state => state

class Home extends React.Component {
    // 获取当前页码
    getPage = () => {
        const params = getURLParams(window.location.href)

        return params ? (+params.page) : 1
    }

    state = {
        page: this.getPage(), // 当前页码
        pageSize: 10, // 	每页条数
        blogs: {}, // 博客列表
        isLogin: this.props.user.info // 是否已登录
    }

    componentDidMount() {
        this.getBlogList()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            page: this.getPage()  // 更新当前页码
        }, () => {
            this.getBlogList()
        })
    }

    // 获取博客列表
    getBlogList = () => {
        getBlogList({
            page: this.state.page
        }).then(res => {
            this.setState({
                blogs: res.data.data
            })
        })
    }

    // 删除博客
    delBlog = (id) => {
        delBlog({
            id
        }).then(({ data }) => {
            if (data.errno === 0) {
                message.success('删除成功')

                // 更新列表
                this.setState({
                    blogs: this.state.blogs.filter(elm => elm.id !== id)
                })
            } else {
                message.error('删除失败')
            }
        })
    }

    handlePageChange = (page, pageSize) => {
        this.props.history.push(`/home?page=${page}`)
    }

    render() {
        return (
            <div className="page-home">
                <ul className="list">
                    {this.state.blogs.list && this.state.blogs.list.map(elm => (
                        <li className="list__item" key={elm.id}>
                            <Link to={`/blog/${elm.id}/detail`}>
                                <Divider orientation="left">
                                    <span className="list__title">{elm.title}</span>
                                    <span className="list__time">{elm.createtime}</span>
                                </Divider>
                                {/* <div dangerouslySetInnerHTML={{ __html: elm.content }}></div> */}
                                <div className="list__markdown">
                                    <MdEditor
                                        value={elm.content}
                                        renderHTML={(text) => mdParser.render(text)}
                                        config={{
                                            view: {
                                                menu: false,
                                                md: false,
                                                html: true,
                                                fullScreen: false,
                                                hideMenu: true
                                            }
                                        }}
                                    />
                                </div>
                            </Link>

                            {
                                this.state.isLogin &&
                                <div className="list__action">
                                    <Link to={`/blog/${elm.id}`}>
                                        编辑
                                    </Link>
                                    <Divider type="vertical" />
                                    <Popconfirm
                                        title="您确定要删除么？"
                                        onConfirm={() => this.delBlog(elm.id)}
                                        okText="确定"
                                        cancelText="取消"
                                    >
                                        删除
                                </Popconfirm>
                                </div>
                            }

                        </li>
                    ))}
                </ul>

                <Pagination current={this.state.page} total={this.state.blogs.total} pageSize={this.state.pageSize} onChange={this.handlePageChange} />

                <div className="article">
                    <Divider>
                        文章列表
                    </Divider>
                    <ul className="article__list">
                        {
                            this.state.blogs.list && this.state.blogs.list.map(elm => (
                                <li className="article__list-item" key={elm.id}>
                                    <Link to={`/blog/${elm.id}/detail`} className="ellipsis">{elm.title}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default connect(mapState)(Home);