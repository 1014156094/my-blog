// 首页

import React from 'react'
import './index.less'
import { Divider, Popconfirm, message } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getBlogList, delBlog } from '../../api/blog'
import MdEditor from 'react-markdown-editor-lite'
import MarkdownIt from 'markdown-it'

const mdParser = new MarkdownIt(/* Markdown-it options */)
const mapState = state => state

class Home extends React.Component {
    state = {
        blogList: []
    }

    componentDidMount() {
        this.getBlogList()
    }

    // 获取博客列表
    getBlogList = () => {
        getBlogList().then(res => {
            this.setState({
                blogList: res.data.data
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
                    blogList: this.state.blogList.filter(elm => elm.id !== id)
                })
            } else {
                message.error('删除失败')
            }
        })
    }

    render() {
        return (
            <div className="page-home">
                <ul className="list">
                    {this.state.blogList.map(elm => (
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
                        </li>
                    ))}
                </ul>
                <div className="article">
                    <Divider>
                        文章列表
                    </Divider>
                    <ul className="article__list">
                        {
                            this.state.blogList.map(elm => (
                                <li className="article__list-item ellipsis" key={elm.id}>
                                    <Link to={`/blog/${elm.id}/detail`}>{elm.title}</Link>
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