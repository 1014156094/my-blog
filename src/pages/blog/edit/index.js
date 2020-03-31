// 新建或编辑博客页

import React from 'react'
import { Form, Icon, Input, Button, message } from 'antd';
import axios from 'axios'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';

// 初始化Markdown解析器
const mdParser = new MarkdownIt(/* Markdown-it options */);

class BlogEdit extends React.Component {
    formRef = React.createRef();

    state = {
        content: '',
        blogId: +this.props.match.params.id || '',
        isEditAction: false
    }

    componentDidMount() {
        if (this.state.blogId) {
            // 如果是编辑操作则获取博客详情
            this.setState({
                isEditAction: true
            }, () => {
                this.getBlogDetail()
            })
        }
    }
    
    // 获取博客详情
    getBlogDetail = () => {
        axios.get('/api/blog/detail', { params: { id: this.state.blogId } }).then(res => {
            console.log(22, this.state.isEditAction)
            this.formRef.current.setFieldsValue({
                title: res.data.data.title,
                author: res.data.data.author,
            });
            this.setState({
                content: res.data.data.content
            })
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (!this.state.content) {
                    return message.error('请输入博客内容');
                }

                axios.post('/api/blog/new', {
                    title: values.title,
                    content: this.state.content,
                    author: values.author,
                }).then(res => {
                    message.success('提交成功');
                    this.props.history.push('/')
                })
            }
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            content: text
        })
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <div>
                <Form {...formItemLayout} ref={this.formRef} onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item
                        label="博客作者"
                        name="author"
                        rules={[{ required: true, message: '请输入博客作者' }]}
                        hasFeedback
                    >
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入博客作者"
                        />
                    </Form.Item>
                    <Form.Item
                        label="博客标题"
                        name="title"
                        rules={[{ required: true, message: '请输入博客标题' }]}
                        hasFeedback
                    >
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入博客标题"
                        />
                    </Form.Item>
                    <Form.Item label="博客内容" hasFeedback>
                        {/* {getFieldDecorator('content', {
                            rules: [{ required: true, message: '请输入博客内容' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入博客内容"
                            />,
                        )} */}
                        <MdEditor
                            value=""
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                        />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
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
