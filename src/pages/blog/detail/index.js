// 博客详情页

import React from 'react'
import './index.less'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import { getBlogDetail } from '../../../api/blog'
import { Spin } from 'antd'

// 初始化Markdown解析器
const mdParser = new MarkdownIt(/* Markdown-it options */);

class BlogDetail extends React.Component {
    state = {
        blogId: +this.props.match.params.id || '',
        blogDetail: {},
        isLoading: true
    }

    componentDidMount() {
        this.getBlogDetail()
    }

    // 获取博客详情
    getBlogDetail() {
        getBlogDetail({
            id: this.state.blogId
        }).then(({ data }) => {
            this.setState({
                blogDetail: data.data
            }, () => {
                this.setState({
                    isLoading: false
                })
            })
        })
    }

    render() {
        return (
            <Spin spinning={this.state.isLoading}>
                <div className="page-blog-detail">
                    <h2>{this.state.blogDetail.title}</h2>
                    <MdEditor
                        value={this.state.blogDetail.content}
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
            </Spin>
        )
    }
}

export default BlogDetail