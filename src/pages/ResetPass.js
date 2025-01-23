import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';

export default function ResetPass() {
  const [token, setToken] = useState('');
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const path = window.location.pathname;
    const tokenFromPath = path.split('/reset-password/')[1];
    setToken(tokenFromPath);
  }, []);

  const onFinish = async (values) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/passwordResetConfirm/${token}/`, {
        new_password: values.new_password,
      });
      messageApi.success(response.data.detail||'Password reset successful!');
      console.log('Success:', response);
    } catch (error) {
      messageApi.error(error.response.data.detail||'Failed to reset password.');
      console.log('Failed:', error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <h1>Reset Password</h1>
      {contextHolder}
      <Form
        name="resetPass"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="New Password"
          name="new_password"
          rules={[{ required: true, message: 'Please input your new password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}