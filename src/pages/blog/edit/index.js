// 新建或编辑博客页

import React from 'react'
import './index.less'
import { Form, Input, Button, message } from 'antd';
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';
import * as BlogApi from '../../../api/blog'

// 初始化Markdown解析器
const mdParser = new MarkdownIt(/* Markdown-it options */);

class BlogEdit extends React.Component {
    formRef = React.createRef();

    state = {
        blogId: +this.props.match.params.id || '',
        isEditMode: !!this.props.match.params.id, // 是否是编辑模式
        blogContent: '',
    }

    // componentWillReceiveProps(nextProps) {
    //     // 初始化数据
    //     this.setState({
    //         blogId: +nextProps.match.params.id || '',
    //         isEditMode: !!nextProps.match.params.id, // 是否是编辑模式
    //         blogContent: '',
    //     })
    // }

    componentDidMount() {
        // 如果是编辑模式则获取博客详情
        if (this.state.isEditMode) {
            this.getBlogDetail()
        }
    }

    // 获取博客详情
    getBlogDetail = () => {
        BlogApi.getBlogDetail({
            id: this.state.blogId
        }).then(({ data }) => {
            this.formRef.current.setFieldsValue({
                title: data.data.title,
                author: data.data.author,
            });
            this.setState({
                blogContent: data.data.content
            })
        })
    }

    handleSubmit = (values) => {
        if (!this.state.blogContent) {
            return message.error('请输入博客内容');
        }

        BlogApi[
            this.state.isEditMode ? 'setBlog' : 'addBlog'
        ]({
            id: this.state.isEditMode ? this.state.blogId : undefined,
            title: values.title,
            content: this.state.blogContent,
            author: values.author,
        }).then(res => {
            if (res.data.errno === 0) {
                message.success('提交成功');
                this.props.history.push('/')
            }
            else {
                message.warning(res.data.message);
            }
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            blogContent: text
        })
    }

    render() {
        const layout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 22 },
        };
        const tailLayout = {
            wrapperCol: { offset: 2, span: 22 },
        };

        return (
            <div className="page-blog-edit">
                <Form {...layout} ref={this.formRef} onFinish={this.handleSubmit}>
                    <Form.Item
                        label="博客作者"
                        name="author"
                        rules={[{ required: true, message: '请输入博客作者' }]}
                        hasFeedback
                    >
                        <Input placeholder="请输入博客作者" />
                    </Form.Item>
                    <Form.Item
                        label="博客标题"
                        name="title"
                        rules={[{ required: true, message: '请输入博客标题' }]}
                        hasFeedback
                    >
                        <Input placeholder="请输入博客标题" />
                    </Form.Item>
                    <Form.Item
                        label="博客内容"
                        hasFeedback
                        required
                    >
                        <MdEditor
                            value={this.state.blogContent}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                        />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default BlogEdit;
