import React from 'react';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';

const ForgotPass = ({ token }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:8000/api/passwordReset/', {
        email: values.email,
      });
      messageApi.success('Password reset email sent successfully!');
      console.log('Success:', response.data);
    } catch (error) {
      // messageApi.error('Failed to send password reset email.');
      console.log('Failed:', error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <p>Token: {token}</p>
      {contextHolder}
      <Form
        name="forgotPass"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPass;