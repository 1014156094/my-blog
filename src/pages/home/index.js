// 首页

import React from 'react'
import './index.less'
import { Divider } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Home extends React.Component {
    state = {
        blogList: []
    }

    componentDidMount() {
        this.getBlogList()
    }

    // 获取博客列表
    getBlogList = () => {
        axios.get('/api/blog/list').then(res => {
            this.setState({
                blogList: res.data.data
            })
        })
    }

    render() {
        return (
            <div className="page-wrap">
                <ul className="list">
                    {this.state.blogList.map(elm => (
                        <li className="list__item" key={elm.id}>
                            <Divider orientation="left">
                                <span className="list__title">{elm.title}</span>
                                <span className="list__time">{elm.createtime}</span>
                            </Divider>
                            <div dangerouslySetInnerHTML={{ __html: elm.content }}></div>
                            <div className="list__action">
                                <span>
                                    <Link to={`/blog/${elm.id}`}>
                                        编辑
                                    </Link>
                                </span>
                                <Divider type="vertical" />
                                <span>删除</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}