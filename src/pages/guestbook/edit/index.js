import React from 'react'
import { Form, Input, Button, message } from 'antd';
import { addGuestbook } from '../../../api/guestbook'

const { TextArea } = Input;

class guestbook extends React.Component {
    state = {
        content: ''
    }

    handleSubmit = (values) => {
        addGuestbook({
            content: values.content,
        }).then(res => {
            if (res.data.errno === 0) {
                message.success('提交成功，感谢您的留言');
                this.props.history.push('/')
            }
            else {
                message.warning(res.data.message);
            }
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
                        label="留言内容"
                        name="content"
                        rules={[{ required: true, message: '请输入留言内容' }]}
                        hasFeedback
                    >
                        <TextArea placeholder="请输入留言内容" autoSize={{ minRows: 3, maxRows: 5 }} />
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

export default guestbook